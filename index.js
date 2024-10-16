const webpack = require('webpack');
const conf = require('./webpack.config')
// console.log(conf, 'conf');
// const compiler = webpack(conf, (err, state) => {
//   if (err) {
//     console.log(err);
//   } else if (state.hasErrors()) {
//     console.log(state)
//   }
// });

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

