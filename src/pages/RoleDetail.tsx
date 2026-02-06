import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../DataContext';
import { PageTransition, Badge } from '../components/UI';
import { ArrowLeft, Calendar, MapPin, ChevronRight, Layers, BookOpen, Briefcase, Trophy } from 'lucide-react';

const RoleDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { roles, projects, publications, awards, loading } = useData();

  const role = roles.find(r => r.id === id);

  if (loading) return <div className="flex justify-center p-12 text-zinc-400">Loading...</div>;
  if (!role) return <div className="p-12 text-center">Role not found. <Link to="/career" className="text-primary-400">Go back</Link></div>;

  const associatedProjects = projects.filter(p => role.projects?.includes(p.id));
  const associatedPublications = publications.filter(p => role.publications?.includes(p.id));
  const associatedAwards = awards.filter(a => role.awards?.includes(a.id));
  const relatedRoles = roles.filter(r => role.relatedRoles?.includes(r.id));

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-bold text-zinc-500 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Career
        </button>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="success">{role.field}</Badge>
            <span className="text-sm font-medium text-zinc-500 flex items-center">
              <Calendar className="w-4 h-4 mr-1.5" />
              {role.startDate} - {role.endDate}
            </span>
          </div>

          <h1 className="text-4xl font-extrabold text-white tracking-tight">{role.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-lg">
            <span className="font-bold text-primary-400">{role.organization}</span>
            <span className="text-zinc-800">|</span>
            <span className="flex items-center text-zinc-400">
              <MapPin className="w-4 h-4 mr-1.5" />
              {role.location}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 pt-8">
          <div className="md:col-span-2 space-y-8">
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white">Experience Overview</h2>
              <div className="space-y-4">
                {role.description.map((desc, i) => (
                  <p key={i} className="text-zinc-400 leading-relaxed">
                    {desc}
                  </p>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white">Key Achievements</h2>
              <ul className="space-y-3">
                {role.points.map((point, i) => (
                  <li key={i} className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-900/30 text-primary-400 flex items-center justify-center mr-3 mt-0.5">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                    <span className="text-zinc-400">{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="space-y-8">
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 space-y-6 sticky top-24 shadow-xl">
              <div>
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {role.languages.map(l => <Badge key={l} variant="primary">{l}</Badge>)}
                  {role.technologies.map(t => <Badge key={t} variant="outline">{t}</Badge>)}
                </div>
              </div>

              {associatedProjects.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Linked Projects</h3>
                  <div className="space-y-2">
                    {associatedProjects.map(p => (
                      <Link
                        key={p.id}
                        to={`/projects?id=${p.id}`}
                        className="flex items-center p-2 rounded-lg hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all group"
                      >
                        <Layers className="w-4 h-4 mr-3 text-zinc-400 group-hover:text-primary-500" />
                        <span className="text-sm font-bold text-zinc-300">{p.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {associatedAwards.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Awards & Recognition</h3>
                  <div className="space-y-2">
                    {associatedAwards.map(a => (
                      <Link
                        key={a.id}
                        to={`/awards`}
                        className="flex items-center p-2 rounded-lg hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all group"
                      >
                        <Trophy className="w-4 h-4 mr-3 text-zinc-400 group-hover:text-primary-500" />
                        <span className="text-sm font-bold text-zinc-300">{a.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {associatedPublications.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Linked Publications</h3>
                  <div className="space-y-2">
                    {associatedPublications.map(p => (
                      <Link
                        key={p.id}
                        to={`/publications/${p.id}`}
                        className="flex items-center p-2 rounded-lg hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all group"
                      >
                        <BookOpen className="w-4 h-4 mr-3 text-zinc-400 group-hover:text-primary-500" />
                        <span className="text-sm font-bold text-zinc-300 line-clamp-1">{p.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {relatedRoles.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Related Roles</h3>
                  <div className="space-y-2">
                    {relatedRoles.map(r => (
                      <Link
                        key={r.id}
                        to={`/career/${r.id}`}
                        className="flex items-center p-2 rounded-lg hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all group"
                      >
                        <Briefcase className="w-4 h-4 mr-3 text-zinc-400 group-hover:text-primary-500" />
                        <span className="text-sm font-bold text-zinc-300">{r.title} @ {r.organization}</span>
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
