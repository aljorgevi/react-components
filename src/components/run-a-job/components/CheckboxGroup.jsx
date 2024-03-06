import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'

export const CheckboxGroup = ({ onChange, checked, label = 'keep this selection for the next time' }) => (
	<Form.Group className='mt-1'>
		<Form.Check onChange={onChange} checked={checked} type='checkbox' label={label} className='text-muted form-text' />
	</Form.Group>
)

CheckboxGroup.propTypes = {
	onChange: PropTypes.func.isRequired,
	checked: PropTypes.bool.isRequired,
	label: PropTypes.string
}
