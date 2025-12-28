import {
  ChartType,
  IELTSChartData,
  MixedChartConfig,
  isValidMixedCombination,
  validateAll,
} from '../index';

console.log('=== IELTS Chart Types - Type Safety Demonstration ===\n');

console.log('1. Valid Mixed Combinations Check:');
console.log('   Line + Bar:', isValidMixedCombination(ChartType.LINE_GRAPH, ChartType.BAR_CHART));
console.log('   Table + Pie:', isValidMixedCombination(ChartType.TABLE, ChartType.PIE_CHART));
console.log('   Line + Pie (INVALID):', isValidMixedCombination(ChartType.LINE_GRAPH, ChartType.PIE_CHART));
console.log('   Process + Map (INVALID):', isValidMixedCombination(ChartType.PROCESS_DIAGRAM, ChartType.MAP));
console.log();

const validExample: IELTSChartData = {
  id: 'demo-001',
  title: 'Sample Line Graph',
  config: {
    type: ChartType.LINE_GRAPH,
    isMixed: false,
    timeMode: 'dynamic',
    dataBehavior: 'time_based',
    categories: ['Category A', 'Category B'],
    timeLabels: ['2020', '2021', '2022'],
    datasets: [
      { label: 'Series 1', data: [10, 20, 30] },
      { label: 'Series 2', data: [15, 25, 35] },
    ],
  },
};

console.log('2. Validation of Valid Chart:');
const validationResult = validateAll(validExample);
console.log('   Is Valid:', validationResult.isValid);
console.log('   Errors:', validationResult.errors.length === 0 ? 'None' : validationResult.errors);
console.log('   Warnings:', validationResult.warnings.length === 0 ? 'None' : validationResult.warnings);
console.log();

const invalidExample: IELTSChartData = {
  id: '',
  title: '',
  config: {
    type: ChartType.MIXED,
    isMixed: true,
    timeMode: 'static',
    dataBehavior: 'categorical',
    combination: [ChartType.LINE_GRAPH, ChartType.BAR_CHART],
    categories: ['A', 'B'],
    datasets: [
      { label: 'Test', data: [1, 2, 3], chartType: ChartType.PIE_CHART },
    ],
  } as MixedChartConfig,
};

console.log('3. Validation of Invalid Chart:');
const invalidValidationResult = validateAll(invalidExample);
console.log('   Is Valid:', invalidValidationResult.isValid);
console.log('   Errors:');
invalidValidationResult.errors.forEach((err, i) => {
  console.log(`     ${i + 1}. ${err}`);
});
console.log();

console.log('4. TypeScript Type Safety Features:');
console.log('   ✓ Enums prevent typos (e.g., ChartType.LINE_GRAPH not "line-graph")');
console.log('   ✓ Union types restrict valid combinations');
console.log('   ✓ Interfaces ensure required fields are present');
console.log('   ✓ Generic types provide flexibility with safety');
console.log('   ✓ Discriminated unions enable smart type narrowing');
console.log();

console.log('=== Type Safety Demo Complete ===');
