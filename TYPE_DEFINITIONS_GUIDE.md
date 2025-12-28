# IELTS Chart Types - Complete Type Definitions Guide

## Overview
This document provides a comprehensive guide to all TypeScript interfaces, enums, and type definitions for the IELTS Writing Task 1 chart generator.

---

## 1. Chart Types (Enums)

### ChartType Enum
Defines all supported IELTS Task 1 chart types.

```typescript
enum ChartType {
  LINE_GRAPH = 'line_graph',
  BAR_CHART = 'bar_chart',
  PIE_CHART = 'pie_chart',
  TABLE = 'table',
  PROCESS_DIAGRAM = 'process_diagram',
  MAP = 'map',
  MIXED = 'mixed',
}
```

**Usage:**
- `LINE_GRAPH` - Shows trends over time
- `BAR_CHART` - Compares categories or temporal changes
- `PIE_CHART` - Displays proportions/percentages
- `TABLE` - Organizes data in rows and columns
- `PROCESS_DIAGRAM` - Shows sequential processes (natural or man-made)
- `MAP` - Illustrates location comparisons or developments
- `MIXED` - Combination of two compatible chart types

### ProcessDiagramType Enum
Specifies the type of process diagram.

```typescript
enum ProcessDiagramType {
  NATURAL = 'natural',
  MAN_MADE = 'man_made',
}
```

**Examples:**
- `NATURAL` - Life cycles, natural phenomena (e.g., butterfly life cycle, water cycle)
- `MAN_MADE` - Manufacturing processes, industrial workflows (e.g., glass production, recycling)

### MapType Enum
Defines the type of map visualization.

```typescript
enum MapType {
  COMPARISON = 'comparison',
  DEVELOPMENT = 'development',
}
```

**Examples:**
- `COMPARISON` - Side-by-side comparison of two different locations
- `DEVELOPMENT` - Shows changes to one location over time

---

## 2. Data Behaviors

### TimeMode Type
Indicates whether the chart represents static or dynamic data.

```typescript
type TimeMode = 'static' | 'dynamic';
```

- `'static'` - Data at a single point in time (categorical comparison)
- `'dynamic'` - Data across multiple time points (time series)

### DataBehavior Type
Describes the nature of the data being displayed.

```typescript
type DataBehavior = 'time_based' | 'categorical';
```

- `'time_based'` - Data with temporal progression
- `'categorical'` - Data comparing categories without time dimension

### TimeBased & Categorical Types
Strict type definitions that enforce consistency between timeMode and dataBehavior.

```typescript
type TimeBased = {
  timeMode: 'dynamic';
  dataBehavior: 'time_based';
};

type Categorical = {
  timeMode: 'static';
  dataBehavior: 'categorical';
};
```

These ensure that:
- Dynamic charts are always time-based
- Static charts are always categorical
- No inconsistent configurations are possible

---

## 3. Combination Logic

### ValidMixedCombination Type
Defines all valid chart combinations for mixed charts.

```typescript
type ValidMixedCombination =
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
```

**Valid Combinations:**
1. **Line + Bar** (Most common) - Temperature (line) and rainfall (bar)
2. **Table + Pie** - Data table with proportional breakdown
3. **Table + Bar** - Tabular data with bar visualization
4. **Table + Line** - Tabular data with line visualization
5. **Pie + Pie** - Comparison of two pie charts (e.g., two years)
6. **Bar + Bar** - Two sets of bar charts for comparison

**Invalid Combinations:**
- Line + Pie (incompatible data behaviors)
- Process + Any (process diagrams stand alone)
- Map + Any (maps stand alone)

### MixedComponentChartType
Restricts which chart types can be used as components in mixed charts.

```typescript
type MixedComponentChartType =
  | ChartType.LINE_GRAPH
  | ChartType.BAR_CHART
  | ChartType.PIE_CHART
  | ChartType.TABLE;
```

---

## 4. JSON Schema Structure

### IELTSChartData Interface
The main payload interface for the frontend.

```typescript
interface IELTSChartData {
  id: string;
  title: string;
  description?: string;
  config: ChartConfig;
  metadata?: {
    difficulty?: 'easy' | 'medium' | 'hard';
    estimatedTime?: number; // in minutes
    tags?: string[];
  };
}
```

**Fields:**
- `id` - Unique identifier for the chart
- `title` - Chart title (required)
- `description` - Optional description text
- `config` - Chart configuration (see ChartConfig)
- `metadata` - Optional metadata for difficulty, timing, and categorization

### ChartConfig (Union Type)
Discriminated union of all possible chart configurations.

```typescript
type ChartConfig =
  | SingleChartConfig
  | MixedChartConfig
  | ProcessDiagramConfig
  | MapConfig;
```

### BaseChartConfig
Common fields for all standard charts.

```typescript
type BaseChartConfig = {
  type: ChartType;
  isMixed: boolean;
  categories: string[];
  timeLabels?: string[];
  datasets: Dataset[];
} & (TimeBased | Categorical);
```

