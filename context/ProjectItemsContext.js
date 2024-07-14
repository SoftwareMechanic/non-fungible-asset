'use client'

import { createContext, useContext, useState, useEffect } from 'react';

const ProjectItemsContext = createContext();

export const ProjectItemsProvider = ({ children, initialProjectItems }) => {
  const [projectItems, setProjectItems] = useState(initialProjectItems || []);

  const addProjectItem = (newProjectItem) => {
    setProjectItems((prevProjectItems) => {
      const updatedProjectItems = [...prevProjectItems, newProjectItem];
      return updatedProjectItems;
    });
  };


  const clearProjectItems = () => {
    setProjectItems([]);
  };

  useEffect(() => {
    console.log("Projects after state update:", projectItems);
  }, [projectItems]); // This useEffect runs whenever 'projects' changes
  
  return (
    <ProjectItemsContext.Provider value={{ projectItems, setProjectItems, addProjectItem, clearProjectItems }}>
      {children}
    </ProjectItemsContext.Provider>
  );
};

export const useProjectItems = () => {
  const context = useContext(ProjectItemsContext);
  if (!context) {
    throw new Error('useProjectItems must be used within a ProjectsProvider');
  }

  return context;
};