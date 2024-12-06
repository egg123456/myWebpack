import React, { useEffect } from "react";
// import L7 from '@antv/l7';

const Map = () => {
  const init = () => {
    
    // 确保容器已经在DOM中
    const container = document.getElementById('map');
    console.log(container, 'container');
    if (!container) {
      console.error('无法找到地图容器');
      return;
    }

    // var scene = new L7.Scene({
    //   id: 'map',
    //   mapStyle: 'light', // 样式URL
    //   center: [120.19382669582967, 30.258134],
    //   pitch: 0,
    //   zoom: 4,
    //   zoomControl: false,
    //   scaleControl: false
    // });
    // scene.on('loaded', function() {
    //   var colors = ["#FFF5B8", "#FFDC7D", "#FFAB5C", "#F27049", "#D42F31", "#730D1C"];
    //   $.getJSON('https://gw.alipayobjects.com/os/rmsportal/JToMOWvicvJOISZFCkEI.json', function(city) {
    //     scene.PolygonLayer().source(city).color('pm2_5_24h', function(p) {
    //       if (p > 120) {
    //         return colors[5];
    //       } else if (p > 65) {
    //         return colors[4];
    //       } else if (p > 30) {
    //         return colors[3];
    //       } else if (p > 15) {
    //         return colors[2];
    //       } else if (p > 8) {
    //         return colors[1];
    //       } else {
    //         return colors[0];
    //       }
    //     }).shape('fill').active(true).style({
    //       opacity: 1
    //     }).render();
    //     var legend = new L7.Control.Base({
    //       position: 'bottomright'
    //     });
    //     legend.onAdd = function() {
    //       var el = document.createElement('div');
    //       el.className = 'infolegend legend';
    //       var grades = [0, 8, 15, 30, 65, 120];
    //       for (var i = 0; i < grades.length; i++) {
    //         el.innerHTML += '<i style="background:' + colors[i] + '"></i> ' + grades[i] + (grades[i + 1] ? '–' + grades[i + 1] + '<br>' : '+');
    //       }
    //       return el;
    //     };
    //     legend.addTo(scene);
    //   });
    // });
  }

  useEffect(() => {
    init();
  }, [])

  return <div id="map"></div>
}

export default Map;
