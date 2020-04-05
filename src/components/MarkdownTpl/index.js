import React, { memo } from 'react'
import marked from 'marked'
import hljs from 'highlight.js'

import 'highlight.js/styles/monokai-sublime.css'
import './index.scss'

const MarkdownTpl = ({ content }) => {
	marked.setOptions({
		renderer: new marked.Renderer(),
		gfm: true,
		pedantic: false,
		sanitize: false,
		tables: true,
		breaks: true,
		smartLists: true,
		highlight: code => hljs.highlightAuto(code).value
	})
	const html = marked(content)
	return (
		<div
			dangerouslySetInnerHTML={{ __html: html }}
			className="markdown-content"></div>
	)
}

export default memo(MarkdownTpl)
