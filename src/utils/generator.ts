import {
  ChartType,
  IELTSChartData,
  ChartConfig,
  SingleChartConfig,
  MixedChartConfig,
  ProcessDiagramConfig,
  MapConfig,
  ProcessDiagramType,
  MapType,
  ValidMixedCombination,
  VALID_MIXED_COMBINATIONS,
} from '../types';

export interface GenerationConfig {
  chartType: ChartType;
  timeMode?: 'static' | 'dynamic';
  categoryCount?: number;
  timePeriodYears?: number;
  startYear?: number;
  combination?: ValidMixedCombination;
  processType?: ProcessDiagramType;
  mapType?: MapType;
  difficulty?: 'easy' | 'medium' | 'hard';
}

const IELTS_TOPICS = {
  COUNTRIES: ['USA', 'UK', 'China', 'Japan', 'Germany', 'France', 'Australia', 'Canada', 'India', 'Brazil'],
  CITIES: ['Tokyo', 'London', 'New York', 'Paris', 'Sydney', 'Berlin', 'Dubai', 'Singapore', 'Toronto', 'Mumbai'],
  ENERGY_SOURCES: ['Coal', 'Natural Gas', 'Nuclear', 'Renewable', 'Oil', 'Hydroelectric', 'Solar', 'Wind'],
  TRANSPORT_MODES: ['Car', 'Bus', 'Train', 'Bicycle', 'Walking', 'Metro', 'Taxi', 'Motorcycle'],
  AGE_GROUPS: ['16-24', '25-34', '35-44', '45-54', '55-64', '65+'],
  EDUCATION_LEVELS: ['Primary', 'Secondary', 'Bachelor', 'Master', 'PhD'],
  DEPARTMENTS: ['Engineering', 'Business', 'Arts', 'Science', 'Medicine', 'Law', 'Education'],
  INDUSTRIES: ['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Education', 'Tourism'],
  PRODUCTS: ['Smartphones', 'Laptops', 'Tablets', 'Cameras', 'Headphones', 'Smartwatches'],
  SEASONS: ['Spring', 'Summer', 'Autumn', 'Winter'],
  MONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

const CHART_TITLES = {
  line_graph: [
    'Population Growth in Major Cities',
    'Internet Usage Over Time',
    'CO2 Emissions Trends',
    'Average Temperature Changes',
    'Economic Growth by Country',
  ],
  bar_chart: [
    'Internet Usage by Age Group',
    'Education Levels by Country',
    'Energy Consumption Comparison',
    'Transport Mode Preferences',
    'Industry Employment Distribution',
  ],
  pie_chart: [
    'Global Energy Consumption by Source',
    'Market Share by Company',
    'Transport Mode Distribution',
    'Education Level Distribution',
    'Household Expenses Breakdown',
  ],
  table: [
    'Average Monthly Temperatures in Cities',
    'Student Enrollment by Department',
    'Export Values by Country',
    'Rainfall Data by Season',
    'Population Statistics by Region',
  ],
};

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals: number = 2): number {
  const value = Math.random() * (max - min) + min;
  return parseFloat(value.toFixed(decimals));
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function pickRandomItems<T>(array: T[], count: number): T[] {
  return shuffleArray(array).slice(0, Math.min(count, array.length));
}

function pickRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function clampInt(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Math.floor(value)));
}

function resolveCount(requested: number | undefined, min: number, max: number): number {
  if (requested === undefined) {
    return randomInt(min, max);
  }
  return clampInt(requested, min, max);
}

function generateTimeLabels(startYear: number, periodYears: number, pointCount: number): string[] {
  const safePointCount = clampInt(pointCount, 5, 7);
  const endYear = startYear + periodYears;

  if (safePointCount <= 1) {
    return [startYear.toString()];
  }

  const step = Math.max(1, Math.floor(periodYears / (safePointCount - 1)));
  const labels: string[] = [];

  for (let i = 0; i < safePointCount; i++) {
    const year = startYear + i * step;
    labels.push(year.toString());
  }

  labels[labels.length - 1] = endYear.toString();

  const unique = Array.from(new Set(labels));
  return unique.slice(0, 7);
}

