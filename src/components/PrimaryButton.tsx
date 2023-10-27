import React from "react";

interface IButtonProps {
  text: string;
  onClick: () => any;
  isSecondary?: boolean;
  className?: string;
}

const PrimaryButton: React.FC<IButtonProps> = ({ isSecondary = false, text, onClick, className }) => {
  return (
    <button
      className={`w-full rounded border ${
        isSecondary ? "bg-blue-950 " : " border-secondary bg-secondary font-medium text-neutral-900"
      } ${className}
       py-3`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
