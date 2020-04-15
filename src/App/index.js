import React, { memo } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Loadable from '@components/Loadable'

const Login = Loadable(() => import('@pages/Login'))
const Home = Loadable(() => import('@pages/Home'))

const AppComponent = () => (
	<Router>
		<Switch>
			<Route path="/admin" component={Home}/>
			<Route path="/login" component={Login}/>
			<Redirect to='/admin' />
		</Switch>
	</Router>
)

export default memo(AppComponent)

