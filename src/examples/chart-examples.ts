import {
  ChartType,
  IELTSChartData,
  ProcessDiagramType,
  MapType,
} from '../types';

export const lineGraphExample: IELTSChartData = {
  id: 'lg-001',
  title: 'Population Growth in Major Cities (1990-2020)',
  description: 'The line graph shows the population growth in three major cities over a 30-year period.',
  config: {
    type: ChartType.LINE_GRAPH,
    isMixed: false,
    timeMode: 'dynamic',
    dataBehavior: 'time_based',
    categories: ['Tokyo', 'London', 'New York'],
    timeLabels: ['1990', '2000', '2010', '2020'],
    datasets: [
      {
        label: 'Tokyo',
        data: [8.2, 8.9, 9.3, 9.7],
      },
      {
        label: 'London',
        data: [6.8, 7.2, 7.8, 8.9],
      },
      {
        label: 'New York',
        data: [7.3, 8.0, 8.2, 8.3],
      },
    ],
  },
  metadata: {
    difficulty: 'medium',
    estimatedTime: 20,
    tags: ['population', 'urban', 'time-series'],
  },
};

export const barChartExample: IELTSChartData = {
  id: 'bc-001',
  title: 'Internet Usage by Age Group in 2023',
  description: 'The bar chart compares internet usage across different age groups.',
  config: {
    type: ChartType.BAR_CHART,
    isMixed: false,
    timeMode: 'static',
    dataBehavior: 'categorical',
    categories: ['16-24', '25-34', '35-44', '45-54', '55-64', '65+'],
    datasets: [
      {
        label: 'Daily Internet Users (%)',
        data: [98, 95, 88, 78, 65, 45],
      },
    ],
  },
  metadata: {
    difficulty: 'easy',
    estimatedTime: 20,
    tags: ['internet', 'demographics', 'comparison'],
  },
};

export const pieChartExample: IELTSChartData = {
  id: 'pc-001',
  title: 'Global Energy Consumption by Source in 2023',
  description: 'The pie chart illustrates the proportion of different energy sources in global consumption.',
  config: {
    type: ChartType.PIE_CHART,
    isMixed: false,
    timeMode: 'static',
    dataBehavior: 'categorical',
    categories: ['Coal', 'Natural Gas', 'Nuclear', 'Renewable', 'Oil'],
    datasets: [
      {
        label: 'Energy Sources',
        data: [27, 24, 10, 29, 10],
      },
    ],
  },
  metadata: {
    difficulty: 'easy',
    estimatedTime: 20,
    tags: ['energy', 'environment', 'proportions'],
  },
};

export const tableExample: IELTSChartData = {
  id: 'tb-001',
  title: 'Average Monthly Temperatures in Four Cities (2023)',
  description: 'The table shows average monthly temperatures across four cities during different seasons.',
  config: {
    type: ChartType.TABLE,
    isMixed: false,
    timeMode: 'static',
    dataBehavior: 'categorical',
    categories: ['London', 'Tokyo', 'Sydney', 'Dubai'],
    timeLabels: ['Spring', 'Summer', 'Autumn', 'Winter'],
    datasets: [
      {
        label: 'London',
        data: [12, 18, 14, 5],
      },
      {
        label: 'Tokyo',
        data: [15, 26, 17, 6],
      },
      {
        label: 'Sydney',
        data: [20, 26, 19, 12],
      },
      {
        label: 'Dubai',
        data: [28, 38, 30, 20],
      },
    ],
  },
  metadata: {
    difficulty: 'medium',
    estimatedTime: 20,
    tags: ['temperature', 'climate', 'comparison'],
  },
};

export const mixedLineBarExample: IELTSChartData = {
  id: 'mx-001',
  title: 'Temperature and Rainfall in Sydney (2023)',
  description: 'The graph shows monthly temperature (line) and rainfall (bar) data for Sydney.',
  config: {
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
  },
  metadata: {
    difficulty: 'hard',
    estimatedTime: 20,
    tags: ['climate', 'weather', 'mixed-chart'],
  },
};

export const mixedTablePieExample: IELTSChartData = {
  id: 'mx-002',
  title: 'Student Enrollment by Department',
  description: 'The table shows enrollment numbers and the pie chart shows the proportion.',
  config: {
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
  },
  metadata: {
    difficulty: 'medium',
    estimatedTime: 20,
    tags: ['education', 'enrollment', 'mixed-chart'],
  },
};

