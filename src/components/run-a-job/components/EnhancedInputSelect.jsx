import { useState } from 'react'
import PropTypes from 'prop-types'
import { Badge, Form } from 'react-bootstrap'
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
	const { creditGradeType = null, datasetDescription = null, policies = '' } = selectedOption ?? {}

	const handleSelectChange = event => {
		const selectedOption = event.target.value
		setSelectedValue(selectedOption)

		if (onChange) {
			onChange(selectedOption)
		}
	}

	// from all the options, get the one that matches the value

	const isSignedOff = policies.includes(policyId + ':PASS')
	console.log({
		policyId,
		policies,
		isSignedOff
	})

	return (
		<Form.Group controlId='formGridState'>
			<Form.Label style={styles.formLabel}>{label}</Form.Label>

			{creditGradeType && (
				<Badge className='ml-2' variant='success'>
					{creditGradeType} data selected
				</Badge>
			)}

			{datasetDescription && (
				<Form.Text style={{ minHeight: '2.3rem' }} className='text-muted mb-3'>
					{datasetDescription}
				</Form.Text>
			)}
			<div className='d-flex justify-content-center  align-items-center'>
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

				{isSignedOff ? (
					<CiCircleCheck className='ml-2' size={23} color='green' />
				) : (
					<CiCircleRemove className='ml-2' size={23} color='red' />
				)}
			</div>
			<Form.Text className='text-muted'>{text}</Form.Text>
		</Form.Group>
	)
}
