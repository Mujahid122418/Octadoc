import React from "react";
import "./Button2.css";

interface Button2Props {
  name: string;
  onClick: (value: any) => void;
  icon?: React.ReactNode;
}

const Button2: React.FC<Button2Props> = ({ name, onClick ,icon  }) => {
  return (
    <div>
      <button  onClick={onClick}  className="btn btn-template mx-2">
        {name}
        {icon && icon}
      </button>
    </div>
  );
};

export default Button2;
