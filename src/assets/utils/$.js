function $(tag) {
	if (/^\..*$/.test(tag)) {
		return document.querySelectorAll(tag)
	} else if (/^#.*$/.test(tag)) {
		return document.querySelector(tag)
	}
}
function haha() {
	console.log('这是写在utils的没有用的函数,用于测试树摇')
}

export { $, haha }
