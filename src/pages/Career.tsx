import React, { useState, useMemo, useRef } from 'react';
import { useData } from '../DataContext';
import { PageTransition, Badge } from '../components/UI';
import { Calendar, MapPin, Search, ChevronRight, Layers, BookOpen, ZoomIn, ZoomOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [hoveredRoleId, setHoveredRoleId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
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
    const minStart = Math.min(...starts);

    // Start at Jan 1st of the earliest year
    const start = new Date(new Date(minStart).getFullYear(), 0, 1);
    // End at the actual present
    const end = new Date();

    return { start, end };
  }, [roles]);

  const years = useMemo(() => {
    const startYear = timelineRange.start.getFullYear();
    const endYear = timelineRange.end.getFullYear();
    const result = [];
    for (let y = startYear; y <= endYear; y++) {
      result.push(y);
    }
    return result;
  }, [timelineRange]);

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

  const getPosition = (dateStr: string, isEnd = false) => {
    const date = parseDate(dateStr).getTime();
    const start = timelineRange.start.getTime();
    const end = timelineRange.end.getTime();
    let pos = ((date - start) / (end - start)) * 100;

    if (isEnd && dateStr === 'Present') {
      return 115; // Continue off edge for present roles
    }

    return Math.max(0, Math.min(115, pos));
  };

  const roleLanes = useMemo(() => {
    if (filteredRoles.length === 0) return { assignments: {}, totalLanes: 0, midLane: 0 };

    // 1. Sort by start date for greedy assignment
    const sortedByStart = [...filteredRoles].sort((a, b) =>
      parseDate(a.startDate).getTime() - parseDate(b.startDate).getTime()
    );

    const lanes: string[][] = []; // Stores IDs of roles in each lane

    sortedByStart.forEach(role => {
      const start = parseDate(role.startDate).getTime();
      let assigned = false;
      for (let i = 0; i < lanes.length; i++) {
        const lastRoleId = lanes[i][lanes[i].length - 1];
        const lastRole = rolesWithColors.find(r => r.id === lastRoleId)!;
        if (parseDate(lastRole.endDate).getTime() < start) {
          lanes[i].push(role.id);
          assigned = true;
          break;
        }
      }
      if (!assigned) {
        lanes.push([role.id]);
      }
    });

    // Balanced assignment:
    // We want the set of lanes to be centered around the axis.
    const mid = (lanes.length - 1) / 2;

    const assignments: Record<string, number> = {};
    lanes.forEach((lane, idx) => {
      lane.forEach(id => { assignments[id] = idx - mid; });
    });

    return { assignments, totalLanes: lanes.length, midLane: mid };
  }, [filteredRoles, rolesWithColors]);

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
        <div
          className="hidden md:block relative bg-white border border-slate-200 rounded-2xl p-8 shadow-sm overflow-hidden"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Interactive Timeline</h3>

            <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-100">
              <button
                onClick={(e: React.MouseEvent) => { e.stopPropagation(); setZoomLevel(prev => Math.max(1, prev - 0.5)); }}
                className="p-1.5 rounded-md hover:bg-white hover:shadow-sm text-slate-500 transition-all"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <div className="px-2 text-[10px] font-bold text-slate-400 w-12 text-center">
                {Math.round(zoomLevel * 100)}%
              </div>
              <button
                onClick={(e: React.MouseEvent) => { e.stopPropagation(); setZoomLevel(prev => Math.min(3, prev + 0.5)); }}
                className="p-1.5 rounded-md hover:bg-white hover:shadow-sm text-slate-500 transition-all"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className={`${zoomLevel > 1 ? 'overflow-x-auto' : 'overflow-x-hidden'} pb-6 no-scrollbar`} ref={scrollContainerRef}>
            <div
              className="relative h-[400px] transition-all duration-300"
              style={{ minWidth: `${zoomLevel * 100}%` }}
            >
              {/* Central Timeline Axis */}
              <div
                className="absolute left-0 right-0 h-1 bg-slate-200 rounded-full transition-all duration-500"
                style={{ top: 'calc(50% - 2px)' }}
              />

              {/* Year Markers */}
              {years.map(year => {
                const pos = getPosition(`${year}-01-01`);
                if (pos < 0 || pos > 100) return null;
                return (
                  <div key={year} className="absolute inset-y-0 pointer-events-none" style={{ left: `${pos}%` }}>
                    <div className="absolute inset-y-0 w-px bg-slate-100" />
                    <div className={`absolute bottom-4 text-[10px] font-bold text-slate-300 ${
                      pos < 5 ? 'left-0' : pos > 95 ? 'right-0' : '-translate-x-1/2'
                    }`}>
                      {year}
                    </div>
                  </div>
                );
              })}

              {/* Present Marker */}
              <div className="absolute inset-y-0 pointer-events-none" style={{ left: '100%' }}>
                <div className="absolute inset-y-0 w-px border-l border-dashed border-primary-200" />
                <div className="absolute bottom-4 right-0 text-[10px] font-bold text-primary-500 bg-white px-1">
                  Present
                </div>
              </div>

              {sortedRoles.map((role) => {
                const startPos = getPosition(role.startDate);
                const isPresent = role.endDate === 'Present';
                const endPos = isPresent ? 100 : getPosition(role.endDate);
                const width = endPos - startPos;
                const trackIndex = roleLanes.assignments[role.id];
                const yOffset = trackIndex * 50; // Offset from center

                return (
                  <div key={role.id} className="absolute inset-0 pointer-events-none">
                    {/* Branch line from center to track */}
                    <div
                    className="absolute w-1 transition-all duration-500"
                      style={{
                        left: `${startPos}%`,
                        top: yOffset > 0 ? '50%' : `calc(50% + ${yOffset}px)`,
                        height: `${Math.abs(yOffset)}px`,
                        backgroundColor: role.color,
                        transform: 'translateX(-50%)'
                      }}
                    />
                    {/* Role Segment */}
                    <div
                      className="absolute pointer-events-auto"
                      style={{
                        left: `calc(${startPos}% - 6px)`,
                        width: isPresent ? `calc(${Math.max(width, 0)}% + 6px)` : `calc(${Math.max(width, 1)}% + 12px)`,
                        top: `calc(50% + ${yOffset}px - 6px)`,
                        zIndex: hoveredRoleId === role.id ? 50 : 10
                      }}
                    >
                      {/* Role Segment */}
                      <button
                        onMouseEnter={() => setHoveredRoleId(role.id)}
                        onMouseLeave={() => setHoveredRoleId(null)}
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          setSelectedRole(role);
                        }}
                        className={`w-full h-3 transition-all duration-300 hover:h-4 focus:outline-none shadow-sm group ${
                          isPresent ? 'rounded-l-full' : 'rounded-full'
                        }`}
                        style={{
                          backgroundColor: role.color,
                        }}
                      />

                      <AnimatePresence>
                        {hoveredRoleId === role.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: yOffset > 0 ? 5 : -5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: yOffset > 0 ? 5 : -5 }}
                            className={`absolute z-50 w-64 bg-white/95 backdrop-blur-md text-slate-900 rounded-xl shadow-2xl border border-slate-100 p-4 pointer-events-none ${
                              yOffset > 0 ? 'bottom-full mb-3' : 'top-full mt-3'
                            } ${startPos > 70 ? 'right-0' : 'left-0'}`}
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between gap-2">
                                <span
                                  className="text-[10px] font-bold uppercase tracking-wider"
                                  style={{ color: role.color }}
                                >
                                  {role.organization}
                                </span>
                              </div>
                              <h4 className="font-bold text-slate-900 text-sm leading-tight">{role.title}</h4>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-slate-500 font-medium">
                                <span className="flex items-center">
                                  <Calendar className="w-3 h-3 mr-1 text-slate-400" />
                                  {role.startDate} - {role.endDate}
                                </span>
                                <span className="flex items-center">
                                  <MapPin className="w-3 h-3 mr-1 text-slate-400" />
                                  {role.location}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {/* Merge line back to center */}
                    {!isPresent && (
                      <div
                        className="absolute w-1 transition-all duration-500"
                        style={{
                          left: `${endPos}%`,
                          top: yOffset > 0 ? '50%' : `calc(50% + ${yOffset}px)`,
                          height: `${Math.abs(yOffset)}px`,
                          backgroundColor: role.color,
                          transform: 'translateX(-50%)'
                        }}
                      />
                    )}
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
          </div>

          <div className="relative min-h-[1000px] mx-2">
            {/* Vertical Central Axis */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-slate-200 rounded-full transition-all duration-500"
              style={{ left: 'calc(50% - 2px)' }}
            />

            {/* Year Markers */}
            {years.map(year => {
              const pos = getPosition(`${year}-01-01`);
              const top = 100 - pos;
              if (top < 0 || top > 100) return null;
              return (
                <div key={year} className="absolute inset-x-0 pointer-events-none" style={{ top: `${top}%` }}>
                  <div className="absolute inset-x-0 h-px bg-slate-100" />
                  <div className="absolute left-0 -translate-y-1/2 text-[10px] font-bold text-slate-300">
                    {year}
                  </div>
                </div>
              );
            })}

            {/* Present Marker (Mobile) */}
            <div className="absolute inset-x-0 pointer-events-none" style={{ top: '0%' }}>
              <div className="absolute inset-x-0 h-px border-t border-dashed border-primary-200" />
              <div className="absolute right-0 -translate-y-1/2 text-[10px] font-bold text-primary-500 bg-white px-1">
                Present
              </div>
            </div>

            {sortedRoles.map((role) => {
              const startPos = getPosition(role.startDate);
              const isPresent = role.endDate === 'Present';
              const endPos = isPresent ? 100 : getPosition(role.endDate);
              // Invert for mobile: Present (100) at top (0)
              const top = 100 - endPos;
              const bottom = 100 - startPos;
              const height = bottom - top;

              const trackIndex = roleLanes.assignments[role.id];
              const xOffset = trackIndex * 40; // Offset from center

              return (
                <div key={role.id} className="absolute inset-0 pointer-events-none">
                  {/* Branch line from center to track */}
                  <div
                    className="absolute h-1 transition-all duration-500"
                    style={{
                      top: `${top}%`,
                      left: xOffset > 0 ? '50%' : `calc(50% + ${xOffset}px)`,
                      width: `${Math.abs(xOffset)}px`,
                      backgroundColor: role.color,
                      transform: 'translateY(-50%)'
                    }}
                  />
                  {/* Role Segment */}
                  <button
                    onClick={() => setSelectedRole(role)}
                    className={`absolute w-2.5 transition-all duration-300 hover:w-4 focus:outline-none pointer-events-auto shadow-sm group ${
                      isPresent ? 'rounded-b-full' : 'rounded-full'
                    }`}
                    style={{
                      top: isPresent ? '0%' : `calc(${top}% - 5px)`,
                      height: isPresent ? `${bottom}%` : `calc(${Math.max(height, 2)}% + 10px)`,
                      left: `calc(50% + ${xOffset}px - 5px)`,
                      backgroundColor: role.color,
                      zIndex: 10
                    }}
                  />
                  {/* Merge line back to center */}
                  {!isPresent && (
                    <div
                      className="absolute h-1 transition-all duration-500"
                      style={{
                        top: `${bottom}%`,
                        left: xOffset > 0 ? '50%' : `calc(50% + ${xOffset}px)`,
                        width: `${Math.abs(xOffset)}px`,
                        backgroundColor: role.color,
                        transform: 'translateY(-50%)'
                      }}
                    />
                  )}
                </div>
              );
            })}

            {/* Mobile Role Labels (Separate layer to ensure they stay on top) */}
            {sortedRoles.map((role) => {
              const isPresent = role.endDate === 'Present';
              const endPos = isPresent ? 100 : getPosition(role.endDate);
              const top = 100 - endPos;
              const trackIndex = roleLanes.assignments[role.id];
              const xOffset = trackIndex * 40;

              return (
                <div
                  key={`${role.id}-label`}
                  className={`absolute whitespace-nowrap pointer-events-none z-30`}
                  style={{
                    top: isPresent ? '0%' : `${top}%`,
                    transform: isPresent ? 'none' : 'translateY(-50%)',
                    left: xOffset >= 0 ? `calc(50% + ${xOffset}px + 12px)` : 'auto',
                    right: xOffset < 0 ? `calc(50% - ${xOffset}px + 12px)` : 'auto',
                  }}
                >
                  <span
                    className="text-[10px] font-extrabold bg-white/90 backdrop-blur-sm border border-slate-100 px-2 py-1 rounded shadow-md"
                    style={{ color: role.color }}
                  >
                    {role.organization}
                  </span>
                </div>
              );
            })}
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
