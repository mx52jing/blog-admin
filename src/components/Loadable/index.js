import React, { memo, lazy, Suspense } from 'react'

const Loadable = component => {
	const WrappendComponent = lazy(component)
	const Comp = props => {
		const { loading = null, ...rest } = props
		return (
			<Suspense fallback={loading}>
				<WrappendComponent {...rest} />
			</Suspense>
		)
	}
	return memo(Comp)
}

export default Loadable
