import * as TaskManager from "expo-task-manager";
import * as Notifications from "expo-notifications";

const BACKGROUND_TASK_NAME = "background-pomodoro-task";

TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
  try {
    console.log("Tarea en background ejecutándose");
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "¡Pomodoro finalizado!",
        body: "Es hora de tomar un descanso.",
        sound: "default",
      },
      trigger: null, // Se dispara inmediatamente
    });
  } catch (error) {
    console.error("Error ejecutando la tarea en background:", error);
  }
});
