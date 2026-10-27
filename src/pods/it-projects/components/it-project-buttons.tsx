import { Button } from "../../../common-app/components";

interface ItProjectButtonsProps {
  repoUrl?: string;
  demoUrl?: string;
  slug: string;
}

export function ItProjectButtons({
  repoUrl,
  demoUrl,
  slug,
}: ItProjectButtonsProps) {
  console.log(slug);
  return (
    <div className="mt-auto flex flex-wrap gap-2 pt-6">
      {/* TODO: enlazar a /it-projects/$slug cuando exista la ruta de detalle */}
      <Button variant="principal" arrow>
        Ver proyecto
      </Button>
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
