import React, { memo, useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, Button, Tag, Modal } from 'antd'
import MarkdownTpl from '@components/MarkdownTpl'
import { getData, deleteData, updateData } from '@api/request'
import { dateFormat } from '@api/utils'

import './index.scss'

const ArticleList = () => {
    const history = useHistory()
    const [articleData, setArticleData] = useState({}),
        [selectRowIds, setSelectRows] = useState([]),
        { data = [], total = 0, page } = articleData,
        len = selectRowIds.length
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
            title: '浏览量',
            dataIndex: 'pv'
        },
        {
            title: '状态',
            dataIndex: 'isPublished',
            render(text, record, index) {
                return <span>{text ? '已发布' : '未发布'}</span>
            }
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render(text, record, index) {
                const { _id, isPublished } = record
                return (
                    <div className="operation-btns">
                        {
                            !isPublished ? (
                                <Button
                                    type='primary'
                                    onClick={() => handlePublish(record)}>
                                    发布
                                </Button>
                            ) : null
                        }
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
    const fetchArticleList = useCallback((data = {}) => {
        getData('/articles', data)
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
        /* 是单个删除还是批量删除 */
        const isSingleDel = typeof id === 'string',
            postId = isSingleDel ? id : selectRowIds[0]
        Modal.confirm({
            className: 'article-modal__delete',
            width: 300,
            title: '确定要删除所选吗',
            centered: true,
            onOk(close) {
                deleteData(
                    `/articles/${postId}`,
                    { ids: isSingleDel ? [] : selectRowIds.slice(1) }
                )
                    .then(() => {
                        fetchArticleList()
                        setSelectRows([])
                        close()
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        })
        // eslint-disable-next-line
    }, [selectRowIds])
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
        fetchArticleList({ page, pageSize })
    }, [])
    /* 多选 */
    const onSelectChange = useCallback(selectedRowKeys => {
        setSelectRows(selectedRowKeys)
    }, [])
    /* 发布文章 */
    const handlePublish = useCallback(record => {
        const { _id } = record,
            data = { ...record, isPublished: true }
        Modal.confirm({
            className: 'article-modal__delete',
            width: 300,
            title: '确定要发布吗',
            centered: true,
            onOk(close) {
                updateData(`/articles/${_id}`, data)
                    .then(() => {
                        fetchArticleList()
                        close()
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        })
    }, [])
    return (
        <div className="article-list-wrapper">
            <div className="table-btns">
                <Button
                    onClick={handleDelete}
                    type="primary"
                    disabled={!len}
                    danger
                >
                    批量删除
                </Button>
                {!!len && <span>选择了{len}条数据</span>}
            </div>
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
                rowSelection={{
                    selectedRowKeys: selectRowIds,
                    onChange: onSelectChange
                }}
            />
        </div>
    )
}

export default memo(ArticleList)
