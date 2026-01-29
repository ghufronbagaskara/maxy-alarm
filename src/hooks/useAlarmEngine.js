import { useEffect, useRef, useState } from "react";

const useAlarmEngine = (alarms, onAlarmTrigger) => {
  const [currentTime, setCurrentTime] = useState("");
  const triggeredAlarmsRef = useRef(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const timeString = `${hours}:${minutes}`;

      setCurrentTime(timeString);

      alarms.forEach((alarm) => {
        if (alarm.enabled && alarm.time === timeString) {
          const alarmKey = `${alarm.id}-${timeString}`;

          if (!triggeredAlarmsRef.current.has(alarmKey)) {
            triggeredAlarmsRef.current.add(alarmKey);
            onAlarmTrigger(alarm);

            setTimeout(() => {
              triggeredAlarmsRef.current.delete(alarmKey);
            }, 61000);
          }
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [alarms, onAlarmTrigger]);

  return { currentTime };
};

export default useAlarmEngine;
