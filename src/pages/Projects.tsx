import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useData } from '../DataContext';
import { PageTransition, Badge } from '../components/UI';
import Modal from '../components/Modal';
import { Calendar, ExternalLink, ArrowRight, Code } from 'lucide-react';

const Projects: React.FC = () => {
  const { projects, loading } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedProjectId = searchParams.get('id');

  const selectedProject = useMemo(() =>
    projects.find(p => p.id === selectedProjectId),
  [projects, selectedProjectId]);

  const openProject = (id: string) => {
    setSearchParams({ id });
  };

  const closeProject = () => {
    setSearchParams({});
  };

  if (loading) return <div className="flex justify-center p-12 text-slate-400">Loading...</div>;

  return (
    <PageTransition>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Projects</h2>
          <p className="text-slate-500">A collection of personal, academic, and commercial projects.</p>
        </div>

        <div className="overflow-hidden bg-white border border-slate-200 rounded-xl shadow-sm">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Type</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Technologies</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => openProject(project.id)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 rounded bg-primary-50 text-primary-600 flex items-center justify-center mr-3">
                        <Code className="w-4 h-4" />
                      </div>
                      <div className="text-sm font-bold text-slate-900">{project.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <Badge variant="outline">{project.type}</Badge>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 2).map(t => (
                        <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wide">{t}</span>
                      ))}
                      {project.technologies.length > 2 && <span className="text-[10px] text-slate-400">+{project.technologies.length - 2}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium">
                    {project.startDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 flex items-center justify-end w-full">
                      Details <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal
          isOpen={!!selectedProject}
          onClose={closeProject}
          title={selectedProject?.name || ''}
        >
          {selectedProject && (
            <div className="space-y-8">
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">{selectedProject.type}</Badge>
                <div className="flex items-center text-sm text-slate-500">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  {selectedProject.startDate} - {selectedProject.endDate}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-bold text-slate-900">About the Project</h4>
                <p className="text-slate-600 leading-relaxed">
                  {selectedProject.longDescription || selectedProject.description}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-bold text-slate-900">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map(t => (
                    <Badge key={t} variant="outline">{t}</Badge>
                  ))}
                </div>
              </div>

              {selectedProject.link && (
                <div className="pt-4 border-t border-slate-100">
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg font-bold text-sm hover:bg-primary-700 transition-colors"
                  >
                    View Live Project <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </PageTransition>
  );
};

export default Projects;
