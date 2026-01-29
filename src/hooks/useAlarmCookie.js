import { useEffect, useState } from "react";
import {
  loadAlarmsFromCookie,
  saveAlarmsToCookie,
} from "../utils/cookieHelper";

const useAlarmCookie = () => {
  const [alarms, setAlarms] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedAlarms = loadAlarmsFromCookie();
    setAlarms(savedAlarms);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      saveAlarmsToCookie(alarms);
    }
  }, [alarms, loaded]);

  const addAlarm = (alarm) => {
    setAlarms((prev) => [...prev, alarm]);
  };

  const updateAlarm = (id, updates) => {
    setAlarms((prev) =>
      prev.map((alarm) => (alarm.id === id ? { ...alarm, ...updates } : alarm)),
    );
  };

  const toggleAlarm = (id) => {
    setAlarms((prev) =>
      prev.map((alarm) =>
        alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm,
      ),
    );
  };

  const deleteAlarm = (id) => {
    setAlarms((prev) => prev.filter((alarm) => alarm.id !== id));
  };

  const getSortedAlarms = () => {
    return [...alarms].sort((a, b) => {
      const [aHours, aMinutes] = a.time.split(":").map(Number);
      const [bHours, bMinutes] = b.time.split(":").map(Number);
      const aTotal = aHours * 60 + aMinutes;
      const bTotal = bHours * 60 + bMinutes;
      return aTotal - bTotal;
    });
  };

  return {
    alarms: getSortedAlarms(),
    addAlarm,
    updateAlarm,
    toggleAlarm,
    deleteAlarm,
    loaded,
  };
};

export default useAlarmCookie;
