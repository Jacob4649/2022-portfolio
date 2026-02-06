import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../DataContext';
import { PageTransition, Badge } from '../components/UI';
import { ArrowLeft, Calendar, MapPin, ChevronRight, Layers, BookOpen } from 'lucide-react';

const RoleDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { roles, projects, publications, loading } = useData();

  const role = roles.find(r => r.id === id);

  if (loading) return <div className="flex justify-center p-12 text-slate-400">Loading...</div>;
  if (!role) return <div className="p-12 text-center">Role not found. <Link to="/career" className="text-primary-600">Go back</Link></div>;

  const associatedProjects = projects.filter(p => role.projects?.includes(p.id));
  const associatedPublications = publications.filter(p => role.publications?.includes(p.id));

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Career
        </button>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="success">{role.field}</Badge>
            <span className="text-sm font-medium text-slate-400 flex items-center">
              <Calendar className="w-4 h-4 mr-1.5" />
              {role.startDate} - {role.endDate}
            </span>
          </div>

          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{role.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-lg">
            <span className="font-bold text-primary-600">{role.organization}</span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center text-slate-500">
              <MapPin className="w-4 h-4 mr-1.5" />
              {role.location}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 pt-8">
          <div className="md:col-span-2 space-y-8">
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Experience Overview</h2>
              <div className="space-y-4">
                {role.description.map((desc, i) => (
                  <p key={i} className="text-slate-600 leading-relaxed">
                    {desc}
                  </p>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Key Achievements</h2>
              <ul className="space-y-3">
                {role.points.map((point, i) => (
                  <li key={i} className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mr-3 mt-0.5">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                    <span className="text-slate-600">{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 sticky top-24">
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {role.languages.map(l => <Badge key={l} variant="primary">{l}</Badge>)}
                  {role.technologies.map(t => <Badge key={t} variant="outline">{t}</Badge>)}
                </div>
              </div>

              {associatedProjects.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Linked Projects</h3>
                  <div className="space-y-2">
                    {associatedProjects.map(p => (
                      <Link
                        key={p.id}
                        to={`/projects?id=${p.id}`}
                        className="flex items-center p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group"
                      >
                        <Layers className="w-4 h-4 mr-3 text-slate-400 group-hover:text-primary-500" />
                        <span className="text-sm font-bold text-slate-700">{p.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {associatedPublications.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Linked Publications</h3>
                  <div className="space-y-2">
                    {associatedPublications.map(p => (
                      <Link
                        key={p.id}
                        to={`/publications/${p.id}`}
                        className="flex items-center p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group"
                      >
                        <BookOpen className="w-4 h-4 mr-3 text-slate-400 group-hover:text-primary-500" />
                        <span className="text-sm font-bold text-slate-700 line-clamp-1">{p.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default RoleDetail;
