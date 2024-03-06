// @ts-check
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

/**
 * @typedef {{
 * tag: Object,
 * jobDefinitionForRequestBody: JobDefinitionForRequestBody,
 * jobAttrsForRequestBody: Object,
 * selectedPolicy: SelectedOption,
 * selectedPortfolio: SelectedOption,
 * selectedStream: SelectedOption,
 * selectedFlow: SelectedOption,
 * selectedPreviousJob: SelectedOption,
 * previousJobOptions: DropdownOption[],
 * flowOptions: DropdownOption[],
 * portfolioOptions: DropdownOption[],
 * streamOptions: DropdownOption[],
 * modelNodesInFlow: NodeChoices,
 * inputNodesInFlow: NodeChoices,
 * inputCategories: InputCategories,
 * optionalInputs: string[],
 * supportInputs: string[],
 * inputsCounts: { required: number, optional: number, support: number },
 * nonEmptyDependentParameterData: string[],
 * setSelectedPolicy: (selectedPolicy: SelectedOption) => void,
 * setSelectedPortfolio: (selectedPortfolio: SelectedOption) => void,
 * setSelectedStream: (selectedStream: SelectedOption) => void,
 * setSelectedFlow: (selectedFlow: SelectedOption) => void,
 * setSelectedPreviousJob: (selectedPreviousJob: SelectedOption) => void,
 * setPreviousJobOptions: (previousJobOptions: DropdownOption[]) => void,
 * setFlowOptions: (flowOptions: DropdownOption[]) => void,
 * setPortfolioOptions: (portfolioOptions: DropdownOption[]) => void,
 * setStreamOptions: (streamOptions: DropdownOption[]) => void,
 * setJobDefinitionForRequestBody: (jobDefinitionForRequestBody: JobDefinitionForRequestBody) => void,
 * setModelNodesInFlow: (modelNodesInFlow: NodeChoices) => void,
 * setInputNodesInFlow: (inputNodesInFlow: NodeChoices) => void,
 * setInputCategories: (inputCategories: InputCategories) => void,
 * setOptionalInputs: (optionalInputs: string[]) => void,
 * setSupportInputs: (supportInputs: string[]) => void,
 * setInputsCounts: (inputsCounts: { required: number, optional: number, support: number }) => void,
 * setNonEmptyDependentParameterData: (nonEmptyDependentParameterData: string[]) => void
 * }} RunAJobSlice
 */

/**
 * @typedef {Object} NodeChoice
 * @property {string[]} tags - The tags for the model.
 * @property {string[]} options - The options for a dropdown related to the model.
 */

/**
 * @typedef {Object.<string, NodeChoice>} NodeChoices
 */

/**
 * @typedef {{
 *  requiredCategories: {
 *    category: string,
 *    inputs: string[]
 *  }[],
 *  optionalCategories: {
 *    category: string,
 *    inputs: string[]
 * }[]
 * }} InputCategories
 */

/**
 * @typedef {{
 *  checked: boolean,
 * 	value: string,
 * 	label: string
 * }} SelectedOption
 */

/**
 * @typedef {{
 *  value: string,
 *  label: string
 * }} DropdownOption
 */

/**
 * @typedef {{
 *   objectType: string,
 *   jobType: string,
 *   targetId: string,
 *   inputs: {},
 *   models: {},
 *   params: {}
 * }} JobDefinitionForRequestBody
 */

/**
 * @typedef {import('zustand').StateCreator<
 *    RunAJobSlice,
 *    [["zustand/devtools", never], ["zustand/immer", never]],
 *    [],
 *    RunAJobSlice
 * >} RunAJobSliceCreator
 */

/**
 * @typedef {import('zustand').UseBoundStore<import('zustand').StoreApi<RunAJobSlice>>} RunAJobStore
 */

/**
 * @type {RunAJobSliceCreator}
 */
