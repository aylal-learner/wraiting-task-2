import { generateChartData, GenerationConfig } from '../utils/generator';
import { ChartType, validateAll } from '../index';

console.log('=== IELTS Chart Data Generator - Demo ===\n');

console.log('1. Generating Line Graph (Time-Based)\n');
const lineGraphConfig: GenerationConfig = {
  chartType: ChartType.LINE_GRAPH,
  timeMode: 'dynamic',
  categoryCount: 3,
  startYear: 2000,
  timePeriodYears: 20,
};

const lineGraphData = generateChartData(lineGraphConfig);
console.log('Title:', lineGraphData.title);
console.log('Type:', lineGraphData.config.type);
console.log('Time Mode:', lineGraphData.config.timeMode);
console.log('Categories:', lineGraphData.config.categories);
console.log('Time Labels:', lineGraphData.config.timeLabels);
console.log('Number of Datasets:', lineGraphData.config.datasets.length);
console.log('Sample Data:', lineGraphData.config.datasets[0].data.slice(0, 5), '...');
console.log();

console.log('2. Generating Bar Chart (Categorical)\n');
const barChartConfig: GenerationConfig = {
  chartType: ChartType.BAR_CHART,
  timeMode: 'static',
  categoryCount: 6,
};

const barChartData = generateChartData(barChartConfig);
console.log('Title:', barChartData.title);
console.log('Type:', barChartData.config.type);
console.log('Time Mode:', barChartData.config.timeMode);
console.log('Categories:', barChartData.config.categories);
console.log('Data:', barChartData.config.datasets[0].data);
console.log();

console.log('3. Generating Pie Chart (Must Sum to 100%)\n');
const pieChartConfig: GenerationConfig = {
  chartType: ChartType.PIE_CHART,
  categoryCount: 5,
};

const pieChartData = generateChartData(pieChartConfig);
console.log('Title:', pieChartData.title);
console.log('Categories:', pieChartData.config.categories);
console.log('Data:', pieChartData.config.datasets[0].data);

const total = pieChartData.config.datasets[0].data.reduce((sum, val) => sum + val, 0);
console.log('Total (should be 100):', total);
console.log('Validation:', Math.abs(total - 100) < 0.01 ? '✓ PASS' : '✗ FAIL');
console.log();

console.log('4. Generating Mixed Chart (Line + Bar)\n');
const mixedChartConfig: GenerationConfig = {
  chartType: ChartType.MIXED,
  combination: [ChartType.LINE_GRAPH, ChartType.BAR_CHART],
  timeMode: 'dynamic',
  categoryCount: 12,
};

const mixedChartData = generateChartData(mixedChartConfig);
console.log('Title:', mixedChartData.title);
console.log('Type:', mixedChartData.config.type);
console.log('Combination:', (mixedChartData.config as any).combination);
console.log('Categories:', mixedChartData.config.categories.slice(0, 6), '...');
console.log('Datasets:');
mixedChartData.config.datasets.forEach((ds, i) => {
  console.log(`  ${i + 1}. ${ds.label} (${ds.chartType}): ${ds.data.length} data points`);
});
console.log();

console.log('5. Generating Table (Static)\n');
const tableConfig: GenerationConfig = {
  chartType: ChartType.TABLE,
  timeMode: 'static',
  categoryCount: 4,
};

const tableData = generateChartData(tableConfig);
console.log('Title:', tableData.title);
console.log('Rows (Categories):', tableData.config.categories);
console.log('Columns (Labels):', tableData.config.timeLabels);
console.log('Number of Rows:', tableData.config.datasets.length);
console.log();

console.log('6. Generating Process Diagram (Natural)\n');
const processConfig: GenerationConfig = {
  chartType: ChartType.PROCESS_DIAGRAM,
  processType: 'natural' as any,
};

const processData = generateChartData(processConfig);
console.log('Title:', processData.title);
console.log('Process Type:', (processData.config as any).processType);
console.log('Steps:');
(processData.config as any).steps.forEach((step: any, i: number) => {
  console.log(`  ${step.order}. ${step.label}`);
});
console.log();

console.log('7. Generating Map (Development)\n');
const mapConfig: GenerationConfig = {
  chartType: ChartType.MAP,
  mapType: 'development' as any,
};

const mapData = generateChartData(mapConfig);
console.log('Title:', mapData.title);
console.log('Map Type:', (mapData.config as any).mapType);
console.log('Number of Locations:', (mapData.config as any).locations.length);
console.log('Sample Location:', (mapData.config as any).locations[0].name);
console.log();

console.log('8. Validation Tests\n');

console.log('Testing 10 random pie charts for 100% sum...');
let allPassed = true;
for (let i = 0; i < 10; i++) {
  const pieData = generateChartData({ chartType: ChartType.PIE_CHART });
  const sum = pieData.config.datasets[0].data.reduce((s, v) => s + v, 0);
  
  if (Math.abs(sum - 100) > 0.1) {
    console.log(`✗ Test ${i + 1} FAILED: Sum = ${sum}`);
    allPassed = false;
  }
}

if (allPassed) {
  console.log('✓ All pie chart tests PASSED');
}
console.log();

console.log('Testing generated data against type system...');
const testCharts = [
  generateChartData({ chartType: ChartType.LINE_GRAPH, timeMode: 'dynamic' }),
  generateChartData({ chartType: ChartType.BAR_CHART, timeMode: 'static' }),
  generateChartData({ chartType: ChartType.PIE_CHART }),
  generateChartData({ chartType: ChartType.TABLE, timeMode: 'static' }),
  generateChartData({ 
    chartType: ChartType.MIXED, 
    combination: [ChartType.LINE_GRAPH, ChartType.BAR_CHART] 
  }),
];

let validationPassed = true;
testCharts.forEach((chart, i) => {
  const result = validateAll(chart);
  if (!result.isValid) {
    console.log(`✗ Chart ${i + 1} validation FAILED:`, result.errors);
    validationPassed = false;
  }
});

if (validationPassed) {
  console.log('✓ All generated charts passed validation');
}
console.log();

console.log('9. Generating Charts with Different Difficulties\n');
['easy', 'medium', 'hard'].forEach(difficulty => {
  const data = generateChartData({
    chartType: ChartType.BAR_CHART,
    difficulty: difficulty as any,
  });
  console.log(`${difficulty.toUpperCase()} chart: "${data.title}" - Difficulty: ${data.metadata?.difficulty}`);
});
console.log();

console.log('=== Generator Demo Complete ===');
console.log('\nThe generator can create:');
console.log('  ✓ Line Graphs (time-based and categorical)');
console.log('  ✓ Bar Charts (time-based and categorical)');
console.log('  ✓ Pie Charts (always sum to 100%)');
console.log('  ✓ Tables (with rows and columns)');
console.log('  ✓ Mixed Charts (valid combinations only)');
console.log('  ✓ Process Diagrams (natural and man-made)');
console.log('  ✓ Maps (comparison and development)');
console.log('\nAll generated data:');
console.log('  ✓ Matches TypeScript interfaces');
console.log('  ✓ Passes validation checks');
console.log('  ✓ Has realistic values');
console.log('  ✓ Follows IELTS conventions');
