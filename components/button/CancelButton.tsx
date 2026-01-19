import React from "react";

type CancelButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    className?: string;
}

export default function CancelButton({
    children,
    onClick,
    type="button",
    className="",
}: CancelButtonProps) {

    return (
        <button type={type} onClick={onClick} 
            className={`bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded ${className}`}>
            {children}
        </button>
    )
}