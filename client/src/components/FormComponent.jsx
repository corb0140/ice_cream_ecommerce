import { Eye, EyeClosed } from "lucide-react";

function FormInputs({ name, type, showIcon = false }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-wewak">
        {name}
      </label>

      <div className="flex items-center justify-between border-b">
        <input type={type} name={name} className="outline-none p-1" />

        {showIcon && (
          <span className="icon cursor-pointer" onClick={showIcon}>
            {type === "password" ? (
              <EyeClosed className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </span>
        )}
      </div>
    </div>
  );
}

function FormButton({ text, onClick }) {
  return (
    <button
      type="button"
      className="bg-wine-berry text-white px-4 py-2 rounded hover:bg-livid-brown transition-colors"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export { FormButton, FormInputs };