### SingleChartConfig
Configuration for single (non-mixed) standard charts.

```typescript
type SingleChartConfig = BaseChartConfig & {
  type: Exclude<ChartType, ChartType.MIXED | ChartType.PROCESS_DIAGRAM | ChartType.MAP>;
  isMixed: false;
};
```

**Applies to:** Line Graph, Bar Chart, Pie Chart, Table

### MixedChartConfig
Configuration for mixed chart combinations.

```typescript
type MixedChartConfig = BaseChartConfig & {
  type: ChartType.MIXED;
  isMixed: true;
  combination: ValidMixedCombination;
  datasets: Array<Dataset & { chartType: MixedComponentChartType }>;
};
```

**Key Features:**
- `combination` - Must be a valid combination tuple
- `datasets` - Each dataset must specify its chartType
- `chartType` in datasets must match one of the combination types

### ProcessDiagramConfig
Configuration for process diagrams.

```typescript
type ProcessDiagramConfig = {
  type: ChartType.PROCESS_DIAGRAM;
  isMixed: false;
  processType: ProcessDiagramType;
  categories?: string[];
  timeLabels?: string[];
  datasets?: Dataset[];
  steps: ProcessDiagramStep[];
} & Categorical;

type ProcessDiagramStep = {
  id: string;
  label: string;
  order: number;
  description?: string;
};
```

**Special Fields:**
- `processType` - NATURAL or MAN_MADE
- `steps` - Array of sequential steps (required)
- Always categorical (static timeMode)

### MapConfig
Configuration for maps.

```typescript
type MapConfig = {
  type: ChartType.MAP;
  isMixed: false;
  mapType: MapType;
  categories?: string[];
  timeLabels?: string[];
  datasets?: Dataset[];
  locations: MapLocation[];
} & Categorical;

type MapLocation = {
  id: string;
  name: string;
  coordinates?: { x: number; y: number };
  features?: string[];
};
```

**Special Fields:**
- `mapType` - COMPARISON or DEVELOPMENT
- `locations` - Array of location objects (required)
- Always categorical (static timeMode)

### Dataset Interface
Represents a data series in charts.

```typescript
interface Dataset {
  label: string;
  data: number[];
  chartType?: MixedComponentChartType;
}
```

**Fields:**
- `label` - Name of the dataset (e.g., "Temperature", "Sales")
- `data` - Array of numeric values
- `chartType` - Required for mixed charts, specifies which chart type to use for this dataset

---

## 5. Utility Functions

### isValidMixedCombination
Checks if two chart types can be combined in a mixed chart.

```typescript
function isValidMixedCombination(
  chart1: ChartType,
  chart2: ChartType
): boolean;
```

**Example:**
```typescript
isValidMixedCombination(ChartType.LINE_GRAPH, ChartType.BAR_CHART); // true
isValidMixedCombination(ChartType.LINE_GRAPH, ChartType.PIE_CHART); // false
```

### getChartDataBehavior
Determines the data behavior based on chart type and time mode.

```typescript
function getChartDataBehavior(
  chartType: ChartType,
  timeMode: TimeMode
): DataBehavior;
```

**Example:**
```typescript
getChartDataBehavior(ChartType.LINE_GRAPH, 'dynamic'); // 'time_based'
getChartDataBehavior(ChartType.PIE_CHART, 'static'); // 'categorical'
getChartDataBehavior(ChartType.PROCESS_DIAGRAM, 'static'); // 'categorical'
```

### canChartBeTimeBased
Checks if a chart type supports time-based data.

```typescript
function canChartBeTimeBased(chartType: ChartType): boolean;
```

**Example:**
```typescript
canChartBeTimeBased(ChartType.LINE_GRAPH); // true
canChartBeTimeBased(ChartType.PIE_CHART); // false
```

### canChartBeCategorical
Checks if a chart type supports categorical data.

```typescript
function canChartBeCategorical(chartType: ChartType): boolean;
```

**Example:**
```typescript
canChartBeCategorical(ChartType.BAR_CHART); // true (can be both)
canChartBeCategorical(ChartType.PROCESS_DIAGRAM); // true (only categorical)
```

---

## 6. Constants

### VALID_MIXED_COMBINATIONS
Array of all valid mixed chart combinations.

```typescript
const VALID_MIXED_COMBINATIONS: ReadonlyArray<ValidMixedCombination>;
```

### TIME_BASED_CHARTS
Array of chart types that can display time-based data.

```typescript
const TIME_BASED_CHARTS: ReadonlyArray<ChartType> = [
  ChartType.LINE_GRAPH,
  ChartType.BAR_CHART,
  ChartType.TABLE,
];
```

### CATEGORICAL_CHARTS
Array of chart types that can display categorical data.

```typescript
const CATEGORICAL_CHARTS: ReadonlyArray<ChartType> = [
  ChartType.PIE_CHART,
  ChartType.BAR_CHART,
  ChartType.TABLE,
  ChartType.PROCESS_DIAGRAM,
  ChartType.MAP,
];
```

