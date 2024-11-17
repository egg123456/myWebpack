const webpack = require('webpack');
const conf = require('./webpack.config')
// 引入minimist库
const minimist = require('minimist');
 
// 获取命令行参数
const args = process.argv.slice(2);
 
// 使用minimist解析参数
const options = minimist(args, {
  boolean: ['watch'],
  default: {
    watch: true,
  }
});
 
// 打印解析后的参数对象
console.log(options);

if (!options.watch) {
  console.log('complier.run');
  const compiler = webpack(conf, (err, state) => {
    if (err) {
      console.log(err);
    } else if (state.hasErrors()) {
      console.log(state)
    }
  });
} else {
  const compiler = webpack(conf);
  const watching = compiler.watch(
    {
      // Example
      aggregateTimeout: 300,
      poll: 500,
    },
    (err, stats) => {
      // Print watch/build result here...
      // console.log(stats);
      console.log(err, 'err')
      if (err) {
        if (err.details) {
          console.error('errDetail:', err.details);
        }
        return;
      }

      const info = stats.toJson();

      if (stats.hasErrors()) {
        console.error(info.errors);
      }

      if (stats.hasWarnings()) {
        console.warn(info.warnings);
      }
      info.assets.forEach(item => {
        console.info(item.name, item.size, item.chunks);
      })
    }
  );
}
