import React, { memo, useCallback, useState, useMemo } from 'react'
import { Input, Tag, Modal, Popconfirm, message } from 'antd'
import { EditOutlined, CloseOutlined } from '@ant-design/icons'
import { updateData, deleteData } from '@api/request'

const colors = ['#f50', '#2db7f5', '#87d068', '#108ee9', '#13c2c2', '#fa8c16', '#8959cc', '#fa541c', '#4764da']

const TagItem = ({ name, _id, fetchCategory }) => {
	const [categoryVal, handleSetCategory] = useState(name),
		[showEditModal, handleShowEditModal] = useState(false)
	const categoryColor = useMemo(() => colors[Math.floor(Math.random() * 9)], [])
	const handleInputChange = useCallback(event => {
		const { value } = event.target
		handleSetCategory(value)
	}, [])
	const handleOk = useCallback(() => {
		if (!categoryVal) {
			return message.error('分类名称不能为空')
		}
		updateData(
			`/categories/${_id}`,
			{ name: categoryVal }
		).then(res => {
			message.success(res.result)
			handleShowEditModal(false)
			fetchCategory && fetchCategory()
		}).catch(err => {
			console.log(err);
		})
	}, [categoryVal])
	const handleDelete = useCallback(() => {
		deleteData(`/categories/${_id}`)
			.then(({ result }) => {
				message.success(result)
				fetchCategory && fetchCategory()
			})
			.catch(err => {
				console.log(err);
			})
	}, [])
	return (
		<>
			<Tag color={categoryColor}>
				<span className="category-name">{name}</span>
				<EditOutlined onClick={() => handleShowEditModal(true)}/>
				<Popconfirm
					onConfirm={handleDelete}
					title="确定删除吗">
					<CloseOutlined/>
				</Popconfirm>
			</Tag>
			<Modal
				width={300}
				closable={false}
				className='category-edit-modal'
				centered
				visible={showEditModal}
				onCancel={() => handleShowEditModal(false)}
				onOk={handleOk}>
				<Input
					onChange={handleInputChange}
					placeholder="请输入分类名称"
					value={categoryVal}/>
			</Modal>
		</>
	)
}

export default memo(TagItem)
