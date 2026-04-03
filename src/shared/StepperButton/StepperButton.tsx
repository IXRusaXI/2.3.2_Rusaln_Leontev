import './style.scss'

interface StepperButtonProps {
    onClick: () => void;
    children?: React.ReactNode;
}

export default function StepperButton({onClick, children}: StepperButtonProps) {
    return (
        <button className="stepper-button" onClick={onClick}>
            {children}
        </button>
    )
}

