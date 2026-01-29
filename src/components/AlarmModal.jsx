import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";

const AlarmModal = ({ isOpen, onClose, onSave, existingAlarm }) => {
  const [time, setTime] = useState("07:00");
  const [label, setLabel] = useState("");
  const [vibrate, setVibrate] = useState(true);
  const [ringtone, setRingtone] = useState("default");
  const [repeat, setRepeat] = useState("Once");

  useEffect(() => {
    if (existingAlarm) {
      setTime(existingAlarm.time);
      setLabel(existingAlarm.label || "");
      setVibrate(existingAlarm.vibrate);
      setRingtone(existingAlarm.ringtone);
      setRepeat(existingAlarm.repeat || "Once");
    } else {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setTime(`${hours}:${minutes}`);
      setLabel("");
      setVibrate(true);
      setRingtone("default");
      setRepeat("Once");
    }
  }, [existingAlarm, isOpen]);

  const handleSave = () => {
    const alarmData = {
      id: existingAlarm?.id || uuidv4(),
      time,
      enabled: existingAlarm?.enabled ?? true,
      repeat,
      label,
      vibrate,
      ringtone,
    };
    onSave(alarmData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm"
          />

          {/* modal */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <div className="bg-dark-card w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
              {/* header */}
              <div className="sticky top-0 bg-dark-card border-b border-dark-border p-6 flex items-center justify-between">
                <h2 className="text-xl font-medium text-dark-text">
                  {existingAlarm ? "Edit Alarm" : "New Alarm"}
                </h2>
                <button
                  onClick={onClose}
                  className="text-dark-textSecondary hover:text-dark-text transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* content */}
              <div className="p-6 space-y-6">
                {/* time picker */}
                <div className="text-center py-8">
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="text-6xl font-light bg-transparent text-dark-text border-none outline-none text-center w-full cursor-pointer"
                    style={{ colorScheme: "dark" }}
                  />
                </div>

                {/* label */}
                <div>
                  <label className="block text-sm text-dark-textSecondary mb-2">
                    Label
                  </label>
                  <input
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Alarm name"
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-dark-text placeholder-dark-textSecondary focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* repeat */}
                <div>
                  <label className="block text-sm text-dark-textSecondary mb-2">
                    Repeat
                  </label>
                  <select
                    value={repeat}
                    onChange={(e) => setRepeat(e.target.value)}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-dark-text focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ colorScheme: "dark" }}
                  >
                    <option>Once</option>
                    <option>Daily</option>
                    <option>Weekdays</option>
                    <option>Weekends</option>
                  </select>
                </div>

                {/* ringtone */}
                <div>
                  <label className="block text-sm text-dark-textSecondary mb-2">
                    Ringtone
                  </label>
                  <select
                    value={ringtone}
                    onChange={(e) => setRingtone(e.target.value)}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-dark-text focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ colorScheme: "dark" }}
                  >
                    <option value="default">Default</option>
                    <option value="classic">Classic</option>
                    <option value="gentle">Gentle</option>
                    <option value="loud">Loud</option>
                  </select>
                </div>

                {/* vibrate toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-dark-text">Vibrate</span>
                  <button
                    onClick={() => setVibrate(!vibrate)}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      vibrate ? "bg-blue-500" : "bg-dark-border"
                    }`}
                  >
                    <motion.span
                      layout
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ${
                        vibrate ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* footer */}
              <div className="sticky bottom-0 bg-dark-card border-t border-dark-border p-6">
                <button
                  onClick={handleSave}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AlarmModal;
