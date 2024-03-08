// import { getTag } from '@/utils/helpers'

// /** @type {import('@/types').FlowTag} */
// const tag = getTag()

// model #1
// ⭐️ default_rate_calculation ✅. 3 inputs, 2 outputs, 4 params.
// inputs
// 📬 dk: economic_scenario_data ✅
// 📬 dk: default_rate_coefficients ✅
// 📬 dk: default_rate_for_non_forbearance_overlay ✅
// outputs
// 📤 dk: segment_default_rate_monthly_forecast ✅
// 📤 dk: segment_default_rate_quarterly_forecast ✅

// model #2
// ⭐️ cure_rate_calculation ✅. 3 inputs, 2 outputs, 4 params.
// same inputs
// outputs
// 📤 dk: segment_cure_rate_monthly_forecast ✅
// 📤 dk: segment_cure_rate_quarterly_forecast ✅
// /** @type {FlowTag} */
export const tag = {
	definition: {
		objectId: 'flow-id-1',
		objectType: 'flow',
		asOfTime: '2021-02-10T08:21:00Z',
		nodes: {
			// model #1
			default_rate_calculation: {
				type: 'model',
				id: '1',
				inputs: ['economic_scenario_data', 'default_rate_coefficients', 'default_rate_for_non_forbearance_overlay,'],
				outputs: ['segment_default_rate_monthly_forecast', 'segment_default_rate_quarterly_forecast'],
				params: ['portfolio_filter', 'first_forecast_month', 'last_forecast_month', 'months_of_history'],
				searchQuery: {
					attrName: 'modelClass',
					value: 'default_rate_calculation'
				}
			},
			// model 2
			cure_rate_calculation: {
				type: 'model',
				id: '2',
				inputs: ['economic_scenario_data', 'cure_rate_coefficients', 'cure_rate_for_non_forbearance_overlay'],
				outputs: ['segment_cure_rate_monthly_forecast', 'segment_cure_rate_quarterly_forecast'],
				params: ['portfolio_filter', 'first_forecast_month', 'last_forecast_month'],
				searchQuery: {
					attrName: 'modelClass',
					value: 'cure_rate_calculation'
				}
			},
			// input 1
			economic_scenario_data: {
				type: 'input',
				searchQuery: {
					attrName: 'datasetKey',
					value: 'economic_scenario_data'
				}
			},
			// input 2
			default_rate_coefficients: {
				type: 'input',
				searchQuery: {
					attrName: 'datasetKey',
					value: 'default_rate_coefficients'
				}
			},
			// input 3
			cure_rate_coefficients: {
				type: 'input',
				searchQuery: {
					attrName: 'datasetKey',
					value: 'cure_rate_coefficients'
				}
			},
			// input 4
			default_rate_for_non_forbearance_overlay: {
				type: 'input',
				searchQuery: {
					attrName: 'datasetKey',
					value: 'default_rate_for_non_forbearance_overlay'
				}
			},
			// input 5
			cure_rate_for_non_forbearance_overlay: {
				type: 'input',
				searchQuery: {
					attrName: 'datasetKey',
					value: 'cure_rate_for_non_forbearance_overlay'
				}
			},
			// output 1
			segment_default_rate_monthly_forecast: {
				type: 'output',
				attrs: {
					datasetKey: {
						type: 'string',
						value: 'segment_default_rate_monthly_forecast'
					},
					datasetName: {
						type: 'string',
						value: 'Segment Default Rate Monthly Forecast'
					},
					datasetDescription: {
						type: 'string',
						value: 'Segment Default Rate Monthly Forecast, this includes the forecast for the next 12 months'
					}
				}
			},
			// output 2
			segment_default_rate_quarterly_forecast: {
				type: 'output',
				attrs: {
					datasetKey: {
						type: 'string',
						value: 'segment_default_rate_quarterly_forecast'
					},
					datasetName: {
						type: 'string',
						value: 'Segment Default Rate Quarterly Forecast'
					},
					datasetDescription: {
						type: 'string',
						value: 'Segment Default Rate Quarterly Forecast, this includes the forecast for the next 12 months'
					}
				}
			},
			// output 3
			segment_cure_rate_monthly_forecast: {
				type: 'output',
				attrs: {
					datasetKey: {
						type: 'string',
						value: 'segment_cure_rate_monthly_forecast'
					},
					datasetName: {
						type: 'string',
						value: 'Segment Cure Rate Monthly Forecast'
					},
					datasetDescription: {
						type: 'string',
						value: 'Segment Cure Rate Monthly Forecast, this includes the forecast for the next 12 months'
					}
				}
			},
			// output 4
			segment_cure_rate_quarterly_forecast: {
				type: 'output',
				attrs: {
					datasetKey: {
						type: 'string',
						value: 'segment_cure_rate_quarterly_forecast'
					},
					datasetName: {
						type: 'string',
						value: 'Segment Cure Rate Quarterly Forecast'
					},
					datasetDescription: {
						type: 'string',
						value: 'Segment Cure Rate Quarterly Forecast, this includes the forecast for the next 12 months'
					}
				}
			}
		},
		edges: {},
		inputs: {
			economic_scenario_data: { required: true, schema: { fields: [] } },
			default_rate_coefficients: { required: true, schema: { fields: [] } },
			default_rate_for_non_forbearance_overlay: { required: false, schema: { fields: [] } },
			cure_rate_coefficients: { required: true, schema: { fields: [] } },
			cure_rate_for_non_forbearance_overlay: { required: false, schema: { fields: [] } }
		},
		outputs: {
			segment_default_rate_monthly_forecast: { fields: [], partType: 'none', dynamicSchema: true },
			segment_default_rate_quarterly_forecast: { fields: [], partType: 'none', dynamicSchema: true },
			segment_cure_rate_monthly_forecast: { fields: [], partType: 'none', dynamicSchema: true },
			segment_cure_rate_quarterly_forecast: { fields: [], partType: 'none', dynamicSchema: true }
		},
		params: {
			portfolio_filter: { paramType: 'string' },
			first_forecast_month: { paramType: 'date' },
			last_forecast_month: { paramType: 'date' },
			months_of_forecast: { paramType: 'integer' }
		},
		rules: {},
		linkDefinitions: {},
		version: 1
	},
	attrs: {
		trac_create_user_id: { type: 'string', value: 'dev-user' },
		trac_create_user_name: { type: 'string', value: 'Dev User' },
		trac_original_create_time: { type: 'string', value: '2021-02-10T08:21:00Z' },
		flowName: { type: 'string', value: 'Default & cure rate forecasting' },
		flowDescription: {
			type: 'string',
			value: 'This contains quarterly and monthly forecasts for default and cure rates'
		},
		portfolioId: { type: 'string', value: 'SECURED' },
		flowCode: { type: 'string', value: 'flow_default_and_cure_rates' },
		viewInLibrary: { type: 'boolean', value: true },
		trac_original_create_user_id: { type: 'string', value: 'dev-user' },
		trac_original_create_user_name: { type: 'string', value: 'Dev User' },
		showInRunAForecast: { type: 'boolean', value: true }
		// 	after these attributes, there are more attributes that are not defined here, so a given flowTag could have these attrs plus more than are optionals and we don't know them in advanced.
	}
}

