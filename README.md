# IELTS Writing Task 1 Chart Generator - Type Definitions

This repository contains the TypeScript type definitions and configuration for an IELTS Writing Task 1 generator system.

## Overview

The system generates random but logical chart data based on specific IELTS requirements. All chart types, data behaviors, and valid combinations are strictly typed.

## Chart Types

The system supports all standard IELTS Task 1 chart types:

- **Line Graph** (`line_graph`) - Shows trends over time
- **Bar Chart** (`bar_chart`) - Compares categories or shows changes over time
- **Pie Chart** (`pie_chart`) - Shows proportions/percentages
- **Table** (`table`) - Displays data in rows and columns
- **Process Diagram** (`process_diagram`) - Shows natural or man-made processes
- **Map** (`map`) - Shows location comparisons or developments over time
- **Mixed** (`mixed`) - Combination of two chart types

## Data Behaviors

Charts are classified into two data behavior types:

### Time-Based (Dynamic)
Charts with a time axis showing changes over a period:
- Line graphs with time series
- Bar charts showing temporal changes
- Tables with time-based data

**Type Definition:**
```typescript
type TimeBased = {
  timeMode: 'dynamic';
  dataBehavior: 'time_based';
};
```

### Categorical (Static)
Charts showing comparisons at a single point in time:
- Pie charts
- Bar charts comparing categories
- Tables with categorical data
- Process diagrams
- Maps

**Type Definition:**
```typescript
type Categorical = {
  timeMode: 'static';
  dataBehavior: 'categorical';
};
```

These strict types ensure that timeMode and dataBehavior are always consistent, preventing invalid configurations at compile time.

## Valid Mixed Combinations

The system enforces valid chart combinations for mixed charts:

- **Line + Bar** (Most common in IELTS)
- **Table + Pie**
- **Table + Bar**
- **Table + Line**
- **Pie + Pie** (Comparison of two pie charts)
- **Bar + Bar** (Two sets of bar charts)

Invalid combinations will be caught at compile time through TypeScript's type system.

## Type Definitions

### Core Types

```typescript
import { ChartType, IELTSChartData, ChartConfig } from './src/types';

// Chart type enum
enum ChartType {
  LINE_GRAPH = 'line_graph',
  BAR_CHART = 'bar_chart',
  PIE_CHART = 'pie_chart',
  TABLE = 'table',
  PROCESS_DIAGRAM = 'process_diagram',
  MAP = 'map',
  MIXED = 'mixed',
}

// Time mode
type TimeMode = 'static' | 'dynamic';

// Data behavior
type DataBehavior = 'time_based' | 'categorical';
```

### Main Interfaces

#### IELTSChartData
The main payload interface for the frontend:

```typescript
interface IELTSChartData {
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
```

#### ChartConfig (Union Type)
Can be one of:
- `SingleChartConfig` - For single chart types
- `MixedChartConfig` - For valid combinations
- `ProcessDiagramConfig` - For process diagrams with steps
- `MapConfig` - For maps with locations

### Example Usage

#### Single Line Graph (Time-Based)

```typescript
const lineGraphData: IELTSChartData = {
  id: 'lg-001',
  title: 'Population Growth in Major Cities (1990-2020)',
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
```

#### Pie Chart (Categorical)

```typescript
const pieChartData: IELTSChartData = {
  id: 'pc-001',
  title: 'Energy Consumption by Source in 2020',
  config: {
    type: ChartType.PIE_CHART,
    isMixed: false,
    timeMode: 'static',
    dataBehavior: 'categorical',
    categories: ['Coal', 'Natural Gas', 'Nuclear', 'Renewable'],
    datasets: [
      {
        label: 'Energy Sources',
        data: [35, 28, 20, 17],
      },
    ],
  },
};
```

#### Mixed Chart (Line + Bar)

```typescript
const mixedChartData: IELTSChartData = {
  id: 'mx-001',
  title: 'Temperature and Rainfall in Sydney (2020)',
  config: {
    type: ChartType.MIXED,
    isMixed: true,
    timeMode: 'dynamic',
    dataBehavior: 'time_based',
    combination: [ChartType.LINE_GRAPH, ChartType.BAR_CHART],
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Temperature (°C)',
        data: [26, 26, 24, 21, 18, 16],
        chartType: ChartType.LINE_GRAPH,
      },
      {
        label: 'Rainfall (mm)',
        data: [100, 120, 130, 110, 100, 130],
        chartType: ChartType.BAR_CHART,
      },
    ],
  },
};
```

#### Process Diagram

```typescript
const processData: IELTSChartData = {
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
      { id: 's1', label: 'Egg', order: 1 },
      { id: 's2', label: 'Larva (Caterpillar)', order: 2 },
      { id: 's3', label: 'Pupa (Chrysalis)', order: 3 },
      { id: 's4', label: 'Adult Butterfly', order: 4 },
    ],
  },
};
```

#### Map

```typescript
const mapData: IELTSChartData = {
  id: 'mp-001',
  title: 'City Center Development (1990 vs 2020)',
  config: {
    type: ChartType.MAP,
    mapType: MapType.DEVELOPMENT,
    isMixed: false,
    timeMode: 'dynamic',
    dataBehavior: 'categorical',
    categories: [],
    datasets: [],
    locations: [
      {
        id: 'l1',
        name: 'Train Station',
        coordinates: { x: 100, y: 200 },
        features: ['built-1990'],
      },
      {
        id: 'l2',
        name: 'Shopping Mall',
        coordinates: { x: 300, y: 200 },
        features: ['built-2020'],
      },
    ],
  },
};
```

## Utility Functions

### Type Utilities

- `isValidMixedCombination(chart1, chart2)` - Check if two chart types can be mixed
- `getChartDataBehavior(chartType, timeMode)` - Get the data behavior for a chart
- `canChartBeTimeBased(chartType)` - Check if a chart type supports time-based data
- `canChartBeCategorical(chartType)` - Check if a chart type supports categorical data

### Data Generator

The module includes a powerful random data generator:

```typescript
import { generateChartData, GenerationConfig, ChartType } from './src';

const chartData = generateChartData({
  chartType: ChartType.PIE_CHART,
  categoryCount: 5,
});

// Generated data includes:
// - Random but realistic IELTS topics
// - Proper data formatting
// - Validation-compliant structure
// - Pie charts always sum to 100%
```

**Features:**
- ✅ Generates all chart types (Line, Bar, Pie, Table, Mixed, Process, Map)
- ✅ Realistic IELTS topics and values
- ✅ Smooth trends for time-based data
- ✅ Pie charts guaranteed to sum to 100%
- ✅ Mixed charts share consistent axes
- ✅ Configurable categories, time periods, and difficulty

See `GENERATOR_GUIDE.md` for complete documentation.

## Type Safety

The type system enforces:
- ✅ Only valid chart type combinations
- ✅ Required fields for each chart type
- ✅ Proper data structure for datasets
- ✅ Valid mixed chart combinations
- ❌ Invalid chart combinations (compile-time error)
- ❌ Missing required fields (compile-time error)

## Project Structure

```
.
├── src/
│   └── types/
│       ├── index.ts           # Main export file
│       └── chart-config.ts    # All type definitions
└── README.md                  # This file
```

## Next Steps

To use these types in your project:

1. Install TypeScript (if not already installed):
   ```bash
   npm install -D typescript
   ```

2. Import the types:
   ```typescript
   import { ChartType, IELTSChartData } from './src/types';
   ```

3. Use the types in your generator logic and frontend components

## License

MIT
