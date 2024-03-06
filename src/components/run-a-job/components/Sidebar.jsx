import { Nav } from 'react-bootstrap'
import PropTypes from 'prop-types'

/**
 * @typedef {{
 *  eventKey: string,
 *  label: string
 * }} navItems
 */

Sidebar.propTypes = {
	setSelectedOption: PropTypes.func.isRequired,
	navItems: PropTypes.array.isRequired,
	selectedOption: PropTypes.string.isRequired
}

/**
 *
 * @param {Object} options
 * @param {Function} options.setSelectedOption
 * @param {navItems[]} options.navItems
 * @param {string} options.selectedOption
 * @returns
 */
export function Sidebar({ setSelectedOption, navItems, selectedOption }) {
	return (
		<Nav className='flex-column' onSelect={selectedKey => setSelectedOption(selectedKey)}>
			{navItems.map(item => (
				<Nav.Item
					className='p-1'
					key={item.eventKey}
					style={{ backgroundColor: item.eventKey === selectedOption ? '#e9eef3' : '', borderRadius: '5px' }}
				>
					<Nav.Link className='text-dark bg-hover' eventKey={item.eventKey}>
						{item.label}
					</Nav.Link>
				</Nav.Item>
			))}
		</Nav>
	)
}
