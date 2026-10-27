import {
  createMiddleware,
  defaultSerovalDeserializerPlugins,
  getDefaultSerovalPlugins,
  getSerovalPlugins,
} from "@tanstack/react-start";
import { notFound } from "@tanstack/react-router";
import { fromJSON, toJSONAsync } from "seroval";

/*
 * Copia de staticFunctionMiddleware de @tanstack/start-static-server-functions (1.167.44)
 * con un único cambio: el cliente pide los JSON con la ruta base de Vite
 * (/portfolio/__tsr/... en GitHub Pages). El paquete oficial los pide siempre en /__tsr/...
 *
 * - En el build (prerender), la server function se ejecuta y su resultado se guarda como JSON.
 * - En el navegador, en vez de llamar al servidor, se descarga ese JSON.
 * Debe ser el último middleware de la server function.
 */

const CACHE_DIR = "__tsr/staticServerFnCache";

// SHA-1 solo para acortar el nombre del archivo, no por seguridad
async function sha1Hash(message: string) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const jsonToFilenameSafeString = (json: unknown) => {
  const sortedKeysReplacer = (_key: string, value: unknown) =>
    value && typeof value === "object" && !Array.isArray(value)
      ? Object.keys(value)
          .sort()
          .reduce<Record<string, unknown>>((acc, curr) => {
            acc[curr] = (value as Record<string, unknown>)[curr];
            return acc;
          }, {})
      : value;
  return JSON.stringify(json ?? "", sortedKeysReplacer)
    .replace(/[/\\?%*:|"<>]/g, "-")
    .replace(/\s+/g, "_");
};

// Lo que se guarda en cada JSON
interface CachedResponse {
  result: unknown;
  context?: Record<string, unknown>;
}

// Nombre del JSON: depende de la función y de los parámetros con que se llama
const getCacheFileName = async (functionId: string, data: unknown) =>
  `${await sha1Hash(`${functionId}__${jsonToFilenameSafeString(data)}`)}.json`;

export const staticFunctionMiddleware = createMiddleware({ type: "function" })
  .client(async (ctx) => {
    if (import.meta.env.PROD && typeof document !== "undefined") {
      const fileName = await getCacheFileName(ctx.serverFnMeta.id, ctx.data);
      const response = await fetch(
        `${import.meta.env.BASE_URL}${CACHE_DIR}/${fileName}`,
      )
        .then((r) => {
          // Sin JSON no se prerenderizó esa llamada (p. ej. un slug que no existe)
          if (r.status === 404) throw notFound();
          return r.json();
        })
        .then(
          (d) =>
            fromJSON(d, {
              plugins: getSerovalPlugins(defaultSerovalDeserializerPlugins),
            }) as CachedResponse | undefined,
        );
      if (response) {
        // Se responde sin llamar a next(): los tipos de TanStack no lo contemplan
        return {
          result: response.result,
          context: { ...(ctx.context ?? {}), ...response.context },
        } as never;
      }
    }
    return ctx.next();
  })
  .server(async (ctx) => {
    const response = await ctx.next();
    const outputDir = process.env.TSS_CLIENT_OUTPUT_DIR;
    if (process.env.NODE_ENV === "production" && outputDir) {
      // Imports dinámicos: este archivo también se empaqueta para el navegador
      const fs = await import("node:fs/promises");
      const path = await import("node:path");
      const fileName = await getCacheFileName(ctx.serverFnMeta.id, ctx.data);
      const filePath = path.join(outputDir, CACHE_DIR, fileName);
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      // result y sendContext existen en tiempo de ejecución aunque no estén en los tipos
      const { result } = response as unknown as { result: unknown };
      const { sendContext } = ctx as unknown as { sendContext?: unknown };
      const serialized = await toJSONAsync(
        { result, context: sendContext },
        { plugins: getDefaultSerovalPlugins() },
      );
      await fs.writeFile(filePath, JSON.stringify(serialized), "utf-8");
    }
    return response;
  });
