declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Sin prefijo VITE_: solo existe en el servidor, nunca llega al navegador
      readonly CONTENT_ISLAND_READ_TOKEN: string;
    }
  }
}

export {};
