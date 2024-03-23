import { Col, Row, Tab, Tabs } from 'react-bootstrap'
import { useSelectInputs } from '../../hooks/useSelectInputs'
import { generateInputsSelectOptions } from '../../../../utils/helpers'
import { Fragment } from 'react'
import { EnhancedInputSelect } from '../EnhancedInputSelect'
import { TextBlock } from '../legacy-components/TextBlock'

export function SelectInputs() {
	const { inputNodesInFlow, selectedInputsInJobDefinition, onInputChange, inputCategories, selectedPolicy } =
		useSelectInputs()

	console.log({ inputCategories })

	const inputs = generateInputsSelectOptions(inputNodesInFlow, selectedInputsInJobDefinition)

	return (
		<>
			<TextBlock className='pl-1 pt-2' style={{ fontStyle: 'italic' }}>
				If a particular input is not explicitly categorized, it will be grouped under the General section by default.
			</TextBlock>
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
									<Row className='mr-0 ml-0 mt-3'>
										{category.inputs.map((input, i) => (
											<Fragment key={i}>
												{inputs
													.filter(item => item.datasetKey === input)
													.map((inputItem, j) => (
														<Col key={j} xs={12} md={6} className='border border-light p-2'>
															<EnhancedInputSelect
																policyId={selectedPolicy.value}
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
																policyId={selectedPolicy.value}
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
		</>
	)
}
