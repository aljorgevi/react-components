import propTypes from 'prop-types'

const IsolatedContainer = ({ children, ...props }) => (
	<div
		style={{
			marginTop: 250,
			display: 'flex',
			justifyContent: 'center'
		}}
		{...props}
	>
		<div>{children}</div>
	</div>
)

export function LoadingMessagePage({ children }) {
	return (
		<IsolatedContainer>
			<div style={{ textAlign: 'center', position: 'relative' }}>
				<p
					style={{
						fontSize: 24,
						fontWeight: 'bold',
						color: 'rgba(0, 0, 0, 0.7)',
						marginBottom: 10
					}}
				>
					{children}
				</p>

				<Loading />
			</div>
		</IsolatedContainer>
	)
}

const sizes = {
	small: { zoom: 0.7 },
	medium: { zoom: 1 },
	large: { zoom: 2 }
}

const Loading = ({ size = 'medium', className = '', ...props }) => (
	<section style={{ position: 'relative', height: 70 }}>
		<div style={sizes[size]} className={`${className} lds-ellipsis`} {...props}>
			<div />
			<div />
			<div />
			<div />
		</div>
	</section>
)

Loading.propTypes = {
	size: propTypes.string,
	className: propTypes.string
}

IsolatedContainer.propTypes = {
	children: propTypes.node
}

LoadingMessagePage.propTypes = {
	children: propTypes.node
}
