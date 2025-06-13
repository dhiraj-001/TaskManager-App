import notifee, { AndroidImportance, EventType, TriggerType } from '@notifee/react-native';
import type { Task } from '../Context/TaskContext';

class NotificationService {
  constructor() {
    this.configureNotifications();
  }

  async configureNotifications() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    await notifee.createChannel({
      id: 'task-reminders',
      name: 'Task Reminders',
      description: 'Notifications for task due dates',
      importance: AndroidImportance.HIGH,
      sound: 'default',
      vibration: true,
    });
  }

  getTimeRemaining(dueDate: Date): string {
    const now = new Date();
    const diff = dueDate.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} and ${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }

  async scheduleTaskNotification(task: Task) {
    const dueDate = new Date(task.due);
    const now = new Date();
    const timeUntilDue = dueDate.getTime() - now.getTime();
    const oneDayInMs = 24 * 60 * 60 * 1000;

    // Only schedule if due date is in the future and less than one day away
    if ( timeUntilDue <= oneDayInMs) {
      const timeRemaining = this.getTimeRemaining(dueDate);
      
      // Schedule immediate notification
      await notifee.displayNotification({
        title: '⏰ Task Due Soon!',
        body: `"${task.title}" is due in ${timeRemaining}`,
        android: {
          channelId: 'task-reminders',
          importance: AndroidImportance.HIGH,
          pressAction: {
            id: 'default',
          },
        },
      });

      // Schedule notification at due time
      await notifee.createTriggerNotification(
        {
          title: '🚨 Task Due Now!',
          body: `"${task.title}" is due now!`,
          android: {
            channelId: 'task-reminders',
            importance: AndroidImportance.HIGH,
            pressAction: {
              id: 'default',
            },
          },
        },
        {
          type: TriggerType.TIMESTAMP,
          timestamp: dueDate.getTime(),
        }
      );
    }
  }

  async cancelTaskNotification(taskId: string) {
    await notifee.cancelNotification(taskId);
  }

  async checkAndScheduleNotifications(tasks: Task[]) {
    // Cancel all existing notifications first
    await notifee.cancelAllNotifications();
    
    // Schedule new notifications for incomplete tasks
    for (const task of tasks) {
      if (!task.completed) {
        await this.scheduleTaskNotification(task);
      }
    }
  }
}

export default new NotificationService(); 