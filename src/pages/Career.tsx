import React, { useState, useMemo, useRef } from 'react';
import { useData } from '../DataContext';
import { PageTransition, Badge } from '../components/UI';
import { Calendar, MapPin, Search, ChevronRight, Layers, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import { Role } from '../types';

const COLORS = [
  '#3b82f6', // blue-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#ef4444', // red-500
  '#8b5cf6', // violet-500
  '#ec4899', // pink-500
  '#06b6d4', // cyan-500
  '#f97316', // orange-500
];

const Career: React.FC = () => {
  const { roles, loading, projects, publications } = useData();
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const fields = useMemo(() => {
    const allFields = roles.map(r => r.field);
    return ['All', ...Array.from(new Set(allFields))];
  }, [roles]);

  const parseDate = (dateStr: string) => {
    if (dateStr === 'Present') return new Date();
    return new Date(dateStr);
  };

  const rolesWithColors = useMemo(() => {
    return roles.map((role, index) => ({
      ...role,
      color: COLORS[index % COLORS.length]
    }));
  }, [roles]);

  const timelineRange = useMemo(() => {
    if (roles.length === 0) return { start: new Date(), end: new Date() };
    const starts = roles.map(r => parseDate(r.startDate).getTime());
    const ends = roles.map(r => parseDate(r.endDate).getTime());
    return {
      start: new Date(Math.min(...starts)),
      end: new Date(Math.max(...ends)),
    };
  }, [roles]);

  const filteredRoles = useMemo(() => {
    return rolesWithColors.filter(role => {
      const matchesFilter = filter === 'All' || role.field === filter;
      const matchesSearch = role.organization.toLowerCase().includes(search.toLowerCase()) ||
                           role.title.toLowerCase().includes(search.toLowerCase()) ||
                           role.technologies.some(t => t.toLowerCase().includes(search.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [rolesWithColors, filter, search]);

  const sortedRoles = useMemo(() => {
    return [...filteredRoles].sort((a, b) => parseDate(b.startDate).getTime() - parseDate(a.startDate).getTime());
  }, [filteredRoles]);

  const getPosition = (dateStr: string) => {
    const date = parseDate(dateStr).getTime();
    const start = timelineRange.start.getTime();
    const end = timelineRange.end.getTime();
    const pos = ((date - start) / (end - start)) * 100;
    return Math.max(0, Math.min(100, pos));
  };

  const roleLanes = useMemo(() => {
    const lanes: number[] = []; // Stores the end time of the last role in each lane
    const assignments: Record<string, number> = {};

    // Sort by start date to assign lanes
    const sortedByStart = [...rolesWithColors].sort((a, b) =>
      parseDate(a.startDate).getTime() - parseDate(b.startDate).getTime()
    );

    sortedByStart.forEach(role => {
      const start = parseDate(role.startDate).getTime();
      const end = parseDate(role.endDate).getTime();

      let laneIndex = lanes.findIndex(laneEnd => laneEnd < start);
      if (laneIndex === -1) {
        laneIndex = lanes.length;
        lanes.push(end);
      } else {
        lanes[laneIndex] = end;
      }
      assignments[role.id] = laneIndex;
    });

    return { assignments, totalLanes: lanes.length };
  }, [rolesWithColors]);

  if (loading) return <div className="flex justify-center p-12 text-slate-400">Loading...</div>;

  const selectedRoleFull = selectedRole ? rolesWithColors.find(r => r.id === selectedRole.id) : null;
  const associatedProjects = selectedRoleFull ? projects.filter(p => selectedRoleFull.projects?.includes(p.id)) : [];
  const associatedPublications = selectedRoleFull ? publications.filter(p => selectedRoleFull.publications?.includes(p.id)) : [];

  return (
    <PageTransition>
      <div className="space-y-12">
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

        {/* Desktop Timeline */}
        <div className="hidden md:block relative bg-white border border-slate-200 rounded-2xl p-8 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Interactive Timeline</h3>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
              <span>{timelineRange.start.getFullYear()}</span>
              <div className="w-32 h-px bg-slate-100"></div>
              <span>Present</span>
            </div>
          </div>

          <div className="overflow-x-auto pb-6 no-scrollbar" ref={scrollContainerRef}>
            <div className="relative h-[320px] min-w-[1000px] mx-4">
              {/* Central Timeline Axis */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 rounded-full" />

              {sortedRoles.map((role) => {
                const startPos = getPosition(role.startDate);
                const endPos = getPosition(role.endDate);
                const width = endPos - startPos;
                const laneIndex = roleLanes.assignments[role.id];
                const trackIndex = laneIndex - (roleLanes.totalLanes - 1) / 2;
                const yOffset = trackIndex * 50; // Offset from center

                return (
                  <div key={role.id} className="absolute inset-0 pointer-events-none">
                    {/* Branch line from center to track */}
                    <div
                      className="absolute w-px bg-slate-200 transition-all duration-500"
                      style={{
                        left: `${startPos}%`,
                        top: yOffset > 0 ? '50%' : `calc(50% + ${yOffset}px)`,
                        height: `${Math.abs(yOffset)}px`,
                        opacity: 0.4
                      }}
                    />
                    {/* Role Segment */}
                    <button
                      onClick={() => setSelectedRole(role)}
                      className="absolute h-3 rounded-full transition-all duration-300 hover:h-5 hover:-translate-y-1 focus:outline-none pointer-events-auto shadow-sm group"
                      style={{
                        left: `${startPos}%`,
                        width: `${Math.max(width, 1)}%`,
                        top: `calc(50% + ${yOffset}px - 6px)`,
                        backgroundColor: role.color,
                      }}
                    >
                      <div className="absolute -top-8 left-0 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <span className="text-[10px] font-bold bg-slate-900 text-white px-2 py-1 rounded shadow-lg">
                          {role.organization}
                        </span>
                      </div>
                    </button>
                    {/* Merge line back to center */}
                    <div
                      className="absolute w-px bg-slate-200 transition-all duration-500"
                      style={{
                        left: `${endPos}%`,
                        top: yOffset > 0 ? '50%' : `calc(50% + ${yOffset}px)`,
                        height: `${Math.abs(yOffset)}px`,
                        opacity: 0.4
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-center text-xs text-slate-400 mt-4">Scroll horizontally to explore & click segments for details</p>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Timeline</h3>
            <span className="text-xs font-bold text-slate-400">Present</span>
          </div>

          <div className="relative min-h-[1000px] mx-2">
            {/* Vertical Central Axis */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2 rounded-full" />

            {sortedRoles.map((role) => {
              const startPos = getPosition(role.startDate);
              const endPos = getPosition(role.endDate);
              // Invert for mobile: Present (100) at top (0)
              const top = 100 - endPos;
              const bottom = 100 - startPos;
              const height = bottom - top;

              const laneIndex = roleLanes.assignments[role.id];
              const trackIndex = laneIndex - (roleLanes.totalLanes - 1) / 2;
              const xOffset = trackIndex * 40; // Offset from center

              return (
                <div key={role.id} className="absolute inset-0 pointer-events-none">
                  {/* Branch line from center to track */}
                  <div
                    className="absolute h-px bg-slate-200 transition-all duration-500"
                    style={{
                      top: `${top}%`,
                      left: xOffset > 0 ? '50%' : `calc(50% + ${xOffset}px)`,
                      width: `${Math.abs(xOffset)}px`,
                      opacity: 0.4
                    }}
                  />
                  {/* Role Segment */}
                  <button
                    onClick={() => setSelectedRole(role)}
                    className="absolute w-2.5 rounded-full transition-all duration-300 hover:w-4 hover:-translate-x-1 focus:outline-none pointer-events-auto shadow-sm group"
                    style={{
                      top: `${top}%`,
                      height: `${Math.max(height, 2)}%`,
                      left: `calc(50% + ${xOffset}px - 5px)`,
                      backgroundColor: role.color,
                    }}
                  >
                    <div className={`absolute ${xOffset >= 0 ? 'left-6' : 'right-6'} top-0 whitespace-nowrap opacity-100 pointer-events-none`}>
                      <span className="text-[10px] font-extrabold bg-white border border-slate-100 text-slate-900 px-2 py-1 rounded shadow-sm">
                        {role.organization}
                      </span>
                    </div>
                  </button>
                  {/* Merge line back to center */}
                  <div
                    className="absolute h-px bg-slate-200 transition-all duration-500"
                    style={{
                      top: `${bottom}%`,
                      left: xOffset > 0 ? '50%' : `calc(50% + ${xOffset}px)`,
                      width: `${Math.abs(xOffset)}px`,
                      opacity: 0.4
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <span className="text-xs font-bold text-slate-400">{timelineRange.start.getFullYear()}</span>
          </div>
          <p className="text-center text-xs text-slate-400 mt-4 italic">Tap segments for role details</p>
        </div>

        {/* Role Detail Modal */}
        <Modal
          isOpen={!!selectedRole}
          onClose={() => setSelectedRole(null)}
          title={selectedRoleFull?.title || ''}
        >
          {selectedRoleFull && (
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3">
                <div
                  className="px-3 py-1 rounded-full text-white text-xs font-bold"
                  style={{ backgroundColor: selectedRoleFull.color }}
                >
                  {selectedRoleFull.organization}
                </div>
                <Badge variant="success">{selectedRoleFull.field}</Badge>
                <div className="flex items-center text-xs font-medium text-slate-400">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  {selectedRoleFull.startDate} - {selectedRoleFull.endDate}
                </div>
                <div className="flex items-center text-xs font-medium text-slate-400">
                  <MapPin className="w-3.5 h-3.5 mr-1.5" />
                  {selectedRoleFull.location}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <section>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Overview</h4>
                    <p className="text-slate-600 leading-relaxed">
                      {selectedRoleFull.description[0]}
                    </p>
                  </section>

                  <section>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Key Highlights</h4>
                    <ul className="space-y-2">
                      {selectedRoleFull.points.map((p, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-600">
                          <div className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: selectedRoleFull.color }} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <div className="pt-4">
                    <Link
                      to={`/career/${selectedRoleFull.id}`}
                      className="inline-flex items-center px-6 py-3 rounded-xl text-white font-bold text-sm transition-all hover:brightness-110 shadow-lg shadow-slate-200"
                      style={{ backgroundColor: selectedRoleFull.color }}
                    >
                      View Full Experience Details
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedRoleFull.languages.map(l => <Badge key={l} variant="primary">{l}</Badge>)}
                      {selectedRoleFull.technologies.map(t => <Badge key={t} variant="outline">{t}</Badge>)}
                    </div>
                  </div>

                  {associatedProjects.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Related Projects</h4>
                      <div className="space-y-2">
                        {associatedProjects.map(p => (
                          <Link key={p.id} to={`/projects?id=${p.id}`} className="flex items-center text-xs font-bold text-slate-600 hover:text-primary-600">
                            <Layers className="w-3 h-3 mr-2" /> {p.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {associatedPublications.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Related Publications</h4>
                      <div className="space-y-2">
                        {associatedPublications.map(p => (
                          <Link key={p.id} to={`/publications/${p.id}`} className="flex items-center text-xs font-bold text-slate-600 hover:text-primary-600">
                            <BookOpen className="w-3 h-3 mr-2" /> {p.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </PageTransition>
  );
};

export default Career;
