import { Helmet } from 'react-helmet-async'

type Props = {
  title?: string
  description?: string
}

export default function SEO({ title, description }: Props) {
  const site = 'My Blog'
  const fullTitle = title ? `${title} • ${site}` : site
  const desc = description || 'Personal site: writings, projects, and notes.'
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta name="twitter:card" content="summary" />
    </Helmet>
  )
}

