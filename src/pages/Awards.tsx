import React from 'react';
import { useData } from '../DataContext';
import { PageTransition, Card } from '../components/UI';
import { Trophy, Calendar, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Awards: React.FC = () => {
  const { awards, loading } = useData();

  const sortedAwards = [...awards].sort((a, b) => b.date.localeCompare(a.date));

  if (loading) return <div className="flex justify-center p-12 text-slate-400">Loading...</div>;

  return (
    <PageTransition>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Awards & Recognition</h2>
          <p className="text-slate-500">Scholarships, competitions, and academic honors.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {sortedAwards.map((award) => (
            <Card key={award.id} className="p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
                  <Trophy className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-slate-400 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {award.date}
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight">
                {award.title}
              </h3>
              <p className="text-sm font-semibold text-primary-600 mb-3">
                {award.organization}
              </p>

              <p className="text-slate-600 text-sm mb-6 flex-1">
                {award.description}
              </p>

              {(award.associatedProjects || award.associatedPublications) && (
                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                  {award.associatedProjects?.map(projId => (
                    <Link key={projId} to={`/projects?id=${projId}`} className="text-xs font-bold text-slate-500 hover:text-primary-600 flex items-center">
                      Related Project <ExternalLink className="w-3 h-3 ml-1" />
                    </Link>
                  ))}
                  {award.associatedPublications?.map(pubId => (
                    <Link key={pubId} to={`/publications/${pubId}`} className="text-xs font-bold text-slate-500 hover:text-primary-600 flex items-center">
                      Related Publication <ExternalLink className="w-3 h-3 ml-1" />
                    </Link>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Awards;
