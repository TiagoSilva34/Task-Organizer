import { ISelectProps } from "./interface";

export const Select: React.FC<ISelectProps> = ({ onChange, ...props }) => {
  return (
    <select onChange={(event) => onChange(event)} {...props}>
      <option>Select a priority</option>
      <option value="">low</option>
      <option value="">medium</option>
      <option value="">high</option>
    </select>
  )

};
