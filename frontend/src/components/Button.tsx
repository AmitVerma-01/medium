interface ButtonProps {
  onClick: () => void;
  label: string;
  disabled: boolean;
}

function Button({ onClick, label, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-black text-white text-xl rounded-md py-2 px-3"
    >
      {label}
    </button>
  );
}

export default Button;
