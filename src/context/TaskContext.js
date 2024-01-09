import React, { createContext, useState } from 'react';

export const TasksContext = createContext();

export function TasksContextProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const context = {
    tasks, 
    setTasks,
  };

  return (
    <TasksContext.Provider value={context}>{children}</TasksContext.Provider>
  );
}
