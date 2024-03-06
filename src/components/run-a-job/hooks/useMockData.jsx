import { useRunAJobStore } from '../store'

export const useMockData = () => {
	const [flowOptions] = useRunAJobStore(state => [state.flowOptions])
	const PORTFOLIOS_LIST = [
		{
			value: 'uk-secured',
			label: 'UK Secured'
		},
		{
			value: 'uk-unsecured',
			label: 'UK Unsecured'
		}
	]

	const STREAM_LIST = [
		{
			value: 'ALL',
			label: 'All'
		},
		{
			value: 'impermanent',
			label: 'Impermanent'
		},
		{
			value: 'forecasting',
			label: 'Forecasting'
		}
	]

	return {
		PORTFOLIOS_LIST,
		STREAM_LIST,
		FLOWS_LIST: flowOptions
	}
}
