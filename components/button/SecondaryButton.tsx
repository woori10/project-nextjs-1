import React from "react";

type SecondaryButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    className?: string;
}

export default function SecondaryButton({
    children,
    onClick,
    type="button",
    className="",

}: SecondaryButtonProps) {

    return (
        <button type={type} onClick={onClick} 
            className={`bg-red-500 hover:bg-red-700 text-xs text-white px-2 py-1 rounded ${className}`}>
            {children}
        </button>
    )
}