import PropTypes from 'prop-types'
import './tableCell.css' // Assuming CSS is saved in TableCell.css

// Sub-component: Badge
const Badge = ({ children }) => <span className='badge-cell'>{children}</span>
Badge.propTypes = { children: PropTypes.node.isRequired }

// Sub-component: Icon
const Icon = ({ children }) => <span className='icon-cell'>{children}</span>
Icon.propTypes = { children: PropTypes.node.isRequired }

// Main component
function TableCell({ children }) {
	return <div className='container-cell'>{children}</div>
}
TableCell.propTypes = {
	children: PropTypes.node.isRequired
}

// Sub-components assigned after their declaration
function Badges({ children }) {
	return <div className='badges-cell'>{children}</div>
}
Badges.propTypes = { children: PropTypes.node.isRequired }

function Icons({ children }) {
	return <div className='icons-cell'>{children}</div>
}
Icons.propTypes = { children: PropTypes.node.isRequired }

function Content({ children }) {
	return <div className='id-cell'>{children}</div>
}
Content.propTypes = { children: PropTypes.node.isRequired }

// Associating sub-components with the main component
TableCell.Badges = Badges
TableCell.Icons = Icons
TableCell.Content = Content

export { TableCell, Badge, Icon }