export const searchApiForFileContentTracFlowInputCategories = {
	tags: [
		{
			tagVersion: 1,
			definition: {
				objectId: '1',
				objectType: 'FILE_CONTENT',
				asOfTime: '2021-02-10T08:21:00Z',
				version: 1
			},
			attrs: {
				trac_exp_env: { type: 'BOOLEAN', value: false }
			}
		},
		{
			tagVersion: 1,
			definition: {
				objectId: '2',
				objectType: 'FILE_CONTENT',
				asOfTime: '2021-02-10T08:21:00Z',
				version: 1
			},
			attrs: {
				trac_exp_env: { type: 'BOOLEAN', value: true }
			}
		},
		{
			tagVersion: 1,
			definition: {
				objectId: '3',
				objectType: 'FILE_CONTENT',
				asOfTime: '2021-02-10T08:21:00Z',
				version: 1
			},
			attrs: {
				trac_exp_env: { type: 'BOOLEAN', value: false }
			}
		}
	],
	attrs: [],
	pagination: {}
}

/** @type {import("@/types").TracFlowInputCategory} */
export const tracFlowInputCategoriesData = [
	{
		Reporting_Stream: 'All',
		Portfolio: 'All',
		Category: 'General',
		Dependent_Parameter: '',
		Param_Flag: '',
		Category_Description:
			'General inputs. If an inputs is not asigned a specific category it will fall under the General section.',
		User_added_by: 'Jorge',
		User_Id_added_by: '12345678'
	},
	{
		Reporting_Stream: 'All',
		Portfolio: 'Secured',
		Category: 'Economics',
		Dependent_Parameter: '',
		Param_Flag: '',
		Category_Description: 'This category defined he list of Economic input options',
		User_added_by: 'Jorge',
		User_Id_added_by: '12345678'
	},
	{
		Reporting_Stream: 'All',
		Portfolio: 'Secured',
		Category: 'PV Approved',
		Dependent_Parameter: '',
		Param_Flag: '',
		Category_Description: 'Periodically Validated inputs',
		User_added_by: 'Jorge',
		User_Id_added_by: '12345678'
	},
	{
		Reporting_Stream: 'All',
		Portfolio: 'Secured',
		Category: 'User updated input',
		Dependent_Parameter: '',
		Param_Flag: '',
		Category_Description: 'User updated input',
		User_added_by: 'Jorge',
		User_Id_added_by: '12345678'
	},
	{
		Reporting_Stream: 'All',
		Portfolio: 'All',
		Category: 'Waterfall input',
		Dependent_Parameter: '',
		Param_Flag: '',
		Category_Description: 'These inputs are for when Waterfall parameter is ON. If these.... etc',
		User_added_by: 'Jorge',
		User_Id_added_by: '12345678'
	},
	{
		Reporting_Stream: 'All',
		Portfolio: 'Secured',
		Category: 'Optional Input',
		Dependent_Parameter: '',
		Param_Flag: '',
		Category_Description: 'Optional input - if selected please ensure the corresponding parameter is ON/OFF',
		User_added_by: 'Jorge',
		User_Id_added_by: '12345678'
	},
	{
		Reporting_Stream: 'All',
		Portfolio: 'All',
		Category: 'Developer Inputs',
		Dependent_Parameter: '',
		Param_Flag: '',
		Category_Description: 'Optional input used for development purposes',
		User_added_by: 'Jorge',
		User_Id_added_by: '12345678'
	},
	{
		Reporting_Stream: 'All',
		Portfolio: 'All',
		Category: 'Overwrite PD Targets',
		Dependent_Parameter: '',
		Param_Flag: '',
		Category_Description:
			'This daraser is required when you would like the overwrite the PD Targets with user defined values',
		User_added_by: 'Jorge',
		User_Id_added_by: '12345678'
	}
]

