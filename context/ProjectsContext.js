'use client'

import { createContext, useContext, useState, useEffect } from 'react';

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children, initialProjects }) => {
  const [projects, setProjects] = useState(initialProjects || []);

  const addProject = (newProject) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects, newProject];
      return updatedProjects;
    });
  };

  useEffect(() => {
    console.log("Projects after state update:", projects);
  }, [projects]); // This useEffect runs whenever 'projects' changes
  
  return (
    <ProjectsContext.Provider value={{ projects, setProjects, addProject }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }

  return context;
};
