import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import { RunAJob } from './components/run-a-job'

function App() {
	return (
		<div>
			<Router>
				<Container>
					<Switch>
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
