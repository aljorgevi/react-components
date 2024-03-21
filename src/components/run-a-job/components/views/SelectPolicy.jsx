import { Col, Form, Row } from 'react-bootstrap'
import { useSelectPolicy } from '../../hooks/useSelectPolicy'
import { SelectGeneric } from '../../../SelectGeneric'

export function SelectPolicy() {
	const { selectedPolicy, onPolicyChange, onCheckedChange, policyOptions } = useSelectPolicy()

	return (
		<Row>
			<Col xs={4}>
				<SelectGeneric options={policyOptions} value={selectedPolicy.value} onChange={onPolicyChange} label='Policy' />
				<Form.Group className='mt-1'>
					<Form.Check
						onChange={onCheckedChange}
						checked={selectedPolicy.checked}
						type='checkbox'
						label='keep this selection for the next time'
						className='text-muted form-text'
					/>
				</Form.Group>
			</Col>
		</Row>
	)
}
