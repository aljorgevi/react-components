/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-prototype-builtins */
import { SEARCH_INPUTS_NODE_RESPONSE, searchApiForFileContentTracFlowInputCategories } from '../../data/local-data.js'
import { composeDetailedLabel } from '../../factories/tagHelpers.js'

const IS_EXP_ENV = process.env.NODE_ENV === 'production' ?? false

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export function isEmpty(array) {
	if (array === undefined || array === null) return true

	return Array.isArray(array) && array.length === 0
}

/**
 * Find optional inputs in a flow definition.
 * @param {import('@/types').FlowDefinitionInputs} inputs - The inputs of a flow definition.
 * @returns {string[]} - Array of optional input keys.
 */
export function extractOptionalInputKeys(inputs) {
	return Object.keys(inputs).filter(key => !inputs[key]?.required)
}

/**
 * Extracts supported input keys from a flow definition based on attributes.
 * @param {import('@/types').FlowDefinitionInputs} inputs - The inputs of a flow definition.
 * @param {import('@/types').TracObjectAttributes} attrs - The attributes of a flow tag.
 * @returns {string[]} - Array of supported input keys.
 */
export function extractSupportInputKeys(inputs, attrs) {
	const supportItems = attrs.supportInputs?.value?.split('|') || []

	return Object.keys(inputs).filter(key => supportItems.includes(key))
}

/**
 * Result object for counting various types of inputs.
 * @typedef {Object} CountInputsResult
 * @property {number} required - The number of required inputs.
 * @property {number} optional - The number of optional inputs.
 * @property {number} support - The number of supported inputs.
 */

/**
 * Count various types of inputs in a flow definition.
 * @param {import('@/types').FlowDefinitionInputs} inputs - The inputs of a flow definition.
 * @param {string[]} optionalInputs - Array of optional input keys.
 * @param {string[]} supportInputs - Array of supported input keys.
 * @returns {CountInputsResult} - The count of inputs.
 */
export function countInputs(inputs, optionalInputs, supportInputs) {
	const optionalInputsInView = optionalInputs.filter(key => !supportInputs.includes(key))
	const requiredInputs = Object.keys(inputs).filter(
		key => !optionalInputs.includes(key) && !supportInputs.includes(key)
	)

	return {
		required: requiredInputs.length,
		optional: optionalInputsInView.length,
		support: supportInputs.length
	}
}

/**
 *
 * @param {*} param0
 */
export async function assignInputCategory({ flowTag, supportInputs, optionalInputs }) {
	// first we call an API to get the category details dataset(csv located in github).

	return {
		categories: null,
		optionalCategories: null,
		pairedCategoryDetails: null
	}
}

/**
 * Get the dataset ID to fetch based on the search response.
 * @param {Object} searchResponse - The search response containing tags.
 * @returns {string | null} - The dataset ID or null if not found.
 */
export function getDatasetIdToFetch(searchResponse) {
	const tags = searchResponse.tags || []

	const matchingTag = IS_EXP_ENV
		? tags.find(tag => tag.attrs.trac_exp_env.value)
		: tags.find(tag => !tag.attrs.trac_exp_env.value)

	return matchingTag ? matchingTag.definition.objectId : null
}

export async function mockSearchCall() {
	return searchApiForFileContentTracFlowInputCategories
}

/**
 * Get the categories for the input nodes.
 * @param {Object} options - The parameters.
 * @param {any} options.nodes - The input nodes.
 * @param {string[]} options.supportInputs - The supported input keys.
 * @param {string[]} options.optionalInputs - The optional input keys.
 * @param {import('@/types').TracFlowInputCategory[]} options.data - The input categories data.
 * @param {string} options.selectedPortfolio - The selected portfolio.
 *
 * @returns
 */
