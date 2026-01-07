import {
  ChartType,
  IELTSChartData,
  ProcessDiagramType,
  MapType,
  SingleChartConfig,
  MixedChartConfig,
} from '../types';

console.log('=== IELTS Chart Types - Complete Examples ===\n');

console.log('1. SINGLE CHARTS - TIME-BASED (Dynamic)\n');

const lineGraphConfig: SingleChartConfig = {
  type: ChartType.LINE_GRAPH,
  isMixed: false,
  timeMode: 'dynamic',
  dataBehavior: 'time_based',
  categories: ['Tokyo', 'London', 'New York'],
  timeLabels: ['1990', '2000', '2010', '2020'],
  datasets: [
    { label: 'Tokyo', data: [8.2, 8.9, 9.3, 9.7] },
    { label: 'London', data: [6.8, 7.2, 7.8, 8.9] },
    { label: 'New York', data: [7.3, 8.0, 8.2, 8.3] },
  ],
};

console.log('✓ Line Graph (Time-Based):');
console.log('  - Type:', lineGraphConfig.type);
console.log('  - Time Mode:', lineGraphConfig.timeMode);
console.log('  - Data Behavior:', lineGraphConfig.dataBehavior);
console.log('  - Categories:', lineGraphConfig.categories.length);
console.log('  - Time Labels:', lineGraphConfig.timeLabels?.length);
console.log('  - Datasets:', lineGraphConfig.datasets.length);
console.log();

console.log('2. SINGLE CHARTS - CATEGORICAL (Static)\n');

const barChartConfig: SingleChartConfig = {
  type: ChartType.BAR_CHART,
  isMixed: false,
  timeMode: 'static',
  dataBehavior: 'categorical',
  categories: ['16-24', '25-34', '35-44', '45-54', '55-64', '65+'],
  datasets: [
    { label: 'Daily Internet Users (%)', data: [98, 95, 88, 78, 65, 45] },
  ],
};

console.log('✓ Bar Chart (Categorical):');
console.log('  - Type:', barChartConfig.type);
console.log('  - Time Mode:', barChartConfig.timeMode);
console.log('  - Data Behavior:', barChartConfig.dataBehavior);
console.log('  - Categories:', barChartConfig.categories.length);
console.log('  - Datasets:', barChartConfig.datasets.length);
console.log();

const pieChartConfig: SingleChartConfig = {
  type: ChartType.PIE_CHART,
  isMixed: false,
  timeMode: 'static',
  dataBehavior: 'categorical',
  categories: ['Coal', 'Natural Gas', 'Nuclear', 'Renewable', 'Oil'],
  datasets: [
    { label: 'Energy Sources', data: [27, 24, 10, 29, 10] },
  ],
};

console.log('✓ Pie Chart (Categorical):');
console.log('  - Type:', pieChartConfig.type);
console.log('  - Time Mode:', pieChartConfig.timeMode);
console.log('  - Data Behavior:', pieChartConfig.dataBehavior);
console.log('  - Categories:', pieChartConfig.categories.length);
console.log('  - Datasets:', pieChartConfig.datasets.length);
console.log();

const tableConfig: SingleChartConfig = {
  type: ChartType.TABLE,
  isMixed: false,
  timeMode: 'static',
  dataBehavior: 'categorical',
  categories: ['London', 'Tokyo', 'Sydney', 'Dubai'],
  timeLabels: ['Spring', 'Summer', 'Autumn', 'Winter'],
  datasets: [
    { label: 'London', data: [12, 18, 14, 5] },
    { label: 'Tokyo', data: [15, 26, 17, 6] },
    { label: 'Sydney', data: [20, 26, 19, 12] },
    { label: 'Dubai', data: [28, 38, 30, 20] },
  ],
};

console.log('✓ Table (Categorical):');
console.log('  - Type:', tableConfig.type);
console.log('  - Time Mode:', tableConfig.timeMode);
console.log('  - Data Behavior:', tableConfig.dataBehavior);
console.log('  - Categories:', tableConfig.categories.length);
console.log('  - Datasets:', tableConfig.datasets.length);
console.log();

