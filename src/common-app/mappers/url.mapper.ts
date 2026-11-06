// "" o espacios → undefined, para que los componentes solo comprueben si existe
export const toOptionalUrl = (url?: string) => url?.trim() || undefined;