export function getCategories({
	inputNodes,
	supportInputs,
	optionalInputs,
	dataFlowInputCategories,
	selectedPortfolio
}) {
	const isOptionalInput = key => optionalInputs.includes(key)
	const isCategoryUnique = (category, uniqueCategories) => !category || !uniqueCategories.includes(category)

	function handleInputAssignment(key, category, inputArray, uniqueCategories) {
		if (!category || isCategoryUnique(category, uniqueCategories)) {
			uniqueCategories.push(category)
			inputArray.General.inputs.push(key)
		} else {
			inputArray[category].inputs.push(key)
		}
	}

	const uniqueCategoriesList = ['General']
	const uniqueOptionalCategoriesList = ['General']

	const requiredCategorizedInputs = { General: { category: 'General', inputs: [] } }
	const optionalCategorizedInputs = { General: { category: 'General', inputs: [] } }

	for (const [key, node] of inputNodes) {
		// The input node within the flowTag not always have a category.
		const nodeCategory = node.category?.toUpperCase() ?? ''

		// we need to filter the data based on the selected portfolio and the category
		const matchingCategoryRows = dataFlowInputCategories.filter(
			row =>
				row.Portfolio.toUpperCase() === selectedPortfolio.toUpperCase() && row.Category.toUpperCase() === nodeCategory
		)

		const categoryDescription = matchingCategoryRows[0]?.Category_Description ?? ''

		if (isOptionalInput(key)) {
			// the purpose of this function is to assign the optional inputs to the optionalCategorizedInputs object
			handleInputAssignment(key, nodeCategory, optionalCategorizedInputs, uniqueOptionalCategoriesList)
		} else if (!supportInputs.includes(key)) {
			// the purpose of this function is to assign the required inputs to the categorizedInputs object
			handleInputAssignment(key, nodeCategory, requiredCategorizedInputs, uniqueCategoriesList)
		}
	}

	const requiredCategories = Object.values(requiredCategorizedInputs).filter(value => !isEmpty(value.inputs))
	const optionalCategories = Object.values(optionalCategorizedInputs).filter(value => !isEmpty(value.inputs))

	return { requiredCategories, optionalCategories }
}

const searchActions = {}
/**
 *
 * @param {import('@/types').FlowModelNode} modelNodes
 * @returns
 */
export function getModelVersioningPromises(modelNodes) {
	return modelNodes.map(([_, { id }]) => searchActions.getObjectIdVersions(id, 'model'))
}

// we fetch all the search query for each input node from the flowTag
export async function fetchInputsfromInputsNodes(inputsNodes) {
	// const searchPromises = inputsNodes
	// 	.map(([_, { searchQuery }]) => searchActions.searchPromise('data', searchQuery))
	// 	.then(response => response)

	// const searchResponse = await Promise.all(searchPromises)
	// return searchResponse

	return SEARCH_INPUTS_NODE_RESPONSE
}

export async function getModelNoVersioningPromises(modelNodes, selectedPortfolio) {
	const normalizedPortfolio = selectedPortfolio.toLowerCase()

	return modelNodes.map(([_, _node]) => {
		/** @type {import('@/types').FlowModelNode} */
		const node = structuredClone(_node) // <- just added this to have the type of the node
		const { searchQuery } = node
		let searchAttrs = { ...searchQuery }

		const portfolioSelecetdIsNotAll = normalizedPortfolio !== 'all' && normalizedPortfolio !== 'dv'

		if (portfolioSelecetdIsNotAll) {
			searchAttrs = { operator: 'AND', arg1: searchQuery, arg2: { attrName: 'portfolioId', value: selectedPortfolio } }
		}

		return searchActions.searchPromise('model', searchAttrs).then(response => response)
	})
}

export function getNideksIotuibsAndTagsForModelVersioning(modelsToUse, modelNodes) {
	const modelsJobForRequestBody = {}
	const modelChoices = {}

	modelsToUse.forEach((model, index) => {
		const modelClass = model[0].attrs.modelClass.value
	})
}

