import Plot from 'react-plotly.js';

const countryLabels = [
  { name: 'Japan', lat: 36.2048, lon: 138.2529 },
  { name: 'France', lat: 46.6034, lon: 1.8883 },
  { name: 'United Kingdom', lat: 55.3781, lon: -3.4360 },
  { name: 'United States', lat: 37.0902, lon: -95.7129 },
];

const GlobalMap = ({ locations }) => {
    const lats = locations.map(loc => loc.lat);
    const lons = locations.map(loc => loc.lon);
    const texts = locations.map(loc =>
      `<b>${loc.name}</b><br>${loc.city}, ${loc.country}<br>売上: ¥${loc.revenue.toLocaleString()}<br>従業員: ${loc.employees}人<br>成長率: +${loc.growth}%<br>部門: ${loc.department}<br>設立年: ${loc.yearEstablished}年${loc.isAbnormal ? '<br><span style="color:#F59E0B;">⚠️ 要注意拠点</span>' : ''}`
    );
    const markerColors = locations.map(loc => loc.isAbnormal ? '#F59E0B' : (loc.growth > 15 ? '#10B981' : (loc.growth > 10 ? '#F59E0B' : '#EF4444')));
    const markerSymbols = locations.map(loc => loc.isAbnormal ? 'star' : 'circle');
    const markerSizes = locations.map(loc => loc.isAbnormal ? 20 : 14);
    
    console.log(lats);
    console.log(lons);
    console.log(texts);


    const markerTrace = [
      {
        type: 'scattergeo',
        mode: 'markers',
        lat: lats,
        lon: lons,
        text: texts,
        marker: {
          size: markerSizes,
          color: markerColors,
          symbol: markerSymbols,
          line: { color: 'white', width: 2 },
          opacity: 0.9
        },
        hoverinfo: 'text',
        name: '拠点'
      }
    ];

    const countryColors = [
      {
        type: 'choropleth',
        locationmode: 'country names', // または 'ISO-3'
        locations: ['Japan', 'France', 'United Kingdom', 'United States'],
        z: [1, 2, 3, 4], // 色分けの値（数値やカテゴリ）
        text: ['日本', 'フランス', 'イギリス', 'アメリカ'],
        colorscale: 'Blues', // カラースケール
        autocolorscale: false,
        showscale: true
      }
    ];

    const countryLabelTrace = {
      type: 'scattergeo',
      mode: 'text',
      lat: countryLabels.map(c => c.lat),
      lon: countryLabels.map(c => c.lon),
      text: countryLabels.map(c => c.name),
      textfont: { size: 12, color: 'gray' },
      showlegend: false,
      hoverinfo: 'none'
    };
  
    const layout = {
      geo: {
        scope: 'world',
        projection: { type: 'equirectangular' },
        showland: true,
        landcolor: '#F3F4F6',
        showocean: true,
        oceancolor: '#E5E7EB',
        showlakes: true,
        lakecolor: '#E5E7EB',
        showrivers: true,
        rivercolor: '#E5E7EB',
        showcoastlines: true,
        coastlinecolor: '#D1D5DB',
        showcountries: true,
        countrycolor: '#D1D5DB',
        showframe: false,
        bgcolor: 'transparent'
      },
      margin: { l: 0, r: 0, t: 0, b: 0 },
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      showlegend: false,
      hovermode: 'closest',
      hoverlabel: {
        bgcolor: 'white',
        font: { family: 'system-ui, -apple-system, sans-serif', size: 12 },
        bordercolor: '#E5E7EB'
      }
    };
  
    const config = {
      displayModeBar: false,
      responsive: true,
      scrollZoom: true
    };
  
    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <Plot
          data={[...markerTrace, countryLabelTrace, ...countryColors]}
          layout={layout}
          config={config}
          style={{ width: '100vw', height: '100vh' }}
          useResizeHandler={true}
        />
      </div>
    );
  };

  export default GlobalMap;