function generateSmoothTrendData(length: number, min: number, max: number, trend: 'increasing' | 'decreasing' | 'fluctuating' = 'increasing'): number[] {
  const data: number[] = [];
  const startValue = randomFloat(min, (min + max) / 2, 1);
  data.push(startValue);
  
  for (let i = 1; i < length; i++) {
    let previousValue = data[i - 1];
    let maxChange = (max - min) * 0.15;
    
    let change: number;
    if (trend === 'increasing') {
      change = randomFloat(0, maxChange, 1);
    } else if (trend === 'decreasing') {
      change = randomFloat(-maxChange, 0, 1);
    } else {
      change = randomFloat(-maxChange / 2, maxChange / 2, 1);
    }
    
    let newValue = previousValue + change;
    newValue = Math.max(min, Math.min(max, newValue));
    data.push(parseFloat(newValue.toFixed(1)));
  }
  
  return data;
}

function generatePieChartData(categoryCount: number): number[] {
  const values: number[] = [];
  let remaining = 100;
  
  for (let i = 0; i < categoryCount - 1; i++) {
    const maxForThisSlice = remaining - (categoryCount - i - 1) * 5;
    const value = randomFloat(5, Math.min(maxForThisSlice, 40), 2);
    values.push(value);
    remaining -= value;
  }
  
  values.push(parseFloat(remaining.toFixed(2)));
  
  const total = values.reduce((sum, val) => sum + val, 0);
  if (Math.abs(total - 100) > 0.01) {
    const adjustment = (100 - total) / categoryCount;
    for (let i = 0; i < values.length; i++) {
      values[i] = parseFloat((values[i] + adjustment).toFixed(2));
    }
  }
  
  return values;
}

function generateCategoricalData(categoryCount: number, min: number, max: number): number[] {
  const data: number[] = [];
  for (let i = 0; i < categoryCount; i++) {
    data.push(randomInt(min, max));
  }
  return data;
}

function generateCategories(config: GenerationConfig, count: number): string[] {
  const topicArrays = [
    IELTS_TOPICS.COUNTRIES,
    IELTS_TOPICS.CITIES,
    IELTS_TOPICS.AGE_GROUPS,
    IELTS_TOPICS.DEPARTMENTS,
    IELTS_TOPICS.INDUSTRIES,
  ];
  
  const selectedTopic = pickRandomItem(topicArrays);
  return pickRandomItems(selectedTopic, count);
}

function generateLineGraphConfig(config: GenerationConfig): SingleChartConfig {
  const categoryCount = resolveCount(config.categoryCount, 3, 5);
  const categories = generateCategories(config, categoryCount);
  
  if (config.timeMode === 'dynamic') {
    const startYear = config.startYear || randomInt(1990, 2010);
    const periodYears = config.timePeriodYears || randomInt(10, 30);
    const timeLabels = generateTimeLabels(startYear, periodYears, randomInt(5, 7));
    
    const datasets = categories.map(category => ({
      label: category,
      data: generateSmoothTrendData(timeLabels.length, 5, 100, pickRandomItem(['increasing', 'decreasing', 'fluctuating'])),
    }));
    
    return {
      type: ChartType.LINE_GRAPH,
      isMixed: false,
      timeMode: 'dynamic',
      dataBehavior: 'time_based',
      categories,
      timeLabels,
      datasets,
    };
  } else {
    const xAxisLabels = pickRandomItems(IELTS_TOPICS.MONTHS, randomInt(6, 12));
    
    const datasets = categories.map(category => ({
      label: category,
      data: generateCategoricalData(xAxisLabels.length, 10, 100),
    }));
    
    return {
      type: ChartType.LINE_GRAPH,
      isMixed: false,
      timeMode: 'static',
      dataBehavior: 'categorical',
      categories,
      timeLabels: xAxisLabels,
      datasets,
    };
  }
}

