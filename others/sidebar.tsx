import React from 'react'

/**
 * NavItem type definition.
 */
type NavItem = {
	eventKey: string
	label: string
}

interface SidebarProps {
	setSelectedOption: (key: string) => void
	navItems: NavItem[]
	selectedOption: string
}

/**
 * Sidebar component for navigation.
 * @param {SidebarProps} props - Component props.
 * @returns {JSX.Element} - Rendered component.
 */
export const Sidebar: React.FC<SidebarProps> = ({ setSelectedOption, navItems, selectedOption }) => {
	return (
		<div className='flex flex-col space-y-2'>
			{navItems.map(item => (
				<div
					key={item.eventKey}
					className={`p-2 rounded ${item.eventKey === selectedOption ? 'bg-gray-300' : ''}`}
					onClick={() => setSelectedOption(item.eventKey)}
				>
					<button className='text-dark hover:bg-gray-200 w-full text-left'>{item.label}</button>
				</div>
			))}
		</div>
	)
}
