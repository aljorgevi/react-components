import React, { useState, ChangeEvent } from 'react'
import { Form } from 'react-bootstrap'

interface Option {
	value: string
	label: string
}

interface SelectGenericProps {
	options: Option[]
	defaultValue?: string
	label: string
	text?: string
	onChange?: (value: string) => void
	value?: string
	disable?: boolean
	error?: string
}

/**
 * `SelectGeneric` is a reusable select input component utilizing React Bootstrap.
 * It renders a dropdown list based on the provided options and handles selection changes.
 *
 * @param {SelectGenericProps} props Component props.
 * @returns {JSX.Element} The `SelectGeneric` component.
 */
export const SelectGeneric: React.FC<SelectGenericProps> = ({
	error,
	disable = false,
	options,
	defaultValue = '',
	label,
	text,
	onChange,
	value
}) => {
	const [selectedValue, setSelectedValue] = useState<string>(defaultValue)

	const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const newValue = event.target.value
		setSelectedValue(newValue)

		if (onChange) {
			onChange(newValue)
		}
	}

	return (
		<Form.Group controlId='formGridState'>
			<Form.Label style={{ lineHeight: '1', fontWeight: '500', fontSize: '.875rem' }}>{label}</Form.Label>
			<Form.Control as='select' disabled={disable} value={value || selectedValue} onChange={handleSelectChange}>
				<option value='' disabled>
					{options.length ? 'Choose...' : 'No Data Available'}
				</option>
				{options.map((option, index) => (
					<option key={index} value={option.value}>
						{option.label}
					</option>
				))}
			</Form.Control>
			{text && <Form.Text className='text-muted'>{text}</Form.Text>}
			{error && <Form.Text className='text-danger'>{error}</Form.Text>}
		</Form.Group>
	)
}
