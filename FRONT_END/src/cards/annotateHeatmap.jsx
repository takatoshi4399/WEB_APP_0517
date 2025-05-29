import React from 'react';
import Plot from 'react-plotly.js';
import { PrimaryButton } from '@fluentui/react';

const xValues = ['残高', '前日比', '前月比'];
const yValues = ['AD', 'APAC', 'EA', 'EMEA', 'TKY'];
const zText = [
  ['100B', '200B\n(↑100%)', '100B\n(0%)', '10B\n(↓90%)'],
  ['100B', '100B\n(0%)', '200B\n(↑100%)', '100B\n(0%)'],
  ['100B', '200B\n(↑100%)', '100B\n(0%)', '10B\n(↓90%)'],
  ['100B', '100B\n(0%)', '100B\n(0%)', '200B\n(↑100%)'],
  ['100B', '10B\n(↓90%)', '100B\n(0%)', '100B\n(0%)'],
];
// 0:赤, 1:緑, 2:白
const zColor = [
  [1, 1, 2, 0],
  [1, 2, 1, 2],
  [1, 1, 2, 0],
  [1, 2, 2, 1],
  [1, 0, 2, 2],
];

const AnnotatedHeatmap = () => {

  const handleClick = (eventData) => {
    console.log(eventData.points[0].x);
    alert('You clicked this Plotly chart!');
  };

  const handleClicks = (eventData) => {
    alert('You clicked this FluentUI Button!');
  };

  // annotations 配列を生成
  const annotations = [];
  for (let i = 0; i < yValues.length; i++) {
    for (let j = 0; j < xValues.length; j++) {
      annotations.push({
        xref: 'x1',
        yref: 'y1',
        x: xValues[j],
        y: yValues[i],
        text: zText[i][j],
        showarrow: false,
        font: {
          family: 'Arial',
          size: 14,
          color: 'black'
        }
      });
    }
  }

  // カスタムデータの準備
  const customData = yValues.map((region, i) => 
    xValues.map((item, j) => ({
      region: region,
      item: item,
      value: zText[i][j],
      colorCode: zColor[i][j],
      regionCode: i,
      itemCode: j
    }))
  );

  // ホバーテキストの準備
  const hoverText = yValues.map((region, i) => 
    xValues.map((item, j) => {
      const value = zText[i][j];
      const colorValue = zColor[i][j];
      const status = colorValue === 0 ? '減少' : 
                    colorValue === 1 ? '増加' : '変化なし';
      return `${region} - ${item}<br>値: ${value}<br>状態: ${status}`;
    })
  );

  return (
    <div>
      <Plot
        data={[{
          z: zColor,
          x: xValues,
          y: yValues,
          type: 'heatmap',
          customdata: customData,
          text: hoverText,
          hoverinfo: 'text',
          colorscale: [
            [0, '#ffcccc'],   // 赤
            [0.33, '#ffcccc'],
            [0.34, '#ccffcc'], // 緑
            [0.66, '#ccffcc'],
            [0.67, '#ffffff'], // 白
            [1, '#ffffff']
          ],
          showscale: false
        }]}
        layout={{
          title: '地域別の預金増減表',
          annotations,
          width: 700,
          height: 400,
          margin: { t: 50 }
        }}
        style={{ width: '100%', height: '100%' }}
        onUnhover={({event}) => {
          console.log(event.clientX);
        }}
        onClick={handleClick}
      />
      <div>
        <PrimaryButton onClick={handleClicks}>Click me</PrimaryButton>
      </div>
    </div>
  );
};

export default AnnotatedHeatmap;
