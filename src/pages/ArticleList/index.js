import React, { memo, useState, useEffect, useCallback } from 'react'
import { getData } from '@api/request'

const ArticleList = props => {
	const [list, handleList] = useState([])
	useEffect(() => {
		fetchArticleList()
	}, [])
	const fetchArticleList = useCallback(() => {
		getData('/articles')
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			})
	}, [])
	return (
		<div className="article-list-wrapper">
			ArticleList
		</div>
	)
}

export default memo(ArticleList)
