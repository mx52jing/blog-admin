import React, { memo, useCallback, useState } from 'react'
import { Select, Spin } from 'antd'
import { getData } from '@api/request'

const { Option } = Select

const MuiSelect = props => {
	const {
		isAsync,
		optionData,
		apiUrl,
		apiParams,
		requestOpt,
		responseDataKey,
		labelKey,
		notFoundContent,
		...rest
	} = props
	const [options, handleOptions] = useState(optionData)
	const onDropdownVisibleChange = useCallback((open) => {
		if (open && isAsync && !!apiUrl) {
			getOptionData()
		}
		// eslint-disable-next-line
	}, [])
	const getOptionData = useCallback(() => {
		getData(apiUrl, apiParams, requestOpt)
			.then(res => {
				const data = res[responseDataKey]
				handleOptions(data)
			})
			.catch(err => {
				console.log(err);
			})
		// eslint-disable-next-line
	}, [])
	return (
		<Select
			{...rest}
			notFoundContent={notFoundContent}
			onDropdownVisibleChange={onDropdownVisibleChange}>
			{
				options.map(item => (
					<Option
						key={item[labelKey]}>
						{item[labelKey]}
					</Option>
				))
			}
		</Select>
	)
}

MuiSelect.defaultProps = {
	isAsync: false, // 是否支持下拉请求
	optionData: [], // 下拉数据数组
	apiUrl: null, // 下拉请求路径
	apiParams: {}, // 下拉请求参数
	responseDataKey: 'result', // 获取数据的字段
	labelKey: 'name', // 下拉展示的字段key
	requestOpt: {},
	notFoundContent: <Spin size="small" />
}


export default memo(MuiSelect)
