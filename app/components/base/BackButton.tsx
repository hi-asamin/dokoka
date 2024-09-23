import { FiArrowLeft } from "react-icons/fi";

const BackButton = () => {
  return (
    <button
      className="flex items-center justify-center bg-white p-2 rounded-full shadow-md"
      style={{ width: "50px", height: "50px" }}
      onClick={() => window.history.back()}
      aria-label="Go back"
    >
      <FiArrowLeft size={24} className="text-blue-600 text-xl" />
    </button>
  );
};

export default BackButton;
