<script>
	import { Axis, BarChart, Bars, Chart, Highlight, Svg, Tooltip } from 'layerchart';
	import { BarChartSimple } from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';
	import { scaleBand } from 'd3-scale';
	import { scaleLinear } from 'd3-scale';
	let { searches } = $props();

	const getTopSearchTerms = (searches) => {
		if (!searches || !searches.length) return [];

		// Count occurrences of each search term
		const termCounts = searches.reduce((acc, search) => {
			const term = search.term.toLowerCase(); // Normalize to lowercase
			acc[term] = (acc[term] || 0) + 1;
			return acc;
		}, {});

		// Convert to array and sort by count (descending)
		const sortedTerms = Object.entries(termCounts)
			.map(([term, count]) => ({ term, count }))
			.sort((a, b) => b.count - a.count)
			.slice(0, 20);

		return sortedTerms;
	};

	const topSearches = searches ? getTopSearchTerms(searches) : [];

	const options = {
		axes: {
			left: {
				mapsTo: 'count'
			},
			bottom: {
				mapsTo: 'term',
				scaleType: 'labels'
			}
		},
		accessibility: {
			svgAriaLabel: 'Bar Chart of most popular searches'
		}
	};
</script>

<div class="h-[450px] md:h-[400px] m-2 p-2 border rounded text-gray-400">
	<BarChartSimple data={topSearches} {options} />
</div>
