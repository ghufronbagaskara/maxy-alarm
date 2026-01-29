import { motion } from "framer-motion";
import Toggle from "./Toggle";

const AlarmItem = ({ alarm, onToggle, onClick, isRinging }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isRinging ? [1, 1.02, 1] : 1,
      }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        scale: {
          repeat: isRinging ? Infinity : 0,
          duration: 0.5,
        },
      }}
      onClick={onClick}
      className={`bg-dark-card hover:bg-dark-cardHover rounded-2xl p-5 cursor-pointer transition-all shadow-lg ${
        isRinging ? "ring-2 ring-blue-500 shadow-blue-500/50" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-4xl font-light text-dark-text mb-1">
            {alarm.time}
          </div>
          <div className="text-sm text-dark-textSecondary flex items-center gap-2">
            <span>{alarm.repeat || "Once"}</span>
            {alarm.label && (
              <>
                <span>•</span>
                <span>{alarm.label}</span>
              </>
            )}
          </div>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <Toggle enabled={alarm.enabled} onChange={() => onToggle(alarm.id)} />
        </div>
      </div>
    </motion.div>
  );
};

export default AlarmItem;
