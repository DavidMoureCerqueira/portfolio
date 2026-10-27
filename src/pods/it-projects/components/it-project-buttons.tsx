import { Button } from "../../../common-app/components";

interface ItProjectButtonsProps {
  repoUrl?: string;
  demoUrl?: string;
  // Con slug se pinta «Ver proyecto» (listado); en el detalle se omite
  slug?: string;
}

export function ItProjectButtons({
  repoUrl,
  demoUrl,
  slug,
}: ItProjectButtonsProps) {
  return (
    <div className="mt-auto flex flex-wrap gap-2 pt-6">
      {slug && (
        <Button
          variant="principal"
          to="/it-projects/$slug"
          params={{ slug }}
          arrow
        >
          Ver proyecto
        </Button>
      )}
      {demoUrl && (
        <Button variant="secundario" href={demoUrl} external arrow>
          Demo
        </Button>
      )}
      {repoUrl && (
        <Button variant="secundario" href={repoUrl} external arrow>
          Código
        </Button>
      )}
    </div>
  );
}
