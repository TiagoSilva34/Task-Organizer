import { IFormProps } from "./interface";

export const Form: React.FC<IFormProps> = ({
    children,
    onSubmit,
    ...props
}) => {
    return (
        <form onSubmit={onSubmit} {...props}>
            {children}
        </form>
    )
}