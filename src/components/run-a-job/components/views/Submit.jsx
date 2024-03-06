import { Form } from 'react-bootstrap'
import { useSubmit } from '../../hooks/useSubmit'

export function Submit() {
	const { jobDefinitionForRequestBody } = useSubmit()
	return (
		<div>
			<Form.Group controlId='exampleForm.ControlTextarea1'>
				<Form.Label
					style={{
						fontStyle: 'italic',
						fontSize: '1.2em',
						fontWeight: 'bold',
						color: '#4f4f4f',
						textTransform: 'uppercase'
					}}
				>
					Your job metadata to submit
				</Form.Label>
				<Form.Control as='textarea' rows={20} value={JSON.stringify(jobDefinitionForRequestBody, null, 10)} />
			</Form.Group>
		</div>
	)
}