console.log('3. MIXED CHARTS (Valid Combinations)\n');

const mixedLineBarConfig: MixedChartConfig = {
  type: ChartType.MIXED,
  isMixed: true,
  timeMode: 'dynamic',
  dataBehavior: 'time_based',
  combination: [ChartType.LINE_GRAPH, ChartType.BAR_CHART],
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Temperature (°C)',
      data: [26, 26, 24, 21, 18, 16, 15, 16, 19, 21, 23, 25],
      chartType: ChartType.LINE_GRAPH,
    },
    {
      label: 'Rainfall (mm)',
      data: [100, 120, 130, 110, 100, 130, 90, 70, 60, 70, 80, 80],
      chartType: ChartType.BAR_CHART,
    },
  ],
};

console.log('✓ Mixed Line + Bar:');
console.log('  - Type:', mixedLineBarConfig.type);
console.log('  - Combination:', mixedLineBarConfig.combination.join(' + '));
console.log('  - Time Mode:', mixedLineBarConfig.timeMode);
console.log('  - Data Behavior:', mixedLineBarConfig.dataBehavior);
console.log('  - Datasets:', mixedLineBarConfig.datasets.length);
console.log();

const mixedTablePieConfig: MixedChartConfig = {
  type: ChartType.MIXED,
  isMixed: true,
  timeMode: 'static',
  dataBehavior: 'categorical',
  combination: [ChartType.TABLE, ChartType.PIE_CHART],
  categories: ['Engineering', 'Business', 'Arts', 'Science', 'Medicine'],
  datasets: [
    {
      label: 'Enrollment Numbers',
      data: [1200, 950, 600, 800, 450],
      chartType: ChartType.TABLE,
    },
    {
      label: 'Proportion (%)',
      data: [30, 23.75, 15, 20, 11.25],
      chartType: ChartType.PIE_CHART,
    },
  ],
};

console.log('✓ Mixed Table + Pie:');
console.log('  - Type:', mixedTablePieConfig.type);
console.log('  - Combination:', mixedTablePieConfig.combination.join(' + '));
console.log('  - Time Mode:', mixedTablePieConfig.timeMode);
console.log('  - Data Behavior:', mixedTablePieConfig.dataBehavior);
console.log('  - Datasets:', mixedTablePieConfig.datasets.length);
console.log();

const mixedBarBarConfig: MixedChartConfig = {
  type: ChartType.MIXED,
  isMixed: true,
  timeMode: 'static',
  dataBehavior: 'categorical',
  combination: [ChartType.BAR_CHART, ChartType.BAR_CHART],
  categories: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      label: '2022 Sales',
      data: [150, 180, 160, 200],
      chartType: ChartType.BAR_CHART,
    },
    {
      label: '2023 Sales',
      data: [170, 190, 180, 220],
      chartType: ChartType.BAR_CHART,
    },
  ],
};

console.log('✓ Mixed Bar + Bar:');
console.log('  - Type:', mixedBarBarConfig.type);
console.log('  - Combination:', mixedBarBarConfig.combination.join(' + '));
console.log('  - Time Mode:', mixedBarBarConfig.timeMode);
console.log('  - Data Behavior:', mixedBarBarConfig.dataBehavior);
console.log('  - Datasets:', mixedBarBarConfig.datasets.length);
console.log();

console.log('4. PROCESS DIAGRAMS\n');

const processNaturalData: IELTSChartData = {
  id: 'pd-001',
  title: 'The Life Cycle of a Butterfly',
  config: {
    type: ChartType.PROCESS_DIAGRAM,
    processType: ProcessDiagramType.NATURAL,
    isMixed: false,
    timeMode: 'static',
    dataBehavior: 'categorical',
    categories: [],
    datasets: [],
    steps: [
      { id: 's1', label: 'Egg', order: 1, description: 'Female butterfly lays eggs on leaves' },
      { id: 's2', label: 'Larva (Caterpillar)', order: 2, description: 'Egg hatches into caterpillar' },
      { id: 's3', label: 'Pupa (Chrysalis)', order: 3, description: 'Caterpillar forms chrysalis' },
      { id: 's4', label: 'Adult Butterfly', order: 4, description: 'Butterfly emerges' },
    ],
  },
};

