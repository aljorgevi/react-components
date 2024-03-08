import { useState } from 'react'
import { Row, Col, Badge } from 'react-bootstrap'
import { Layout } from './Layout'
import { SelectInputs, SelectModels, SelectFlow, Submit, SelectPolicy, SelectParameters } from './components/views'
import { Sidebar } from './components/Sidebar'

export function RunAJob() {
	const [selectedOption, setSelectedOption] = useState('flow') // Initial selected option

	const viewComponents = {
		flow: <SelectFlow />,
		policy: <SelectPolicy />,
		models: <SelectModels />,
		parameters: <SelectParameters />,
		inputs: <SelectInputs />,
		submit: <Submit />
	}

	return (
		<Layout>
			<Row className='pb-5'>
				<Col xs={2}>
					<Sidebar
						selectedOption={selectedOption}
						setSelectedOption={setSelectedOption}
						navItems={[
							{ eventKey: 'flow', label: 'Flow' },
							{ eventKey: 'policy', label: 'Policy' },
							{ eventKey: 'models', label: 'Models' },
							{ eventKey: 'parameters', label: 'Parameters' },
							{ eventKey: 'inputs', label: 'Inputs' },
							{ eventKey: 'outputs', label: 'Outputs' },
							{ eventKey: 'attrs', label: 'Attrs' },
							{ eventKey: 'submit', label: 'Submit' }
						]}
					/>
				</Col>

				<Col className='px-5' xs={10}>
					{viewComponents[selectedOption]}
				</Col>
			</Row>
		</Layout>
	)
}
