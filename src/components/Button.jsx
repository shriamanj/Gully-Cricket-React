const Button = ({ label, onClick }) => {
  return (
    <button
      className="w-32 bg-gray-800 text-white px-8 py-3 rounded-xl text-xl font-semibold shadow hover:bg-gray-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 animate-fade-in cursor-pointer"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
export default Button;