function generateBarChartConfig(config: GenerationConfig): SingleChartConfig {
  const categoryCount = resolveCount(config.categoryCount, 5, 7);
  let categories: string[];
  
  if (config.timeMode === 'dynamic') {
    const startYear = config.startYear || randomInt(2000, 2015);
    const periodYears = config.timePeriodYears || randomInt(10, 20);
    const timeLabels = generateTimeLabels(startYear, periodYears, randomInt(5, 7));
    categories = generateCategories(config, 3);
    
    const datasets = categories.map(category => ({
      label: category,
      data: generateSmoothTrendData(timeLabels.length, 20, 100, 'fluctuating'),
    }));
    
    return {
      type: ChartType.BAR_CHART,
      isMixed: false,
      timeMode: 'dynamic',
      dataBehavior: 'time_based',
      categories,
      timeLabels,
      datasets,
    };
  } else {
    categories = pickRandomItems(IELTS_TOPICS.AGE_GROUPS, categoryCount);
    
    return {
      type: ChartType.BAR_CHART,
      isMixed: false,
      timeMode: 'static',
      dataBehavior: 'categorical',
      categories,
      datasets: [
        {
          label: 'Percentage',
          data: generateCategoricalData(categoryCount, 20, 98),
        },
      ],
    };
  }
}

function generatePieChartConfig(config: GenerationConfig): SingleChartConfig {
  const categoryCount = resolveCount(config.categoryCount, 4, 6);
  const categories = pickRandomItems(
    pickRandomItem([IELTS_TOPICS.ENERGY_SOURCES, IELTS_TOPICS.TRANSPORT_MODES, IELTS_TOPICS.DEPARTMENTS]),
    categoryCount
  );
  
  return {
    type: ChartType.PIE_CHART,
    isMixed: false,
    timeMode: 'static',
    dataBehavior: 'categorical',
    categories,
    datasets: [
      {
        label: 'Percentage',
        data: generatePieChartData(categoryCount),
      },
    ],
  };
}

function generateTableConfig(config: GenerationConfig): SingleChartConfig {
  const rowCount = resolveCount(config.categoryCount, 4, 6);
  const categories = pickRandomItems(IELTS_TOPICS.CITIES, rowCount);
  
  if (config.timeMode === 'dynamic') {
    const startYear = config.startYear || randomInt(2000, 2015);
    const periodYears = config.timePeriodYears || randomInt(10, 20);
    const timeLabels = generateTimeLabels(startYear, periodYears, randomInt(5, 7));
    
    const datasets = categories.map(category => ({
      label: category,
      data: generateSmoothTrendData(timeLabels.length, 10, 100, 'fluctuating'),
    }));
    
    return {
      type: ChartType.TABLE,
      isMixed: false,
      timeMode: 'dynamic',
      dataBehavior: 'time_based',
      categories,
      timeLabels,
      datasets,
    };
  } else {
    const columnLabels = pickRandomItems(IELTS_TOPICS.SEASONS, 4);
    
    const datasets = categories.map(category => ({
      label: category,
      data: generateCategoricalData(columnLabels.length, 5, 40),
    }));
    
    return {
      type: ChartType.TABLE,
      isMixed: false,
      timeMode: 'static',
      dataBehavior: 'categorical',
      categories,
      timeLabels: columnLabels,
      datasets,
    };
  }
}

