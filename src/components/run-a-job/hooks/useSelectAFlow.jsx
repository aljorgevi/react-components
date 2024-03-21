/* eslint-disable no-var */
import { useState } from 'react'
import { useRunAJobStore } from '../store'
import { toast } from 'react-toastify'
import {
	countInputs,
	createLabel,
	extractOptionalInputKeys,
	extractSupportInputKeys,
	fetchInputsfromInputsNodes,
	filterInputNodes,
	filterModelNodes,
	filterModelsByPortfolio,
	getCategories,
	getModelVersioningPromises,
	getModelsOptionsAndTags,
	getNideksIotuibsAndTagsForModelVersioning,
	isEmpty,
	setDefaultInputsForJob
} from '../../../utils/helpers'
import { MODELS_TO_USE } from '../../../../data/local-data'
import { useGetControlTable } from './useGetControlTable'
import { fetchFlows, fetchLatestFlowLatestTag } from '../../../../api/meta-service'
import { useSetQueryParams } from './useSetQueryParams'
import { mapFlowSearchToDropdownOptions } from '../../../../factories/flowTag'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const flowToRun = {}

// ⭐️ onFlowChange
export const useSelectAFlow = () => {
	const { setQueryParams } = useSetQueryParams()
	const dataFlowInputCategories = useGetControlTable('flow_input_categories')
	const [isLoadingFlows, setIsLoadingFlows] = useState(false)
	const [isLoadingFlowMetadata, setIsLoadingFlowMetadata] = useState(false)
	const [
		template,
		selectedPortfolio,
		setSelectedPortfolio,
		selectedStream,
		setSelectedStream,
		selectedFlow,
		setSelectedFlow,
		setFlowOptions,
		flowOptions,
		// flowToRun,
		// setFlowToRun,
		jobDefinitionForRequestBody,
		setJobDefinitionForRequestBody,
		updateModelsInJobDefinition,
		setModelNodesInFlow,
		modelChoices,
		setInputCategories,
		setOptionalInputs,
		setSupportInputs,
		setInputsCounts,
		setNonEmptyDependentParameterData,
		selectedPreviousJob,
		setSelectedPreviousJob,
		previousJobOptions,
		setInputNodesInFlow
	] = useRunAJobStore(state => [
		state.template,
		state.selectedPortfolio,
		state.setSelectedPortfolio,
		state.selectedStream,
		state.setSelectedStream,
		state.selectedFlow,
		state.setSelectedFlow,
		state.setFlowOptions,
		state.flowOptions,
		// state.flowToRun,
		// state.setFlowToRun,
		state.jobDefinitionForRequestBody,
		state.setJobDefinitionForRequestBody,
		state.updateModelsInJobDefinition,
		state.setModelNodesInFlow,
		state.modelChoices,
		state.setInputCategories,
		state.setOptionalInputs,
		state.setSupportInputs,
		state.setInputsCounts,
		state.setNonEmptyDependentParameterData,
		state.selectedPreviousJob,
		state.setSelectedPreviousJob,
		state.previousJobOptions,
		state.setInputNodesInFlow
	])

	const updateLocalStorage = (key, checked, value, label) => {
		localStorage.setItem(key, JSON.stringify({ checked, value, label }))
	}

	function onPortfolioCheckedChange(event) {
		const { checked } = event.target

		setSelectedPortfolio({ checked, value: selectedPortfolio.value })
		updateLocalStorage('portfolio', checked, selectedPortfolio.value)
	}

	function onPortfolioChange(value) {
		setSelectedPortfolio({ checked: selectedPortfolio.checked, value })
		updateLocalStorage('portfolio', selectedPortfolio.checked, value)
	}

	function onStreamChange(value) {
		setSelectedStream({ checked: selectedStream.checked, value })

		updateLocalStorage('stream', selectedStream.checked, value)
	}

	function onStreamCheckedChange(event) {
		const { checked } = event.target

		setSelectedStream({ checked, value: selectedStream.value })
		updateLocalStorage('stream', checked, selectedStream.value)
	}

	function onFlowCheckedChange(event) {
		const { checked } = event.target

		setSelectedFlow({ ...selectedFlow, checked })
		updateLocalStorage('flow', checked, selectedFlow.value, selectedFlow.label)
	}

	function onPreviousJobChange(jobId) {
		setSelectedPreviousJob({ ...selectedPreviousJob, value: jobId })
		// TODO: add saved value to localStorage.
	}

	/**
	 *
	 * @param {Object} options
	 * @param {Object} options.attr
	 * @param {Object} options.nodes
	 * @param {Object} options.inputs
	 */
	async function extractInputFlowInformation({ nodes, inputs, attrs }) {
		// Extract input nodes of type 'input'.
		const inputNodes = filterInputNodes(nodes)

		// Extract some values from the inputs.
		const optionalInputs = extractOptionalInputKeys(inputs)
		const supportInputs = extractSupportInputKeys(inputs, attrs)
		const inputsCounts = countInputs(inputs, optionalInputs, supportInputs)

		// note: dataFlowInputCategories get fetched from react-query.
		const nonEmptyDependentParameterData = dataFlowInputCategories.filter(item => Boolean(item.Dependent_Parameter))

		const { requiredCategories, optionalCategories } = getCategories({
			inputNodes,
			supportInputs,
			optionalInputs,
			dataFlowInputCategories,
			selectedPortfolio: selectedPortfolio.value
		})

		const inputCategories = { requiredCategories, optionalCategories }

		return { inputCategories, optionalInputs, supportInputs, inputsCounts, nonEmptyDependentParameterData }
	}

	// nodes all the nodes, we filter them inside the function
	async function loadModelsInfoSecondStep({ nodes, isModelVersioning, selectedPortfolio }) {
		// Extract model nodes of type 'model'.
		const modelNodes = filterModelNodes(nodes)
		const normalizedPortfolio = selectedPortfolio.toLowerCase()

		let modelsToUse = []
		if (isModelVersioning) {
			// TODO: check this in the code to see what the filtering changes depending of the portfolio.
			const isNotAllOrDevPortfolio = normalizedPortfolio !== 'all' && normalizedPortfolio !== 'dv'
			const searchPromises = getModelVersioningPromises(modelNodes)
			const response = await Promise.all(searchPromises)

			// For each set of models received in the response,
			// it filters them based on the selected portfolio if it's not 'all' or 'dv'.
			response.forEach(models => {
				let filteredModels = structuredClone(models)

				if (isNotAllOrDevPortfolio) {
					filteredModels = filterModelsByPortfolio(filteredModels, normalizedPortfolio)
				}

				if (isEmpty(filteredModels)) {
					throw new Error('No models found, please check the portfolio selected, or the model versioning.')
				} else {
					const modelsDontMatchPortfolioChosen = filteredModels.filter(
						model => model.attrs.portfolioId.value !== selectedPortfolio
					)

					if (!isEmpty(modelsDontMatchPortfolioChosen)) {
						if (selectedPortfolio === 'dev') {
							throw new Error(
								'Non-development models are in use, please check the portfolio selected, or the model versioning.'
							)
						}

						throw new Error(
							'Models portfolio does not match the portfolio selected, please check the portfolio selected, or the model versioning.'
						)
					}
				}

				modelsToUse.push(filteredModels)
			})
		} else {
			// const searchPromises = getModelNoVersioningPromises(modelNodes, selectedPortfolio.value)
			// modelsToUse = await Promise.all(searchPromises)
		}

		modelsToUse = structuredClone(MODELS_TO_USE)

		if (isEmpty(modelsToUse)) {
			throw new Error('No models found, please check the portfolio selected, or the model versioning.')
		}

		const result = isModelVersioning
			? getNideksIotuibsAndTagsForModelVersioning(modelsToUse, modelNodes)
			: getModelsOptionsAndTags(modelsToUse, modelNodes)

		return {
			modelsJobForRequestBody: result.modelsJobForRequestBody,
			modelNodesInFlow: result.modelChoices
		}
	}

	async function loadInputsSecondStep({ nodes, flowDefinitionInputs }) {
		const inputNodes = Object.entries(nodes).filter(([_, value]) => value.type?.toLowerCase() === 'input')

		const inputsNodeSearchPromiseResponse = await fetchInputsfromInputsNodes(inputNodes)

		// We do this in case a input has not dataset available. // TODO: not sure if the key in the node it's always datasetKey. ask this.
		const mappedInputsWithDatasetKeyresponse = inputsNodeSearchPromiseResponse.map((response, index) => {
			const inputNodesKeys = inputNodes.map(([key, _]) => key)
			response.datasetKey = inputNodesKeys[index] || null
			return response
		})

		// we get it from the state, fix this later

		const supportInputs = flowToRun?.setup?.supportInputs ?? []
		const {
			flowSetupInputSelected, // TODO: we dont need all this info.
			flowSetupRequiredInputsWithoutOptions, // ✅
			inputsJobForRequestBody, // ✅
			flowSetupInputChoices
		} = setDefaultInputsForJob(mappedInputsWithDatasetKeyresponse, flowDefinitionInputs, supportInputs)

		return {
			flowSetupInputSelected,
			flowSetupRequiredInputsWithoutOptions,
			inputsJobForRequestBody,
			inputNodesInFlow: flowSetupInputChoices
		}
	}

	async function processFlowSetup({ nodes, inputs, attrs, objectId }) {
		// first step ✅
		const { inputCategories, optionalInputs, supportInputs, inputsCounts, nonEmptyDependentParameterData } =
			await extractInputFlowInformation({ nodes, inputs, attrs })

		// second step ✅
		const isModelVersioning = attrs.useModelVersioning?.value
		const { modelNodesInFlow, modelsJobForRequestBody } = await loadModelsInfoSecondStep({
			nodes,
			isModelVersioning,
			selectedPortfolio: selectedPortfolio.value
		})

		// third step ✅
		const {
			// flowSetupInputSelected, // I don't think we need this
			// flowSetupRequiredInputsWithoutOptions, // TODO: do we need this?
			inputsJobForRequestBody,
			inputNodesInFlow
		} = await loadInputsSecondStep({ nodes, flowDefinitionInputs: inputs })

		// save values in store now 🔒
		// job request body
		setJobDefinitionForRequestBody({
			...jobDefinitionForRequestBody,
			targetId: objectId,
			models: modelsJobForRequestBody,
			inputs: inputsJobForRequestBody
		})
		// storing input values
		setInputCategories(inputCategories)
		setOptionalInputs(optionalInputs)
		setSupportInputs(supportInputs)
		setInputsCounts(inputsCounts)
		setNonEmptyDependentParameterData(nonEmptyDependentParameterData)
		setInputNodesInFlow(inputNodesInFlow)
		// storing model values
		setModelNodesInFlow(modelNodesInFlow)
	}

	// once we got our flowId we need to fetch the tag and the flow details.
	// TODO:
	// 1. Add a loading state to disable some components
	// 2. disable the options on the menu on the sidebar prior this. Here then we unable them again.
	// 3. We load the models info. modal option (how many dropdown, the options for each, and selected value by default for each )
	// 4. We load the params info, also with default values etc.
	// 5. We create the first version of the job to run, this could literally be enough to run the job.
	//    - Important before run we run all sorts of validations.
	/**
	 *
	 * @param {string} id - This is the flow ID selected by the user.
	 * @returns {Promise<void>} - We don't return anything but update the store.
	 * This is the most important part of the page ⭐️
	 *
	 */
	async function onFlowChange(flowId, sendToast = true) {
		try {
			if (sendToast) {
				var loadingToast = toast.loading('Loading flow details...')
			}

			setIsLoadingFlowMetadata(true)

			// fetch the latest tag
			/** @type {import('@/types').FlowTag} */
			const tag = await fetchLatestFlowLatestTag(flowId)

			const { attrs, definition } = tag
			const { inputs, nodes, asOfTime, objectId } = definition
			const { flowName } = attrs
			const label = createLabel(objectId, flowName?.value, asOfTime)

			// now we check if the user has selected checked so we can save the new flow in the local storage.
			if (selectedFlow.checked) {
				updateLocalStorage('flow', true, flowId, label)
			}

			setSelectedFlow({ ...selectedFlow, value: flowId, label })
			// set the flow in the url.
			setQueryParams({ flowId })

			// process the flow setup
			await processFlowSetup({ nodes, inputs, attrs, objectId })

			if (sendToast) {
				toast.update(loadingToast, {
					render: 'Flow loaded successfully',
					type: 'success',
					isLoading: false,
					autoClose: 1000
				})
			}

			setIsLoadingFlowMetadata(false)
		} catch (error) {
			console.error(error)
		}
	}

	async function loadFlows() {
		if (selectedStream !== '' && selectedPortfolio !== '') {
			const id = toast.loading('Fetching flows...')
			setIsLoadingFlows(true)

			// mock fetch
			delay(1500).then(async () => {
				setSelectedFlow({ checked: selectedFlow.checked, value: '', label: '' })

				const searchResult = await fetchFlows(selectedStream, selectedPortfolio)
				const flowOptions = mapFlowSearchToDropdownOptions(searchResult)

				// TODO: here probably we need to reset the whole store.
				// fetch the flows based on the portfolio and stream selected.
				// then map the result of the search, to be a valid array of the dropdown.
				setFlowOptions(flowOptions)
				setIsLoadingFlows(false)
				toast.update(id, {
					render: 'Flows fetched',
					type: toast.TYPE.SUCCESS,
					isLoading: false,
					autoClose: 1000
				})
			})
		}
	}

	return {
		flowOptions,
		selectedFlow,
		selectedStream,
		selectedPortfolio,
		selectedPreviousJob,
		isLoadingFlows,
		isLoadingFlowMetadata,
		previousJobOptions,
		setSelectedFlow,
		setSelectedStream,
		setSelectedPortfolio,
		loadFlows,
		onFlowChange,
		onPortfolioCheckedChange,
		onPortfolioChange,
		onStreamChange,
		onStreamCheckedChange,
		onFlowCheckedChange,
		setSelectedPreviousJob,
		onPreviousJobChange,
		processFlowSetup
	}
}
