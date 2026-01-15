import { Marquee } from '../ui/marquee';

const tools = [
  { name: 'Claude Code', icon: '🤖' },
  { name: 'Cursor', icon: '⚡' },
  { name: 'GitHub Copilot', icon: '🐙' },
  { name: 'Replit', icon: '💻' },
  { name: 'v0', icon: '▲' },
  { name: 'Bolt', icon: '⚡' },
  { name: 'Lovable', icon: '💜' },
];

export default function TrustBar() {
  return (
    <section className="py-8 bg-gray-50 relative overflow-hidden">
      <p className="text-center text-sm text-gray-500 mb-6">
        We ship apps built with:
      </p>
      <Marquee pauseOnHover className="[--duration:30s] [--gap:2rem]">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="flex items-center gap-2 px-6 py-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="text-lg" aria-hidden="true">
              {tool.icon}
            </span>
            <span className="font-medium text-gray-700 whitespace-nowrap">
              {tool.name}
            </span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
