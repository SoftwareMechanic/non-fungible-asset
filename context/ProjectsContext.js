'use client'

import { createContext, useContext, useState } from 'react';

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children, initialProjects }) => {
  const [projects, setProjects] = useState(initialProjects || []);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);

  return context;
};
