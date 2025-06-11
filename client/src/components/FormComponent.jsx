import { Eye, EyeClosed } from "lucide-react";

function FormInputs({
  name,
  type,
  showIcon = false,
  value = "",
  setValue = () => {},
  accept = "",
  onFileChange = null,
  isRequired = true,
}) {
  const handleInputChange = (e) => {
    if (type === "file") {
      const files = e.target.files;
      setValue(files[0]);

      // trigger optional file preview function
      if (onFileChange && typeof onFileChange === "function") {
        onFileChange(e);
      }
    } else {
      setValue(e.target.value);
    }
  };

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
          accept={accept}
          value={type === "file" ? undefined : value}
          onChange={handleInputChange}
          required={isRequired}
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