console.log('✓ Process Diagram (Natural):');
console.log('  - Type:', processNaturalData.config.type);
console.log('  - Process Type:', processNaturalData.config.processType);
console.log('  - Time Mode:', processNaturalData.config.timeMode);
console.log('  - Data Behavior:', processNaturalData.config.dataBehavior);
console.log('  - Steps:', processNaturalData.config.steps.length);
console.log();

const processManMadeData: IELTSChartData = {
  id: 'pd-002',
  title: 'Glass Bottle Manufacturing',
  config: {
    type: ChartType.PROCESS_DIAGRAM,
    processType: ProcessDiagramType.MAN_MADE,
    isMixed: false,
    timeMode: 'static',
    dataBehavior: 'categorical',
    categories: [],
    datasets: [],
    steps: [
      { id: 's1', label: 'Raw materials mixing', order: 1 },
      { id: 's2', label: 'Melting', order: 2 },
      { id: 's3', label: 'Molding', order: 3 },
      { id: 's4', label: 'Cooling', order: 4 },
      { id: 's5', label: 'Quality check', order: 5 },
      { id: 's6', label: 'Packaging', order: 6 },
    ],
  },
};

console.log('✓ Process Diagram (Man-Made):');
console.log('  - Type:', processManMadeData.config.type);
console.log('  - Process Type:', processManMadeData.config.processType);
console.log('  - Time Mode:', processManMadeData.config.timeMode);
console.log('  - Data Behavior:', processManMadeData.config.dataBehavior);
console.log('  - Steps:', processManMadeData.config.steps.length);
console.log();

console.log('5. MAPS\n');

const mapComparisonData: IELTSChartData = {
  id: 'mp-001',
  title: 'Comparison of Two City Centers',
  config: {
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
  },
};

console.log('✓ Map (Comparison):');
console.log('  - Type:', mapComparisonData.config.type);
console.log('  - Map Type:', mapComparisonData.config.mapType);
console.log('  - Time Mode:', mapComparisonData.config.timeMode);
console.log('  - Data Behavior:', mapComparisonData.config.dataBehavior);
console.log('  - Locations:', mapComparisonData.config.locations.length);
console.log();

const mapDevelopmentData: IELTSChartData = {
  id: 'mp-002',
  title: 'Town Center Development (1990 vs 2023)',
  config: {
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
        features: ['built-1990', 'unchanged'],
      },
      {
        id: 'l2',
        name: 'Shopping Mall',
        coordinates: { x: 300, y: 200 },
        features: ['built-2020', 'new'],
      },
      {
        id: 'l3',
        name: 'Old Factory',
        coordinates: { x: 300, y: 300 },
        features: ['built-1990', 'demolished-2015'],
      },
    ],
  },
};

console.log('✓ Map (Development):');
console.log('  - Type:', mapDevelopmentData.config.type);
console.log('  - Map Type:', mapDevelopmentData.config.mapType);
console.log('  - Time Mode:', mapDevelopmentData.config.timeMode);
console.log('  - Data Behavior:', mapDevelopmentData.config.dataBehavior);
console.log('  - Locations:', mapDevelopmentData.config.locations.length);
console.log();

console.log('6. TYPE SAFETY SUMMARY\n');
console.log('All valid chart configurations:');
console.log('  ✓ Single: Line, Bar, Pie, Table');
console.log('  ✓ Mixed: Line+Bar, Table+Pie, Table+Bar, Table+Line, Pie+Pie, Bar+Bar');
console.log('  ✓ Process: Natural, Man-Made');
console.log('  ✓ Map: Comparison, Development');
console.log();
console.log('Time Modes:');
console.log('  ✓ Static: Categorical comparison at one point in time');
console.log('  ✓ Dynamic: Time-based with temporal axis');
console.log();
console.log('Data Behaviors:');
console.log('  ✓ Time-Based: Line, Bar, Table (when dynamic)');
console.log('  ✓ Categorical: All charts (when static), Process, Map');
console.log();

console.log('=== Type Examples Complete ===');
