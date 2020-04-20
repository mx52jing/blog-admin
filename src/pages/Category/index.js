import React, { memo, useState, useEffect, useCallback } from 'react'
import { Input, Button, Empty, message } from 'antd'
import TagItem from './TagItem'
import { getData, postData } from '@api/request'

import './index.scss'

const Category = () => {
	const [categories, handleCategories] = useState([]),
		[categoryName, handleCategoryName] = useState('')
    useEffect(() => {
		fetchCategory()
		// eslint-disable-next-line
    }, [])
	/* input change 事件 */
	const handleChange = useCallback((event) => {
		const { value } = event.target
		handleCategoryName(value)
	}, [])
	/* 添加按钮事件 */
	const handleAddCategory = useCallback(() => {
		if(!categoryName) {
			return message.error('分类名称不能为空')
		}
		postData('/categories', { name: categoryName })
			.then(({ result }) => {
				handleCategoryName('')
				fetchCategory()
			})
			.catch(err => {
				console.log(err);
			})
		// eslint-disable-next-line
	}, [categoryName])
    /* 请求分类数据 */
    const fetchCategory = useCallback(() => {
		getData('/categories')
            .then(({ result = [] }) => {
				handleCategories(result)
			})
            .catch(err => {
				console.log(err);
			})
    }, [])
    return (
        <div className="category-wrapper">
            <div className="add-wrapper">
                <Input
					value={categoryName}
					onChange={handleChange}
                    placeholder="请输入分类名称"/>
                <Button
					onClick={handleAddCategory}
                    type="primary">
                    添加分类
                </Button>
            </div>
            <div className="category-content">
                {
                    !!categories.length ? (
                        categories.map(item => (
                            <TagItem
                                key={item.name}
								fetchCategory={fetchCategory}
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
