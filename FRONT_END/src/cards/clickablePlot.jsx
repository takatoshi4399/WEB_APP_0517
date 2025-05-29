import React from 'react';
import Plot from 'react-plotly.js';

const ClickablePlot = () => {
  const x = [1, 2, 3, 4, 5];
  const y = [10, 20, 30, 20, 10];
  const data = [{
    x,
    y,
    type: 'scatter',
    mode: 'markers',
    marker: { size: 20 },
  }];
  const layout = {
    hovermode: 'closest',
    title: { text: 'Click on Points' },
  };

  const handleClick = (eventData) => {
    alert('You clicked this Plotly chart!');
    // eventData.points[0].x, .y なども取れます
  };

  return (
    <Plot
      data={data}
      layout={layout}
      onClick={handleClick}
      style={{ width: '100%', height: '400px' }}
    />
  );
};

export default ClickablePlot;