// //
// import { create } from 'zustand'
// import { devtools } from 'zustand/middleware'

// // Tags are big objects with thousands of lines.
// // Ideally, we want to map then and keep in store only the metadata that we need.
// export const useRunAJobStore = create(
// 	devtools(
// 		set => ({
// 			template: {
// 				flowId: '',
// 				flowSelected: null,
// 				flowToRun: {
// 					tag: {},
// 					setup: {
// 						datasetKeyDisplayName: '',
// 						inputCategories: {
// 							requiredCategories: [],
// 							optionalCategories: []
// 						},
// 						inputChoices: {},
// 						inputSelected: {},
// 						modelChoices: {},
// 						modelParameters: {
// 							parameters: {},
// 							configuration: { info: {}, data: [], metadata: {} },
// 							parametersByCategory: {}
// 						},
// 						selectedModel: {},
// 						optionalInputs: [],
// 						supportInputs: [],
// 						inputsCounts: { required: 0, optional: 0, support: 0 },
// 						requiredInputsWithoutOptions: [],
// 						optionalInputsWithoutOptions: [],
// 						supportInputsWithoutOptions: [],
// 						nonEmptyDependentParameterData: []
// 					}
// 				},
// 				jobDefinitionForRequestBody: {
// 					objectType: 'JOB',
// 					jobType: 'RUN_CALCULATION',
// 					targetId: '',
// 					inputs: {},
// 					models: {},
// 					params: {}
// 				},
// 				jobAttributesForRequestBody: {},
// 				userSetAttributes: {}
// 			},
// 			flowOptions: [],
// 			portfolioOptions: [
// 				{
// 					value: 'uk-secured',
// 					label: 'UK Secured'
// 				},
// 				{
// 					value: 'uk-unsecured',
// 					label: 'UK Unsecured'
// 				}
// 			],
// 			streamOptions: [
// 				{
// 					value: 'ALL',
// 					label: 'All'
// 				},
// 				{
// 					value: 'impermanent',
// 					label: 'Impermanent'
// 				},
// 				{
// 					value: 'forecasting',
// 					label: 'Forecasting'
// 				}
// 			],
// 			flowToRun: null,
// 			jobDefinitionForRequestBody: {
// 				objectType: 'JOB',
// 				jobType: 'RUN_CALCULATION',
// 				targetId: '',
// 				inputs: {},
// 				models: {},
// 				params: {}
// 			},
// 			modelChoices: [],

// 			setStreamInLocalStorage: streamInLocalStorage => set({ streamInLocalStorage }, false, 'setStreamInLocalStorage'),
// 			setPortfolioInLocalStorage: portfolioInLocalStorage =>
// 				set({ portfolioInLocalStorage }, false, 'setPortfolioInLocalStorage'),
// 			setSelectedPolicy: selectedPolicy => set({ selectedPolicy }, false, 'setSelectedPolicy'),
// 			setSelectedPortfolio: selectedPortfolio => set({ selectedPortfolio }, false, 'setSelectedPortfolio'),
// 			setSelectedStream: selectedStream => set({ selectedStream }, false, 'setSelectedStream'),
// 			setSelectedFlow: selectedFlow => set({ selectedFlow }, false, 'setSelectedFlow'),

// 			setFlowOptions: flowOptions => set({ flowOptions }, false, 'setFlowOptions'),
// 			setPortfolioOptions: portfolioOptions => set({ portfolioOptions }, false, 'setPortfolioOptions'),
// 			setStreamOptions: streamOptions => set({ streamOptions }, false, 'setStreamOptions'),
// 			setFlowToRun: flowToRun => set({ flowToRun }, false, 'setFlowToRun'),
// 			setJobDefinitionForRequestBody: jobDefinitionForRequestBody =>
// 				set({ jobDefinitionForRequestBody }, false, 'setJobDefinitionForRequestBody'),
// 			updateModelsInJobDefinition: models =>
// 				set(state => ({ jobDefinitionForRequestBody: { ...state.jobDefinitionForRequestBody, models } })),
// 			setModelChoices: modelChoices => set({ modelChoices }, false, 'setModelChoices')
// 		}),
// 		{
// 			name: 'RunAJobStore'
// 		}
// 	)
// )
