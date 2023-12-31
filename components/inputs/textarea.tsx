type Props = {
  type: string;
  placeholder: string;
  name: string;
  handleChange: any;
  handleBlur: any;
  value: string;
  error: string | undefined;
  touched: boolean | undefined;
  isUsernameAvailable?: boolean;
};

const TextArea = ({
  placeholder,
  name,
  handleChange,
  handleBlur,
  value,
  error,
  touched,
}: Props) => {
  return (
    <div className="flex flex-col-reverse gap-1 w-full">
      {error && touched && <p className="text-[12px] text-red-500">{error}</p>}
      <textarea
        placeholder={placeholder}
        name={name}
        id={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        className={`border ${
          error && touched
            ? "border-red-500 focus:border-red-500 border-2"
            : "border-gray-500 focus:border-gold border"
        }   w-full h-[100px] text-sm text-black rounded-[6px] focus:outline-none  focus:ring-0  peer bg-gray-50  pl-4 pt-2 placeholder:text-gray-700 `}
      />
      <label
        htmlFor={name}
        className="text-[13px] text-slate-700 font-bold peer-focus:text-gold after:content-['*'] after:ml-0.5 after:text-red-500"
      >
        {placeholder}
      </label>
    </div>
  );
};

export default TextArea;
