import type { ReactNode } from "react";
import ReactMarkdown, {
  type Components,
  type ExtraProps,
} from "react-markdown";
import remarkGfm from "remark-gfm";

type HastNode = NonNullable<ExtraProps["node"]>["children"][number];

const textOf = (node: HastNode): string => {
  if (node.type === "text") return node.value;
  if (node.type === "element") return node.children.map(textOf).join("");
  return "";
};

const ARROW = "→";
const SOLUTION_LABEL = /^\s*Soluci[oó]n:\s*/;

// «**Reto:** … → **Solución:** …» (con o sin negrita): devuelve el reto y la solución por separado.
// Los hijos de React van en el mismo orden que los del nodo, así que se parten por el mismo índice.
function splitChallenge(node: ExtraProps["node"], children: ReactNode) {
  // En listas «sueltas» el contenido va dentro de un <p>
  const inline =
    node?.children.length === 1 &&
    node.children[0].type === "element" &&
    node.children[0].tagName === "p"
      ? node.children[0].children
      : (node?.children ?? []);
  const items = Array.isArray(children) ? children : [children];
  if (inline.length !== items.length) return null;

  for (let i = 0; i < inline.length; i++) {
    const current = inline[i];
    if (current.type !== "text" || !current.value.includes(ARROW)) continue;

    const [before, ...rest] = current.value.split(ARROW);
    const after = rest.join(ARROW);
    const next = inline[i + 1];

    // La etiqueta «Solución:» puede estar en el mismo texto o en la negrita siguiente
    if (SOLUTION_LABEL.test(after)) {
      return {
        challenge: [...items.slice(0, i), before],
        solution: [after.replace(SOLUTION_LABEL, ""), ...items.slice(i + 1)],
      };
    }
    if (!after.trim() && next && SOLUTION_LABEL.test(textOf(next))) {
      const tail = textOf(next).replace(SOLUTION_LABEL, "");
      return {
        challenge: [...items.slice(0, i), before],
        solution: [tail, ...items.slice(i + 2)],
      };
    }
  }
  return null;
}

// Los marcadores los pone la lista a sus <li>: punto de marca o número de dos cifras en un círculo
const bulletList =
  "flex flex-col gap-3 [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:top-[0.6em] [&>li]:before:left-1 [&>li]:before:size-1.5 [&>li]:before:rounded-full [&>li]:before:bg-brand [&>li]:before:content-['']";

const numberedList =
  "flex flex-col gap-4 [counter-reset:item] [&>li]:relative [&>li]:min-h-7 [&>li]:pl-10 [&>li]:[counter-increment:item] [&>li]:before:absolute [&>li]:before:top-0 [&>li]:before:left-0 [&>li]:before:flex [&>li]:before:size-7 [&>li]:before:items-center [&>li]:before:justify-center [&>li]:before:rounded-full [&>li]:before:border [&>li]:before:border-line-strong [&>li]:before:text-cota [&>li]:before:text-cota-text [&>li]:before:content-[counter(item,decimal-leading-zero)]";

const components: Components = {
  h3: ({ children }) => (
    <h3 className="mt-8 text-title text-ink">{children}</h3>
  ),
  p: ({ children }) => <p className="text-body text-ink">{children}</p>,
  strong: ({ children }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  ul: ({ children }) => <ul className={bulletList}>{children}</ul>,
  ol: ({ children }) => <ol className={numberedList}>{children}</ol>,
  li: ({ node, children }) => {
    const challenge = splitChallenge(node, children);
    if (!challenge) return <li className="text-body text-ink">{children}</li>;

    return (
      <li className="text-body text-ink">
        <p>{challenge.challenge}</p>
        <div className="mt-3 rounded-md bg-success-soft px-4 py-3">
          <p className="text-label text-success">Solución</p>
          <p className="mt-1 text-body text-ink">{challenge.solution}</p>
        </div>
      </li>
    );
  },
  a: ({ href, children }) => {
    const isExternal = /^https?:\/\//.test(href ?? "");
    return (
      <a
        href={href}
        className="text-brand-text underline underline-offset-4 hover:no-underline"
        {...(isExternal && { target: "_blank", rel: "noreferrer" })}
      >
        {children}
      </a>
    );
  },
};

interface Props {
  children: string;
}

// Markdown del detalle con los elementos del sistema de diseño (el Markdown común no se toca)
export function ItProjectMarkdown({ children }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