function generateMixedChartConfig(config: GenerationConfig): MixedChartConfig {
  const combination = config.combination || pickRandomItem(VALID_MIXED_COMBINATIONS);
  const [chart1Type, chart2Type] = combination;
  
  const categoryCount = config.categoryCount || randomInt(6, 12);
  let categories: string[];
  let timeLabels: string[] | undefined;
  let timeMode: 'static' | 'dynamic';
  let dataBehavior: 'time_based' | 'categorical';
  
  const isTimeBased = chart1Type === ChartType.LINE_GRAPH || chart2Type === ChartType.LINE_GRAPH;
  
  if (isTimeBased && config.timeMode !== 'static') {
    timeMode = 'dynamic';
    dataBehavior = 'time_based';
    categories = pickRandomItems(IELTS_TOPICS.MONTHS, categoryCount);
    timeLabels = categories;
  } else {
    timeMode = 'static';
    dataBehavior = 'categorical';
    categories = pickRandomItems(
      pickRandomItem([IELTS_TOPICS.DEPARTMENTS, IELTS_TOPICS.INDUSTRIES, IELTS_TOPICS.PRODUCTS]),
      config.categoryCount || randomInt(5, 7)
    );
  }
  
  const datasets: Array<{ label: string; data: number[]; chartType: ChartType }> = [];
  
  if (chart1Type === ChartType.LINE_GRAPH) {
    datasets.push({
      label: pickRandomItem(['Temperature', 'Sales', 'Growth Rate', 'Average Score']),
      data: generateSmoothTrendData(categories.length, 15, 30, 'fluctuating'),
      chartType: ChartType.LINE_GRAPH,
    });
  } else if (chart1Type === ChartType.BAR_CHART) {
    datasets.push({
      label: pickRandomItem(['Revenue', 'Units Sold', 'Count', 'Total']),
      data: generateCategoricalData(categories.length, 50, 200),
      chartType: ChartType.BAR_CHART,
    });
  } else if (chart1Type === ChartType.PIE_CHART) {
    datasets.push({
      label: 'Proportion (%)',
      data: generatePieChartData(categories.length),
      chartType: ChartType.PIE_CHART,
    });
  } else if (chart1Type === ChartType.TABLE) {
    datasets.push({
      label: 'Values',
      data: generateCategoricalData(categories.length, 100, 1000),
      chartType: ChartType.TABLE,
    });
  }
  
  if (chart2Type === ChartType.BAR_CHART && chart1Type !== ChartType.BAR_CHART) {
    datasets.push({
      label: pickRandomItem(['Rainfall', 'Expenditure', 'Population', 'Volume']),
      data: generateCategoricalData(categories.length, 30, 150),
      chartType: ChartType.BAR_CHART,
    });
  } else if (chart2Type === ChartType.PIE_CHART && chart1Type !== ChartType.PIE_CHART) {
    datasets.push({
      label: 'Distribution (%)',
      data: generatePieChartData(categories.length),
      chartType: ChartType.PIE_CHART,
    });
  } else if (chart2Type === ChartType.TABLE && chart1Type !== ChartType.TABLE) {
    datasets.push({
      label: 'Data Points',
      data: generateCategoricalData(categories.length, 50, 500),
      chartType: ChartType.TABLE,
    });
  } else if (chart2Type === ChartType.BAR_CHART && chart1Type === ChartType.BAR_CHART) {
    datasets.push({
      label: pickRandomItem(['2022 Data', 'Previous Year', 'Comparison Set']),
      data: generateCategoricalData(categories.length, 30, 150),
      chartType: ChartType.BAR_CHART,
    });
  } else if (chart2Type === ChartType.PIE_CHART && chart1Type === ChartType.PIE_CHART) {
    datasets.push({
      label: '2023 Distribution (%)',
      data: generatePieChartData(categories.length),
      chartType: ChartType.PIE_CHART,
    });
  }
  
  return {
    type: ChartType.MIXED,
    isMixed: true,
    timeMode,
    dataBehavior,
    combination,
    categories,
    timeLabels,
    datasets,
  };
}

