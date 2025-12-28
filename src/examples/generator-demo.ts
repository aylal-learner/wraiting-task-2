import { generateChartData, generateMultipleCharts } from '../utils/ielts-generator';
import { validateAll } from '../utils/validation';
import { ChartType, MixedChartConfig, ProcessDiagramConfig, MapConfig } from '../types';

console.log('=== IELTS Chart Data Generator Demo ===\n');

console.log('1. Generating a random line graph:');
const lineGraph = generateChartData({ chartType: ChartType.LINE_GRAPH });
console.log(JSON.stringify(lineGraph, null, 2));
const lineGraphValidation = validateAll(lineGraph);
console.log(`Validation: ${lineGraphValidation.isValid ? '✓ PASSED' : '✗ FAILED'}`);
if (lineGraphValidation.errors.length > 0) {
  console.log('Errors:', lineGraphValidation.errors);
}
console.log('\n---\n');

console.log('2. Generating a pie chart (data must sum to 100):');
const pieChart = generateChartData({ chartType: ChartType.PIE_CHART });
const pieData = pieChart.config.datasets[0]?.data;
const pieSum = pieData?.reduce((a, b) => a + b, 0) ?? 0;
console.log(`Pie data: ${pieData}`);
console.log(`Sum: ${pieSum}`);
console.log(JSON.stringify(pieChart, null, 2));
const pieValidation = validateAll(pieChart);
console.log(`Validation: ${pieValidation.isValid ? '✓ PASSED' : '✗ FAILED'}`);
console.log('\n---\n');

console.log('3. Generating a mixed chart (table + pie):');
const mixedChart = generateChartData({ chartType: ChartType.MIXED });
const mixedConfig = mixedChart.config as MixedChartConfig;
console.log(`Combination: ${mixedConfig.combination?.join(' + ')}`);
console.log(JSON.stringify(mixedChart, null, 2));
const mixedValidation = validateAll(mixedChart);
console.log(`Validation: ${mixedValidation.isValid ? '✓ PASSED' : '✗ FAILED'}`);
console.log('\n---\n');

console.log('4. Generating a process diagram (natural):');
const processDiagram = generateChartData({ chartType: ChartType.PROCESS_DIAGRAM });
const processConfig = processDiagram.config as ProcessDiagramConfig;
console.log(`Process type: ${processConfig.processType}`);
console.log(`Steps: ${processConfig.steps?.length}`);
console.log(JSON.stringify(processDiagram, null, 2));
const processValidation = validateAll(processDiagram);
console.log(`Validation: ${processValidation.isValid ? '✓ PASSED' : '✗ FAILED'}`);
console.log('\n---\n');

console.log('5. Generating a map (comparison):');
const mapChart = generateChartData({ chartType: ChartType.MAP });
const mapConfig = mapChart.config as MapConfig;
console.log(`Map type: ${mapConfig.mapType}`);
console.log(`Locations: ${mapConfig.locations?.length}`);
console.log(JSON.stringify(mapChart, null, 2));
const mapValidation = validateAll(mapChart);
console.log(`Validation: ${mapValidation.isValid ? '✓ PASSED' : '✗ FAILED'}`);
console.log('\n---\n');

console.log('6. Generating 5 random charts and validating all:');
const randomCharts = generateMultipleCharts(5);
let allValid = true;
randomCharts.forEach((chart, index) => {
  const validation = validateAll(chart);
  console.log(`Chart ${index + 1} (${chart.config.type}): ${validation.isValid ? '✓' : '✗'}`);
  if (!validation.isValid) {
    allValid = false;
    console.log('Errors:', validation.errors);
  }
});
console.log(`\nAll 5 charts valid: ${allValid ? '✓ YES' : '✗ NO'}`);

console.log('\n=== Demo Complete ===');
