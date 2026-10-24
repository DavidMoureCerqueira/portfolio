# Prompt para cargar el contenido en Content Island (Claude Code + MCP)

## Antes de empezar (una sola vez, en el terminal, dentro del repo)

```powershell
claude mcp add content-island --transport stdio --scope local -e CONTENT_ISLAND_ACCESS_TOKEN=WRITE_TOKEN -- npx -y "@content-island/mcp@latest"
```

Comprueba con `claude mcp get content-island`, reinicia Claude Code, activa el modo plan (Shift + Tab) y pega el prompt de abajo.

## Prompt

```text
Vamos a cargar el contenido de mi portfolio en Content Island usando el MCP "content-island".

## Contexto
- Todo el contenido está en la carpeta `portfolio-content/`. El archivo `portfolio-content/CONTENT_MODEL.md` es el contrato: define los modelos, sus campos, tipos, valores permitidos y el orden de carga. Léelo entero antes de nada.
- Cada archivo .md de las carpetas profile, timeline, technologies, it-projects, car-projects y modifications es UNA entrada. El frontmatter YAML son los campos; el cuerpo markdown es el campo `content`. `_model` indica el modelo e `id` es el identificador con el que se relacionan las entradas (por ejemplo `technologies: [react, typescript]` o `car: volvo-v40-t4`).
- Ignora los archivos y carpetas que empiezan por `_` o `.` (plantillas, este prompt, listados y .gitkeep).
- Las imágenes son rutas relativas a `portfolio-content/` (por ejemplo `assets/cars/volvo-v40-t4/cover.webp`).

## Fase 1: plan (no escribas nada todavía)
1. Llama a `get-content-island-project` para ver idiomas y modelos existentes.
2. Lee CONTENT_MODEL.md y todas las entradas.
3. Propónme:
   - El mapeo de cada campo a un tipo de Content Island. Los campos con lista cerrada de valores (status, type, kind, category, techniques) deben ser Enums.
   - Cómo resolver la relación circular entre CarProject.modifications y Modification.car (crear primero los modelos y añadir después los campos de referencia).
   - Cómo guardar los `alt` de las galerías si el tipo media no los admite.
   - Qué imágenes referenciadas no existen todavía en assets/.
4. Espera mi aprobación.

## Fase 2: carga
- Crea enums y modelos y carga las entradas en este orden: Technology → Profile → TimelineEntry → ItProject → CarProject (sin modifications) → Modification → actualiza CarProject.modifications.
- Sube cada imagen con `upload-content-island-media` y enlázala a su campo. Si una imagen no existe, sáltala y apúntala; no detengas la carga.
- Antes de crear una entrada, comprueba con `list-content-island-contents` que no exista ya, para no duplicar si hay que repetir.
- Guarda en `portfolio-content/.upload-map.json` la correspondencia entre cada `id` de los .md y el id real en Content Island, para futuras actualizaciones.
- No modifiques los .md ni muestres el token en ningún momento.
- NO publiques nada todavía.

## Fase 3: informe
Al terminar, dame un resumen con: modelos y enums creados, número de entradas por modelo, imágenes subidas, imágenes que faltan y cualquier campo que no hayas podido mapear. Después revisaré el contenido en el panel antes de pedirte que publiques con `publish-content-island-content`.
```
