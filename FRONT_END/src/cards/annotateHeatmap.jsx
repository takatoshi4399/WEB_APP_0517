import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { PrimaryButton } from '@fluentui/react';

const heatmapData = {
  x: ['残高', '前日比', '前月比'],
  y: ['AD', 'APAC', 'EA', 'EMEA'],
  zText: [
    ['100', '80', '90'],
    ['100', '85', '90'],
    ['100', '85', '90'],
    ['100', '85', '90'],
  ],
  initialZColor: [
    [1, 1, 2, 0],
    [1, 2, 1, 2],
    [1, 1, 2, 0],
    [1, 2, 2, 1],
    [1, 0, 2, 2],
  ]
};

const heatmapData_beforeGroupBy = {
  x: ['残高', '前日比', '前月比'],
  y: ['AD-名古屋', 'AD-東京','APAC-タイ', 'EA-韓国', 'EMEA-ロンドン'],
  zText: [
    ['50', '40', '45'],
    ['50', '40', '45'],
    ['100', '80', '90'],
    ['100', '85', '90'],
    ['100', '85', '90'],
  ],
  initialZColor: [
    [1, 1, 2, 0],
    [1, 2, 1, 2],
    [1, 1, 2, 0],
    [1, 2, 2, 1],
    [1, 0, 2, 2],
  ]
};

const generateAnnotations = (data) => {
  return data.y.flatMap((region, i) =>
    data.x.map((item, j) => ({
      xref: 'x1',
      yref: 'y1',
      x: item,
      y: region,
      text: data.zText[i][j],
      showarrow: false,
      font: {
        family: 'Arial',
        size: 14,
        color: 'black'
      }
    }))
  );
};

const AnnotatedHeatmap = () => {
  const [zColor, setZColor] = useState(heatmapData.initialZColor);
  const [clickedRegion, setClickedRegion] = useState('click me');
  const [annotations, setAnnotations] = useState(generateAnnotations(heatmapData));
  const [x, setX] = useState(heatmapData.x);
  const [y, setY] = useState(heatmapData.y);
  const [Button, setButton] = useState(true);

  const handleClick = (eventData) => {
    const yIdx = heatmapData.y.indexOf(eventData.points[0].y);
    const xIdx = heatmapData.x.indexOf(eventData.points[0].x);
    if (yIdx !== -1 && xIdx !== -1) {
      setClickedRegion(heatmapData.y[yIdx] + ' ' + heatmapData.x[xIdx]);
      const newZcolor = zColor.map(row => [...row]);
      newZcolor[yIdx][xIdx] = 3;
      setZColor(newZcolor);
    }
  };

  const handleClicks = (eventData) => {
    if (Button) {
      setX(heatmapData_beforeGroupBy.x);
      setY(heatmapData_beforeGroupBy.y);
      console.log(heatmapData_beforeGroupBy.y);
      setAnnotations(generateAnnotations(heatmapData_beforeGroupBy));
      console.log(annotations);
      setButton(false);
    } else {
      setX(heatmapData.x);
      setY(heatmapData.y);
      setAnnotations(generateAnnotations(heatmapData));
      setButton(true);
    }
  };



  // annotations 配列を生成
  // const annotations = generateAnnotations(heatmapData);

  // カスタムデータの準備
  const customData = heatmapData.y.map((region, i) => 
    heatmapData.x.map((item, j) => ({
      region: region,
      item: item,
      value: heatmapData.zText[i][j],
      colorCode: zColor[i][j],
      regionCode: i,
      itemCode: j
    }))
  );

  // ホバーテキストの準備
  const hoverText = heatmapData.y.map((region, i) => 
    heatmapData.x.map((item, j) => {
      const value = heatmapData.zText[i][j];
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
          x: x,
          y: y,
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
        <PrimaryButton onClick={handleClicks}>{clickedRegion}</PrimaryButton>
      </div>
    </div>
  );
};

export default AnnotatedHeatmap;
