import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const Map = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/api/locations')
          .then(res => res.json())
          .then(data => setLocations(data.locations))
          .catch(err => console.error(err));
      }, []);
    
      const lats = locations.map(loc => loc.lat);
      const lons = locations.map(loc => loc.lon);
      const texts = locations.map(loc => loc.name);
    
      const data = [
        {
          type: 'scattergeo',
          mode: 'markers+text',
          lat: lats,
          lon: lons,
          text: texts,
          marker: { size: 8 }
        }
      ];
    
      const layout = {
        title: 'Geo Scatter Map',
        geo: { scope: 'world'},
        margin: { l: 0, r: 0, t: 50, b: 0 }
      };

  return (
    <Plot
      data={data}
      layout={layout}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default Map;
