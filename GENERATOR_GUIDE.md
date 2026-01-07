# IELTS Chart Data Generator - User Guide

## Overview
The Chart Data Generator is a utility that creates random but realistic mock data for IELTS Writing Task 1 charts. All generated data follows IELTS conventions and passes strict type validation.

---

## Installation & Usage

```typescript
import { generateChartData, GenerationConfig, ChartType } from './src';

const config: GenerationConfig = {
  chartType: ChartType.LINE_GRAPH,
  timeMode: 'dynamic',
};

const chartData = generateChartData(config);
```

---

## API Reference

### `generateChartData(config: GenerationConfig): IELTSChartData`

Generates a complete chart data object based on the provided configuration.

**Parameters:**
- `config: GenerationConfig` - Configuration object specifying what kind of chart to generate

**Returns:**
- `IELTSChartData` - Complete chart data structure ready for rendering

**Throws:**
- `Error` - If an unsupported chart type is specified

---

## GenerationConfig Interface

```typescript
interface GenerationConfig {
  chartType: ChartType;              // Required: Type of chart to generate
  timeMode?: 'static' | 'dynamic';   // Optional: Time behavior
  categoryCount?: number;             // Optional: Number of categories (5-7 default)
  timePeriodYears?: number;           // Optional: Years to span (dynamic mode)
  startYear?: number;                 // Optional: Starting year (dynamic mode)
  combination?: ValidMixedCombination; // Optional: For mixed charts
  processType?: ProcessDiagramType;   // Optional: For process diagrams
  mapType?: MapType;                  // Optional: For maps
  difficulty?: 'easy' | 'medium' | 'hard'; // Optional: Chart difficulty
}
```

### Field Descriptions

#### `chartType` (Required)
The type of chart to generate. One of:
- `ChartType.LINE_GRAPH`
- `ChartType.BAR_CHART`
- `ChartType.PIE_CHART`
- `ChartType.TABLE`
- `ChartType.MIXED`
- `ChartType.PROCESS_DIAGRAM`
- `ChartType.MAP`

#### `timeMode` (Optional)
Specifies whether the chart is static or time-based:
- `'static'` - Categorical comparison at one point in time
- `'dynamic'` - Time series data over a period

**Default:** Determined based on chart type

#### `categoryCount` (Optional)
Number of categories/items to generate.

**Default:** 
- Line graphs: 3-5
- Bar charts: 5-7
- Pie charts: 4-6
- Tables: 4-6

**Range:** Typically 3-7 (IELTS standard complexity)

#### `timePeriodYears` (Optional)
Number of years to span for dynamic charts.

**Default:** 10-30 years randomly selected

#### `startYear` (Optional)
Starting year for time-based charts.

**Default:** Random year between 1990-2015

#### `combination` (Optional)
For mixed charts, specifies which two chart types to combine.

**Example:**
```typescript
combination: [ChartType.LINE_GRAPH, ChartType.BAR_CHART]
```

**Valid Combinations:**
- `[LINE_GRAPH, BAR_CHART]`
- `[TABLE, PIE_CHART]`
- `[TABLE, BAR_CHART]`
- `[TABLE, LINE_GRAPH]`
- `[PIE_CHART, PIE_CHART]`
- `[BAR_CHART, BAR_CHART]`

**Default:** Random valid combination if not specified

#### `processType` (Optional)
For process diagrams, specifies the type of process.

**Options:**
- `ProcessDiagramType.NATURAL` - Natural processes (e.g., life cycles)
- `ProcessDiagramType.MAN_MADE` - Man-made processes (e.g., manufacturing)

**Default:** Random selection

#### `mapType` (Optional)
For maps, specifies the type of map visualization.

**Options:**
- `MapType.COMPARISON` - Side-by-side comparison of two locations
- `MapType.DEVELOPMENT` - Changes to one location over time

**Default:** Random selection

#### `difficulty` (Optional)
Sets the metadata difficulty level.

**Options:** `'easy'`, `'medium'`, `'hard'`

**Default:** Random selection

---

## Examples

### 1. Basic Line Graph (Time-Based)

```typescript
const lineGraphData = generateChartData({
  chartType: ChartType.LINE_GRAPH,
  timeMode: 'dynamic',
  categoryCount: 3,
  startYear: 2000,
  timePeriodYears: 20,
});

// Result:
// - 3 lines representing different categories
// - Time labels from 2000 to 2020
// - Smooth trend data (no unrealistic jumps)
// - Categories from predefined IELTS topics
```

### 2. Pie Chart (Always Sums to 100%)

```typescript
const pieChartData = generateChartData({
  chartType: ChartType.PIE_CHART,
  categoryCount: 5,
});

// Result:
// - 5 categories with percentage values
// - Total always equals 100% (±0.01% tolerance)
// - Categories from IELTS topics (e.g., energy sources, transport modes)
```

### 3. Bar Chart (Categorical)

