import React, { memo, useCallback, useState } from 'react'
import { Row, Col, Input, Select, Form, Button } from 'antd'
import MarkdownTpl from '@components/MarkdownTpl'

import './index.scss'

const { Item } = Form,
	{ TextArea } = Input

const AddArticle = props => {
	const [articleContent, setArticleContent] = useState('')
	const onFinish = useCallback(values => {
		console.log(values);
	}, [])
	const handleTextAreaChange = useCallback(event => {
		setArticleContent(event.target.value)
	}, [])
	return (
		<div className="add-article-wrapper">
			<Form
				onFinish={onFinish}>
				<Row>
					<Col span={6}>
						<Item
							name='article_title'
							rules={[{ required: true, message: '请输入文章标题' }]}>
							<Input
								size='large'
								placeholder="请输入文章标题"/>
						</Item>
					</Col>
					<Col span={6} offset={1}>
						<Item
							name='article_category'
							rules={[{ required: true, message: '请选择文章分类' }]}>
							<Select
								placeholder='请选择文章分类'
								size='large'/>
						</Item>
					</Col>
					<Col span={6} offset={1}>
						<Item
							name='article_tag'>
							<Input
								size='large'
								placeholder="请输入文章标签(多个标签以,分割)"/>
						</Item>
					</Col>
				</Row>
				<Row>
					<Col span={11}>
						<Item
							name='article_content'
							rules={[{ required: true, message: '请输入文章内容' }]}>
							<TextArea
								onChange={handleTextAreaChange}
								placeholder='请输入文章内容'
								autoSize={{ minRows: 30, maxRows: 30 }}/>
						</Item>
					</Col>
					<Col offset={1} span={12}>
						<div className="article-show">
							<MarkdownTpl content={articleContent}/>
						</div>
					</Col>
				</Row>
				<Row>
					<Item>
						<Button size='large' type="primary" htmlType="submit">
							发表文章
						</Button>
					</Item>
				</Row>
			</Form>
		</div>
	)
}

export default memo(AddArticle)
