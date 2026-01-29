import { motion } from "framer-motion";

const Toggle = ({ enabled, onChange }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-dark-bg"
      style={{
        backgroundColor: enabled ? "#3b82f6" : "#3a3a3a",
      }}
    >
      <motion.span
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ${enabled ? "translate-x-7" : "translate-x-1"}`}
      />
    </button>
  );
};

export default Toggle;
