import React, { memo, useState } from 'react'
import { Input, Button, Empty } from 'antd'
import TagItem from './TagItem'

import './index.scss'

const Category = () => {
    const arr = [...Array(20).keys()].map(item => ({ name: `我是第${item}个标签`, id: item + 1 }))
    const [categories, handleCategories] = useState(arr)
    return (
        <div className="category-wrapper">
            <div className="add-wrapper">
                <Input
                    placeholder="请输入分类名称"/>
                <Button type="primary">添加分类</Button>
            </div>
            <div className="category-content">
                {
                    !!categories.length ? (
                        categories.map(item => (
                            <TagItem
                                key={item.name}
                                {...item} />
                        ))
                    ) : (
                        <Empty
                            description="暂无分类"
                            image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                    )
                }
            </div>
        </div>
    )
}

export default memo(Category)
