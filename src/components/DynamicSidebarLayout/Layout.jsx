'use client'

import PropTypes from 'prop-types'
import { LoadingMessagePage } from '../LoadingMessagePage'

Layout.propTypes = {
	children: PropTypes.node,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	loading: PropTypes.bool
}

/**
 *	This component it's a wrapper of the main component,
 * 	here we check if the values are in the local storage and set them in the state before the main component is rendered.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.children
 * @param {String} props.title
 * @param {String} props.description
 * @param {Boolean} [props.loading]
 *
 * @returns
 */
export function Layout({ children, title, description, loading = false }) {
	return (
		<section className='mt-3' style={{ width: '100%' }}>
			<div className='mb-3 p-3' style={{ borderBottom: '1px solid #e0e0e0' }}>
				<h3>{title}</h3>
				<h5>{description}</h5>
			</div>
			<div>{loading ? <LoadingMessagePage>Loading, please wait...</LoadingMessagePage> : children}</div>
		</section>
	)
}
