import React, {createContext, useState, useEffect, use} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationService from '../services/NotificationService';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  due: Date;
  description: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
}

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  addTask: () => {},
  deleteTask: () => {},
  toggleTask: () => {},
});

export const TaskProvider = ({children}: {children: React.ReactNode}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sendNotification, setSendNotification] = useState(false);

  // Load tasks from AsyncStorage when the app starts
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks) {
          // Convert string dates back to Date objects
          const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
            ...task,
            due: new Date(task.due)
          }));
          setTasks(parsedTasks);
          // Check and schedule notifications for loaded tasks
          NotificationService.checkAndScheduleNotifications(parsedTasks);
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };
    loadTasks();
  }, []);

  // Save tasks to AsyncStorage whenever tasks change
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        // Check and schedule notifications whenever tasks change
        NotificationService.checkAndScheduleNotifications(tasks);
      } catch (error) {
        console.error('Error saving tasks:', error);
      }
    };
    saveTasks();
  }, [tasks]);

  const addTask = (task: Task) => {
    const newTask = {
      id: Date.now().toString(),
      title: task.title,
      description: task.description,
      completed: false,
      due: new Date(task.due),
    };
    setTasks([...tasks, newTask]);
    // Schedule notification for the new task
    NotificationService.scheduleTaskNotification(newTask);
  };

  const deleteTask = (id: string) => {
    // Cancel notification before deleting the task
    NotificationService.cancelTaskNotification(id);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map(task => {
        if (task.id === id) {
          const updatedTask = {...task, completed: !task.completed};
          // Cancel notification if task is completed
          if (updatedTask.completed) {
            NotificationService.cancelTaskNotification(id);
          } else {
            // Reschedule notification if task is uncompleted
            NotificationService.scheduleTaskNotification(updatedTask);
          }
          return updatedTask;
        }
        return task;
      }),
    );
  };

  return (
    <TaskContext.Provider value={{tasks, addTask, deleteTask, toggleTask}}>
      {children}
    </TaskContext.Provider>
  );
}; 