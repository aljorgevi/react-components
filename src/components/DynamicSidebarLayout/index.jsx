import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { Sidebar } from './Sidebar'
import { Layout } from './Layout'

/**
 * A dynamic layout component with a sidebar that triggers different content on the main area.
 * @param {Object} props The component props.
 * @param {Array} props.navItems Array of navigation items for the sidebar.
 * @param {Object} props.viewComponents Mapping of view components based on selected nav item key.
 * @param {String} props.title The title of the layout.
 * @param {String} props.description The description of the layout.
 * @param {Boolean} [props.loading] If the layout is in loading state.
 */
export function DynamicSidebarLayout({ navItems, viewComponents, title, description, loading }) {
	console.log("hello")
	const [selectedOption, setSelectedOption] = useState(navItems[0].eventKey) // Initialize with the first item's key

	return (
		<Layout title={title} description={description} loading={loading}>
			<Row className='pb-5'>
				<Col xs={2}>
					<Sidebar selectedOption={selectedOption} setSelectedOption={setSelectedOption} navItems={navItems} />
				</Col>
				<Col className='px-5' xs={10}>
					{viewComponents[selectedOption]}
				</Col>
			</Row>
		</Layout>
	)
}

DynamicSidebarLayout.propTypes = {
	navItems: PropTypes.arrayOf(
		PropTypes.shape({
			eventKey: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired
		})
	).isRequired,
	viewComponents: PropTypes.objectOf(PropTypes.element).isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	loading: PropTypes.bool
}
