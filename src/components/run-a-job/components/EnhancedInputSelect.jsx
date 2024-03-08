import { useState } from 'react'
import PropTypes from 'prop-types'
import { Badge, Button, Form } from 'react-bootstrap'
import { CiCircleCheck, CiCircleRemove } from 'react-icons/ci'

const styles = {
	formLabel: {
		LineHeight: '1',
		fontWeight: '500',
		fontSize: '.875rem'
	}
}

EnhancedInputSelect.propTypes = {
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
	policyId: PropTypes.string
}

export function EnhancedInputSelect({
	policyId = '',
	disable = false,
	options,
	defaultValue = '',
	label,
	text,
	onChange,
	value
}) {
	const [selectedValue, setSelectedValue] = useState(defaultValue)

	const selectedOption = options.find(option => option.value === selectedValue)
	const {
		creditGradeType = null,
		datasetDescription = 'No description found in attributes.',
		policies = ''
	} = selectedOption ?? {}
	const isSignedOff = policyId ? policies.includes(policyId + ':PASS') : false

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

			{creditGradeType && (
				<Badge className='ml-2' variant='success'>
					{creditGradeType} data selected
				</Badge>
			)}

			<Form.Text style={{ minHeight: '2.3rem' }} className='text-muted mb-3'>
				{datasetDescription}
			</Form.Text>

			<div className='d-flex justify-content-center  align-items-center' style={{ gap: '10px' }}>
				<Form.Control
					className='mr-3'
					disabled={disable}
					as='select'
					value={value || selectedValue}
					onChange={handleSelectChange}
				>
					<option value='' disabled>
						{options.length ? 'Choose...' : 'No Data Available'}
					</option>
					{options.map((option, index) => (
						<option key={index} value={option.value}>
							{option.label}
						</option>
					))}
				</Form.Control>

				{isSignedOff ? <CiCircleCheck size={23} color='green' /> : <CiCircleRemove size={23} color='red' />}
				<Button variant='info' size='sm'>
					View
				</Button>
			</div>
			<Form.Text className='text-muted'>{text}</Form.Text>
		</Form.Group>
	)
}