---

## 7. Type Safety Features

### Compile-Time Safety
✅ Invalid chart combinations are caught at compile time
✅ Missing required fields trigger TypeScript errors
✅ Type inference and auto-completion in IDEs
✅ Refactoring safety with find-all-references

### Runtime Safety
✅ Validation functions for runtime checks (see `src/utils/validation.ts`)
✅ Detailed error messages for debugging
✅ Warning system for potential issues
✅ Data consistency validation

---

## 8. Usage Examples

### Example 1: Simple Line Graph (Time-Based)
```typescript
const lineChart: IELTSChartData = {
  id: 'lg-001',
  title: 'Population Growth',
  config: {
    type: ChartType.LINE_GRAPH,
    isMixed: false,
    timeMode: 'dynamic',
    dataBehavior: 'time_based',
    categories: ['City A', 'City B'],
    timeLabels: ['2020', '2021', '2022'],
    datasets: [
      { label: 'City A', data: [100, 120, 150] },
      { label: 'City B', data: [80, 95, 110] },
    ],
  },
};
```

### Example 2: Pie Chart (Categorical)
```typescript
const pieChart: IELTSChartData = {
  id: 'pc-001',
  title: 'Market Share',
  config: {
    type: ChartType.PIE_CHART,
    isMixed: false,
    timeMode: 'static',
    dataBehavior: 'categorical',
    categories: ['Company A', 'Company B', 'Company C'],
    datasets: [
      { label: 'Market Share (%)', data: [45, 35, 20] },
    ],
  },
};
```

### Example 3: Mixed Chart (Line + Bar)
```typescript
const mixedChart: IELTSChartData = {
  id: 'mx-001',
  title: 'Temperature and Rainfall',
  config: {
    type: ChartType.MIXED,
    isMixed: true,
    timeMode: 'dynamic',
    dataBehavior: 'time_based',
    combination: [ChartType.LINE_GRAPH, ChartType.BAR_CHART],
    categories: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'Temperature (°C)',
        data: [20, 22, 25, 28],
        chartType: ChartType.LINE_GRAPH,
      },
      {
        label: 'Rainfall (mm)',
        data: [50, 40, 30, 20],
        chartType: ChartType.BAR_CHART,
      },
    ],
  },
};
```

### Example 4: Process Diagram
```typescript
const processChart: IELTSChartData = {
  id: 'pd-001',
  title: 'Coffee Production Process',
  config: {
    type: ChartType.PROCESS_DIAGRAM,
    processType: ProcessDiagramType.MAN_MADE,
    isMixed: false,
    timeMode: 'static',
    dataBehavior: 'categorical',
    categories: [],
    datasets: [],
    steps: [
      { id: 's1', label: 'Harvesting', order: 1 },
      { id: 's2', label: 'Processing', order: 2 },
      { id: 's3', label: 'Roasting', order: 3 },
      { id: 's4', label: 'Packaging', order: 4 },
    ],
  },
};
```

### Example 5: Map
```typescript
const mapChart: IELTSChartData = {
  id: 'mp-001',
  title: 'City Center Comparison',
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
        id: 'l1',
        name: 'Train Station',
        coordinates: { x: 100, y: 200 },
        features: ['transport', 'central'],
      },
      {
        id: 'l2',
        name: 'Park',
        coordinates: { x: 300, y: 200 },
        features: ['recreation'],
      },
    ],
  },
};
```

---

## 9. Design Decisions

### Why Enums Instead of String Literals?
- Better refactoring support (rename across entire codebase)
- IDE auto-completion and IntelliSense
- Type-safe without string typos

### Why Discriminated Unions?
- Enable TypeScript's type narrowing
- Prevent invalid configurations at compile time
- Self-documenting code structure

### Why Separate TimeBased and Categorical Types?
- Enforce consistency between timeMode and dataBehavior
- Impossible to create inconsistent configurations
- Clear semantic meaning

### Why Tuple Types for ValidMixedCombination?
- Ensures exactly two chart types in combination
- Compile-time validation of valid combinations
- Type-safe and self-documenting

---

## 10. Validation

All types can be validated at runtime using the validation utilities in `src/utils/validation.ts`:

```typescript
import { validateAll } from './utils/validation';

const result = validateAll(chartData);
if (!result.isValid) {
  console.error('Validation errors:', result.errors);
}
if (result.warnings.length > 0) {
  console.warn('Validation warnings:', result.warnings);
}
```

See the validation documentation for more details.

---

## Summary

This type system provides:
- ✅ Complete coverage of all IELTS Task 1 chart types
- ✅ Strict type safety with compile-time validation
- ✅ Clear distinction between time-based and categorical data
- ✅ Enforced valid combinations for mixed charts
- ✅ Specialized configs for process diagrams and maps
- ✅ Runtime validation utilities
- ✅ Comprehensive examples and documentation

The types are production-ready and follow TypeScript best practices.
