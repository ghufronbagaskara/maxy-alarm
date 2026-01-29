import { useEffect, useRef, useState } from "react";
import useAlarmCookie from "../hooks/useAlarmCookie";
import useAlarmEngine from "../hooks/useAlarmEngine";
import AlarmList from "../components/AlarmList";
import AlarmModal from "../components/AlarmModal";
import { motion } from "framer-motion";

const Alarm = () => {
  const { alarms, addAlarm, updateAlarm, toggleAlarm, loaded } =
    useAlarmCookie();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAlarm, setEditingAlarm] = useState(null);
  const [ringingAlarmId, setRingingAlarmId] = useState(null);
  const audioRef = useRef(null);

  const handleAlarmTrigger = (alarm) => {
    console.log("alarm triggered:", alarm);

    setRingingAlarmId(alarm.id);

    playAlarmSound();

    if (alarm.vibrate && "vibrate" in navigator) {
      navigator.vibrate([500, 200, 500, 200, 500]);
    }

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Alarm", {
        body: alarm.label || `Alarm at ${alarm.time}`,
        icon: "/vite.svg",
        tag: alarm.id,
      });
    }

    setTimeout(() => {
      setRingingAlarmId(null);
      stopAlarmSound();
    }, 30000);
  };

  const { currentTime } = useAlarmEngine(alarms, handleAlarmTrigger);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const playAlarmSound = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((err) => console.log("audio play failed:", err));
    }
  };

  const stopAlarmSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleSaveAlarm = (alarmData) => {
    if (editingAlarm) {
      updateAlarm(alarmData.id, alarmData);
    } else {
      addAlarm(alarmData);
    }
  };

  const handleAddAlarm = () => {
    setEditingAlarm(null);
    setIsModalOpen(true);
  };

  const handleEditAlarm = (alarm) => {
    setEditingAlarm(alarm);
    setIsModalOpen(true);
  };

  const handleDismissAlarm = () => {
    setRingingAlarmId(null);
    stopAlarmSound();
  };

  if (!loaded) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-dark-textSecondary">Loading alarms...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* audio element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUKnk786jWxkNTKXh8bllHAU2jdXvz3oqBSh+zPLaizsKGGS56+mnUhELTKPi8L1nIAU2jNXvz3oqBSh+zPLaizsKGGS56+mnUhELTKPi8L1nIAU2jNXvz3oqBSh+zPLaizsKGGS56+mnUhELTKPi8L1nIAU2jdXvz3oqBSh+zPLaizsKGGW56+mnUhELTKPi8L1nIAU2jdXvz3oqBSh+zPLaizsKGGW56+mnUhELTKPi8L1nIAU2jdXvz3oqBSh+zPLaizsKGGW56+mnUhELTKPi8L1nIAU2jdXvz3oqBSh+zPLaizsKGGW56+mnUhELTKPi8L1nIAU2jdXvz3oqBSh+zPLaizsKGGW56+mnUhELTKPi8L1nIAU2jdXvz3oqBSh+zPLaizsKGGW56+mnUhELTKPi8L1nIAU2jdXvz3oqBSh+zPLaizsKGGW56+mnUhELTKPi8L1nIAU2jdXvz3oqBSh+zPLaizsKGGW56+mnUhELTKPi8L1nIAU2jdXvz3oqBSh+zPLaizsKGGW56+mnUhELTKPi8L1nIAU2jdXvz3oqBSh+zPLaizsKGGW56+mnUhELTKPi8L1nIAU2jdXvz3oqBSh+zPLaizsKGGW56+mnUhELTKPi8L1nIAU2jdXvz3oqBSh+zPLaizsKGGW56+mnUhELTKPi8L1nIAU2jdXvz3oqBSh+zPLaizsKGGW56+mnUhELTKPi8L1nIAU2jdXvz3oqBSh+zPLaizsKGGW56+mnUhELTKPi8L1nIAU2jdXvz3oqBSh+zPLaizsKGGW56+mnUhELTKPi8L1nIAU2jdXvz3oqBSh+zPLaizsKGGW56+mnUhELTKPi8L1nIA=="
      />

      {/* header */}
      <header className="sticky top-0 bg-dark-bg/95 backdrop-blur-sm border-b border-dark-border z-30">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-medium text-dark-text">Maxy Alarm🔥⏰</h1>
          <div className="text-dark-textSecondary text-sm font-mono">
            {currentTime}
          </div>
        </div>
      </header>

      {/* main */}
      <main className="max-w-2xl mx-auto px-6 py-6">
        <AlarmList
          alarms={alarms}
          onToggle={toggleAlarm}
          onEdit={handleEditAlarm}
          ringingAlarmId={ringingAlarmId}
        />
      </main>

      {/* floating add alarm */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleAddAlarm}
        className="fixed bottom-8 right-8 w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-colors z-20"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </motion.button>

      {/* alarm modal */}
      <AlarmModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAlarm(null);
        }}
        onSave={handleSaveAlarm}
        existingAlarm={editingAlarm}
      />

      {/* dismiss alarm */}
      {ringingAlarmId && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-24 left-0 right-0 flex justify-center z-30"
        >
          <button
            onClick={handleDismissAlarm}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full shadow-2xl font-medium transition-colors"
          >
            Dismiss Alarm
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Alarm;
