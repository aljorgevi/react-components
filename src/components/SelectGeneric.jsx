import { useState } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'

const styles = {
	formLabel: {
		LineHeight: '1',
		fontWeight: '500',
		fontSize: '.875rem'
	}
}

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
	disable: PropTypes.bool
}

export function SelectGeneric({ disable = false, options, defaultValue = '', label, text, onChange, value }) {
	console.log({ value })
	const [selectedValue, setSelectedValue] = useState(defaultValue)

	const handleSelectChange = event => {
		const selectedOption = event.target.value
		setSelectedValue(selectedOption)

		if (onChange) {
			onChange(selectedOption)
		}
	}

	return (
		<Form.Group controlId='formGridState'>
			<Form.Label style={styles.formLabel}>{label}</Form.Label>
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
		</Form.Group>
	)
}
