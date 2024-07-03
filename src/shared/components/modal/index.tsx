import { IModelProsp } from "./interface";

export const Modal: React.FC<IModelProsp> = ({
    children
}) => {
    return (
        <>
            <div>{children}</div>
        </>
    )
}