import { Container } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { RunAJob } from './components/run-a-job'

function App() {
	return (
		<div>
			<BrowserRouter>
				<Container>
					<RunAJob />
					<ToastContainer position='bottom-right' />
				</Container>
			</BrowserRouter>
		</div>
	)
}

export default App
