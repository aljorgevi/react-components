import { Button, Col, Row } from 'react-bootstrap'
import { SelectGeneric } from '../../../SelectGeneric'
import { useSelectAFlow } from '../../hooks/useSelectAFlow'
import { useRunAJobStore } from '../../store'
import { isEmpty } from '../../../../utils/helpers'
import { CheckboxGroup } from '../CheckboxGroup'

export const SelectFlow = () => {
	const [portfolioOptions, streamOptions] = useRunAJobStore(store => [store.portfolioOptions, store.streamOptions])

	const {
		isLoadingFlows,
		flowOptions,
		selectedFlow,
		selectedStream,
		selectedPortfolio,
		isLoadingFlowMetadata,
		selectedPreviousJob,
		previousJobOptions,
		onFlowChange,
		loadFlows,
		onPortfolioCheckedChange,
		onPortfolioChange,
		onStreamChange,
		onStreamCheckedChange,
		onFlowCheckedChange,
		onPreviousJobChange
	} = useSelectAFlow() // Hook to manage the flow tab <- handles store and api calls

	const disableLoadFlowButton =
		selectedStream.value === '' || selectedPortfolio.value === '' || isLoadingFlows || isLoadingFlowMetadata

	const flowDropdownDescription = `${
		!isEmpty(flowOptions)
			? 'Select a flow to run against the policy'
			: 'Start by selecting a portfolio and stream to load flows'
	}`

	console.log({ selectedPortfolio })

	return (
		<section>
			<Row>
				<Col xs={6}>
					<SelectGeneric
						onChange={onPortfolioChange}
						value={selectedPortfolio.value}
						options={portfolioOptions}
						label='Portfolio'
					/>
					<CheckboxGroup onChange={onPortfolioCheckedChange} checked={selectedPortfolio.checked} />
				</Col>
			</Row>
			<Row className='mt-3'>
				<Col xs={6}>
					<SelectGeneric
						onChange={onStreamChange}
						value={selectedStream.value}
						options={streamOptions}
						label='Stream'
					/>
					<CheckboxGroup onChange={onStreamCheckedChange} checked={selectedStream.checked} />
				</Col>
			</Row>
			<Row className='mt-3'>
				<Col xs={2}>
					<Button variant='primary' disabled={disableLoadFlowButton} onClick={loadFlows}>
						Load Flows
					</Button>
				</Col>
			</Row>
			<Row className='mt-5'>
				<Col xs={6}>
					<SelectGeneric
						// this will force the component to render if the id changes
						key={selectedFlow.value}
						disable={isEmpty(flowOptions) || isLoadingFlows || isLoadingFlowMetadata}
						options={flowOptions}
						onChange={onFlowChange}
						value={selectedFlow.value}
						label='Flow'
						text={flowDropdownDescription}
					/>
					<CheckboxGroup onChange={onFlowCheckedChange} checked={selectedFlow.checked} />
				</Col>
			</Row>
			<Row className='mt-5'>
				<Col xs={6}>
					<SelectGeneric
						// this will force the component to render if the id changes
						key={selectedPreviousJob.value}
						disable={isEmpty(previousJobOptions) || isLoadingFlows || isLoadingFlowMetadata}
						options={previousJobOptions}
						onChange={onPreviousJobChange}
						value={selectedPreviousJob.value}
						label='Previous job'
						text='Select a job that has been previously executed by the selected flow, to use as a template'
					/>
					<CheckboxGroup onChange={onFlowCheckedChange} checked={selectedFlow.checked} />
				</Col>
			</Row>
		</section>
	)
}
