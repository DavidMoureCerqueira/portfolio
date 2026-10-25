import { createClient } from "@content-island/api-client";

// Solo servidor: el token se lee en cada petición, no al cargar el módulo
export const client = createClient({
    accessToken: process.env.CONTENT_ISLAND_READ_TOKEN,
  });
