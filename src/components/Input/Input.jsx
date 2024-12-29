'use client'
import React, { useState, useId } from 'react';

export default function Input({
  type = "text",
  label = "",
  value = "",
  name = "",
  onChange,
  className,
  placeholder = "",
  view = false,
}) {
  const [inputType, setInputType] = useState(type);
  const uniqueId = useId();

  const handleViewToggle = () => {
    setInputType(prevType => (prevType === 'password' ? 'text' : 'password'));
  };

  return (
    <div className={`p-2 flex-col flex rounded ${className}`}>
      <label htmlFor={uniqueId}>
        {label}
      </label>
      <div>
        <input
          type={inputType}
          id={uniqueId}
          value={value || ""}
          name={name}
          onChange={onChange}
          className="border p-2 w-full"
          placeholder={placeholder}
        />
        {type === 'password' && view && (
          <button
            type="button"
            className="border p-2"
            onClick={handleViewToggle}
          >
            {inputType === 'password' ? "👁" : "👁‍🗨"}
          </button>
        )}
      </div>
    </div>
  );
}
