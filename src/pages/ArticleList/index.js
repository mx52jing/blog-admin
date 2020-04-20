import React, { memo, useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, Button, Tag, Modal } from 'antd'
import MarkdownTpl from '@components/MarkdownTpl'
import { getData, deleteData } from '@api/request'
import { dateFormat } from '@api/utils'

import './index.scss'

const ArticleList = () => {
    const history = useHistory()
    const [articleData, setArticleData] = useState({}),
        { data = [], total = 0, page } = articleData
    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
        },
        {
            title: '分类',
            dataIndex: 'category',
            render(text, record, index) {
                return text.map(item => <Tag color='cyan' key={item}>{item}</Tag>)
            }
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            render(text, record, index) {
                return <span>{dateFormat(text, 'yyyy-MM-dd hh:mm')}</span>
            }
        },
        {
            title: '更新时间',
            dataIndex: 'updateAt',
            render(text, record, index) {
                return <span>{dateFormat(text, 'yyyy-MM-dd hh:mm')}</span>
            }
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render(text, record, index) {
                const { _id } = record
                return (
                    <div className="operation-btns">
                        <Button
                            type='primary'
                            onClick={() => history.push(`/admin/articleEdit/${_id}`)}>
                            编辑
                        </Button>
                        <Button
                            type='primary'
                            onClick={() => handlePreview(record)}>
                            预览
                        </Button>
                        <Button
                            type="primary"
                            danger
                            onClick={() => handleDelete(_id)}>
                            删除
                        </Button>
                    </div>
                )
            }
        }
    ]
    useEffect(() => {
        fetchArticleList()
		// eslint-disable-next-line
    }, [])
    /* 请求文章列表 */
    const fetchArticleList = useCallback(() => {
        getData('/articles')
            .then(res => {
                const { result = {} } = res
                setArticleData(result)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    /* 删除文章 */
    const handleDelete = useCallback(id => {
        if (!id) return
        Modal.confirm({
            className: 'article-modal__delete',
            width: 300,
            title: '确定要删除这篇文章吗',
            centered: true,
            onOk(close) {
                deleteData(`/articles/${id}`)
                    .then(() => {
                        fetchArticleList()
                        close()
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        })
		// eslint-disable-next-line
    }, [])
    /* 预览文章 */
    const handlePreview = useCallback(record => {
        const { content } = record
        Modal.confirm({
            className: 'article-modal__preview',
            width: 800,
            title: '预览文章',
            centered: true,
            content: <MarkdownTpl content={content}/>
        })
		// eslint-disable-next-line
    }, [])
    /* 分页 */
    const handlePageChange = useCallback((page, pageSize) => {
        getData('/articles', { page, pageSize })
            .then(res => {
                const { result } = res
                setArticleData(result)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    return (
        <div className="article-list-wrapper">
            <Table
                rowKey="_id"
                columns={columns}
                dataSource={data}
                pagination={{
					hideOnSinglePage: true,
                    total,
                    current: page,
                    pageSize: 10,
                    position: ['bottomCenter'],
                    onChange: handlePageChange
                }}
            />
        </div>
    )
}

export default memo(ArticleList)
