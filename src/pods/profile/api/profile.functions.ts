import type { ProfileApi } from "./api.model";
import { client } from "../../../common-app/content-island.server";
import { createServerFn } from "@tanstack/react-start";
import { mapperProfileApiToProfileVm } from "../profile.mapper";
import { ProfileVm } from "../profile.vm";

export const getProfile = createServerFn({ method: "GET" }).handler(
  async (): Promise<ProfileVm> => {
    try {
      const profile = await client.getContent<ProfileApi>({
        contentType: "Profile",
        language: "es",
        includeRelatedContent: 1,
      });

      return mapperProfileApiToProfileVm(profile);
    } catch (error) {
      console.error(`Error cargando el perfil: ${error}`);
      throw new Error("No se ha podido cargar el perfil", { cause: error });
    }
  },
);