function generateProcessDiagramConfig(config: GenerationConfig): ProcessDiagramConfig {
  const processType = config.processType || pickRandomItem([ProcessDiagramType.NATURAL, ProcessDiagramType.MAN_MADE]);
  
  const naturalProcesses = [
    {
      title: 'The Life Cycle of a Butterfly',
      steps: [
        { id: 's1', label: 'Egg', order: 1, description: 'Female butterfly lays eggs on leaves' },
        { id: 's2', label: 'Larva (Caterpillar)', order: 2, description: 'Egg hatches into caterpillar' },
        { id: 's3', label: 'Pupa (Chrysalis)', order: 3, description: 'Caterpillar forms chrysalis' },
        { id: 's4', label: 'Adult Butterfly', order: 4, description: 'Butterfly emerges from chrysalis' },
      ],
    },
    {
      title: 'The Water Cycle',
      steps: [
        { id: 's1', label: 'Evaporation', order: 1, description: 'Water evaporates from oceans and lakes' },
        { id: 's2', label: 'Condensation', order: 2, description: 'Water vapor forms clouds' },
        { id: 's3', label: 'Precipitation', order: 3, description: 'Rain or snow falls to earth' },
        { id: 's4', label: 'Collection', order: 4, description: 'Water collects in bodies of water' },
      ],
    },
  ];
  
  const manMadeProcesses = [
    {
      title: 'Glass Bottle Manufacturing',
      steps: [
        { id: 's1', label: 'Raw materials mixing', order: 1, description: 'Sand, soda ash, and limestone are mixed' },
        { id: 's2', label: 'Melting', order: 2, description: 'Mixture is heated to 1500°C' },
        { id: 's3', label: 'Molding', order: 3, description: 'Molten glass is shaped into bottles' },
        { id: 's4', label: 'Cooling', order: 4, description: 'Bottles are gradually cooled' },
        { id: 's5', label: 'Quality check', order: 5, description: 'Bottles are inspected' },
        { id: 's6', label: 'Packaging', order: 6, description: 'Bottles are packaged for distribution' },
      ],
    },
    {
      title: 'Coffee Production Process',
      steps: [
        { id: 's1', label: 'Harvesting', order: 1, description: 'Coffee cherries are picked' },
        { id: 's2', label: 'Processing', order: 2, description: 'Beans are extracted from cherries' },
        { id: 's3', label: 'Drying', order: 3, description: 'Beans are dried in the sun' },
        { id: 's4', label: 'Roasting', order: 4, description: 'Beans are roasted to develop flavor' },
        { id: 's5', label: 'Grinding', order: 5, description: 'Roasted beans are ground' },
        { id: 's6', label: 'Packaging', order: 6, description: 'Ground coffee is packaged' },
      ],
    },
  ];
  
  const selectedProcess = processType === ProcessDiagramType.NATURAL
    ? pickRandomItem(naturalProcesses)
    : pickRandomItem(manMadeProcesses);
  
  return {
    type: ChartType.PROCESS_DIAGRAM,
    isMixed: false,
    processType,
    timeMode: 'static',
    dataBehavior: 'categorical',
    categories: [],
    datasets: [],
    steps: selectedProcess.steps,
  };
}

function generateMapConfig(config: GenerationConfig): MapConfig {
  const mapType = config.mapType || pickRandomItem([MapType.COMPARISON, MapType.DEVELOPMENT]);
  
  if (mapType === MapType.COMPARISON) {
    return {
      type: ChartType.MAP,
      mapType: MapType.COMPARISON,
      isMixed: false,
      timeMode: 'static',
      dataBehavior: 'categorical',
      categories: [],
      datasets: [],
      locations: [
        {
          id: 'c1-l1',
          name: 'City A - Train Station',
          coordinates: { x: 100, y: 200 },
          features: ['transport', 'central'],
        },
        {
          id: 'c1-l2',
          name: 'City A - Park',
          coordinates: { x: 300, y: 200 },
          features: ['recreation', 'green-space'],
        },
        {
          id: 'c2-l1',
          name: 'City B - Bus Terminal',
          coordinates: { x: 100, y: 400 },
          features: ['transport', 'peripheral'],
        },
        {
          id: 'c2-l2',
          name: 'City B - Shopping District',
          coordinates: { x: 300, y: 400 },
          features: ['commercial', 'central'],
        },
      ],
    };
  } else {
    const startYear = config.startYear || randomInt(1990, 2000);
    const endYear = startYear + randomInt(20, 30);
    
    return {
      type: ChartType.MAP,
      mapType: MapType.DEVELOPMENT,
      isMixed: false,
      timeMode: 'static',
      dataBehavior: 'categorical',
      categories: [],
      datasets: [],
      locations: [
        {
          id: 'l1',
          name: 'Train Station',
          coordinates: { x: 100, y: 200 },
          features: [`built-${startYear}`, 'unchanged'],
        },
        {
          id: 'l2',
          name: 'Shopping Mall',
          coordinates: { x: 300, y: 200 },
          features: [`built-${endYear - 3}`, 'new'],
        },
        {
          id: 'l3',
          name: 'Old Factory',
          coordinates: { x: 300, y: 300 },
          features: [`built-${startYear}`, `demolished-${startYear + 15}`],
        },
        {
          id: 'l4',
          name: 'Residential Area',
          coordinates: { x: 400, y: 200 },
          features: [`built-${startYear + 10}`, 'expanded'],
        },
      ],
    };
  }
}

