import { IInputProps } from "./interface";

export const Input: React.FC<IInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  ...props
}) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event)}
      {...props}
    />
  );
};
