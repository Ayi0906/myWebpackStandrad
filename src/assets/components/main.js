import createImg from '../utils/createImg'
import { $ } from '../utils/$'
let src = require('../img/img (4).jpg')
$('#d4').appendChild(createImg(src))
console.log('调用了main.js')
