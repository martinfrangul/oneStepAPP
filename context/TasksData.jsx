import useAsyncStorageState from '../hooks/useAsyncStorageState';
import { createContext } from 'react';

const TasksData = createContext();

const TasksDataProvider = ({ children }) => {
  const [tasks, setTasks] = useAsyncStorageState('tasks', []);
  const [completedTasks, setCompletedTasks] = useAsyncStorageState('completedTasks', []);

  return (
    <TasksData.Provider value={{ tasks, setTasks, completedTasks, setCompletedTasks }}>
      {children}
    </TasksData.Provider>
  );
};

export { TasksData, TasksDataProvider };