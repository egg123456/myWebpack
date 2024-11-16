import React, { useEffect } from 'react';
import { Chart } from '@antv/g2';

const Interval = () => {
  const init = () => {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ]; // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
    // Step 1: 创建 Chart 对象
    const chart = new Chart({
      container: 'c1', // 指定图表容器 ID
      // forceFit: true,
      width : 600, // 指定图表宽度
      height : 300, // 指定图表高度
      theme: 'dark',
      background: {
        // fill: 'red', // 图表背景色
        // fillOpacity: {number}, // 图表背景透明度
        stroke: 'red', // 图表边框颜色
        // strokeOpacity: {number}, // 图表边框透明度
        // opacity: {number}, // 图表整体透明度
        lineWidth: 5, // 图表边框粗度
        radius: 20 // 图表圆角大小
      },
      plotBackground: {
        fill: 'green', // 图表背景色
        // fillOpacity: {number}, // 图表背景透明度
        stroke: 'red', // 图表边框颜色
        // strokeOpacity: {number}, // 图表边框透明度
        // opacity: {number}, // 图表整体透明度
        lineWidth: 4, // 图表边框粗度
        radius: 20 // 图表圆角大小
      }
    });
    // Step 2: 载入数据源
    chart.source(data);
    // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
    // chart.interval().position('genre*sold').color('genre')
    // 使用渐变色，l 后面传入角度，0 代表起始颜色，1 代表结束颜色
    chart.interval().position('genre*sold').color('l(270) 0:#173162 1:#3663a1');
    // Step 4: 渲染图表
    chart.render();  
  }

  useEffect(() => {
    init();
  })

  return (
    <div id="c1"></div>
  )
}

export default Interval;