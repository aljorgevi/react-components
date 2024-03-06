import { Form, Row } from 'react-bootstrap'

export function SelectParameters() {
	return (
		<Row>
			<Form>
				<Form.Check type='switch' id='custom-switch' label='Check this switch' />
				<Form.Check disabled type='switch' label='disabled switch' id='disabled-custom-switch' />
			</Form>
		</Row>
	)
}