```typescript
const barChartData = generateChartData({
  chartType: ChartType.BAR_CHART,
  timeMode: 'static',
  categoryCount: 6,
});

// Result:
// - 6 age groups or other categories
// - Realistic values (e.g., percentages 20-98)
// - Single dataset comparing categories
```

### 4. Mixed Chart (Line + Bar)

```typescript
const mixedChartData = generateChartData({
  chartType: ChartType.MIXED,
  combination: [ChartType.LINE_GRAPH, ChartType.BAR_CHART],
  timeMode: 'dynamic',
  categoryCount: 12,
});

// Result:
// - Two datasets sharing the same X-axis (12 months)
// - One line dataset (e.g., Temperature)
// - One bar dataset (e.g., Rainfall)
// - Both datasets have 12 data points
```

### 5. Table with Time Series

```typescript
const tableData = generateChartData({
  chartType: ChartType.TABLE,
  timeMode: 'dynamic',
  categoryCount: 4,
  startYear: 2010,
  timePeriodYears: 10,
});

// Result:
// - 4 rows (cities)
// - Columns for time periods (2010-2020)
// - Realistic data with smooth trends
```

### 6. Process Diagram (Natural)

```typescript
const processData = generateChartData({
  chartType: ChartType.PROCESS_DIAGRAM,
  processType: ProcessDiagramType.NATURAL,
});

// Result:
// - Predefined natural process (e.g., butterfly life cycle)
// - 4-6 sequential steps
// - Each step has id, label, order, and description
```

### 7. Map (Development)

```typescript
const mapData = generateChartData({
  chartType: ChartType.MAP,
  mapType: MapType.DEVELOPMENT,
  startYear: 1990,
});

// Result:
// - Multiple locations with coordinates
// - Features showing changes over time
// - Realistic development timeline
```

---

## Data Generation Features

### Randomization Logic

#### Categories
Categories are randomly selected from predefined IELTS topics:
- Countries: USA, UK, China, Japan, Germany, etc.
- Cities: Tokyo, London, New York, Paris, etc.
- Age Groups: 16-24, 25-34, 35-44, etc.
- Energy Sources: Coal, Natural Gas, Nuclear, Renewable, etc.
- Transport Modes: Car, Bus, Train, Bicycle, etc.
- Industries: Technology, Healthcare, Finance, etc.

#### Values

**Pie Charts:**
- Values always sum to exactly 100% (with floating-point adjustment)
- Each slice between 5% and 40%
- Realistic distribution

**Line Graphs:**
- Smooth trends without unrealistic jumps
- Maximum change per step: 15% of range
- Support for increasing, decreasing, or fluctuating trends
- Values stay within realistic bounds

**Bar Charts & Tables:**
- Realistic integer or float values
- Range appropriate for context (e.g., percentages 20-98)

**Mixed Charts:**
- Both datasets share the same X-axis
- Different Y-value ranges for different data types
- Appropriate chart types for each dataset

#### Time Labels
For dynamic charts:
- Generated based on start year and period
- Typically 4-7 time points
- Even intervals (e.g., every 5 years)
- Clear year labels (e.g., "2000", "2005", "2010")

### Constraints

#### Category Count
- **Minimum:** 3 categories
- **Maximum:** 7 categories (IELTS standard)
- **Default:** Varies by chart type (4-6 typical)

#### Time Period
- **Typical Range:** 10-30 years
- **Start Years:** Usually between 1990-2015
- **Time Points:** 4-7 labels to avoid clutter

#### Mixed Charts
- Both datasets share identical X-axis (categories or time labels)
- Only valid combinations are allowed
- Each dataset specifies its chart type
- Data arrays have equal length

### Special Cases

#### Process Diagrams
- Predefined templates for natural and man-made processes
- Natural: Butterfly life cycle, water cycle, plant growth
- Man-made: Glass manufacturing, coffee production, cement production
- Each process has 4-6 sequential steps with descriptions

#### Maps
- **Comparison:** 4 locations (2 per city)
- **Development:** 4-5 locations showing changes
- Each location has coordinates and features
- Features describe temporal information (e.g., "built-1990", "demolished-2015")

---

## Validation

All generated data passes strict validation:

```typescript
import { validateAll } from './src';

const chartData = generateChartData({ chartType: ChartType.PIE_CHART });
const result = validateAll(chartData);

if (result.isValid) {
  console.log('✓ Data is valid');
} else {
  console.error('✗ Validation errors:', result.errors);
}
```

**Guaranteed Validations:**
- ✅ Correct TypeScript types
- ✅ Required fields present
- ✅ Pie charts sum to 100%
- ✅ Data arrays match category/time label count
- ✅ Mixed charts have valid combinations
- ✅ Mixed chart datasets specify chartType
- ✅ Process diagrams have unique step orders
- ✅ Maps have required locations

---

## Testing

### Unit Tests

The generator includes comprehensive unit tests:

```bash
npm test
```

