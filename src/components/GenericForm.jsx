import { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'
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
	onSubmit: PropTypes.func.isRequired
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
 *  }[]
 * }} FormSchema
 */

/**
 * Renders a custom form based on the provided schema and handles form submission.
 * @param {{schema: FormSchema[], onSubmit: Function}} props The component props.
 */
export function GenericForm({ schema, onSubmit }) {
	const [formData, setFormData] = useState(() => {
		const initialData = {}
		schema.forEach(field => {
			initialData[field.name] = field.defaultValue || ''
		})
		return initialData
	})

	const handleChange = (name, value) => {
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = event => {
		event.preventDefault()

		onSubmit(formData)
	}

	console.log({
		schema
	})

	return (
		<Form onSubmit={handleSubmit}>
			{schema.map((field, index) => (
				<div key={index}>
					{field.type !== 'select' ? (
						<Form.Group key={index} controlId={field.name}>
							<Form.Label>{field.label}</Form.Label>
							<Form.Control
								type={field.type}
								placeholder={field.placeholder}
								value={formData[field.name]}
								onChange={e => handleChange(field.name, e.target.value)}
							/>
							<Form.Text className='text-muted'>{field.description}</Form.Text>
						</Form.Group>
					) : (
						<SelectGeneric
							options={field.options}
							label={field.label}
							value={formData[field.name]}
							onChange={value => handleChange(field.name, value)}
						/>
					)}
				</div>
			))}
			<Button variant='primary' type='submit'>
				Submit
			</Button>
		</Form>
	)
}
