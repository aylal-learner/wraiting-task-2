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

export enum ProcessDiagramType {
  NATURAL = 'natural',
  MAN_MADE = 'man_made',
}

export enum MapType {
  COMPARISON = 'comparison',
  DEVELOPMENT = 'development',
}

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
  chartType?: ChartType;
}

export interface BaseChartConfig {
  type: ChartType;
  isMixed: boolean;
  timeMode: TimeMode;
  dataBehavior: DataBehavior;
  categories: string[];
  timeLabels?: string[];
  datasets: Dataset[];
}

export interface SingleChartConfig extends BaseChartConfig {
  type: Exclude<ChartType, ChartType.MIXED>;
  isMixed: false;
}

export interface MixedChartConfig extends BaseChartConfig {
  type: ChartType.MIXED;
  isMixed: true;
  combination: ValidMixedCombination;
  datasets: Array<Dataset & { chartType: ChartType }>;
}

export interface ProcessDiagramConfig extends Omit<SingleChartConfig, 'type' | 'timeMode' | 'dataBehavior'> {
  type: ChartType.PROCESS_DIAGRAM;
  processType: ProcessDiagramType;
  timeMode: 'static';
  dataBehavior: 'categorical';
  steps: Array<{
    id: string;
    label: string;
    order: number;
    description?: string;
  }>;
}

export interface MapConfig extends Omit<SingleChartConfig, 'type' | 'dataBehavior'> {
  type: ChartType.MAP;
  mapType: MapType;
  dataBehavior: 'categorical';
  locations: Array<{
    id: string;
    name: string;
    coordinates?: { x: number; y: number };
    features?: string[];
  }>;
}

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

export function isValidMixedCombination(
  chart1: ChartType,
  chart2: ChartType
): boolean {
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
