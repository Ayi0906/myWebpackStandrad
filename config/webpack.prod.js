const { resolve } = require('path')
/* 用于整合css为同一个文件 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
/* 用于js语法检查 */
const ESLintPlugin = require('eslint-webpack-plugin')
// 用于压缩css文件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
/* 用于自动和创建index.html副本并与打包资源进行整合 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 压缩js代码 , webpack5自带不需要安装
const TerserPlugin = require('terser-webpack-plugin')
/*  */
const commonLoader = [
	MiniCssExtractPlugin.loader, // 将所有css文件打包为一个文件
	{
		loader: 'css-loader',
		options: {
			importLoaders: 1 // 来自于官网的配置
		}
	},
	'postcss-loader' // css兼容性处理
]
/*  */
module.exports = {
	entry: {
		main: ['./index.js', './src/templates/index.html'] // 入口文件
	},
	output: {
		filename: 'src/js/[hash:8]_bundle.js', // 打包到/dist/src/js/bundle.js中
		path: resolve(__dirname, '../dist'),
		clean: true,
		publicPath: '/'
	},
	mode: 'production',
	module: {
		rules: [
			/* 打包css文件 */
			{
				test: /\.css$/,
				use: [...commonLoader]
			},
			/* 打包less文件 */
			{
				test: /\.less$/,
				use: [...commonLoader, 'less-loader'] // .less文件转为css文件
			},
			/* 打包js文件 */
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									useBuiltIns: 'usage', // 按需引入需要使用polyfill
									corejs: { version: 3 }, // 解决warn
									targets: {
										// 指定兼容性处理哪些浏览器
										chrome: '58',
										ie: '9'
									},
									modules: false // 防止babel 将任何模块类型都=转译成CommonJS类型, 导致tree-shaking失效问题
								}
							]
						],
						cacheDirectory: true // 开启babel缓存
					}
				}
			},
			/* 打包样式文件中的图片资源 */
			{
				test: /\.(jpe?g|png|svg|gif)$/i,
				type: 'asset',
				generator: {
					filename: 'src/assets/img/[hash:8][ext]' // 放入dist/src/assets/img 目录中
				},
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024 // 超过100kb不转 base64
					}
				}
			},
			/* 自动整合html文件与静态资源文件为一个index.html副本 */
			{
				test: /\.html$/i,
				use: {
					loader: 'html-loader'
				}
			},
			/* 打包音频资源 */
			{
				test: /\.mp3$/i,
				type: 'asset',
				generator: {
					filename: 'src/assets/audio/[hash:8][ext]' // 放入dist/src/assets/audio 目录中
				}
			},

			/* 打包视频资源 */
			{
				test: /\.mp4$/i,
				type: 'asset',
				generator: {
					filename: 'src/assets/video/[hash:8][ext]' // 放入dist/src/assets/video 目录中
				}
			},
			/* 打包字体文件 */
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
				type: 'asset',
				generator: {
					filename: 'src/assets/font/[hash:8][ext]' // 放入dist/src/assets/font 目录中
				}
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'src/css/[hash:8].css' // 生成的文件在/dist/assets/css/dev_bundle.css
		}),
		new ESLintPlugin({
			context: resolve(__dirname, '../'), //指定文件根目录，类型为字符串
			extensions: 'js', // 指定需要检查的扩展名 ,默认js
			exclude: '/node_modules/', // 排除node_modules文件夹, 配置里可以只保留这一项
			fix: false, // 启用 ESLint 自动修复特性。 小心: 该选项会修改源文件。
			quiet: false // 设置为 true 后，仅处理和报告错误，忽略警告
		}),
		new HtmlWebpackPlugin({
			template: './src/templates/index.html'
		})
	],
	devtool:
		process.env.NODE_ENV === 'production' ? 'eval-cheap-module-source-map' : 'inline-source-map', // 生产环境和开发环境的配置
	optimization: {
		minimize: true,
		usedExports: true, // 只导出被使用的模块
		minimizer: [
			// For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
			// `...`,
			// css压缩
			new CssMinimizerPlugin(),
			/* 似乎使用了CSS压缩就会造成在生成模式下webpack无法压缩js代码, 于是使用这一内置插件用以压缩js代码 */
			/* 开发环境下请注释掉下面的代码 */
			new TerserPlugin({
				parallel: true, // 可省略，默认开启并行
				terserOptions: {
					toplevel: true, // 最高级别，删除无用代码
					ie8: true,
					safari10: true
				}
			})
		]
	},
	cache: true, // 可省略，默认最优配置：生产环境，不缓存 false。开发环境，缓存到内存，memory
	performance: {
		hints: 'warning', // 只显示错误提示
		maxAssetSize: 300000, // 默认250kb 控制webpack最大入口点文件大小超出限制时发出性能提示
		maxEntrypointSize: 500000, // 控制webpack单个资产超出限制时发出性能提示
		assetFilter: function (assetFilename) {
			// 提供资源文件名的断言函数
			// 只给出js与css文件的性能提示
			return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
		}
	}
}
