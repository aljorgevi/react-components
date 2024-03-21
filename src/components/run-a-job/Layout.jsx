'use client'

import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useRunAJob } from './hooks/useRunAJob'
import { toast } from 'react-toastify'
import { useSelectAFlow } from './hooks/useSelectAFlow'
import { useRunAJobStore } from './store'
import { useQueryChecker } from './hooks/useQueryChecker'
import { fetchPolicies } from './utils/api'
import { fetchFlows, fetchLatestFlowLatestTag } from '../../../api/meta-service'
import { composeDetailedLabel } from '../../../factories/tagHelpers'
import { mapFlowSearchToDropdownOptions } from '../../../factories/flowTag'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const loadDataFromLocalStorage = (key, setValue) => {
	const storedData = localStorage.getItem(key)
	if (storedData) {
		const parsedData = JSON.parse(storedData)
		if (parsedData?.checked) {
			setValue(parsedData)
		}
	}
}

const nonPortfolioError =
	'The selected flow does not have a portfolioId associated with it. Please ensure the flow has a portfolio set.'

Layout.propTypes = {
	children: PropTypes.node
}

/**
 *	This component it's a wrapper of the main component,
 * 	here we check if the values are in the local storage and set them in the state before the main component is rendered.
 *
 * @param {Object} options
 * @param {Object} options.children
 * @returns
 */
export function Layout({ children }) {
	const { flowId, policyId, previousJob } = useQueryChecker()

	const selectedFlow = useRunAJobStore(store => store.selectedFlow)
	const [loading, setLoading] = useState(true)
	// We acces the store from this hook.
	const {
		setSelectedPortfolio,
		setSelectedStream,
		setSelectedPolicy,
		setSelectedFlow,
		setFlowOptions,
		setPolicyOptions
	} = useRunAJob()
	// Hook designed specifically to manage the store within the "FLOW" tab, we get the function to change the flow if values were saved in the local storage.
	const { onFlowChange, processFlowSetup } = useSelectAFlow()

	async function initialPageWithQueryParams() {
		// first we fetch the latest tag of the flow
		const tag = await fetchLatestFlowLatestTag(flowId)

		if (tag) {
			const { attrs, definition } = tag
			const { inputs, nodes, asOfTime, objectId } = definition
			const { flowName, portfolioId } = attrs
			const label = composeDetailedLabel({ asOfTime, name: flowName?.value, objectId })

			if (!portfolioId) return toast.error(nonPortfolioError)

			const searchResult = await fetchFlows(portfolioId.value, 'ALL')
			const flowOptions = mapFlowSearchToDropdownOptions(searchResult)
			const isFlowInOptions = flowOptions.some(flow => flow.value === flowId)

			if (isFlowInOptions) {
				setFlowOptions(flowOptions)
				setSelectedFlow({ value: flowId, checked: false, label })
				setSelectedPortfolio({ value: portfolioId.value, checked: false })
				setSelectedStream({ value: 'ALL', checked: false })

				await processFlowSetup({ nodes, inputs, attrs, objectId })

				setLoading(false)
			} else {
				toast.error('The selected flow is not among the available options for the chosen portfolio and stream.')
			}
		} else {
			toast.error('There was an error fetching the flow tag, ensure the id is correct and try again.')
		}
	}

	async function initialPageWithPolicyQueryParams() {
		try {
			const policyOptions = await fetchPolicies()
			const isPolicyInOptions = policyOptions.some(policy => policy.value === policyId)

			isPolicyInOptions
				? setSelectedPolicy({ value: policyId, checked: false })
				: toast.error('The selected policy is not among the available options.')

			setPolicyOptions(policyOptions)
		} catch (error) {
			console.error('Error fetching policy options:', error)
			toast.error('An error occurred while fetching policy options.')
		}
	}

	useEffect(() => {
		const loadData = async () => {
			if (policyId) {
				await initialPageWithPolicyQueryParams()
			}

			if (flowId) {
				await initialPageWithQueryParams()

				if (!policyId) {
					loadDataFromLocalStorage('policy', setSelectedPolicy)
				}
			} else {
				await delay(500)
				loadDataFromLocalStorage('portfolio', setSelectedPortfolio)
				loadDataFromLocalStorage('stream', setSelectedStream)
				loadDataFromLocalStorage('policy', setSelectedPolicy)

				if (localStorage.getItem('portfolio') && localStorage.getItem('stream')) {
					console.log('Loading from local storage...')
					const portfolio = JSON.parse(localStorage.getItem('portfolio'))
					const stream = JSON.parse(localStorage.getItem('stream'))

					if (portfolio?.checked && stream?.checked) {
						const searchResult = await fetchFlows(portfolio.value, stream.value)
						const flowOptions = mapFlowSearchToDropdownOptions(searchResult)

						setFlowOptions(flowOptions)

						loadDataFromLocalStorage('flow', value => {
							if (value?.checked) {
								const isFlowInOptions = flowOptions.some(flow => flow.value === value.value)

								if (isFlowInOptions) {
									onFlowChange(value.value, false).then(() => {
										setSelectedFlow(value)
									})
								}
							} else {
								toast.error('The selected flow is not among the available options for the chosen portfolio and stream.')
							}
						})
					}
				}

				await delay(1000)
				setLoading(false)
			}
		}

		loadData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<section className='mt-3' style={{ width: '100%' }}>
			<div className='mb-3 p-3' style={{ borderBottom: '1px solid #e0e0e0' }}>
				<h3>Run a Job</h3>
				<h5>{selectedFlow.label}</h5>
			</div>
			<div>
				{loading ? (
					<div className='d-flex justify-content-center align-items-center' style={{ height: '50vh' }}>
						<div>
							<h5 className='mt-5' style={{ fontWeight: 'bold', textAlign: 'center' }}>
								Loading, please wait...
							</h5>
						</div>
					</div>
				) : (
					children
				)}
			</div>
		</section>
	)
}
