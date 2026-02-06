import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../DataContext';
import { PageTransition, Badge } from '../components/UI';
import { ArrowLeft, Calendar, ExternalLink, Briefcase, Layers } from 'lucide-react';

const PublicationDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { publications, roles, projects, loading } = useData();

  const publication = publications.find(p => p.id === id);

  if (loading) return <div className="flex justify-center p-12 text-slate-400">Loading...</div>;
  if (!publication) return <div className="p-12 text-center">Publication not found. <Link to="/publications" className="text-primary-600">Go back</Link></div>;

  const associatedRoles = roles.filter(r => publication.associatedRoles?.includes(r.id));
  const associatedProjects = projects.filter(p => publication.associatedProjects?.includes(p.id));

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Publications
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant={publication.type === 'publication' ? 'primary' : 'outline'}>{publication.type}</Badge>
            <span className="text-sm font-medium text-slate-400 flex items-center">
              <Calendar className="w-4 h-4 mr-1.5" />
              {publication.year}
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 leading-tight tracking-tight">
            {publication.title}
          </h1>

          <div className="space-y-2">
            <p className="text-lg text-slate-600">
              {publication.authors.map((author, idx) => (
                <span key={idx} className={author.includes('Klimczak') ? 'text-primary-600 font-bold' : ''}>
                  {author}{idx < publication.authors.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
            <p className="text-xl font-bold text-slate-900">
              {publication.venue}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 pt-8">
          <div className="md:col-span-2 space-y-8">
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Summary</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {publication.description || "Detailed information about this research contribution will be added soon."}
              </p>
            </section>

            {publication.doi && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">DOI</span>
                <code className="text-sm text-slate-700">{publication.doi}</code>
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              {publication.link && (
                <a
                  href={publication.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200"
                >
                  View Publication <ExternalLink className="w-5 h-5 ml-2" />
                </a>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
              {associatedRoles.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Related Work</h3>
                  <div className="space-y-2">
                    {associatedRoles.map(r => (
                      <Link
                        key={r.id}
                        to={`/career/${r.id}`}
                        className="flex items-center p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group"
                      >
                        <Briefcase className="w-5 h-5 mr-3 text-slate-400 group-hover:text-primary-500" />
                        <div>
                          <div className="text-sm font-bold text-slate-900">{r.title}</div>
                          <div className="text-xs text-slate-500">{r.organization}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {associatedProjects.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Related Projects</h3>
                  <div className="space-y-2">
                    {associatedProjects.map(p => (
                      <Link
                        key={p.id}
                        to={`/projects?id=${p.id}`}
                        className="flex items-center p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group"
                      >
                        <Layers className="w-5 h-5 mr-3 text-slate-400 group-hover:text-primary-500" />
                        <div className="text-sm font-bold text-slate-900">{p.name}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {publication.technologies && publication.technologies.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {publication.technologies.map(t => <Badge key={t} variant="outline">{t}</Badge>)}
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

export default PublicationDetail;