export function getModelsOptionsAndTags(modelsToUse, modelNodes) {
	const modelsJobForRequestBody = {}
	const modelChoices = {}

	modelsToUse.forEach(model => {
		const { tags } = model
		const modelClass = tags[0].attrs.modelClass.value

		const filteredTags = tags.filter(tag => tag.attrs.viewInLists?.value)
		const datasets = isEmpty(filteredTags) ? [] : filteredTags.map(createModelOptionsForSelectAdvances)

		modelChoices[modelClass] = {
			tags: [...tags], // TODO: why all the tags if we filtered them?
			datasets
		}
	})

	// in the other call the key is called modelClass even tough is the same value
	for (const [key, _] of modelNodes) {
		if (modelChoices.hasOwnProperty(key)) {
			modelsJobForRequestBody[key] = modelChoices[key]?.datasets[0]?.value ?? null
		}
	}

	return { modelsJobForRequestBody, modelChoices }
}

function createModelOptionsForSelectAdvances(tag) {
	const { modelName, modelClassDisplayName, modelClass } = tag.attrs
	let label = modelName?.value || modelClassDisplayName?.value || modelClass?.value || 'Name not set'
	label = `${label} - ${tag.definition.asOfTime} - ${tag.definition.objectId}`

	return {
		value: tag.definition.objectId,
		label,
		disabled: false,
		key: tag.definition.objectId,
		title: label,
		modelClass: modelClass?.value
	}
}

export function setDefaultInputsForJob(inputsNodeSearchPromiseResponse, flowDefinitionInputs, supportInputs) {
	const inputChoices = {}
	const inputsJobForRequestBody = {}
	const flowSetupInputSelected = {}
	const flowSetupRequiredInputsWithoutOptions = []

	inputsNodeSearchPromiseResponse.forEach(response => {
		const { datasetKey, tags } = response
		const filteredInputs = tags.filter(input => input.attrs.viewInLists?.value)
		const datasets = isEmpty(filteredInputs) ? [] : filteredInputs.map(createInputOptionsForSelectAdvances)

		inputChoices[datasetKey] = { tags: [...tags], datasets }
	})

	Object.keys(inputChoices).forEach(key => {
		const hasDatasets = !isEmpty(inputChoices[key].datasets)
		const inputHasNoDatasets = !hasDatasets
		const isRequired = flowDefinitionInputs[key]?.required
		const isSupport = supportInputs.includes(key)

		if (hasDatasets && isRequired) {
			const defaultInput = assignDefultOptionForInput(inputChoices[key].tags)
			inputsJobForRequestBody[key] = defaultInput.key
			flowSetupInputSelected[key] = defaultInput.value
		} else if (inputHasNoDatasets && isRequired && !isSupport) {
			flowSetupRequiredInputsWithoutOptions.push(key)
		} else if (inputHasNoDatasets && isRequired && isSupport) {
			flowSetupRequiredInputsWithoutOptions.push(key)
		}
	})

	const validateInputChoices = addDoNotUseInputs(inputChoices, flowDefinitionInputs)

	return {
		inputsJobForRequestBody,
		flowSetupInputSelected,
		flowSetupInputChoices: validateInputChoices,
		flowSetupRequiredInputsWithoutOptions
	}
}

function createInputOptionsForSelectAdvances(input) {
	const { objectId, asOfTime } = input.definition
	const {
		datasetName,
		datasetKeyDisplayName,
		datasetKey,
		trac_exp_env,
		datasetDescription,
		creditGradeType,
		trac_policies
	} = input.attrs
	const name = datasetName?.value || datasetKeyDisplayName?.value || datasetKey?.value || 'Name not set'
	const label = composeDetailedLabel({ name, objectId, asOfTime })

	return {
		value: input.definition.objectId,
		label,
		disabled: false,
		key: input.definition.objectId,
		title: label,
		isExpEnv: trac_exp_env?.value,
		datasetKeyDisplayName: datasetKeyDisplayName?.value,
		datasetDescription: datasetDescription?.value,
		creditGradeType: creditGradeType?.value,
		policies: trac_policies?.value
	}
}

