import React, { memo, useState, useEffect, useCallback } from 'react'
import { Table, Button, Tag, Modal } from 'antd'
import CategoryEdit from './CategoryEdit'
import { getData, postData, deleteData } from '@api/request'

import './index.scss'

const Category = () => {
	const [categoryData, setCategoryData] = useState([]),
		[dialogConfig, setDialogConfig] = useState({
			visible: false,
			dialogContent: null
		}),
		[selectRowIds, setSelectRows] = useState([]),
		{ data = [], total = 0, page } = categoryData,
		{ visible, dialogContent } = dialogConfig,
		len = selectRowIds.length
	const columns = [
		{
			title: '分类名称',
			dataIndex: 'name',
			render(text, record, index) {
				return <Tag color="cyan">{text}</Tag>
			}
		},
		{
			title: '操作',
			dataIndex: 'category_operation',
			render(text, record, index) {
				const { _id } = record
				return (
					<div className="operation-btns">
						<Button
							type='primary'
							onClick={() => handleEdit(record)}>
							编辑
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
		fetchCategoryData()
		// eslint-disable-next-line
	}, [])
	/* 请求分类数据 */
	const fetchCategoryData = useCallback((data = {}) => {
		getData('/categories', data)
			.then(({ result = {} }) => {
				setCategoryData(result)
			})
			.catch(err => {
				console.log(err);
			})
	}, [])
	/* 编辑分类 */
	const handleEdit = useCallback(data => {
		const el = (
			<CategoryEdit
				fetchCategoryData={fetchCategoryData}
				onCancel={handleCancel}
				data={data}/>
		)
		setDialogConfig({
			visible: true,
			dialogContent: el
		})
	}, [])
	/* 取消 */
	const handleCancel = useCallback(() => {
		setDialogConfig({ visible: false, dialogContent: null })
	}, [])
	/* 删除分类 */
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
					`/categories/${postId}`,
					{ ids: isSingleDel ? [] : selectRowIds.slice(1) }
				)
					.then(() => {
						fetchCategoryData()
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
	/* 分页 */
	const handlePageChange = useCallback((page, pageSize) => {
		fetchCategoryData({ page, pageSize })
	}, [])
	/* 多选 */
	const onSelectChange = useCallback(selectedRowKeys => {
		setSelectRows(selectedRowKeys)
	}, [])
	return (
		<div className="category-wrapper">
			<div className="category-content">
				<div className="table-btns">
					<Button
						onClick={handleEdit}
						type="primary"
					>
						添加分类
					</Button>
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
			<Modal
				wrapClassName='category-dialog__edit'
				width={300}
				centered
				closable={false}
				footer={null}
				visible={visible}>
				{dialogContent}
			</Modal>
		</div>
	)
}

export default memo(Category)
