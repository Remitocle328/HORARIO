import React, { useState, useRef, useEffect } from 'react';
import { FLOWCHART_NODES, FLOWCHART_EDGES, FlowchartNode } from '../data/flowchartData';

interface PensumFlowchartProps {
  onSelectCourse?: (node: FlowchartNode) => void;
}

export const PensumFlowchart: React.FC<PensumFlowchartProps> = ({ onSelectCourse }) => {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardPositions, setCardPositions] = useState<Record<string, { x: number; y: number; w: number; h: number }>>({});

  const modules = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Calculate coordinates of cards after render to draw exact connection lines
  useEffect(() => {
    const updatePositions = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const pos: Record<string, { x: number; y: number; w: number; h: number }> = {};

      for (const node of FLOWCHART_NODES) {
        const el = document.getElementById(`flow-node-${node.id}`);
        if (el) {
          const r = el.getBoundingClientRect();
          pos[node.id] = {
            x: r.left - containerRect.left + containerRef.current.scrollLeft,
            y: r.top - containerRect.top + containerRef.current.scrollTop,
            w: r.width,
            h: r.height,
          };
        }
      }
      setCardPositions(pos);
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, []);

  // Find incoming & outgoing dependencies for active node
  const activeIncoming = React.useMemo(() => {
    if (!hoveredNodeId) return new Set<string>();
    return new Set(FLOWCHART_EDGES.filter((e) => e.to === hoveredNodeId).map((e) => e.from));
  }, [hoveredNodeId]);

  const activeOutgoing = React.useMemo(() => {
    if (!hoveredNodeId) return new Set<string>();
    return new Set(FLOWCHART_EDGES.filter((e) => e.from === hoveredNodeId).map((e) => e.to));
  }, [hoveredNodeId]);

  return (
    <div className="w-full overflow-x-auto p-3 bg-white font-sans select-none relative" ref={containerRef}>
      {/* SVG Canvas for Dependency Connections Lines */}
      <svg
        className="absolute inset-0 pointer-events-none w-[1700px] h-[720px] z-10"
        style={{ minWidth: '1700px', minHeight: '720px' }}
      >
        {FLOWCHART_EDGES.map((edge, idx) => {
          const fromPos = cardPositions[edge.from];
          const toPos = cardPositions[edge.to];
          if (!fromPos || !toPos) return null;

          const startX = fromPos.x + fromPos.w;
          const startY = fromPos.y + fromPos.h / 2;
          const endX = toPos.x;
          const endY = toPos.y + toPos.h / 2;

          const isHighlighted =
            hoveredNodeId === edge.from ||
            hoveredNodeId === edge.to ||
            (activeIncoming.has(edge.from) && edge.to === hoveredNodeId) ||
            (edge.from === hoveredNodeId && activeOutgoing.has(edge.to));

          const midX = (startX + endX) / 2;

          return (
            <path
              key={`${edge.from}-${edge.to}-${idx}`}
              d={`M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`}
              fill="none"
              stroke={isHighlighted ? '#ef4444' : edge.color || '#3b82f6'}
              strokeWidth={isHighlighted ? 2.5 : 1.5}
              strokeDasharray={isHighlighted ? 'none' : 'none'}
              className="transition-all duration-150"
              opacity={hoveredNodeId && !isHighlighted ? 0.25 : 0.9}
            />
          );
        })}
      </svg>

      {/* 10 Modules Layout Columns */}
      <div className="flex gap-4 min-w-[1680px] relative z-20 pb-4">
        {modules.map((modNum) => {
          const modStr = String(modNum).padStart(2, '0');
          const nodesInMod = FLOWCHART_NODES.filter((n) => n.mod === modNum).sort((a, b) => a.row - b.row);

          return (
            <div key={modNum} className="w-[148px] shrink-0 flex flex-col gap-2">
              {/* Header Box: Mod: 01 to Mod: 10 with peach/salmon gradient */}
              <div className="py-1 px-2 rounded-xs border border-gray-400 bg-gradient-to-r from-[#ffb4b4] via-[#ff9999] to-[#ff7a7a] text-center font-bold text-gray-900 text-[11px] shadow-xs">
                Mod: {modStr}
              </div>

              {/* Course Cards for this Module */}
              <div className="flex flex-col gap-2.5">
                {nodesInMod.map((node) => {
                  const isHovered = hoveredNodeId === node.id;
                  const isPrereq = activeIncoming.has(node.id);
                  const isDependent = activeOutgoing.has(node.id);

                  // Colors according to real Uniguajira Pensum flowchart:
                  // Approved: grey (#e5e7eb)
                  // Enrolled (in progress): bright yellow (#ffff00 / #facc15)
                  // Pending: light blue / cyan (#38bdf8)
                  let headerBg = '#d1d5db';
                  let footerBg = '#f3f4f6';
                  let borderColor = '#6b7280';

                  if (node.status === 'enrolled') {
                    headerBg = '#fef08a';
                    footerBg = '#ffff00';
                    borderColor = '#ca8a04';
                  } else if (node.status === 'pending') {
                    headerBg = '#38bdf8';
                    footerBg = '#0284c7';
                    borderColor = '#0369a1';
                  }

                  return (
                    <div
                      key={node.id}
                      id={`flow-node-${node.id}`}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                      onClick={() => onSelectCourse && onSelectCourse(node)}
                      className={`w-[148px] rounded-[1px] border text-[10.5px] cursor-pointer transition-all duration-150 shadow-xs ${
                        isHovered
                          ? 'ring-2 ring-red-500 scale-[1.02] shadow-md z-30'
                          : isPrereq
                          ? 'ring-2 ring-indigo-500 shadow-sm'
                          : isDependent
                          ? 'ring-2 ring-emerald-500 shadow-sm'
                          : ''
                      }`}
                      style={{
                        borderColor: isHovered ? '#ef4444' : borderColor,
                        backgroundColor: node.status === 'enrolled' ? '#fef9c3' : node.status === 'pending' ? '#e0f2fe' : '#ffffff',
                      }}
                      title={`${node.name} (${node.code})\nCréditos: ${node.credits}\nNota: ${node.grade}`}
                    >
                      {/* Top: Name */}
                      <div
                        className="py-1 px-1.5 font-bold text-gray-900 border-b truncate text-[11px]"
                        style={{
                          backgroundColor: headerBg,
                          borderColor: borderColor,
                          color: node.status === 'pending' ? '#ffffff' : '#000000',
                        }}
                      >
                        {node.name}
                      </div>

                      {/* Bottom 3-cell split row: [ Code | Credits | Grade ] */}
                      <div
                        className="grid grid-cols-3 divide-x text-[10px] text-center font-mono font-medium"
                        style={{
                          borderColor: borderColor,
                          backgroundColor: node.status === 'enrolled' ? '#fef08a' : node.status === 'pending' ? '#bae6fd' : '#f9fafb',
                        }}
                      >
                        <div className="py-0.5 px-0.5 truncate text-gray-800 font-semibold">{node.code}</div>
                        <div className="py-0.5 px-0.5 text-gray-800 font-bold">{node.credits}</div>
                        <div
                          className={`py-0.5 px-0.5 font-bold ${
                            node.status === 'enrolled'
                              ? 'text-yellow-950 bg-yellow-300'
                              : node.status === 'pending'
                              ? 'text-sky-950 bg-sky-300'
                              : 'text-gray-900 bg-gray-200'
                          }`}
                        >
                          {node.grade}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Interactive Legend */}
      <div className="mt-3 pt-2 border-t border-gray-300 flex flex-wrap items-center justify-between text-[11px] text-gray-700 bg-slate-50 p-2 rounded">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3 bg-gray-300 border border-gray-500 rounded-2xs inline-block"></span>
            <span>Aprobada (con calificación)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3 bg-yellow-300 border border-yellow-600 rounded-2xs inline-block"></span>
            <span>Matriculada / Cursando (Semestre Actual: .00)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3 bg-sky-400 border border-sky-600 rounded-2xs inline-block"></span>
            <span>Pendiente por cursar (.00)</span>
          </div>
        </div>
        <div className="text-gray-500 text-[10px] italic">
          Pase el cursor sobre cualquier materia para resaltar sus líneas de prerrequisitos y dependencias.
        </div>
      </div>
    </div>
  );
};
