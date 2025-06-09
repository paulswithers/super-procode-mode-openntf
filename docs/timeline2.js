/**
 * (C) 2024, HCL, Apache-2.0 License
 */

const momentData = () => {
  return fetch('timeline.json')
    .then((response) => response.json())
    .then((myData) => {
      let result = [];
      for (let group of myData) {
        for (let item of group.data) {
          const product = item.label;
          const year = item.data[0].timeRange[0];
          const stuff = [year, product + '(' + year + ')'];
          result.push(stuff);
        }
      }
      return result;
    });
};

const rangeData = () => {
  return [
    {
      name: 'The Beginning',
      start: '1994',
      end: '2004',
      fill: '#00a8e0 0.5',
      stroke: '#00a8e0'
    },
    {
      name: 'JS libraries',
      start: '2004',
      end: '2010',
      fill: '#1c4598 0.5',
      stroke: '#1c4598'
    },
    {
      name: 'JS frameworks',
      start: '2010',
      end: '2016',
      fill: '#a05e9c 0.6',
      stroke: '#a05e9c'
    },
    {
      name: 'next Gen Frameworks',
      start: '2016',
      end: '2024',
      fill: '#6e4c82 0.65',
      stroke: '#6e4c82'
    }
  ];
};

const setupPage = () => {
  let chart = anychart.timeline();
  momentData().then((data) => {
    let momentSeries = chart.moment(data);
    momentSeries.normal().markers().fill('#ffdd0e');
    momentSeries.normal().markers().stroke('#e9ae0b');
    let rangeSeries = chart.range(rangeData());
    rangeSeries.labels().format('{%name}');
    rangeSeries.height(50);
    chart.title('Timeline of web stuff');
    chart.container('container');
    chart.draw();
  });
};

/* Hook the JS into the loading event */
if (document.readyState != 'loading') {
  setupPage();
} else {
  document.addEventListener('DOMContentLoaded', setupPage);
}
