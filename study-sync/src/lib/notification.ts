import * as Notifications from "expo-notifications";

export async function scheduleTaskReminder(title: string, date: Date) {

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "StudySync Reminder",
      body: `Task due: ${title}`,
    },
    trigger: {
      date: date,
    } as any, //ignore TypeScript here
  });

}