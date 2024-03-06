import { SelectGeneric } from '../../../SelectGeneric'
import { Col, Row } from 'react-bootstrap'
import { useSelectModels } from '../../hooks/useSelectModels'
import { generateModelSelectOptions } from '../../../../utils/helpers'

export function SelectModels() {
	const { modelNodesInFlow, selectedModelsInJobDefinition, onModelChange } = useSelectModels()
	const models = generateModelSelectOptions(modelNodesInFlow, selectedModelsInJobDefinition)

	return (
		<Row>
			{models.map((model, index) => (
				<Col key={index} xs={12} md={6} className='border border-light p-5'>
					<SelectGeneric
						defaultValue={model.defaultValue ?? ''}
						options={model.options}
						onChange={modelId => onModelChange({ modelclass: model.modelClass, modelId })}
						label={model.label}
					/>
				</Col>
			))}
		</Row>
	)
}
