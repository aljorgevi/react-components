import { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { SelectGeneric } from './SelectGeneric'

GenericForm.propTypes = {
	schema: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			placeholder: PropTypes.string,
			type: PropTypes.string.isRequired,
			defaultValue: PropTypes.string,
			description: PropTypes.string,
			options: PropTypes.arrayOf(
				PropTypes.shape({
					label: PropTypes.string.isRequired,
					value: PropTypes.string.isRequired
				})
			)
		})
	).isRequired,
	onSubmit: PropTypes.func.isRequired,
	submitButtonText: PropTypes.string
}

/**
 * @typedef {{
 *  name: string,
 *  label: string,
 *  placeholder: string,
 *  type: string,
 *  defaultValue: string,
 *  description: string,
 *  options: {
 *    label: string,
 *    value: string
 *  }[],
 * validations: {
 *   required: boolean,
 *  message: string,
 * pattern: {
 *   value: string,
 *  message: string
 * },
 * minLength: {
 *  value: number,
 * message: string
 * },
 * maxLength: {
 * value: number,
 * message: string
 * }
 * },
 * }} FormSchema
 */

/**
 * Renders a custom form based on the provided schema and handles form submission.
 * @param {{schema: FormSchema[], onSubmit: Function, submitButtonText: string }} props The component props.
 */
export function GenericForm({ schema, onSubmit, submitButtonText = 'Submit' }) {
	const [errors, setErrors] = useState({})
	const [formData, setFormData] = useState(() => {
		const initialData = {}
		schema.forEach(field => {
			initialData[field.name] = field.defaultValue || ''
		})
		return initialData
	})

	const handleChange = (name, value) => {
		const errorMessage = validateField(name, value)
		setErrors(prev => ({ ...prev, [name]: errorMessage }))

		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = event => {
		event.preventDefault()

		// Validate all fields
		const newErrors = {}
		Object.keys(formData).forEach(name => {
			const value = formData[name]
			const errorMessage = validateField(name, value)
			if (errorMessage) {
				newErrors[name] = errorMessage
			}
		})

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors) // Prevent submission and show errors
			return
		}

		onSubmit(formData)
	}

	function validateField(name, value) {
		const rules = schema.find(field => field.name === name)?.validations
		if (!rules) return '' // No validation rules

		if (rules.required && !value) {
			return rules.message // Required field message
		}

		if (rules.pattern && !new RegExp(rules.pattern.value).test(value)) {
			return rules.pattern.message // Pattern validation message
		}

		if (rules.minLength && value.length < rules.minLength.value) {
			return rules.minLength.message // Min length message
		}

		if (rules.maxLength && value.length > rules.maxLength.value) {
			return rules.maxLength.message // Max length message
		}

		return '' // No errors
	}

	return (
		<Form onSubmit={handleSubmit}>
			{schema.map((field, index) => (
				<Row key={index}>
					<Col sm={12} {...field.colSize}>
						{field.type !== 'select' ? (
							<Form.Group key={index} controlId={field.name}>
								<Form.Label style={{ LineHeight: '1', fontWeight: '500', fontSize: '.875rem' }}>
									{field.label}
								</Form.Label>
								<Form.Control
									type={field.type}
									placeholder={field.placeholder}
									value={formData[field.name]}
									onChange={e => handleChange(field.name, e.target.value)}
								/>
								<Form.Text className='text-muted'>{field.description}</Form.Text>

								{errors[field.name] && <Form.Text className='text-danger'>{errors[field.name]}</Form.Text>}
							</Form.Group>
						) : (
							<SelectGeneric
								options={field.options}
								label={field.label}
								value={formData[field.name]}
								onChange={value => handleChange(field.name, value)}
								error={errors[field.name]}
							/>
						)}
					</Col>
				</Row>
			))}
			<Button variant='primary' type='submit'>
				{submitButtonText}
			</Button>
		</Form>
	)
}