**Test Coverage:**
- ✓ Valid data structure generation
- ✓ Pie chart 100% sum validation (20 iterations)
- ✓ Mixed chart axis consistency
- ✓ Dynamic charts include time labels
- ✓ Process diagrams include steps
- ✓ Maps include locations

### Manual Testing

Run the demo script to see all chart types:

```bash
npm run build
node dist/examples/generator-demo.js
```

---

## Best Practices

### 1. Let the Generator Choose Defaults
For quick prototyping, only specify `chartType`:
```typescript
const data = generateChartData({ chartType: ChartType.PIE_CHART });
```

### 2. Specify Constraints for Control
For specific requirements, provide detailed config:
```typescript
const data = generateChartData({
  chartType: ChartType.LINE_GRAPH,
  timeMode: 'dynamic',
  categoryCount: 3,
  startYear: 2000,
  timePeriodYears: 20,
  difficulty: 'medium',
});
```

### 3. Validate Generated Data
Always validate in production:
```typescript
const data = generateChartData(config);
const validation = validateAll(data);

if (!validation.isValid) {
  throw new Error(`Invalid data: ${validation.errors.join(', ')}`);
}
```

### 4. Use Type Guards
Leverage TypeScript's discriminated unions:
```typescript
const data = generateChartData({ chartType: ChartType.MIXED });

if (data.config.type === ChartType.MIXED) {
  console.log('Combination:', data.config.combination);
  // TypeScript knows config is MixedChartConfig
}
```

---

## Limitations

### Current Limitations

1. **Process Diagrams**
   - Limited to predefined templates
   - Cannot generate custom processes
   - 2 natural processes, 2 man-made processes available

2. **Maps**
   - Placeholder coordinates (not real geographic data)
   - Limited location variety
   - No actual map rendering support

3. **Data Realism**
   - Values are statistically random
   - Not based on real-world data sources
   - Trends are algorithmically generated

### Future Enhancements

Potential improvements:
- [ ] More process diagram templates
- [ ] Real geographic coordinates for maps
- [ ] Data themes (economics, environment, demographics)
- [ ] Correlation between datasets in mixed charts
- [ ] Seasonal patterns for time series
- [ ] Custom category lists
- [ ] Seed-based generation for reproducibility

---

## Troubleshooting

### Pie Chart Not Summing to 100%

The generator ensures pie charts sum to 100% with a tolerance of ±0.01%. If you see discrepancies:

```typescript
const data = generateChartData({ chartType: ChartType.PIE_CHART });
const sum = data.config.datasets[0].data.reduce((s, v) => s + v, 0);

console.log('Sum:', sum);
console.log('Valid:', Math.abs(sum - 100) < 0.01);
```

This should always return `true`. If not, please report a bug.

### Mixed Chart Axis Mismatch

Mixed charts should always have matching data array lengths:

```typescript
const data = generateChartData({
  chartType: ChartType.MIXED,
  combination: [ChartType.LINE_GRAPH, ChartType.BAR_CHART],
});

const lengths = data.config.datasets.map(ds => ds.data.length);
console.log('All equal:', lengths.every(l => l === lengths[0]));
```

This should return `true`.

### Invalid Combination Error

If you specify an invalid combination:

```typescript
// This will work (valid combination chosen randomly)
const data1 = generateChartData({ chartType: ChartType.MIXED });

// This will also work (valid combination specified)
const data2 = generateChartData({
  chartType: ChartType.MIXED,
  combination: [ChartType.LINE_GRAPH, ChartType.BAR_CHART],
});

// This may cause validation errors if combination is invalid
// Always use ValidMixedCombination type
```

---

## Performance

### Benchmark

Typical generation times on modern hardware:
- Single chart: < 1ms
- Batch of 100 charts: < 50ms
- Validation included: < 2ms per chart

### Optimization Tips

For bulk generation:
```typescript
const charts = [];
for (let i = 0; i < 100; i++) {
  charts.push(generateChartData({
    chartType: ChartType.PIE_CHART,
  }));
}
```

For seeding randomness (future feature):
```typescript
// Currently not supported, but planned
// const data = generateChartData(config, { seed: 12345 });
```

---

## Contributing

To add new chart generation logic:

1. Add helper function in `src/utils/generator.ts`
2. Update `generateChartData` switch statement
3. Add unit tests in `src/utils/generator.test.ts`
4. Update this documentation

---

## Summary

The IELTS Chart Data Generator provides:
- ✅ Complete random data generation for all IELTS chart types
- ✅ Realistic values following IELTS conventions
- ✅ Guaranteed validation compliance
- ✅ Smooth trends without unrealistic jumps
- ✅ Pie charts always sum to 100%
- ✅ Mixed charts share consistent axes
- ✅ Type-safe configuration
- ✅ Comprehensive examples and documentation

Use it for:
- Testing chart rendering components
- Generating practice materials
- Prototyping IELTS applications
- Automated testing with random data
- Educational demonstrations
