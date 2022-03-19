module.exports = {
	tabWidth: 4, // 指定每个缩进级别的空格数。 // 默认2
	useTabs: false, // 用制表符而不是空格缩进行。// 默认false // 制表符将用于缩进，但Prettier使用空格来对齐事物，例如在三元音中
	semi: false, //在语句末尾打印分号 // 仅在可能引入 ASI 故障的行首添加分号
	singleQuote: true, // 使用单引号而不是双引号。
	trailingComma: 'es5', // 尾随逗号在ES5中有效
	bracketSpacing: true, //在对象文本中的括号之间打印空格。
	bracketSameLine: true, // 将多行 HTML（HTML、JSX、Vue、Angular）元素放在最后一行的末尾，而不是单独放在下一行（不适用于自闭合元素）。
	arrowParens: 'always', //箭头函数始终包含括号
	requirePragma: false,
	vueIndentScriptAndStyle: true //缩进 Vue 文件中的脚本和样式标签。
}
