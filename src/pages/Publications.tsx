import React, { useState, useMemo } from 'react';
import { useData } from '../DataContext';
import { PageTransition, Card, Badge } from '../components/UI';
import { BookOpen, ExternalLink, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Publications: React.FC = () => {
  const { publications, loading } = useData();
  const [activeType, setActiveType] = useState<string>('All');

  const types = ['All', 'publication', 'conference'];

  const filteredPublications = useMemo(() => {
    return publications
      .filter(pub => {
        if (activeType === 'All') return true;
        return pub.type === activeType;
      })
      .sort((a, b) => b.year - a.year);
  }, [publications, activeType]);

  if (loading) return <div className="flex justify-center p-12 text-slate-400">Loading...</div>;

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Publications & Conferences</h2>
            <p className="text-slate-500">Academic papers, technical reports, and conference presentations.</p>
          </div>

          <div className="flex items-center gap-2">
            {types.map(t => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                  activeType === t ? 'bg-primary-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {t === 'All' ? t : `${t}s`}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          {filteredPublications.map((pub) => (
            <Card key={pub.id} className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center ${
                  pub.type === 'publication' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  <BookOpen className="w-8 h-8" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={pub.type === 'publication' ? 'primary' : 'outline'}>{pub.type}</Badge>
                    <span className="text-sm text-slate-400 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {pub.year}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
                    {pub.title}
                  </h3>

                  <p className="text-slate-600 text-sm mb-3 font-medium">
                    {pub.authors.map((author, idx) => (
                      <span key={idx} className={author.includes('Klimczak') ? 'text-primary-600 font-bold' : ''}>
                        {author}{idx < pub.authors.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </p>

                  <p className="text-slate-500 text-sm italic mb-4">
                    {pub.venue}
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      to={`/publications/${pub.id}`}
                      className="text-sm font-bold text-slate-900 hover:text-primary-600 transition-colors"
                    >
                      View Details
                    </Link>
                    {pub.link && (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        Source <ExternalLink className="w-3.5 h-3.5 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Publications;
