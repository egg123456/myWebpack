import G2 from "@antv/g2";
import React, { useEffect } from "react";

var data = [{
  item: '事例一',
  count: 40,
  percent: 0.4
}, {
  item: '事例二',
  count: 21,
  percent: 0.21
}, {
  item: '事例三',
  count: 17,
  percent: 0.17
}, {
  item: '事例四',
  count: 13,
  percent: 0.13
}, {
  item: '事例五',
  count: 9,
  percent: 0.09
}];

const Pie = () => {
  const init = () => {
    var chart = new G2.Chart({
      container: 'pie',
      forceFit: true,
      height: 300,
    });
    chart.source(data, {
      percent: {
        formatter: function formatter(val) {
          val = val * 100 + '%';
          return val;
        }
      }
    });
    chart.coord('theta');
    chart.tooltip({
      showTitle: false
    });
    chart.intervalStack().position('percent').color('item').label('percent', {
      offset: -40,
      // autoRotate: false,
      textStyle: {
        textAlign: 'center',
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, .45)'
      }
    }).tooltip('item*percent', function(item, percent) {
      percent = percent * 100 + '%';
      return {
        name: item,
        value: percent
      };
    }).style({
      lineWidth: 1,
      stroke: '#fff'
    });pie
    chart.render();
  }

  useEffect(() => {
    init();
  }, [])

  return <div id="pie"></div>
}

export default Pie;
