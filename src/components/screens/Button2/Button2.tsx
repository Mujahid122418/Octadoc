import React from "react";
import "./Button2.css";
import { CircularProgress } from "@mui/material";
interface Button2Props {
  name: string;
  onClick: (value: any) => void;
  icon?: React.ReactNode;
  isLoading?: any;
}

const Button2: React.FC<Button2Props> = ({
  name,
  onClick,
  icon,
  isLoading,
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="btn btn-template mx-2"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading && (
          <CircularProgress color="inherit" size={20} sx={{ mr: 2 }} />
        )}{" "}
        {name}
        {icon && icon}
      </button>
    </div>
  );
};

export default Button2;
