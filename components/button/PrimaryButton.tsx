import React from "react";

type PrimaryButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    className?: string;
}

export default function PrimaryButton({
    children,
    onClick,
    type="button",
    className="",

}: PrimaryButtonProps) {

    return (
        <button type={type} onClick={onClick} 
            className={`bg-blue-500 hover:bg-blue-700 text-xs text-white px-2 py-1 rounded ${className}`}>
            {children}
        </button>
    )
}