export const MODELS_TO_USE = [
	{
		tags: [
			{
				tagVersion: 3,
				definition: {
					objectId: '19c3ae4d-19c0-4b87-b145-a69a9db6fe9a-1',
					objectType: 'MODEL',
					asOfTime: '2021-02-10T08:21:00Z',
					version: 1
				},
				attrs: {
					modelClass: {
						type: 'string',
						value: 'default_rate_calculation'
					},
					viewInLists: {
						type: 'boolean',
						value: true
					}
				}
			},
			{
				tagVersion: 3,
				definition: {
					objectId: '994fdc97-2daf-4424-a65c-6f9beb46003d',
					objectType: 'MODEL',
					asOfTime: '2021-02-11T08:21:00Z',
					version: 1
				},
				attrs: {
					modelClass: {
						type: 'string',
						value: 'default_rate_calculation'
					},
					viewInLists: {
						type: 'boolean',
						value: true
					}
				}
			}
		],
		attrs: {
			modelClass: 'string'
		},
		pagination: {}
	},
	{
		tags: [
			{
				tagVersion: 3,
				definition: {
					objectId: '18c5ad48-2fae-4c0f-a2c0-d22bd026a57c-1',
					objectType: 'MODEL',
					asOfTime: '2021-02-10T08:21:00Z',
					version: 1
				},
				attrs: {
					modelClass: {
						type: 'string',
						value: 'cure_rate_calculation'
					},
					viewInLists: {
						type: 'boolean',
						value: true
					}
				}
			},
			{
				tagVersion: 3,
				definition: {
					objectId: '84afa46a-42a1-425f-b47c-87fa7babf6be-1',
					objectType: 'MODEL',
					asOfTime: '2021-02-11T08:21:00Z',
					version: 1
				},
				attrs: {
					modelClass: {
						type: 'string',
						value: 'cure_rate_calculation'
					},
					viewInLists: {
						type: 'boolean',
						value: true
					}
				}
			}
		],
		attrs: {
			modelClass: 'string'
		},
		pagination: {}
	}
]

