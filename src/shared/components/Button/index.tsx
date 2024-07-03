import { IButtonProps } from "./interface"

export const Button: React.FC<IButtonProps> = ({
    type,
    disabled,
    children,
    onClick,
    ...props
}) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}