export const createRunAJobSlice = set => ({
	tag: {}, // TODO: I may don't need this
	jobDefinitionForRequestBody: { objectType: '', jobType: '', targetId: '', inputs: {}, models: {}, params: {} },
	jobAttrsForRequestBody: {},
	selectedPolicy: { checked: false, value: '', label: '' },
	selectedPortfolio: { checked: false, value: '', label: '' },
	selectedStream: { checked: false, value: '', label: '' },
	selectedFlow: { checked: false, value: '', label: '' },
	selectedPreviousJob: { checked: false, value: '', label: '' },
	previousJobOptions: [],
	flowOptions: [],
	portfolioOptions: [
		{ value: 'uk-secured', label: 'UK Secured' },
		{ value: 'uk-unsecured', label: 'UK Unsecured' }
	],
	streamOptions: [
		{ value: 'ALL', label: 'All' },
		{ value: 'impermanent', label: 'Impermanent' },
		{ value: 'forecasting', label: 'Forecasting' }
	],
	modelNodesInFlow: {},
	// inputs values related
	inputNodesInFlow: {},
	inputCategories: { optionalCategories: [], requiredCategories: [] },
	optionalInputs: [],
	supportInputs: [],
	inputsCounts: { required: 0, optional: 0, support: 0 },
	nonEmptyDependentParameterData: [],

	setSelectedPolicy: selectedPolicy => set({ selectedPolicy }, false, 'setSelectedPolicy'),
	setSelectedPortfolio: selectedPortfolio => set({ selectedPortfolio }, false, 'setSelectedPortfolio'),
	setSelectedStream: selectedStream => set({ selectedStream }, false, 'setSelectedStream'),
	setSelectedFlow: selectedFlow => set({ selectedFlow }, false, 'setSelectedFlow'),
	setSelectedPreviousJob: selectedPreviousJob => set({ selectedPreviousJob }, false, 'setSelectedPreviousJob'),
	setFlowOptions: flowOptions => set({ flowOptions }, false, 'setFlowOptions'),
	setPortfolioOptions: portfolioOptions => set({ portfolioOptions }, false, 'setPortfolioOptions'),
	setStreamOptions: streamOptions => set({ streamOptions }, false, 'setStreamOptions'),
	setJobDefinitionForRequestBody: jobDefinitionForRequestBody =>
		set({ jobDefinitionForRequestBody }, false, 'setJobDefinitionForRequestBody'),
	setModelNodesInFlow: modelNodesInFlow => set({ modelNodesInFlow }, false, 'setModelNodesInFlow'),
	// input functions related
	setInputCategories: inputCategories => set({ inputCategories }, false, 'setInputCategories'),
	setOptionalInputs: optionalInputs => set({ optionalInputs }, false, 'setOptionalInputs'),
	setSupportInputs: supportInputs => set({ supportInputs }, false, 'setSupportInputs'),
	setInputsCounts: inputsCounts => set({ inputsCounts }, false, 'setInputsCounts'),
	setNonEmptyDependentParameterData: nonEmptyDependentParameterData =>
		set({ nonEmptyDependentParameterData }, false, 'setNonEmptyDependentParameterData'),
	setPreviousJobOptions: previousJobOptions => set({ previousJobOptions }, false, 'setPreviousJobOptions'),
	setInputNodesInFlow: inputNodesInFlow => set({ inputNodesInFlow }, false, 'setInputNodesInFlow')
})

/**
 * @param {import('zustand').StateCreator<RunAJobSlice>} f
 */
const middleware = f => immer(devtools(f))

const logMiddleware = config => (set, get, api) =>
	config(
		args => {
			console.log('Previous state: ', get())
			console.log('Applied updates: ', args)
			set(args)
			console.log('Next state: ', get())
		},
		get,
		api
	)

/**
 * @type {RunAJobStore}
 */
export const useRunAJobStore = create(
	logMiddleware(
		middleware((...args) => ({
			...createRunAJobSlice(...args)
		}))
	)
)
