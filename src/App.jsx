import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import { RunAJob } from './components/run-a-job'
import { GenericForm } from './components/GenericForm'

function App() {
	return (
		<div>
			<Router>
				<Container>
					<Switch>
						<Route path='/' exact>
							<GenericForm
								onSubmit={data => {
									console.log(data)
								}}
								schema={[
									{
										name: 'firstName',
										label: 'First Name',
										placeholder: 'Enter your first name',
										type: 'text',
										description: 'Enter your first name',
										validation: {
											required: true,
											message: 'First name is required',
											pattern: {
												value: /^[a-zA-Z]+$/,
												message: 'First name should contain only letters'
											},
											minLength: {
												value: 2,
												message: 'First name should have at least 2 characters'
											},
											maxLength: {
												value: 20,
												message: 'First name should have at most 20 characters'
											}
										}
									},
									{ name: 'email', label: 'Email', placeholder: 'Enter your email', type: 'email' },
									{
										name: 'country',
										label: 'Country',
										type: 'select',
										options: [
											{ label: 'Select a country', value: '' },
											{ label: 'United States', value: 'US' },
											{ label: 'Canada', value: 'CA' }
											// Add more options as needed
										]
									}
								]}
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
