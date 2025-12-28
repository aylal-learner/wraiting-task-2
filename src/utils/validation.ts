import {
  ChartType,
  ChartConfig,
  IELTSChartData,
  MixedChartConfig,
  isValidMixedCombination,
} from '../types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateIELTSChartData(data: IELTSChartData): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!data.id || data.id.trim() === '') {
    errors.push('Chart data must have a valid id');
  }

  if (!data.title || data.title.trim() === '') {
    errors.push('Chart data must have a valid title');
  }

  const configValidation = validateChartConfig(data.config);
  errors.push(...configValidation.errors);
  warnings.push(...configValidation.warnings);

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateChartConfig(config: ChartConfig): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!config.type) {
    errors.push('Chart config must have a type');
    return { isValid: false, errors, warnings };
  }

  if (config.type === ChartType.MIXED) {
    const mixedValidation = validateMixedChart(config as MixedChartConfig);
    errors.push(...mixedValidation.errors);
    warnings.push(...mixedValidation.warnings);
  }

  if (config.type === ChartType.PROCESS_DIAGRAM) {
    if (!('steps' in config) || !config.steps || config.steps.length === 0) {
      errors.push('Process diagram must have at least one step');
    }
    if ('steps' in config && config.steps) {
      const orders = config.steps.map(s => s.order);
      if (new Set(orders).size !== orders.length) {
        errors.push('Process diagram steps must have unique order numbers');
      }
    }
  }

  if (config.type === ChartType.MAP) {
    if (!('locations' in config) || !config.locations || config.locations.length === 0) {
      errors.push('Map must have at least one location');
    }
  }

  if (config.datasets && config.datasets.length > 0) {
    config.datasets.forEach((dataset, index) => {
      if (!dataset.label || dataset.label.trim() === '') {
        errors.push(`Dataset at index ${index} must have a label`);
      }
      if (!dataset.data || dataset.data.length === 0) {
        errors.push(`Dataset at index ${index} must have data`);
      }
    });
  }

  if (config.timeMode === 'dynamic' && (!config.timeLabels || config.timeLabels.length === 0)) {
    warnings.push('Dynamic charts should have time labels');
  }

  if (config.type !== ChartType.PROCESS_DIAGRAM && config.type !== ChartType.MAP) {
    if (!config.categories || config.categories.length === 0) {
      warnings.push('Chart should have categories');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateMixedChart(config: MixedChartConfig): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!config.isMixed) {
    errors.push('Mixed chart must have isMixed set to true');
  }

  if (!config.combination || config.combination.length !== 2) {
    errors.push('Mixed chart must have exactly two chart types in combination');
    return { isValid: false, errors, warnings };
  }

  const [chart1, chart2] = config.combination;
  if (!isValidMixedCombination(chart1, chart2)) {
    errors.push(`Invalid mixed chart combination: ${chart1} + ${chart2}`);
  }

  if (config.datasets.length === 0) {
    errors.push('Mixed chart must have at least one dataset');
  }

  config.datasets.forEach((dataset, index) => {
    if (!dataset.chartType) {
      errors.push(`Dataset at index ${index} must specify chartType for mixed charts`);
    } else if (!(config.combination[0] === dataset.chartType || config.combination[1] === dataset.chartType)) {
      errors.push(
        `Dataset at index ${index} has chartType ${dataset.chartType} which is not in the combination`
      );
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateDataConsistency(config: ChartConfig): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (config.type === ChartType.PROCESS_DIAGRAM || config.type === ChartType.MAP) {
    return { isValid: true, errors, warnings };
  }

  const expectedDataLength = config.timeLabels
    ? config.timeLabels.length
    : config.categories.length;

  if (expectedDataLength === 0) {
    warnings.push('No categories or time labels defined');
    return { isValid: true, errors, warnings };
  }

  config.datasets.forEach((dataset, index) => {
    if (dataset.data.length !== expectedDataLength) {
      errors.push(
        `Dataset "${dataset.label}" at index ${index} has ${dataset.data.length} data points, ` +
        `but expected ${expectedDataLength} based on ${config.timeLabels ? 'time labels' : 'categories'}`
      );
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateAll(data: IELTSChartData): ValidationResult {
  const results = [
    validateIELTSChartData(data),
    validateDataConsistency(data.config),
  ];

  const allErrors = results.flatMap(r => r.errors);
  const allWarnings = results.flatMap(r => r.warnings);

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings,
  };
}
