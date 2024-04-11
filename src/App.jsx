import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import { RunAJob } from './components/run-a-job'
import { DynamicSidebarLayout } from './components/DynamicSidebarLayout'

function App() {
	return (
		<div>
			<Router>
				<Container>
					<Switch>
						<Route path='/' exact>
							<DynamicSidebarLayout
								loading={false}
								title='Home'
								description='Welcome to the home page'
								navItems={[
									{ eventKey: 'inputs', label: 'Inputs' },
									{ eventKey: 'models', label: 'Models' }
								]}
								viewComponents={{
									inputs: <div>Inputs</div>,
									models: <div>Models</div>
								}}
							/>
						</Route>
						<Route path='/run-a-job'>
							<RunAJob />
						</Route>
					</Switch>
					<ToastContainer position='bottom-right' />
				</Container>
			</Router>
		</div>
	)
}

export default App