export const processDiagramNaturalExample: IELTSChartData = {
  id: 'pd-001',
  title: 'The Life Cycle of a Butterfly',
  description: 'The diagram illustrates the natural life cycle of a butterfly from egg to adult.',
  config: {
    type: ChartType.PROCESS_DIAGRAM,
    processType: ProcessDiagramType.NATURAL,
    isMixed: false,
    timeMode: 'static',
    dataBehavior: 'categorical',
    categories: [],
    datasets: [],
    steps: [
      {
        id: 's1',
        label: 'Egg',
        order: 1,
        description: 'Female butterfly lays eggs on leaves',
      },
      {
        id: 's2',
        label: 'Larva (Caterpillar)',
        order: 2,
        description: 'Egg hatches into caterpillar, which feeds on leaves',
      },
      {
        id: 's3',
        label: 'Pupa (Chrysalis)',
        order: 3,
        description: 'Caterpillar forms protective chrysalis',
      },
      {
        id: 's4',
        label: 'Adult Butterfly',
        order: 4,
        description: 'Butterfly emerges from chrysalis',
      },
    ],
  },
  metadata: {
    difficulty: 'medium',
    estimatedTime: 20,
    tags: ['biology', 'lifecycle', 'natural-process'],
  },
};

export const processDiagramManMadeExample: IELTSChartData = {
  id: 'pd-002',
  title: 'The Process of Manufacturing Glass Bottles',
  description: 'The diagram shows the man-made process of producing glass bottles in a factory.',
  config: {
    type: ChartType.PROCESS_DIAGRAM,
    processType: ProcessDiagramType.MAN_MADE,
    isMixed: false,
    timeMode: 'static',
    dataBehavior: 'categorical',
    categories: [],
    datasets: [],
    steps: [
      {
        id: 's1',
        label: 'Raw materials mixing',
        order: 1,
        description: 'Sand, soda ash, and limestone are mixed',
      },
      {
        id: 's2',
        label: 'Melting',
        order: 2,
        description: 'Mixture is heated to 1500°C in furnace',
      },
      {
        id: 's3',
        label: 'Molding',
        order: 3,
        description: 'Molten glass is shaped into bottles',
      },
      {
        id: 's4',
        label: 'Cooling',
        order: 4,
        description: 'Bottles are gradually cooled',
      },
      {
        id: 's5',
        label: 'Quality check',
        order: 5,
        description: 'Bottles are inspected for defects',
      },
      {
        id: 's6',
        label: 'Packaging',
        order: 6,
        description: 'Bottles are packaged for distribution',
      },
    ],
  },
  metadata: {
    difficulty: 'hard',
    estimatedTime: 20,
    tags: ['manufacturing', 'industry', 'man-made-process'],
  },
};

export const mapComparisonExample: IELTSChartData = {
  id: 'mp-001',
  title: 'Comparison of Two City Centers',
  description: 'The maps show the layout of two different city centers.',
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
  metadata: {
    difficulty: 'medium',
    estimatedTime: 20,
    tags: ['urban-planning', 'comparison', 'maps'],
  },
};

export const mapDevelopmentExample: IELTSChartData = {
  id: 'mp-002',
  title: 'Town Center Development (1990 vs 2023)',
  description: 'The maps illustrate how the town center has changed over 33 years.',
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
        name: 'Park',
        coordinates: { x: 200, y: 200 },
        features: ['built-1990', 'reduced-size'],
      },
      {
        id: 'l3',
        name: 'Shopping Mall',
        coordinates: { x: 300, y: 200 },
        features: ['built-2020', 'new'],
      },
      {
        id: 'l4',
        name: 'Parking Lot',
        coordinates: { x: 400, y: 200 },
        features: ['built-2020', 'new'],
      },
      {
        id: 'l5',
        name: 'Old Factory',
        coordinates: { x: 300, y: 300 },
        features: ['built-1990', 'demolished-2015'],
      },
    ],
  },
  metadata: {
    difficulty: 'hard',
    estimatedTime: 20,
    tags: ['urban-development', 'change-over-time', 'maps'],
  },
};

export const allExamples: IELTSChartData[] = [
  lineGraphExample,
  barChartExample,
  pieChartExample,
  tableExample,
  mixedLineBarExample,
  mixedTablePieExample,
  processDiagramNaturalExample,
  processDiagramManMadeExample,
  mapComparisonExample,
  mapDevelopmentExample,
];
