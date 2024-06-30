import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useState, FC } from 'react'

interface SwitchDemoProps {
	label: string
	id: string
	onChange: (isChecked: boolean) => void // Function to handle state change
}

export const SwitchDemo: FC<SwitchDemoProps> = ({ label, id, onChange }) => {
	const [isChecked, setChecked] = useState(false)

	// Function to update internal state and call the onChange prop
	const handleCheckedChange = (checked: boolean) => {
		setChecked(checked)
		onChange(checked) // Trigger the passed onChange function
	}

	return (
		<div className='flex items-center space-x-2'>
			<Switch id={id} checked={isChecked} onCheckedChange={handleCheckedChange} />
			<Label htmlFor={id}>{label}</Label>
		</div>
	)
}
