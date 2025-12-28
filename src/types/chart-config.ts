export enum ChartType {
  LINE_GRAPH = 'line_graph',
  BAR_CHART = 'bar_chart',
  PIE_CHART = 'pie_chart',
  TABLE = 'table',
  PROCESS_DIAGRAM = 'process_diagram',
  MAP = 'map',
  MIXED = 'mixed',
}

export type TimeMode = 'static' | 'dynamic';

export type DataBehavior = 'time_based' | 'categorical';

export type TimeBased = {
  timeMode: 'dynamic';
  dataBehavior: 'time_based';
};

export type Categorical = {
  timeMode: 'static';
  dataBehavior: 'categorical';
};

export enum ProcessDiagramType {
  NATURAL = 'natural',
  MAN_MADE = 'man_made',
}

export enum MapType {
  COMPARISON = 'comparison',
  DEVELOPMENT = 'development',
}

export type MixedComponentChartType =
  | ChartType.LINE_GRAPH
  | ChartType.BAR_CHART
  | ChartType.PIE_CHART
  | ChartType.TABLE;

export type ValidMixedCombination =
  | [ChartType.LINE_GRAPH, ChartType.BAR_CHART]
  | [ChartType.BAR_CHART, ChartType.LINE_GRAPH]
  | [ChartType.TABLE, ChartType.PIE_CHART]
  | [ChartType.PIE_CHART, ChartType.TABLE]
  | [ChartType.TABLE, ChartType.BAR_CHART]
  | [ChartType.BAR_CHART, ChartType.TABLE]
  | [ChartType.TABLE, ChartType.LINE_GRAPH]
  | [ChartType.LINE_GRAPH, ChartType.TABLE]
  | [ChartType.PIE_CHART, ChartType.PIE_CHART]
  | [ChartType.BAR_CHART, ChartType.BAR_CHART];

export interface Dataset {
  label: string;
  data: number[];
  chartType?: MixedComponentChartType;
}

type ChartDataCore = {
  categories: string[];
  timeLabels?: string[];
  datasets: Dataset[];
};

export type BaseChartConfig = {
  type: ChartType;
  isMixed: boolean;
} & ChartDataCore &
  (TimeBased | Categorical);

export type SingleChartConfig = BaseChartConfig & {
  type: Exclude<ChartType, ChartType.MIXED | ChartType.PROCESS_DIAGRAM | ChartType.MAP>;
  isMixed: false;
};

type MixedChartConfigBase<C extends ValidMixedCombination> = BaseChartConfig & {
  type: ChartType.MIXED;
  isMixed: true;
  combination: C;
  datasets: Array<Omit<Dataset, 'chartType'> & { chartType: C[number] }>;
};

export type MixedChartConfig = ValidMixedCombination extends infer C
  ? C extends ValidMixedCombination
    ? MixedChartConfigBase<C>
    : never
  : never;

export type ProcessDiagramStep = {
  id: string;
  label: string;
  order: number;
  description?: string;
};

export type ProcessDiagramConfig = {
  type: ChartType.PROCESS_DIAGRAM;
  isMixed: false;
  processType: ProcessDiagramType;
  categories?: string[];
  timeLabels?: string[];
  datasets?: Dataset[];
  steps: ProcessDiagramStep[];
} & Categorical;

export type MapLocation = {
  id: string;
  name: string;
  coordinates?: { x: number; y: number };
  features?: string[];
};

export type MapConfig = {
  type: ChartType.MAP;
  isMixed: false;
  mapType: MapType;
  categories?: string[];
  timeLabels?: string[];
  datasets?: Dataset[];
  locations: MapLocation[];
} & Categorical;

export type ChartConfig = SingleChartConfig | MixedChartConfig | ProcessDiagramConfig | MapConfig;

export interface IELTSChartData {
  id: string;
  title: string;
  description?: string;
  config: ChartConfig;
  metadata?: {
    difficulty?: 'easy' | 'medium' | 'hard';
    estimatedTime?: number;
    tags?: string[];
  };
}

export const VALID_MIXED_COMBINATIONS: ReadonlyArray<ValidMixedCombination> = [
  [ChartType.LINE_GRAPH, ChartType.BAR_CHART],
  [ChartType.BAR_CHART, ChartType.LINE_GRAPH],
  [ChartType.TABLE, ChartType.PIE_CHART],
  [ChartType.PIE_CHART, ChartType.TABLE],
  [ChartType.TABLE, ChartType.BAR_CHART],
  [ChartType.BAR_CHART, ChartType.TABLE],
  [ChartType.TABLE, ChartType.LINE_GRAPH],
  [ChartType.LINE_GRAPH, ChartType.TABLE],
  [ChartType.PIE_CHART, ChartType.PIE_CHART],
  [ChartType.BAR_CHART, ChartType.BAR_CHART],
];

export const TIME_BASED_CHARTS: ReadonlyArray<ChartType> = [
  ChartType.LINE_GRAPH,
  ChartType.BAR_CHART,
  ChartType.TABLE,
];

export const CATEGORICAL_CHARTS: ReadonlyArray<ChartType> = [
  ChartType.PIE_CHART,
  ChartType.BAR_CHART,
  ChartType.TABLE,
  ChartType.PROCESS_DIAGRAM,
  ChartType.MAP,
];

export function isValidMixedCombination(chart1: ChartType, chart2: ChartType): boolean {
  return VALID_MIXED_COMBINATIONS.some(
    ([a, b]) => (a === chart1 && b === chart2) || (a === chart2 && b === chart1)
  );
}

export function getChartDataBehavior(chartType: ChartType, timeMode: TimeMode): DataBehavior {
  if (chartType === ChartType.PROCESS_DIAGRAM || chartType === ChartType.MAP) {
    return 'categorical';
  }

  if (timeMode === 'dynamic') {
    return 'time_based';
  }

  return 'categorical';
}

export function canChartBeTimeBased(chartType: ChartType): boolean {
  return TIME_BASED_CHARTS.includes(chartType);
}

export function canChartBeCategorical(chartType: ChartType): boolean {
  return CATEGORICAL_CHARTS.includes(chartType);
}
