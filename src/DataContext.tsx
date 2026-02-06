import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import yaml from 'js-yaml';
import { Role, Publication, Project, Award, DataContextType } from './types';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rolesRes, pubRes, projRes, awardRes] = await Promise.all([
          fetch('/data/roles.yaml'),
          fetch('/data/publications.yaml'),
          fetch('/data/projects.yaml'),
          fetch('/data/awards.yaml'),
        ]);

        const [rolesText, pubText, projText, awardText] = await Promise.all([
          rolesRes.text(),
          pubRes.text(),
          projRes.text(),
          awardRes.text(),
        ]);

        setRoles(yaml.load(rolesText) as Role[]);
        setPublications(yaml.load(pubText) as Publication[]);
        setProjects(yaml.load(projText) as Project[]);
        setAwards(yaml.load(awardText) as Award[]);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ roles, publications, projects, awards, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
