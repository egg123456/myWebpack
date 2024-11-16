const path = require('path');
const { resolve } = path;
const options = { env: 'dev' };

const outPath = resolve(__dirname, '../myApp/public/view/');
// const outPath = resolve(__dirname + '../../../learn/electronApp/view/');
// const outPath = '/view/';

module.exports = {
  entry: './src/index.js',
  output: {
      path : outPath,
      // publicPath: '/view/',//添加静态资源, 否则会出现路径错误
      filename : '[name].js',//这样就可以生成两个js文件, 名字分别为index1.js, 和index2.js
      chunkFilename: options.env === 'dev' ? `chunks/[name].js?v=[chunkhash:6]` : `s/[name].js?v=[chunkhash:6]_${v.localVersion}`,
      clean: true, // 每次构建前清空输出文件夹
  },
  devtool: 'source-map',
  module: {//loader css jpg。。
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$|\.ts?$/, loader: "awesome-typescript-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }],
              '@babel/preset-react',
            ],
            // plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.(css|less)$/i,
        use: ["style-loader", "css-loader", 'less-loader'],
      },
      { test: /.(jpg|png|gif|svg)$/, use: ['url-loader?limit=8192&name=./[name].[ext]']}
    ]
  },
  stats: 'verbose',
  mode: 'development',
  recordsPath: path.join(__dirname, 'records.json'),
  optimization: {
    splitChunks: {
      // chunks: 'async',
      minSize: 200,
      // minRemainingSize: 0,
      minChunks: 2,
      // maxAsyncRequests: 30,
      // maxInitialRequests: 30,
      // enforceSizeThreshold: 50000,
      // cacheGroups: {
      //   defaultVendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     priority: -10,
      //     reuseExistingChunk: true,
      //   },
      //   default: {
      //     minChunks: 2,
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      // },
    },
  },
  // resolve:{
  //   // 告诉 webpack 解析模块时应该搜索的目录(默认["node_modules"])
  //   modules: ["node_modules", "custom_modules"],
  //   // 解析目录时要使用的文件名。构建目标 target： “web” 时默认：mainFiles: ["index"]
  //   mainFiles: ["index"],
  //   // 模块扩展名
  //   extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  //   //配置别名，在项目中可缩减引用路径
  //   alias: {
  //       '@': resolve('src/components'),
  //       'api': resolve('src/api'),
  //       'assets': resolve('src/assets')
  //   }
  // },
};
