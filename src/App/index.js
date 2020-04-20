import React, { memo } from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import Loadable from '@components/Loadable'
import history from './history'

const Login = Loadable(() => import('@pages/Login'))
const Home = Loadable(() => import('@pages/Home'))

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={() => {
			const token = localStorage.getItem('token')
            return !!token ? <Component {...rest} /> : (
				<Redirect to='/login'/>
			)
		}}
	/>
)

const AppComponent = () => (
	<Router history={history}>
		<Switch>
            <Route path="/login" component={Login}/>
			<PrivateRoute path="/admin" component={Home}/>
			<Redirect to='/admin' />
		</Switch>
	</Router>
)

export default memo(AppComponent)

