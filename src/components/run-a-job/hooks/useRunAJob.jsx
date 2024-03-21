import { useState } from 'react'
import { useRunAJobStore } from '../store'

export const useRunAJob = () => {
	const [isLoadingFlows, setIsLoadingFlows] = useState(false)
	const [
		selectedPolicy,
		setSelectedPolicy,
		selectedPortfolio,
		setSelectedPortfolio,
		selectedStream,
		setSelectedStream,
		selectedFlow,
		setSelectedFlow,
		setFlowOptions,
		flowOptions,
		setPolicyOptions
	] = useRunAJobStore(state => [
		state.selectedPolicy,
		state.setSelectedPolicy,
		state.selectedPortfolio,
		state.setSelectedPortfolio,
		state.selectedStream,
		state.setSelectedStream,
		state.selectedFlow,
		state.setSelectedFlow,
		state.setFlowOptions,
		state.flowOptions,
		state.setPolicyOptions
	])

	return {
		selectedPolicy,
		setSelectedPolicy,
		selectedPortfolio,
		setSelectedPortfolio,
		selectedStream,
		setSelectedStream,
		selectedFlow,
		setSelectedFlow,
		flowOptions,
		isLoadingFlows,
		setFlowOptions,
		setPolicyOptions
	}
}
