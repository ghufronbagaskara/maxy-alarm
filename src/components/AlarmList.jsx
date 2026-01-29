import { AnimatePresence } from "framer-motion";
import AlarmItem from "./AlarmItem";

const AlarmList = ({ alarms, onToggle, onEdit, ringingAlarmId }) => {
  if (alarms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-dark-textSecondary">
        <svg
          className="w-24 h-24 mb-4 opacity-30"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-lg">No alarms set</p>
        <p className="text-sm mt-1">Tap + to create an alarm</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 pb-24">
      <AnimatePresence>
        {alarms.map((alarm) => (
          <AlarmItem
            key={alarm.id}
            alarm={alarm}
            onToggle={onToggle}
            onClick={() => onEdit(alarm)}
            isRinging={ringingAlarmId === alarm.id}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AlarmList;
