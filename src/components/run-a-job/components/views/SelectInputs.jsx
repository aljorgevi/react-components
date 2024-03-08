import { Col, Row, Tab, Tabs } from 'react-bootstrap'
import { useSelectInputs } from '../../hooks/useSelectInputs'
import { generateInputsSelectOptions } from '../../../../utils/helpers'
import { Fragment } from 'react'
import { EnhancedInputSelect } from '../EnhancedInputSelect'

const policyId = '01'

export function SelectInputs() {
	const { inputNodesInFlow, selectedInputsInJobDefinition, onInputChange, inputCategories } = useSelectInputs()

	const inputs = generateInputsSelectOptions(inputNodesInFlow, selectedInputsInJobDefinition)

	return (
		<Tabs defaultActiveKey='requiredCategories' id='categories-tabs'>
			<Tab eventKey='requiredCategories' title='Required Categories' className='text-dark'>
				{inputCategories.requiredCategories.map((category, index) => (
					<Tab.Pane key={index} eventKey={category.category}>
						<Tabs defaultActiveKey={`${category.category}-subtabs`} id={`${category.category}-subtabs`}>
							<Tab.Pane
								key={`${category.category}-subtabs`}
								eventKey={`${category.category}-subtabs`}
								title={category.category}
							>
								<Row>
									{category.inputs.map((input, i) => (
										<Fragment key={i}>
											{inputs
												.filter(item => item.datasetKey === input)
												.map((inputItem, j) => (
													<Col key={j} xs={12} md={6} className='border border-light p-5'>
														<EnhancedInputSelect
															policyId={policyId}
															defaultValue={inputItem.defaultValue ?? ''}
															options={inputItem.options}
															onChange={inputId => onInputChange({ datasetKey: inputItem.datasetKey, inputId })}
															label={inputItem.label}
														/>
													</Col>
												))}
										</Fragment>
									))}
								</Row>
							</Tab.Pane>
						</Tabs>
					</Tab.Pane>
				))}
			</Tab>

			<Tab eventKey='optionalCategories' title='Optional Categories'>
				{inputCategories.optionalCategories.map((category, index) => (
					<Tab.Pane key={index} eventKey={category.category}>
						<Tabs defaultActiveKey={`${category.category}-subtabs`} id={`${category.category}-subtabs`}>
							<Tab.Pane
								key={`${category.category}-subtabs`}
								eventKey={`${category.category}-subtabs`}
								title={category.category}
							>
								<Row className='align-items-center '>
									{category.inputs.map((input, i) => (
										<Fragment key={i}>
											{inputs
												.filter(item => item.datasetKey === input)
												.map((inputItem, j) => (
													<Col key={j} xs={12} md={6} className='border border-light p-5'>
														<EnhancedInputSelect
															policyId={policyId}
															defaultValue={inputItem.defaultValue ?? ''}
															options={inputItem.options}
															onChange={inputId => onInputChange({ datasetKey: inputItem.datasetKey, inputId })}
															label={inputItem.label}
														/>
													</Col>
												))}
										</Fragment>
									))}
								</Row>
							</Tab.Pane>
						</Tabs>
					</Tab.Pane>
				))}
			</Tab>
		</Tabs>
	)
}
