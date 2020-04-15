const path = require('path')
const { override, fixBabelImports, addWebpackAlias } = require('customize-cra');

module.exports = override(
	// 配置路径别名
	addWebpackAlias({
		'@components': path.resolve(__dirname, 'src/components'),
		'@pages': path.resolve(__dirname, 'src/pages'),
		'@api': path.resolve(__dirname, 'src/api')
	}),
	// antd按需加载
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: 'css',
	})
)
