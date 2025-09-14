import { useLocation, Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

type PostModule = { frontmatter: { title?: string } }
const postModules = import.meta.glob<PostModule>('@/content/writings/*.mdx', { eager: true })
const titleBySlug = Object.fromEntries(
  Object.entries(postModules).map(([path, mod]) => [
    path.split('/').pop()!.replace(/\.mdx$/, ''),
    mod.frontmatter?.title || '',
  ])
)

function labelFor(segment: string, index: number, all: string[]) {
  if (segment === '') return 'Home'
  if (segment === 'writings' && index === 1) return 'Writings'
  if (segment === 'projects' && index === 1) return 'Projects'
  if (all[1] === 'writings' && index === 2) {
    return titleBySlug[segment] || segment.replace(/-/g, ' ')
  }
  return segment.replace(/-/g, ' ')
}

export default function Breadcrumbs() {
  const { pathname } = useLocation()
  const parts = pathname.split('/').filter((_, i) => i === 0 || !!_)

  const items = parts.map((part, idx) => {
    const to = parts.slice(0, idx + 1).join('/') || '/'
    return { to, label: labelFor(part, idx, parts) }
  })

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={item.to} className="flex items-center">
            {i > 0 && <ChevronRight className="mx-1 h-4 w-4 text-slate-400" />}
            {i < items.length - 1 ? (
              <Link to={item.to} className="hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-slate-900">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

