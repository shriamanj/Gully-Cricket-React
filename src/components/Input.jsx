const Input = ({ id, min, max, type, value, label, disabled, placeholder, onChange }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-800 font-semibold mb-2">
        {label}
      </label>
      <input
        id={id}
        min={min}
        max={max}
        type={type}
        value={value}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-400 px-4 py-2 text-gray-900 bg-white text-[16px] w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 mb-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      />
    </div>
  );
};
export default Input;
