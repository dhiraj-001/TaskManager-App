import React, {createContext, useState} from 'react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  date: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string) => void;
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
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete React Native Project',
      completed: false,
      date: '2025-01-01',
    },
    {
      id: '2',
      title: 'Learn TypeScript',
      completed: true,
      date: '2025-01-01',
    },
    {
      id: '3',
      title: 'Build Portfolio Website',
      completed: false,
      date: '2025-01-01',
    },
    {
      id: '4',
      title: 'Practice DSA',
      completed: false,
      date: '2025-01-01',
    },
    {
      id: '5',
      title: 'Read Clean Code Book',
      completed: true,  
      date: '2025-01-01',
    },
  ]);

  const addTask = (title: string) => {
    setTasks([
      ...tasks,
   {
    id: Date.now().toString(),
    title,
    completed: false,
    date: new Date().toISOString(),
   }
    ]);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? {...task, completed: !task.completed} : task,
      ),
    );
  };

  return (
    <TaskContext.Provider value={{tasks, addTask, deleteTask, toggleTask}}>
      {children}
    </TaskContext.Provider>
  );
}; 