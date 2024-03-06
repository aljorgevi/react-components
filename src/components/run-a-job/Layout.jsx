'use client'

import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useRunAJob } from './hooks/useRunAJob'
import { createLabel2, fetchFlowOptions, fetchLatestFlowLatestTag } from '../../utils/helpers'
import { toast } from 'react-toastify'
import { useSelectAFlow } from './hooks/useSelectAFlow'
import { useRunAJobStore } from './store'
import { useQueryChecker } from './hooks/useQueryChecker'

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
	const { flowId, hasFlowId } = useQueryChecker()

	const selectedFlow = useRunAJobStore(store => store.selectedFlow)
	const [loading, setLoading] = useState(true)
	// We acces the store from this hook.
	const { setSelectedPortfolio, setSelectedStream, setSelectedPolicy, setSelectedFlow, setFlowOptions } = useRunAJob()
	// Hook designed specifically to manage the store within the "FLOW" tab, we get the function to change the flow if values were saved in the local storage.
	const { onFlowChange } = useSelectAFlow()

	const initialPageWithQueryParams = async flowId => {
		// first we fetch the latest tag of the flow
		const tag = await fetchLatestFlowLatestTag(flowId)
		if (tag) {
			const portfolioId = tag.attrs.portfolioId?.value
			if (!portfolioId) {
				toast.error(
					'The selected flow does not have a portfolioId associated with it. Please ensure the flow has a portfolioId set.'
				)
				return
			}

			onFlowChange(flowId, false).then(() => {
				fetchFlowOptions(portfolioId, 'ALL').then(flowOptions => {
					const isFlowInOptions = flowOptions.some(flow => flow.value === flowId)

					if (isFlowInOptions) {
						setFlowOptions(flowOptions)
						setSelectedFlow({
							value: flowId,
							checked: false,
							label: createLabel2({
								asOfTime: tag.definition.asOfTime,
								name: tag.attrs.flowCode?.value,
								objectId: tag.definition.objectId
							})
						})

						setSelectedPortfolio({ value: portfolioId, checked: false })
						setSelectedStream({ value: 'ALL', checked: false })
						loadDataFromLocalStorage('policy', setSelectedPolicy)

						setLoading(false)
					} else {
						toast.error('The selected flow is not among the available options for the chosen portfolio and stream.')
					}
				})
			})
		} else {
			toast.error('There was an error fetching the flow tag, ensure the id is correct and try again.')
		}
	}

	useEffect(() => {
		const loadData = async () => {
			if (hasFlowId) {
				await initialPageWithQueryParams(flowId)
			} else {
				await delay(500)
				loadDataFromLocalStorage('portfolio', setSelectedPortfolio)
				loadDataFromLocalStorage('stream', setSelectedStream)
				loadDataFromLocalStorage('policy', setSelectedPolicy)

				if (localStorage.getItem('portfolio') && localStorage.getItem('stream')) {
					const portfolio = JSON.parse(localStorage.getItem('portfolio'))
					const stream = JSON.parse(localStorage.getItem('stream'))

					if (portfolio?.checked && stream?.checked) {
						loadDataFromLocalStorage('flow', value => {
							if (value && value.checked) {
								fetchFlowOptions(portfolio.value, stream.value).then(flowOptions => {
									const isFlowInOptions = flowOptions.some(flow => flow.value === value.value)

									if (isFlowInOptions) {
										onFlowChange(value.value, false).then(() => {
											setFlowOptions(flowOptions)
											setSelectedFlow(value)
										})
									} else {
										toast.error(
											'The selected flow is not among the available options for the chosen portfolio and stream.'
										)
									}
								})
							}
						})
					}
				}

				await delay(1000)
				setLoading(false)
			}
		}

		loadData()
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
							{/* <BouncingSpinner /> */}
						</div>
					</div>
				) : (
					children
				)}
			</div>
		</section>
	)
}

// We check values in localStorage, if they exist, we set them in the state.
// Then the rest of the components will use the state being set here.
// useEffect(() => {
// 	// We check if the flowId is in the URL, if it is, we set it in the state.
// 	if (hasFlowId) {
// 		fetchLatestFlowLatestTag(flowId).then(tag => {
// 			if (tag) {
// 				const portfolioId = tag.attrs.portfolioId?.value
// 				if (!portfolioId) {
// 					toast.error(
// 						'The selected flow does not have a portfolioId associated with it. Please ensure the flow has a portfolioId set.'
// 					)
// 					return
// 				}

// 				setSelectedPortfolio({ value: portfolioId, checked: false })
// 				setSelectedStream({ value: 'ALL', checked: false })
// 				loadDataFromLocalStorage('policy', setSelectedPolicy)

// 				// fetch flow options and set the selected flow if it's in the options
// 				fetchFlowOptions(portfolioId, 'ALL').then(flowOptions => {
// 					const flowIds = flowOptions.map(flow => flow.value)
// 					const isFlowInOptions = flowIds.includes(flowId)
// 					console.log({ isFlowInOptions, flowOptions, flowId, flowIds })

// 					if (isFlowInOptions) {
// 						onFlowChange(flowId, false).then(() => {
// 							setFlowOptions(flowOptions)
// 							setSelectedFlow({
// 								value: flowId,
// 								checked: false,
// 								label: createLabel2({
// 									asOfTime: tag.definition.asOfTime,
// 									name: tag.attrs.flowCode?.value,
// 									objectId: tag.definition.objectId
// 								})
// 							})

// 							setLoading(false)
// 						})
// 					} else {
// 						toast.error(
// 							"The selected flow you've saved is not among the available options for the chosen portfolio and stream. Please ensure your saved flow is compatible with the selected portfolio and stream settings."
// 						)
// 					}
// 				})
// 			}
// 		})
// 	} else {
// 		delay(500).then(() => {
// 			loadDataFromLocalStorage('portfolio', setSelectedPortfolio)
// 			loadDataFromLocalStorage('stream', setSelectedStream)
// 			loadDataFromLocalStorage('policy', setSelectedPolicy)

// 			// Check if portfolio and stream have been recovered with checked value as true
// 			if (localStorage.getItem('portfolio') && localStorage.getItem('stream')) {
// 				const portfolio = JSON.parse(localStorage.getItem('portfolio'))
// 				const stream = JSON.parse(localStorage.getItem('stream'))

// 				if (portfolio?.checked && stream?.checked) {
// 					loadDataFromLocalStorage('flow', value => {
// 						// we ended up here because it hasn't been checked or saved in the local storage
// 						if (!value || !value.checked) return

// 						const flowId = value.value

// 						// fetch flow options and set the selected flow if it's in the options
// 						fetchFlowOptions(portfolio.value, stream.value).then(flowOptions => {
// 							const flowIds = flowOptions.map(flow => flow.value)
// 							const isFlowInOptions = flowIds.includes(flowId)

// 							if (isFlowInOptions) {
// 								onFlowChange(flowId, false).then(() => {
// 									setFlowOptions(flowOptions)
// 									setSelectedFlow(value)
// 								})
// 							} else {
// 								toast.error(
// 									"The selected flow you've saved is not among the available options for the chosen portfolio and stream. Please ensure your saved flow is compatible with the selected portfolio and stream settings."
// 								)
// 							}
// 						})
// 					})
// 				}
// 			}

// 			delay(1000).then(() => {
// 				setLoading(false)
// 			})
// 		})
// 	}
// }, [])
