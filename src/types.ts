export interface Role {
  id: string;
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string; // "Present" or date
  field: string;
  languages: string[];
  technologies: string[];
  description: string[];
  points: string[];
  projects?: string[]; // IDs of associated projects
  publications?: string[]; // IDs of associated publications
  awards?: string[]; // IDs of associated awards
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  type: 'publication' | 'conference' | 'under-review' | 'in-preparation';
  link?: string;
  doi?: string;
  description?: string;
  technologies?: string[];
  associatedProjects?: string[];
  associatedRoles?: string[];
  associatedAwards?: string[];
}

export interface Project {
  id: string;
  name: string;
  type: 'personal' | 'published' | 'commercial';
  startDate: string;
  endDate: string;
  technologies: string[];
  description: string;
  longDescription?: string;
  associatedRoles?: string[];
  associatedPublications?: string[];
  associatedAwards?: string[];
  link?: string;
}

export interface Award {
  id: string;
  title: string;
  date: string;
  organization: string;
  description: string;
  associatedProjects?: string[];
  associatedRoles?: string[];
  associatedPublications?: string[];
}

export interface DataContextType {
  roles: Role[];
  publications: Publication[];
  projects: Project[];
  awards: Award[];
  loading: boolean;
}
