import React from "react";

type TernaryButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    className?: string;
}

export default function TernaryButton({
    children,
    onClick,
    type="button",
    className="",
}: TernaryButtonProps) {

    return (
        <button type={type} onClick={onClick} 
            className={`bg-indigo-500 hover:bg-indigo-700 text-xs text-white p-2 rounded ${className}`}>
            {children}
        </button>
    )
}