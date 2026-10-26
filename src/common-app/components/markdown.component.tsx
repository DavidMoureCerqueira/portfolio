import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  children: string;
  className?: string;
}

// Un párrafo que solo contiene una negrita («**Tareas principales**») hace de subtítulo
const components: Components = {
  p: ({ node, children }) => {
    const nodes = node?.children ?? [];
    const isSubtitle =
      nodes.length === 1 && nodes[0].type === "element" && nodes[0].tagName === "strong";
    return <p className={isSubtitle ? "markdown-subtitle" : undefined}>{children}</p>;
  },
};

// Contenido markdown de Content Island con los estilos de markdown-body
export function Markdown({ children, className = "" }: Props) {
  return (
    <div className={`markdown-body ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
