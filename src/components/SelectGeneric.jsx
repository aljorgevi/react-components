import { useState } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'

SelectGeneric.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired
		})
	).isRequired,
	defaultValue: PropTypes.string,
	label: PropTypes.string.isRequired,
	text: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string,
	disable: PropTypes.bool,
	error: PropTypes.string
}

/**
 * `SelectGeneric` is a reusable select input component utilizing React Bootstrap.
 * It renders a dropdown list based on the provided options and handles selection changes.
 *
 * @param {Object} props Component props.
 * @param {Array<{value: string, label: string}>} props.options - Array of option objects for the select dropdown.
 * @param {string} [props.defaultValue=''] - The default value of the select input.
 * @param {string} props.label - Label for the select input.
 * @param {string} [props.text] - Optional additional text to be displayed as Form.Text, usually for providing guidance.
 * @param {Function} props.onChange - Callback function that is called when the selected option changes. Receives the new value as an argument.
 * @param {string} [props.value] - Controlled value of the select input; if provided, the component behaves as controlled.
 * @param {boolean} [props.disable=false] - If `true`, disables the select input.
 * @param {string} [props.error] - Error message text. If provided, displays an error message under the select input.
 *
 * @returns {JSX.Element} The `SelectGeneric` component.
 */
export function SelectGeneric({ error, disable = false, options, defaultValue = '', label, text, onChange, value }) {
	const [selectedValue, setSelectedValue] = useState(defaultValue)

	const handleSelectChange = event => {
		setSelectedValue(event.target.value)

		if (onChange) {
			onChange(event.target.value)
		}
	}

	return (
		<Form.Group controlId='formGridState'>
			<Form.Label style={{ LineHeight: '1', fontWeight: '500', fontSize: '.875rem' }}>{label}</Form.Label>
			<Form.Control disabled={disable} as='select' value={value || selectedValue} onChange={handleSelectChange}>
				<option value='' disabled>
					{options.length ? 'Choose...' : 'No Data Available'}
				</option>
				{options.map((option, index) => (
					<option key={index} value={option.value}>
						{option.label}
					</option>
				))}
			</Form.Control>
			<Form.Text className='text-muted'>{text}</Form.Text>
			{error && <Form.Text className='text-danger'>{error}</Form.Text>}
		</Form.Group>
	)
}
