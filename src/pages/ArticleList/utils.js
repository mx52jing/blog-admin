import React from 'react'
import { Tag, Button } from 'antd'
import { dateFormat }  from '@api/utils'

export const columns = [
    {
        title: '标题',
        dataIndex: 'title',
    },
    {
        title: '分类',
        dataIndex: 'category',
        render(text, record, index) {
            return text.map(item => <Tag key={item}>{item}</Tag>)
        }
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
        render(text, record, index) {
            return <span>{dateFormat(text, 'yyyy-MM-dd hh:mm:ss')}</span>
        }
    },
    {
        title: '操作',
        dataIndex: 'operation'
    }
];

