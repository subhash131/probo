import React from "react";

const InputField = ({
  field,
  setField,
  name,
}: {
  name: string;
  field: string;
  setField: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="text-[#565656] relative group h-10 items-end flex">
      <span
        className={`text-xs  absolute transition-all ${
          field ? "top-0" : " top-5 group-hover:top-0"
        }`}
      >
        {name}
      </span>
      <input
        className="border-b bg-transparent border-[#868686] outline-none text-sm"
        autoFocus
        onChange={(e) => setField(e.target.value)}
        name={field}
        value={field}
      />
    </div>
  );
};

export default InputField;
