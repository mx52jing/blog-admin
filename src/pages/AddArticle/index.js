import React, { memo, useCallback, useState, useEffect } from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { Row, Col, Input, Form, Button } from 'antd'
import MarkdownTpl from '@components/MarkdownTpl'
import MuiSelect from '@components/MuiSelect'
import { postData, getData, updateData } from "@api/request";

import './index.scss'

const { Item } = Form,
	{ TextArea } = Input

const AddArticle = () => {
	const [form] = Form.useForm(),
		{ resetFields, setFieldsValue } = form,
		history = useHistory(),
		{ params } = useRouteMatch(),
		isEdit = !!params.id && +params.id !== 0
	const [articleContent, setArticleContent] = useState('')
	useEffect(() => {
		const { id } = params
		if (isEdit) {
			getData(`/articles/${id}`)
				.then(res => {
					const { result = {} } = res,
						{ title, category, content, introduction } = result
					setFieldsValue && setFieldsValue({ title, category, content, introduction })
					setArticleContent(content)
				})
				.catch(err => {
					console.log(err);
				})
		}
		// eslint-disable-next-line
	}, [])
	/* 提交表单数据 */
	const onFinish = useCallback(values => {
		const {
				title,
				category,
				content,
				introduction,
				isPublished = true
			} = values,
			data = {
				title,
				category,
				content,
                introduction,
                isPublished
			},
			{ id } = params,
			postFn = isEdit ?
				updateData(`/articles/${id}`, data) :
				postData('/articles', data)
		postFn
			.then(res => {
				resetFields && resetFields()
                setArticleContent('')
				isEdit && history.replace('/admin/articleList')
			})
			.catch(err => {
				console.log(err);
			})
		// eslint-disable-next-line
	}, [])
	/* 文章内容变化函数 */
	const handleTextAreaChange = useCallback(event => {
		setArticleContent(event.target.value)
		// eslint-disable-next-line
	}, [])
    /* 存为草稿 */
	const handleSaveDarft = useCallback(() => {
        const data = form.getFieldsValue()
        onFinish({ ...data, isPublished: false })
    }, [])
    return (
		<div className="add-article-wrapper">
			<Form
				form={form}
				onFinish={onFinish}>
				<Row>
					<Col span={11}>
						<Item
							name='title'
							rules={[{
								required: true,
								message: '请输入文章标题'
							}]}>
							<Input
								size='large'
								placeholder="请输入文章标题"/>
						</Item>
					</Col>
					<Col span={12} offset={1}>
						<Item
							name='category'
							rules={[{ required: true, message: '请选择文章分类' }]}>
							<MuiSelect
								isAsync
								apiUrl='/categories'
								allowClear
								mode='multiple'
								requestOpt={{ isLoading: false }}
								placeholder='请选择文章分类'
								size='large'/>
						</Item>
					</Col>
				</Row>
				<Row>
                    <Col span={24}>
                        <Item
                            name='introduction'
                            rules={[{ required: true, message: '请输入文章简介' }]}>
							<TextArea
                                placeholder='请输入文章简介'
                                autoSize={{ minRows: 3, maxRows: 3 }}/>
                        </Item>
                    </Col>
				</Row>
				<Row>
					<Col span={11}>
						<Item
							name='content'
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
					{
						!isEdit ? (
                            <Item>
                                <Button
									className='draft-btn'
									size='large'
									type="primary"
									danger
									onClick={handleSaveDarft}
								>
                                    存为草稿
                                </Button>
                            </Item>
						) : null
					}
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
