import { ISelectProps } from "./interface";

export const Select: React.FC<ISelectProps> = ({ onChange, value, children,  ...props }) => {
  return (
    <select value={value} onChange={(event) => onChange(event)} {...props}>
        {children}
    </select>
  )

};
