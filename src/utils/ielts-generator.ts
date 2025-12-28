import {
  ChartType,
  ProcessDiagramType,
  MapType,
  ValidMixedCombination,
  IELTSChartData,
  ChartConfig,
  Dataset,
  SingleChartConfig,
  MixedChartConfig,
  ProcessDiagramConfig,
  MapConfig,
  VALID_MIXED_COMBINATIONS,
  TIME_BASED_CHARTS,
} from '../types';

export interface GenerationConfig {
  chartType?: ChartType;
  includeMetadata?: boolean;
  seed?: number;
}

const IELTS_TOPICS: readonly string[] = [
  'Energy',
  'Population',
  'Transport',
  'Education',
  'Healthcare',
  'Environment',
  'Economy',
  'Technology',
  'Agriculture',
  'Tourism',
  'Employment',
  'Housing',
  'Waste Management',
  'Water Resources',
  'Climate Change',
] as const;

const CATEGORY_LABELS: readonly string[] = [
  'Category A',
  'Category B',
  'Category C',
  'Category D',
  'Category E',
  'Category F',
] as const;

const DATASET_LABELS: readonly string[] = [
  'Series 1',
  'Series 2',
  'Series 3',
  'Group A',
  'Group B',
  'Group C',
  'Region North',
  'Region South',
  'Region East',
  'Region West',
] as const;

const MONTHS: readonly string[] = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const;

const SEASONS: readonly string[] = ['Spring', 'Summer', 'Autumn', 'Winter'] as const;

const YEARS_1990_2020: readonly string[] = [
  '1990', '1995', '2000', '2005', '2010', '2015', '2020',
] as const;

const PROCESS_STEP_VERBS: readonly string[] = [
  'Collecting', 'Processing', 'Filtering', 'Distributing', 'Manufacturing',
  'Analyzing', 'Packaging', 'Transporting', 'Storing', 'Recycling',
] as const;

const PROCESS_NOUNS: readonly string[] = [
  'raw materials', 'waste', 'water', 'energy', 'products',
  'information', 'resources', 'components', 'finished goods', 'wastewater',
] as const;

const LOCATION_NAMES: readonly string[] = [
  'Train Station', 'City Center', 'Shopping District', 'Industrial Zone',
  'Residential Area', 'Park', 'Hospital', 'School', 'Factory', 'Port',
] as const;

const LOCATION_FEATURES: readonly string[] = [
  'transport', 'commercial', 'residential', 'industrial', 'recreational',
  'educational', 'medical', 'green-space', 'historic', 'new-development',
] as const;

