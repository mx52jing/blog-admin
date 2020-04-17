import React, { memo, useState, useEffect, useCallback } from 'react'
import { Table, Button } from 'antd'
import { getData } from '@api/request'
import { columns } from './utils'

const ArticleList = props => {
    const [list, handleList] = useState([])
    useEffect(() => {
        fetchArticleList()
    }, [])
    const fetchArticleList = useCallback(() => {
        getData('/articles')
            .then(res => {
                const { result = {} } = res,
                    { data } = result
                handleList(data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    console.log(list);
    return (
        <div className="article-list-wrapper">
            <Table
                rowKey="_id"
                columns={columns}
                dataSource={list}
            />
        </div>
    )
}

export default memo(ArticleList)
