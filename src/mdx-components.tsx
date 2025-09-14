// MDX v3: No direct exported type for components map from '@mdx-js/react'.
// We define a minimal shape acceptable by MDXProvider (string keys -> React components).
export const mdxComponents = {
  h1: (props) => <h1 className="mb-4 text-3xl font-semibold" {...props} />,
  h2: (props) => <h2 className="mt-8 mb-3 text-2xl font-semibold" {...props} />,
  h3: (props) => <h3 className="mt-6 mb-2 text-xl font-semibold" {...props} />,
  p: (props) => <p className="mb-4 leading-7 text-slate-700" {...props} />,
  a: (props) => <a className="text-slate-900 underline" {...props} />,
  ul: (props) => <ul className="mb-4 list-disc pl-6" {...props} />,
  ol: (props) => <ol className="mb-4 list-decimal pl-6" {...props} />,
  li: (props) => <li className="leading-7" {...props} />,
} satisfies Record<string, React.ComponentType<any>>;
