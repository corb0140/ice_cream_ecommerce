import { Eye, EyeClosed } from "lucide-react";

function FormInputs({
  name,
  type,
  showIcon = false,
  value = "",
  setValue = () => {},
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-wewak">
        {name}
      </label>

      <div className="flex items-center justify-between border-b">
        <input
          type={type}
          name={name}
          className="outline-none p-1 flex-1"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          required
        />

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

export default FormInputs;