function assignDefultOptionForInput(tags) {
	const defaultItemChoice = { key: null, value: null }

	const defaultIndex = tags.findIndex(tag => tag.attrs.defaultForecastSelection?.value)
	defaultItemChoice.key = defaultIndex === -1 ? tags[0].definition.objectId : tags[defaultIndex].definition.objectId
	defaultItemChoice.value = defaultIndex === -1 ? tags[0] : tags[defaultIndex]

	return defaultItemChoice
}

function addDoNotUseInputs(inputChoices, flowDefinitionInputs) {
	const originalInputChoices = structuredClone(inputChoices)
	const validatedInputChoices = {}

	Object.keys(originalInputChoices).forEach(inputChoice => {
		validatedInputChoices[inputChoice] = {
			tags: [],
			datasets: []
		}

		if (!flowDefinitionInputs[inputChoice]?.required) {
			const doNotUse = {
				doNotUse: true,
				key: `do-not-use-${inputChoice}`,
				value: `do-not-use-${inputChoice}`,
				title: 'Do not use',
				label: 'Do not use',
				disabled: false,
				datasetKey: inputChoice, // TODO: this is something to check with meru/josh why it says datseKey is the key in the hashmap of flowDefinitionInputs. is it always true?
				validated: true
			}

			validatedInputChoices[inputChoice].datasets.push(doNotUse)
		}

		Object.entries(originalInputChoices[inputChoice]?.datasets).forEach(([key]) => {
			validatedInputChoices[inputChoice].datasets.push(originalInputChoices[inputChoice]?.datasets[key])
			validatedInputChoices[inputChoice].tags.push(originalInputChoices[inputChoice]?.tags[key])
		})
	})

	return validatedInputChoices
}

export function createLabel(id, name, asOfTime) {
	return `${name} - ${formatCustomDate(asOfTime)} - ${id}`
}

export function formatCustomDate(inputDate) {
	if (!inputDate) return

	const date = new Date(inputDate)
	const options = {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	}

	const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)
	return formattedDate.replace(/\b(\d)\b/g, '0$1').replace(/(\d{2})(\d{2})/, '$1$2')
}

export function filterInputNodes(nodes) {
	return Object.entries(nodes).filter(([_, value]) => value.type?.toLowerCase() === 'input')
}

export function filterModelNodes(nodes) {
	return Object.entries(nodes).filter(([_, value]) => value.type?.toLowerCase() === 'model')
}

/**
 * Filters models based on the selected portfolio.
 * @param {Array} models - The array of models to filter.
 * @param {string} selectedPortfolio - The selected portfolio value.
 * @returns {Array} - The filtered array of models.
 */
export function filterModelsByPortfolio(models, selectedPortfolio) {
	return models.filter(model => model.attrs.portfolioId?.value.toLowerCase() === selectedPortfolio)
}

export function generateModelSelectOptions(modelNodesInFlow, selectedModelsInJobDefinition) {
	return Object.keys(modelNodesInFlow).map(key => {
		const value = modelNodesInFlow[key]

		// two different things, one are the options and then we have the values above.
		return {
			modelClass: key,
			label: key
				.split('_')
				.join(' ')
				.replace(/\b\w/g, l => l.toUpperCase()),
			options: value.datasets.map(dataset => ({
				value: dataset.value,
				label: dataset.label
			})),
			defaultValue: selectedModelsInJobDefinition[key] ?? ''
		}
	})
}

export function generateInputsSelectOptions(inputNodesInFlow, selectedInputsInJobDefinition) {
	return Object.keys(inputNodesInFlow).map(key => {
		const value = inputNodesInFlow[key]

		// two different things, one are the options and then we have the values above.
		return {
			datasetKey: key,
			label: key
				.split('_')
				.join(' ')
				.replace(/\b\w/g, l => l.toUpperCase()),
			options: value.datasets.map(dataset => ({
				...dataset,
				value: dataset.value,
				label: dataset.label
			})),
			defaultValue: selectedInputsInJobDefinition[key] ?? ''
		}
	})
}
