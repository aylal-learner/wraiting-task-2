import { test, describe } from 'node:test';
import assert from 'node:assert';
import { generateChartData } from './generator';
import { ChartType } from '../types';

function sum(values: number[]): number {
  return values.reduce((s, v) => s + v, 0);
}

describe('Chart Data Generator', () => {
  test('should generate valid chart data structure', () => {
    const chartData = generateChartData({
      chartType: ChartType.LINE_GRAPH,
      timeMode: 'dynamic',
    });

    assert.ok(chartData.id, 'Should have id');
    assert.ok(chartData.title, 'Should have title');
    assert.ok(chartData.config, 'Should have config');
    assert.ok(chartData.config.type, 'Config should have type');
    assert.ok(chartData.config.datasets, 'Config should have datasets');
    assert.ok(Array.isArray(chartData.config.datasets), 'Datasets should be an array');
  });

  test('pie chart should always sum to 100%', () => {
    for (let i = 0; i < 20; i++) {
      const chartData = generateChartData({
        chartType: ChartType.PIE_CHART,
      });

      const dataset = chartData.config.datasets[0];
      const total = sum(dataset.data);

      assert.ok(Math.abs(total - 100) < 0.1, `Pie chart should sum to ~100%, got ${total}`);
    }
  });

  test('mixed line + bar should share same axis length', () => {
    const chartData = generateChartData({
      chartType: ChartType.MIXED,
      combination: [ChartType.LINE_GRAPH, ChartType.BAR_CHART],
      timeMode: 'dynamic',
    });

    assert.strictEqual(chartData.config.type, ChartType.MIXED, 'Should be mixed chart');
    assert.ok(chartData.config.datasets.length >= 2, 'Should have at least 2 datasets');

    const axisLength = chartData.config.categories.length;

    chartData.config.datasets.forEach(dataset => {
      assert.strictEqual(
        dataset.data.length,
        axisLength,
        `Dataset "${dataset.label}" should have ${axisLength} data points, got ${dataset.data.length}`
      );
    });
  });

  test('dynamic charts should include time labels', () => {
    const chartData = generateChartData({
      chartType: ChartType.BAR_CHART,
      timeMode: 'dynamic',
    });

    assert.strictEqual(chartData.config.timeMode, 'dynamic', 'Should be dynamic');
    assert.ok(chartData.config.timeLabels, 'Should have time labels');
    assert.ok(chartData.config.timeLabels!.length > 1, 'Should have multiple time labels');
  });

  test('process diagram should include steps', () => {
    const chartData = generateChartData({
      chartType: ChartType.PROCESS_DIAGRAM,
    });

    assert.strictEqual(chartData.config.type, ChartType.PROCESS_DIAGRAM, 'Should be process diagram');
    assert.ok('steps' in chartData.config, 'Should have steps property');
    assert.ok((chartData.config as any).steps.length > 0, 'Should have at least one step');
  });

  test('map should include locations', () => {
    const chartData = generateChartData({
      chartType: ChartType.MAP,
    });

    assert.strictEqual(chartData.config.type, ChartType.MAP, 'Should be map');
    assert.ok('locations' in chartData.config, 'Should have locations property');
    assert.ok((chartData.config as any).locations.length > 0, 'Should have at least one location');
  });

  test('line graph with smooth trends', () => {
    const chartData = generateChartData({
      chartType: ChartType.LINE_GRAPH,
      timeMode: 'dynamic',
      categoryCount: 3,
    });

    chartData.config.datasets.forEach(dataset => {
      for (let i = 1; i < dataset.data.length; i++) {
        const prev = dataset.data[i - 1];
        const curr = dataset.data[i];
        const change = Math.abs(curr - prev);
        const maxChange = 100 * 0.2;
        
        assert.ok(
          change <= maxChange,
          `Change between points should be smooth: ${change} <= ${maxChange}`
        );
      }
    });
  });

  test('table should have proper structure', () => {
    const chartData = generateChartData({
      chartType: ChartType.TABLE,
      timeMode: 'static',
      categoryCount: 4,
    });

    assert.strictEqual(chartData.config.type, ChartType.TABLE, 'Should be table');
    assert.ok(chartData.config.categories.length > 0, 'Should have categories (rows)');
    assert.ok(chartData.config.datasets.length > 0, 'Should have datasets');
    
    const expectedDataLength = chartData.config.timeLabels?.length || chartData.config.categories.length;
    chartData.config.datasets.forEach(dataset => {
      assert.ok(
        dataset.data.length === expectedDataLength,
        'All rows should have same number of columns'
      );
    });
  });

  test('category count constraint', () => {
    const chartData = generateChartData({
      chartType: ChartType.BAR_CHART,
      categoryCount: 6,
    });

    assert.strictEqual(
      chartData.config.categories.length,
      6,
      'Should respect categoryCount parameter'
    );
  });

  test('mixed chart with valid combination', () => {
    const chartData = generateChartData({
      chartType: ChartType.MIXED,
      combination: [ChartType.TABLE, ChartType.PIE_CHART],
    });

    assert.strictEqual(chartData.config.type, ChartType.MIXED);
    
    const mixedConfig = chartData.config as any;
    assert.deepStrictEqual(
      mixedConfig.combination,
      [ChartType.TABLE, ChartType.PIE_CHART],
      'Should use specified combination'
    );

    mixedConfig.datasets.forEach((dataset: any) => {
      assert.ok(
        dataset.chartType === ChartType.TABLE || dataset.chartType === ChartType.PIE_CHART,
        `Dataset chartType should be in combination, got ${dataset.chartType}`
      );
    });
  });

  test('difficulty setting', () => {
    const difficulties: Array<'easy' | 'medium' | 'hard'> = ['easy', 'medium', 'hard'];
    
    difficulties.forEach(difficulty => {
      const chartData = generateChartData({
        chartType: ChartType.BAR_CHART,
        difficulty,
      });

      assert.strictEqual(
        chartData.metadata?.difficulty,
        difficulty,
        `Should set difficulty to ${difficulty}`
      );
    });
  });

  test('start year and time period', () => {
    const chartData = generateChartData({
      chartType: ChartType.LINE_GRAPH,
      timeMode: 'dynamic',
      startYear: 2000,
      timePeriodYears: 10,
    });

    assert.ok(chartData.config.timeLabels, 'Should have time labels');
    const firstYear = parseInt(chartData.config.timeLabels![0]);
    const lastYear = parseInt(chartData.config.timeLabels![chartData.config.timeLabels!.length - 1]);
    
    assert.ok(firstYear >= 2000, 'First year should be >= start year');
    assert.ok(lastYear <= 2010, 'Last year should be <= start + period');
  });

  test('process diagram types', () => {
    const naturalChart = generateChartData({
      chartType: ChartType.PROCESS_DIAGRAM,
      processType: 'natural' as any,
    });

    assert.strictEqual((naturalChart.config as any).processType, 'natural');

    const manMadeChart = generateChartData({
      chartType: ChartType.PROCESS_DIAGRAM,
      processType: 'man_made' as any,
    });

    assert.strictEqual((manMadeChart.config as any).processType, 'man_made');
  });

  test('map types', () => {
    const comparisonMap = generateChartData({
      chartType: ChartType.MAP,
      mapType: 'comparison' as any,
    });

    assert.strictEqual((comparisonMap.config as any).mapType, 'comparison');

    const developmentMap = generateChartData({
      chartType: ChartType.MAP,
      mapType: 'development' as any,
    });

    assert.strictEqual((developmentMap.config as any).mapType, 'development');
  });

  test('all chart types can be generated', () => {
    const chartTypes = [
      ChartType.LINE_GRAPH,
      ChartType.BAR_CHART,
      ChartType.PIE_CHART,
      ChartType.TABLE,
      ChartType.MIXED,
      ChartType.PROCESS_DIAGRAM,
      ChartType.MAP,
    ];

    chartTypes.forEach(chartType => {
      const chartData = generateChartData({ chartType });
      assert.strictEqual(chartData.config.type, chartType, `Should generate ${chartType}`);
    });
  });
});
