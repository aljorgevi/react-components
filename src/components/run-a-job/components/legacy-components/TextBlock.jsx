import { Col, Row } from 'react-bootstrap'
import propTypes from 'prop-types'

TextBlock.propTypes = {
	children: propTypes.node.isRequired,
	className: propTypes.string,
	style: propTypes.object
}

export function TextBlock({ children, className, style = {} }) {
	return (
		<Row style={style} className={`mt-2 mb-3 ${className}`}>
			<Col>{children}</Col>
		</Row>
	)
}
