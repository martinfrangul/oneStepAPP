import * as Notifications from "expo-notifications";

// Esto maneja las notificaciones mientras la app está cerrada o en segundo plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,   // Muestra la notificación (título y cuerpo)
    shouldPlaySound: true,   // Reproduce sonido
    shouldSetBadge: false,   // No modifica el badge del ícono
  }),
});
