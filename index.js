import {
  select,
  geoPath,
  geoMercator,
  json,
  scaleOrdinal,
  schemeCategory10,
  csv,
  axisBottom,
  axisLeft,
  scaleLinear,
  scaleBand,
  extent,
  max,
  rollups,
  sum,
} from 'd3';

// Set the dimensions and margins of the graph
const margin = { top: 10, right: 30, bottom: 50, left: 60 };
const width = 900 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Adjusted translate settings to move the map down
const translateX = width / 2 + 450;
const translateY = height / 2 + 20; // Increase this value to move the map down
const projection = geoMercator()
  .center([-6.5, 41.8])
  .scale(75000)
  .translate([translateX + 60, translateY + 100]); // Added 10 to the original translateY value

const pathGenerator = geoPath().projection(projection);

// Select the SVG element you'll be working with
const svgMap = select('#svgMap');

svgMap.style('background-color', 'white');

// // Function to draw grid lines
// function drawGrid(numLines) {
//   const spacingX = width / numLines;
//   const spacingY = height / numLines;

//   // Vertical lines
//   for (let i = 0; i <= numLines; i++) {
//     svgMap
//       .append('line')
//       .attr('x1', spacingX * i)
//       .attr('y1', 0)
//       .attr('x2', spacingX * i)
//       .attr('y2', height)
//       .attr('stroke', '#ddd');
//   }

//   // Horizontal lines
//   for (let i = 0; i <= numLines; i++) {
//     svgMap
//       .append('line')
//       .attr('x1', 0)
//       .attr('y1', spacingY * i)
//       .attr('x2', width)
//       .attr('y2', spacingY * i)
//       .attr('stroke', '#ddd');
//   }
// }

// // Draw grid
// drawGrid(9);

// Load and render the GeoJSON file
json(
  'https://raw.githubusercontent.com/padmeshnaik/dataviz-project-template-proposal/master/export.geojson',
).then((geojsonData) => {
  const colorScale = scaleOrdinal(schemeCategory10);

  svgMap
    .selectAll('path')
    .data(geojsonData.features)
    .enter()
    .append('path')
    .attr('d', pathGenerator)
    .attr('fill', 'blue')
    .attr('stroke', '#000')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-width', 1);

  // Function to extract column names from CSV data
  function getColumnNames(data) {
    return Object.keys(data[0]);
  }

  // Load the CSV data
  csv('data.csv').then((data) => {
    // Extract column names
    const columnNames = getColumnNames(data);

    // Populate the dialog box with column names
    const columnNamesList = select('#columnNamesList');
    columnNamesList
      .selectAll('li')
      .data(columnNames)
      .enter()
      .append('li')
      .text((d) => d);

    function drawTempVsRhGraph(data) {
      const svg = d3.select('#tempVsRhGraph');
      svg.style('display', 'block'); // Make sure the SVG is visible
      svg.selectAll('*').remove(); // Clear any previous SVG content

      const margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50,
      };
      const width =
        +svg.attr('width') - margin.left - margin.right;
      const height =
        +svg.attr('height') - margin.top - margin.bottom;

      const x = d3.scaleLinear().range([0, width]);
      const y = d3.scaleLinear().range([height, 0]);

      const g = svg
        .append('g')
        .attr(
          'transform',
          `translate(${margin.left},${margin.top})`,
        );

      x.domain(d3.extent(data, (d) => +d.temp));
      y.domain(d3.extent(data, (d) => +d.RH));

      // X-axis label
      g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .append('text')
        .attr('y', 10) // Adjust position based on bottom margin
        .attr('x', width / 2)
        .attr('text-anchor', 'middle')
        .text('Temperature');

      // Y-axis label
      g.append('g')
        .call(d3.axisLeft(y))
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -50) // Adjust position based on left margin
        .attr('x', -height / 2)
        .attr('text-anchor', 'middle')
        .text('Relative Humidity');

      g.selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('r', 3.5)
        .attr('cx', (d) => x(+d.temp))
        .attr('cy', (d) => y(+d.RH))
        .style('fill', 'steelblue');
    }

    function drawMonthAreaBarChart() {
      // Assuming `data` is already loaded and contains the month and area fields
      const aggregatedData = d3
        .rollups(
          data,
          (v) => d3.sum(v, (d) => d.area), // Replace 'd.area' with the actual property name
          (d) => d.month, // Replace 'd.month' with the actual property name
        )
        .map(([month, area]) => ({ month, area }));

      const svg = d3.select('#monthAreaGraph');
      svg.style('display', 'block'); // Make sure the SVG is visible
      svg.selectAll('*').remove(); // Clear any previous SVG content

      const margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40,
      };
      const width =
        +svg.attr('width') - margin.left - margin.right;
      const height =
        +svg.attr('height') - margin.top - margin.bottom;

      const x = d3
        .scaleBand()
        .range([0, width])
        .padding(0.1)
        .domain(aggregatedData.map((d) => d.month));

      const y = d3
        .scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(aggregatedData, (d) => d.area)]);

      const g = svg
        .append('g')
        .attr(
          'transform',
          `translate(${margin.left},${margin.top})`,
        );

      g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      g.append('g').call(d3.axisLeft(y));

      g.selectAll('.bar')
        .data(aggregatedData)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x(d.month))
        .attr('width', x.bandwidth())
        .attr('y', (d) => y(d.area))
        .attr('height', (d) => height - y(d.area))
        .attr('fill', 'steelblue');
    }

    select('#showColumnsBtn').on('click', function () {
      const dialog = select('#columnNamesDialog');
      const isVisible = dialog.style('display') !== 'none';
      dialog.style('display', isVisible ? 'none' : 'block');
    });

    select('#showTempVsRhBtn').on('click', function () {
      select('#monthAreaGraph').selectAll('*').remove();
      const graphContainer = select(
        '#tempVsRhGraphContainer',
      );
      const isVisible =
        graphContainer.style('display') !== 'none';
      graphContainer.style(
        'display',
        isVisible ? 'none' : 'block',
      );
      if (!isVisible) {
        drawTempVsRhGraph(data);
      } else {
        select('#tempVsRhGraph').selectAll('*').remove();
      }
    });

    select('#showMonthAreaBtn').on('click', function () {
      select('#tempVsRhGraph').selectAll('*').remove();
      const graphContainer = select(
        '#monthAreaGraphContainer',
      );
      const isVisible =
        graphContainer.style('display') !== 'none';
      graphContainer.style(
        'display',
        isVisible ? 'none' : 'block',
      );
      if (!isVisible) {
        drawMonthAreaBarChart(data);
      } else {
        select('#monthAreaGraph').selectAll('*').remove();
      }
    });
  });
});