function generateChartTitle(chartType: ChartType, config: ChartConfig): string {
  if (chartType === ChartType.PROCESS_DIAGRAM) {
    const processConfig = config as ProcessDiagramConfig;
    return processConfig.processType === ProcessDiagramType.NATURAL
      ? pickRandomItem(['The Life Cycle of a Butterfly', 'The Water Cycle', 'Plant Growth Process'])
      : pickRandomItem(['Glass Bottle Manufacturing', 'Coffee Production Process', 'Cement Production']);
  }
  
  if (chartType === ChartType.MAP) {
    const mapConfig = config as MapConfig;
    return mapConfig.mapType === MapType.COMPARISON
      ? 'Comparison of Two City Centers'
      : `Town Center Development (${config.timeMode === 'dynamic' ? '1990 vs 2020' : 'Changes Over Time'})`;
  }
  
  const titles = CHART_TITLES[chartType as keyof typeof CHART_TITLES];
  if (titles) {
    return pickRandomItem(titles);
  }
  
  return 'IELTS Writing Task 1 Chart';
}

function generateDescription(chartType: ChartType, config: ChartConfig): string {
  const timePeriod = config.timeLabels && config.timeLabels.length > 1
    ? `from ${config.timeLabels[0]} to ${config.timeLabels[config.timeLabels.length - 1]}`
    : 'in the given period';
  
  if (chartType === ChartType.LINE_GRAPH) {
    return `The line graph shows trends ${config.timeMode === 'dynamic' ? timePeriod : 'across different categories'}.`;
  }
  
  if (chartType === ChartType.BAR_CHART) {
    return `The bar chart compares data ${config.timeMode === 'dynamic' ? timePeriod : 'across different categories'}.`;
  }
  
  if (chartType === ChartType.PIE_CHART) {
    return 'The pie chart illustrates the proportion of different categories.';
  }
  
  if (chartType === ChartType.TABLE) {
    return `The table presents data ${config.timeMode === 'dynamic' ? timePeriod : 'for comparison'}.`;
  }
  
  if (chartType === ChartType.MIXED) {
    const mixedConfig = config as MixedChartConfig;
    return `The charts show ${mixedConfig.combination.join(' and ')} data for comparison.`;
  }
  
  if (chartType === ChartType.PROCESS_DIAGRAM) {
    return 'The diagram illustrates the process from start to finish.';
  }
  
  if (chartType === ChartType.MAP) {
    const mapConfig = config as MapConfig;
    return mapConfig.mapType === MapType.COMPARISON
      ? 'The maps compare two different locations.'
      : 'The maps show how a location has changed over time.';
  }
  
  return 'This chart presents data for IELTS Writing Task 1.';
}

export function generateChartData(config: GenerationConfig): IELTSChartData {
  const chartType = config.chartType;
  let chartConfig: ChartConfig;
  
  switch (chartType) {
    case ChartType.LINE_GRAPH:
      chartConfig = generateLineGraphConfig(config);
      break;
    
    case ChartType.BAR_CHART:
      chartConfig = generateBarChartConfig(config);
      break;
    
    case ChartType.PIE_CHART:
      chartConfig = generatePieChartConfig(config);
      break;
    
    case ChartType.TABLE:
      chartConfig = generateTableConfig(config);
      break;
    
    case ChartType.MIXED:
      chartConfig = generateMixedChartConfig(config);
      break;
    
    case ChartType.PROCESS_DIAGRAM:
      chartConfig = generateProcessDiagramConfig(config);
      break;
    
    case ChartType.MAP:
      chartConfig = generateMapConfig(config);
      break;
    
    default:
      throw new Error(`Unsupported chart type: ${chartType}`);
  }
  
  const id = `${chartType}-${Date.now()}-${randomInt(1000, 9999)}`;
  const title = generateChartTitle(chartType, chartConfig);
  const description = generateDescription(chartType, chartConfig);
  const difficulty = config.difficulty || pickRandomItem(['easy', 'medium', 'hard'] as const);
  
  return {
    id,
    title,
    description,
    config: chartConfig,
    metadata: {
      difficulty,
      estimatedTime: 20,
      tags: [chartType, config.timeMode || 'static'],
    },
  };
}
