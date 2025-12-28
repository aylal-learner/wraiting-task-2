# Quick Start Guide

## Installation

```bash
npm install
npm run build
```

## Basic Usage

### Import Types

```typescript
import {
  ChartType,
  IELTSChartData,
  TimeMode,
  DataBehavior,
  validateAll,
} from './src/types';
```

### Create a Simple Chart

```typescript
const myChart: IELTSChartData = {
  id: 'chart-001',
  title: 'My First IELTS Chart',
  config: {
    type: ChartType.BAR_CHART,
    isMixed: false,
    timeMode: 'static',
    dataBehavior: 'categorical',
    categories: ['Category 1', 'Category 2', 'Category 3'],
    datasets: [
      {
        label: 'Data Series',
        data: [100, 150, 200],
      },
    ],
  },
};
```

### Validate Chart Data

```typescript
import { validateAll } from './src/utils/validation';

const result = validateAll(myChart);

if (result.isValid) {
  console.log('✓ Chart is valid!');
} else {
  console.error('✗ Validation errors:', result.errors);
}
```

## Chart Type Examples

### 1. Line Graph (Time-Based)

```typescript
{
  type: ChartType.LINE_GRAPH,
  isMixed: false,
  timeMode: 'dynamic',
  dataBehavior: 'time_based',
  categories: ['Tokyo', 'London'],
  timeLabels: ['2020', '2021', '2022'],
  datasets: [
    { label: 'Tokyo', data: [100, 120, 150] },
    { label: 'London', data: [80, 90, 100] },
  ],
}
```

### 2. Pie Chart (Categorical)

```typescript
{
  type: ChartType.PIE_CHART,
  isMixed: false,
  timeMode: 'static',
  dataBehavior: 'categorical',
  categories: ['A', 'B', 'C'],
  datasets: [
    { label: 'Distribution', data: [30, 45, 25] },
  ],
}
```

### 3. Mixed Chart (Line + Bar)

```typescript
{
  type: ChartType.MIXED,
  isMixed: true,
  timeMode: 'dynamic',
  dataBehavior: 'time_based',
  combination: [ChartType.LINE_GRAPH, ChartType.BAR_CHART],
  categories: ['Jan', 'Feb', 'Mar'],
  datasets: [
    {
      label: 'Temperature',
      data: [20, 22, 25],
      chartType: ChartType.LINE_GRAPH,
    },
    {
      label: 'Rainfall',
      data: [100, 120, 80],
      chartType: ChartType.BAR_CHART,
    },
  ],
}
```

### 4. Process Diagram

```typescript
{
  type: ChartType.PROCESS_DIAGRAM,
  processType: ProcessDiagramType.NATURAL,
  isMixed: false,
  timeMode: 'static',
  dataBehavior: 'categorical',
  categories: [],
  datasets: [],
  steps: [
    { id: 's1', label: 'Step 1', order: 1 },
    { id: 's2', label: 'Step 2', order: 2 },
    { id: 's3', label: 'Step 3', order: 3 },
  ],
}
```

### 5. Map

```typescript
{
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
      name: 'Location 1',
      coordinates: { x: 100, y: 200 },
      features: ['feature-1', 'feature-2'],
    },
  ],
}
```

## Utility Functions

### Check Mixed Combinations

```typescript
import { isValidMixedCombination, ChartType } from './src/types';

// Valid combination
isValidMixedCombination(ChartType.LINE_GRAPH, ChartType.BAR_CHART); // true

// Invalid combination
isValidMixedCombination(ChartType.PIE_CHART, ChartType.PROCESS_DIAGRAM); // false
```

### Get Chart Data Behavior

```typescript
import { getChartDataBehavior, ChartType } from './src/types';

const behavior = getChartDataBehavior(ChartType.LINE_GRAPH, 'dynamic');
// Returns: 'time_based'
```

### Check Chart Capabilities

```typescript
import { canChartBeTimeBased, canChartBeCategorical, ChartType } from './src/types';

canChartBeTimeBased(ChartType.LINE_GRAPH); // true
canChartBeTimeBased(ChartType.PIE_CHART); // false

canChartBeCategorical(ChartType.PIE_CHART); // true
canChartBeCategorical(ChartType.BAR_CHART); // true
```

## Testing

Run the type safety demonstration:

```bash
npm run build
node dist/examples/type-safety-demo.js
```

## Common Patterns

### Dynamic vs Static Charts

- **Dynamic (time_based)**: Charts showing changes over time
  - Use `timeMode: 'dynamic'`
  - Provide `timeLabels` array
  - Common for line graphs and bar charts

- **Static (categorical)**: Charts showing comparison at one point
  - Use `timeMode: 'static'`
  - Use `categories` array
  - Common for pie charts

### Valid Mixed Combinations

| Chart 1     | Chart 2     | Valid |
|------------|------------|-------|
| Line       | Bar        | ✓     |
| Table      | Pie        | ✓     |
| Table      | Bar        | ✓     |
| Table      | Line       | ✓     |
| Pie        | Pie        | ✓     |
| Bar        | Bar        | ✓     |
| Line       | Pie        | ✗     |
| Process    | Any        | ✗     |
| Map        | Any        | ✗     |

## TypeScript Benefits

1. **Compile-time safety**: Catch errors before runtime
2. **IntelliSense support**: Auto-completion in IDEs
3. **Type narrowing**: Smart type inference
4. **Refactoring confidence**: Rename with confidence
5. **Documentation**: Types serve as inline documentation

## Next Steps

- Check out `src/examples/chart-examples.ts` for complete examples
- Read the full `README.md` for detailed documentation
- Build your chart generator logic using these types