function seededRandom(seed: number): () => number {
  return function(): number {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
}

function pickRandom<T>(arr: readonly T[], random: () => number): T {
  return arr[Math.floor(random() * arr.length)];
}

function pickRandomMultiple<T>(arr: readonly T[], count: number, random: () => number): T[] {
  const shuffled = [...arr].sort(() => random() - 0.5);
  return shuffled.slice(0, count);
}

function generateId(prefix: string, random: () => number): string {
  const num = Math.floor(random() * 10000)
    .toString()
    .padStart(4, '0');
  return `${prefix}-${num}`;
}

function generateTitle(topic: string, chartType: ChartType): string {
  const typeLabels: Record<ChartType, string> = {
    [ChartType.LINE_GRAPH]: 'Over Time',
    [ChartType.BAR_CHART]: 'Comparison',
    [ChartType.PIE_CHART]: 'Distribution',
    [ChartType.TABLE]: 'Data Overview',
    [ChartType.PROCESS_DIAGRAM]: 'Process Flow',
    [ChartType.MAP]: 'Spatial Analysis',
    [ChartType.MIXED]: 'Combined Analysis',
  };
  return `${topic} ${typeLabels[chartType]}`;
}

function generateTrendData(
  length: number,
  random: () => number,
  startValue: number = 10,
  volatility: number = 15
): number[] {
  const data: number[] = [];
  let current = startValue;

  for (let i = 0; i < length; i++) {
    const change = (random() - 0.5) * volatility * 2;
    current = Math.max(0, current + change);
    data.push(Math.round(current * 10) / 10);
  }

  return data;
}

function generateCategoricalData(
  length: number,
  random: () => number,
  maxValue: number = 100
): number[] {
  const data: number[] = [];
  let remaining = 100;

  for (let i = 0; i < length - 1; i++) {
    const maxPortion = Math.min(remaining - (length - i - 1), maxValue);
    const value = Math.floor(random() * (maxPortion + 1));
    data.push(value);
    remaining -= value;
  }

  data.push(Math.max(0, remaining));
  return data;
}

function generatePieData(
  length: number,
  random: () => number
): number[] {
  const data = generateCategoricalData(length, random, 50);

  const sum = data.reduce((a, b) => a + b, 0);
  if (sum === 0) {
    data[0] = 100;
    return data;
  }

  const diff = 100 - sum;
  data[0] += diff;

  for (let i = 0; i < data.length; i++) {
    const adjustment = Math.round((diff / data.length) * Math.pow(10, 1)) / Math.pow(10, 1);
    data[i] = Math.round((data[i] + adjustment) * 10) / 10;
  }

  const finalSum = data.reduce((a, b) => a + b, 0);
  data[0] = Math.round((data[0] + (100 - finalSum)) * 10) / 10;

  return data.map(v => Math.max(0, v));
}

function generateDatasets(
  chartType: ChartType,
  dataLength: number,
  datasetCount: number,
  random: () => number
): Dataset[] {
  const datasets: Dataset[] = [];

  for (let i = 0; i < datasetCount; i++) {
    const label = pickRandom(DATASET_LABELS, random);
    let data: number[];

    if (chartType === ChartType.PIE_CHART) {
      data = generatePieData(dataLength, random);
    } else if (chartType === ChartType.LINE_GRAPH) {
      data = generateTrendData(dataLength, random, 20 + random() * 30, 10);
    } else {
      data = Array.from({ length: dataLength }, () =>
        Math.floor(random() * 80) + 10
      );
    }

    datasets.push({ label, data });
  }

  return datasets;
}

function generateTimeLabels(
  random: () => number
): { labels: string[]; timeMode: 'static' | 'dynamic' } {
  const useYears = pickRandom([true, false], random);
  const useMonths = pickRandom([true, false], random);

  if (useYears) {
    const count = Math.floor(random() * 3) + 4;
    const labels = pickRandomMultiple(YEARS_1990_2020, count, random).sort();
    return { labels, timeMode: 'dynamic' };
  }

  if (useMonths) {
    return { labels: [...MONTHS], timeMode: 'dynamic' };
  }

  return { labels: [...SEASONS], timeMode: 'static' };
}

function generateSingleChartConfig(
  chartType: ChartType,
  random: () => number
): SingleChartConfig {
  const categoryCount = Math.floor(random() * 4) + 3;
  const categories = pickRandomMultiple(CATEGORY_LABELS, categoryCount, random);
  const { labels: timeLabels, timeMode } = generateTimeLabels(random);

  const datasetCount = Math.floor(random() * 2) + 1;

  const isTimeBased = TIME_BASED_CHARTS.includes(chartType);
  const dataLength = isTimeBased && timeMode === 'dynamic' ? timeLabels.length : categories.length;

  const datasets = generateDatasets(chartType, dataLength, datasetCount, random);

  return {
    type: chartType as Exclude<ChartType, ChartType.MIXED>,
    isMixed: false,
    timeMode: isTimeBased ? timeMode : 'static',
    dataBehavior: isTimeBased ? 'time_based' : 'categorical',
    categories,
    timeLabels: isTimeBased && timeMode === 'dynamic' ? timeLabels : undefined,
    datasets,
  };
}

function generateMixedChartConfig(
  random: () => number
): MixedChartConfig {
  const combination = pickRandom(VALID_MIXED_COMBINATIONS, random) as ValidMixedCombination;
  const { labels: timeLabels, timeMode } = generateTimeLabels(random);
  const categoryCount = Math.floor(random() * 4) + 3;
  const categories = pickRandomMultiple(CATEGORY_LABELS, categoryCount, random);

  const isTimeBased =
    TIME_BASED_CHARTS.includes(combination[0]) ||
    TIME_BASED_CHARTS.includes(combination[1]);

  const dataLength = isTimeBased && timeMode === 'dynamic' ? timeLabels.length : categories.length;

  const datasets = combination.map((chartType) => {
    const label = `${pickRandom(DATASET_LABELS, random)} (${chartType.replace('_', ' ')})`;
    let data: number[];

    if (chartType === ChartType.PIE_CHART) {
      data = generatePieData(dataLength, random);
    } else if (chartType === ChartType.LINE_GRAPH) {
      data = generateTrendData(dataLength, random, 20 + random() * 30, 10);
    } else {
      data = Array.from({ length: dataLength }, () =>
        Math.floor(random() * 80) + 10
      );
    }

    return { label, data, chartType };
  });

  return {
    type: ChartType.MIXED,
    isMixed: true,
    combination,
    timeMode: isTimeBased ? timeMode : 'static',
    dataBehavior: isTimeBased ? 'time_based' : 'categorical',
    categories,
    timeLabels: isTimeBased && timeMode === 'dynamic' ? timeLabels : undefined,
    datasets,
  };
}

function generateProcessDiagramConfig(
  random: () => number
): ProcessDiagramConfig {
  const stepCount = Math.floor(random() * 4) + 3;
  const isNatural = pickRandom([true, false], random);
  const processType = isNatural
    ? ProcessDiagramType.NATURAL
    : ProcessDiagramType.MAN_MADE;

  const steps = Array.from({ length: stepCount }, (_, i) => {
    const verb = pickRandom(PROCESS_STEP_VERBS, random);
    const noun = pickRandom(PROCESS_NOUNS, random);
    return {
      id: `s${i + 1}`,
      label: `${verb} ${noun}`,
      order: i + 1,
      description: `The process of ${verb.toLowerCase()} ${noun.toLowerCase()} occurs at this stage`,
    };
  });

  return {
    type: ChartType.PROCESS_DIAGRAM,
    processType,
    isMixed: false,
    timeMode: 'static',
    dataBehavior: 'categorical',
    categories: [],
    datasets: [],
    steps,
  };
}

function generateMapConfig(
  random: () => number
): MapConfig {
  const isComparison = pickRandom([true, false], random);
  const mapType = isComparison ? MapType.COMPARISON : MapType.DEVELOPMENT;
  const locationCount = Math.floor(random() * 4) + 3;

  const locations = Array.from({ length: locationCount }, (_, i) => {
    const name = pickRandom(LOCATION_NAMES, random);
    const feature1 = pickRandom(LOCATION_FEATURES, random);
    const feature2 = pickRandom(LOCATION_FEATURES, random);

    return {
      id: `loc-${i + 1}`,
      name: `${name} ${Math.floor(i / 2) + 1}`,
      coordinates: {
        x: Math.floor(random() * 500),
        y: Math.floor(random() * 500),
      },
      features: [feature1, feature2],
    };
  });

  return {
    type: ChartType.MAP,
    mapType,
    isMixed: false,
    timeMode: 'static',
    dataBehavior: 'categorical',
    categories: [],
    datasets: [],
    locations,
  };
}

export function generateChartData(config: GenerationConfig = {}): IELTSChartData {
  const {
    chartType = pickRandom(Object.values(ChartType), () => Math.random()),
    includeMetadata = true,
    seed,
  } = config;

  const random = seed !== undefined ? seededRandom(seed) : () => Math.random();

  const topic = pickRandom(IELTS_TOPICS, random);
  const title = generateTitle(topic, chartType);

  let chartConfig: ChartConfig;

  switch (chartType) {
    case ChartType.MIXED:
      chartConfig = generateMixedChartConfig(random);
      break;
    case ChartType.PROCESS_DIAGRAM:
      chartConfig = generateProcessDiagramConfig(random);
      break;
    case ChartType.MAP:
      chartConfig = generateMapConfig(random);
      break;
    default:
      chartConfig = generateSingleChartConfig(chartType, random);
  }

  const idPrefix = chartType.replace('_', '-').substring(0, 2);
  const id = generateId(idPrefix, random);

  const result: IELTSChartData = {
    id,
    title,
    description: `The ${chartType.replace('_', ' ')} illustrates ${topic.toLowerCase()} data.`,
    config: chartConfig,
  };

  if (includeMetadata) {
    const difficulty = pickRandom(['easy', 'medium', 'hard'], random) as 'easy' | 'medium' | 'hard';
    result.metadata = {
      difficulty,
      estimatedTime: difficulty === 'easy' ? 15 : difficulty === 'medium' ? 20 : 25,
      tags: [topic.toLowerCase(), chartType.replace('_', '-')],
    };
  }

  return result;
}

export function generateMultipleCharts(
  count: number,
  config: GenerationConfig = {}
): IELTSChartData[] {
  return Array.from({ length: count }, () => generateChartData(config));
}
