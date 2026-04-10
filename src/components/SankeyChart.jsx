import { useMemo } from 'react';
import { sankey as d3Sankey, sankeyLinkHorizontal } from 'd3-sankey';

const NODES = [
  // Source skills (left)
  { name: 'Python' },              // 0
  { name: 'T-SQL' },               // 1
  { name: 'JavaScript' },          // 2
  { name: 'Microsoft Fabric' },    // 3
  { name: 'LLMs / Vector DBs' },   // 4
  { name: 'FastAPI / Celery' },    // 5
  { name: 'Docker' },              // 6
  { name: 'Power BI / QlikView' }, // 7
  { name: 'GIS' },                 // 8
  { name: 'R' },                   // 9
  { name: 'Excel / VBA' },         // 10
  // Target domains (right)
  { name: 'AI/ML Research' },          // 11
  { name: 'Cloud Data Engineering' },  // 12
  { name: 'Web Development' },         // 13
  { name: 'Business Intelligence' },   // 14
  { name: 'Data Science' },            // 15
  { name: 'Application Development' }, // 16
];

const LINKS = [
  // AI/ML Research
  { source: 0, target: 11, value: 7 },  // Python
  { source: 4, target: 11, value: 6 },  // LLMs / Vector DBs
  { source: 5, target: 11, value: 4 },  // FastAPI / Celery
  { source: 9, target: 11, value: 2 },  // R
  { source: 6, target: 11, value: 2 },  // Docker

  // Cloud Data Engineering
  { source: 0, target: 12, value: 5 },  // Python
  { source: 3, target: 12, value: 6 },  // Microsoft Fabric
  { source: 1, target: 12, value: 5 },  // T-SQL
  { source: 6, target: 12, value: 2 },  // Docker

  // Web Development
  { source: 2, target: 13, value: 6 },  // JavaScript
  { source: 0, target: 13, value: 3 },  // Python
  { source: 5, target: 13, value: 3 },  // FastAPI / Celery
  { source: 1, target: 13, value: 2 },  // T-SQL

  // Business Intelligence
  { source: 7, target: 14, value: 5 },  // Power BI / QlikView
  { source: 1, target: 14, value: 4 },  // T-SQL
  { source: 0, target: 14, value: 3 },  // Python
  { source: 8, target: 14, value: 3 },  // GIS
  { source: 10, target: 14, value: 2 }, // Excel / VBA

  // Data Science
  { source: 0, target: 15, value: 5 },  // Python
  { source: 4, target: 15, value: 3 },  // LLMs / Vector DBs
  { source: 9, target: 15, value: 2 },  // R
  { source: 1, target: 15, value: 2 },  // T-SQL

  // Application Development
  { source: 0, target: 16, value: 5 },  // Python
  { source: 2, target: 16, value: 4 },  // JavaScript
  { source: 1, target: 16, value: 4 },  // T-SQL
  { source: 10, target: 16, value: 2 }, // Excel / VBA
  { source: 6, target: 16, value: 2 },  // Docker
];

const SankeyChart = ({ width, height }) => {
  const { nodes, links } = useMemo(() => {
    if (width <= 0 || height <= 0) return { nodes: [], links: [] };

    const sankeyGen = d3Sankey()
      .nodeId((d, i) => i)
      .nodeWidth(16)
      .nodePadding(12)
      .extent([[1, 1], [width - 1, height - 5]]);

    const graph = sankeyGen({
      nodes: NODES.map((d) => ({ ...d })),
      links: LINKS.map((d) => ({ ...d })),
    });

    return graph;
  }, [width, height]);

  if (!nodes.length) return null;

  const linkPath = sankeyLinkHorizontal();

  return (
    <svg width={width} height={height} aria-label="Skills Sankey diagram">
      <g>
        {links.map((link, i) => (
          <path
            key={i}
            d={linkPath(link)}
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={Math.max(1, link.width)}
            opacity={0.6}
          >
            <title>{`${link.source.name} → ${link.target.name}: ${link.value}`}</title>
          </path>
        ))}
      </g>
      <g>
        {nodes.map((node, i) => (
          <g key={i}>
            <rect
              x={node.x0}
              y={node.y0}
              width={node.x1 - node.x0}
              height={node.y1 - node.y0}
              fill="#00D7FF"
              opacity={0.8}
              rx={2}
            >
              <title>{node.name}</title>
            </rect>
            <text
              x={node.x0 < width / 2 ? node.x1 + 6 : node.x0 - 6}
              y={(node.y0 + node.y1) / 2}
              dy="0.35em"
              textAnchor={node.x0 < width / 2 ? 'start' : 'end'}
              fill="#FFFFFF"
              fontSize="12px"
              fontFamily="'Josefin Sans', sans-serif"
            >
              {node.name}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
};

export default SankeyChart;
