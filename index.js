/* 引入全部css文件 */
require.context('./src/assets/css', false, /^\.\/.*\.css/)

/* 引入全部less文件 */
require.context('./src/assets/less', false, /^\.\/.*\.less/)

/* 引入全部js文件 */
const ctx = require.context('./src/assets/components', false, /^\.\/.*\.js/)
ctx.keys().forEach(item => {
	ctx(item).default
})
// const map = {}
// for (const key of ctx.keys()) {
// 	let fileKey = key.replace(/\.\/|\.js/g, '')
// 	map[fileKey] = ctx(key).default
// }

/* 引入全部图片文件 */
require.context('./src/assets/img', true, /^\.\/.*\.(png|jpe?g|gif)$/)

/* 引入全部音频文件 */
require.context('./src/assets/audio', true, /^\.\/.*\.mp3$/)

/* 引入全部视频文件 */
require.context('./src/assets/video', true, /^\.\/.*\.mp4$/)
