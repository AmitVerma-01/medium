import { ChangeEvent } from "react";

type InputBoxProps = {
  name?: string;
  type?: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
};

const InputBox = ({
  name,
  label,
  type,
  placeholder,
  onChange,
}: InputBoxProps) => {
  return (
    <div className="flex w-full flex-col">
      <label htmlFor={label} className="text-lg py-1 font-medium">
        {label} :
      </label>
      <input
        name={name}
        type={type || "text"}
        placeholder={placeholder}
        id={label}
        className="shadow  border rounded py-2 px-3 leading-tight focus:border-blue-500"
        onChange={onChange}
      />
    </div>
  );
};

export default InputBox;
