import React, { useState, useMemo } from 'react';
import { useData } from '../DataContext';
import { PageTransition, Card, Badge } from '../components/UI';
import { Calendar, MapPin, Search, ChevronRight, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const Career: React.FC = () => {
  const { roles, loading } = useData();
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  const fields = useMemo(() => {
    const allFields = roles.map(r => r.field);
    return ['All', ...Array.from(new Set(allFields))];
  }, [roles]);

  const filteredRoles = useMemo(() => {
    return roles.filter(role => {
      const matchesFilter = filter === 'All' || role.field === filter;
      const matchesSearch = role.organization.toLowerCase().includes(search.toLowerCase()) ||
                           role.title.toLowerCase().includes(search.toLowerCase()) ||
                           role.technologies.some(t => t.toLowerCase().includes(search.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [roles, filter, search]);

  if (loading) return <div className="flex justify-center p-12 text-slate-400">Loading...</div>;

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Career</h2>
            <p className="text-slate-500">A timeline of my professional experience and research.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search skills, roles..."
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none w-full sm:w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
              {fields.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    filter === f ? 'bg-primary-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
          {filteredRoles.map((role, index) => (
            <div key={role.id} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
              {/* Dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-200 group-[.is-active]:bg-primary-500 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <Briefcase className="w-5 h-5" />
              </div>

              {/* Content */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="success">{role.field}</Badge>
                    <div className="flex items-center text-xs font-medium text-slate-400">
                      <Calendar className="w-3 h-3 mr-1" />
                      {role.startDate} - {role.endDate}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 leading-tight mb-1">{role.title}</h3>
                  <div className="flex items-center text-sm font-semibold text-primary-600 mb-4">
                    {role.organization}
                    <span className="mx-2 text-slate-300">•</span>
                    <span className="flex items-center text-slate-500 font-normal">
                      <MapPin className="w-3 h-3 mr-1" />
                      {role.location}
                    </span>
                  </div>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {role.description[0]}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {role.languages.map(l => <Badge key={l} variant="primary">{l}</Badge>)}
                    {role.technologies.slice(0, 3).map(t => <Badge key={t} variant="outline">{t}</Badge>)}
                    {role.technologies.length > 3 && <span className="text-xs text-slate-400 font-medium">+{role.technologies.length - 3} more</span>}
                  </div>

                  <Link
                    to={`/career/${role.id}`}
                    className="inline-flex items-center text-sm font-bold text-slate-900 hover:text-primary-600 transition-colors group/link"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Career;
