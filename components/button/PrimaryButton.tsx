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
        <button type={type} onClick={onClick} className={`bg-blue-500 hover:bg-blue-700 text-2xl text-white py-2 px-4 rounded ${className}`}>
            {children}
        </button>
    )
}