const viewInListAttr = {
	type: 'boolean',
	value: true
}

export const SEARCH_INPUTS_NODE_RESPONSE = [
	{
		tags: [
			{
				tagVersion: 1,
				definition: {
					objectId: 'c1cc19bd-450e-4a22-9b58-490776605896-1',
					objectType: 'DATA',
					asOfTime: '2021-02-10T08:21:00Z',
					version: 1
				},
				attrs: {
					viewInLists: viewInListAttr,
					datasetDescription: {
						type: 'string',
						value: 'Example economic scenario'
					},
					datasetKey: {
						type: 'string',
						value: 'economic_scenario_data'
					},
					datasetName: {
						type: 'string',
						value: 'Example economimc scenario'
					},
					datasetKeyDisplayName: {
						type: 'string',
						value: 'Example economic scenario'
					}
				}
			},
			{
				tagVersion: 1,
				definition: {
					objectId: 'c32f8796-7a0b-403f-bea6-8b8203924d0c-1',
					objectType: 'DATA',
					asOfTime: '2021-02-10T08:21:00Z',
					version: 1
				},
				attrs: {
					viewInLists: viewInListAttr,
					datasetDescription: {
						type: 'string',
						value: 'Example economic scenario'
					},
					datasetKey: {
						type: 'string',
						value: 'economic_scenario_data'
					},
					datasetName: {
						type: 'string',
						value: 'Example economimc scenario'
					},
					datasetKeyDisplayName: {
						type: 'string',
						value: 'Example economic scenario'
					}
				}
			}
		],
		attrs: {},
		pagination: {},
		datasetKey: 'economic_scenario_data'
	},
	{
		tags: [
			{
				tagVersion: 1,
				definition: {
					objectId: '3ecf4d73-0078-473c-944b-d2ddc61fcb9f-1',
					objectType: 'DATA',
					asOfTime: '2021-02-10T08:21:00Z',
					version: 1
				},
				attrs: {
					viewInLists: viewInListAttr,
					trac_policies: {
						type: 'string',
						value: '01:PASS|02:PASS'
					},
					datasetDescription: {
						type: 'string',
						value: '[live][one]'
					},
					datasetKey: {
						type: 'string',
						value: 'default_rate_coefficients'
					},
					datasetName: {
						type: 'string',
						value: '[live][one]'
					},
					datasetKeyDisplayName: {
						type: 'string',
						value: 'Default rate model coefficients'
					},
					portfolioId: {
						type: 'string',
						value: 'SECURED'
					},
					reportingId: {
						type: 'string',
						value: 'Impairment'
					},
					creditGradeType: {
						type: 'string',
						value: 'CRD'
					}
				}
			},
			{
				tagVersion: 1,
				definition: {
					objectId: '9b89ca33-b658-4cd1-8a3b-92fd3b2ddd5c-1',
					objectType: 'DATA',
					asOfTime: '2021-02-10T08:21:00Z',
					version: 1
				},
				attrs: {
					viewInLists: viewInListAttr,
					datasetDescription: {
						type: 'string',
						value:
							'The coefficients for each segment in the default rate model. Version 1.0 contains the initial coefficients'
					},
					datasetKey: {
						type: 'string',
						value: 'default_rate_coefficients'
					},
					datasetName: {
						type: 'string',
						value: 'Default rate model coefficients (3 month lag BTL model)'
					},
					datasetKeyDisplayName: {
						type: 'string',
						value: 'Default rate model coefficients'
					}
				}
			},
			{
				tagVersion: 1,
				definition: {
					objectId: '0e575c93-9ee7-4968-8e8d-16cedb1619fa-1',
					objectType: 'DATA',
					asOfTime: '2021-02-10T08:21:00Z',
					version: 1
				},
				attrs: {
					viewInLists: viewInListAttr,
					datasetDescription: {
						type: 'string',
						value:
							'The coefficients for each segment in the default rate model. Version 1.0 contains the initial coefficients'
					},
					datasetKey: {
						type: 'string',
						value: 'default_rate_coefficients'
					},
					datasetName: {
						type: 'string',
						value: 'Default rate model coefficients (3 month lag BTL model)'
					},
					datasetKeyDisplayName: {
						type: 'string',
						value: 'Default rate model coefficients'
					}
				}
			}
		],
		attrs: {},
		pagination: {},
		datasetKey: 'default_rate_coefficients'
	},
	{
		tags: [
			{
				tagVersion: 1,
				definition: {
					objectId: '0812d0fc-7049-4cac-a68d-216a3f6dded3-1',
					objectType: 'DATA',
					asOfTime: '2021-02-10T08:21:00Z',
					version: 1
				},
				attrs: { viewInLists: viewInListAttr }
			},
			{
				tagVersion: 1,
				definition: {
					objectId: 'c299eab9-2e77-4ade-b6e5-3327f6486d3c-1',
					objectType: 'DATA',
					asOfTime: '2021-02-10T08:21:00Z',
					version: 1
				},
				attrs: {
					viewInLists: viewInListAttr,
					portfolioId: { type: 'string', value: 'SECURED' },
					reportingId: { type: 'string', value: 'Impairment' },
					datasetKey: { type: 'string', value: 'default_rate_for_non_forbearance_overlay' },
					datasetDescription: {
						type: 'string',
						value:
							'Monthly user set overlay to the default rates for non-forbearance accounts. This is for 2020 4YOP downside scenario and 2020 4YOP base scenario'
					},
					datasetName: { type: 'string', value: 'Default rate overlay (2020 4YOP downside v22)' },
					datasetKeyDisplayName: { type: 'string', value: 'Default rate overlay' }
				}
			}
		],
		attrs: {},
		pagination: {},
		datasetKey: 'default_rate_for_non_forbearance_overlay'
	},
	{
		tags: [
			{
				tagVersion: 1,
				definition: {
					objectId: '8a0a2d7a-d956-4bd5-be00-31b57c2b5404-1',
					objectType: 'DATA',
					asOfTime: '2021-02-10T08:21:00Z',
					version: 1
				},
				attrs: {
					viewInLists: viewInListAttr,
					datasetKey: { type: 'string', value: 'cure_rate_coefficients' },
					datasetDescription: {
						type: 'string',
						value:
							'The coefficients for each segment in the cure rate model. Version 1.0 contains the coefficients from the original CRD model development.'
					},
					datasetName: { type: 'string', value: 'Cure rate model coefficients' }
				}
			},
			{
				tagVersion: 1,
				definition: {
					objectId: 'ed9d5244-c315-4c98-a381-1212c771a628-1',
					objectType: 'DATA',
					asOfTime: '2021-02-10T08:21:00Z',
					version: 1
				},
				attrs: {
					viewInLists: viewInListAttr,
					datasetKey: { type: 'string', value: 'cure_rate_coefficients' },
					datasetDescription: {
						type: 'string',
						value:
							'The coefficients for each segment in the cure rate model. Version 1.0 contains the coefficients from the original CRD model development.'
					},
					datasetName: { type: 'string', value: 'Cure rate model coefficients' }
				}
			}
		],
		attrs: {},
		pagination: {},
		datasetKey: 'cure_rate_coefficients'
	},
	{
		tags: [
			{
				tagVersion: 1,
				definition: {
					objectId: 'a3f2c7f1-f39a-4a66-99bb-c2f3a603598e-1',
					objectType: 'DATA',
					asOfTime: '2021-02-10T08:21:00Z',
					version: 1
				},
				attrs: {
					viewInLists: viewInListAttr,
					datasetDescription: { type: 'string', value: 'not set' },
					datasetKey: { type: 'string', value: 'cure_rate_for_non_forbearance_overlay' },
					datasetName: { type: 'string', value: 'Cure rate overlay' }
				}
			},
			{
				tagVersion: 1,
				definition: {
					objectId: '5d597519-d5e5-45d0-89c1-dad07209d7e3-1',
					objectType: 'DATA',
					asOfTime: '2021-02-10T08:21:00Z',
					version: 1
				},
				attrs: {
					viewInLists: viewInListAttr,
					datasetDescription: { type: 'string', value: 'not set' },
					datasetKey: { type: 'string', value: 'cure_rate_for_non_forbearance_overlay' },
					datasetName: { type: 'string', value: 'Cure rate overlay' }
				}
			}
		],
		attrs: {},
		pagination: {},
		datasetKey: 'cure_rate_for_non_forbearance_overlay'
	}
]

export const FLOW_OPTIONS = [
	{
		value: 'flow-id-1',
		label: 'Default & cure rate forecasting (7th Feb 202024 08:21am)'
	},
	{
		value: 'flow-id-2',
		label: 'Default & cure rate forecasting (10th Feb 202024 08:21am)'
	}
]
