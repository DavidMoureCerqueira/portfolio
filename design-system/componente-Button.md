# Button

Botón de acción en cuatro variantes; la amarilla es la pieza protagonista de la pantalla y solo puede haber una.

| Variante | Uso | Colores |
|---|---|---|
| Principal | Acción principal de un bloque: «Ver proyecto». | Fondo `brand`, texto `brand-ink`, hover `brand-hover`. |
| Destacado | LA acción de la página: «Descargar CV». Una por pantalla. | Fondo `accent`, texto `accent-ink`. |
| Secundario | Acciones de apoyo: «Demo», «Código», GitHub. | Fondo `surface`, borde `line-strong`, texto `ink`. |
| Enlace | Navegación dentro del texto: «Ver todos los proyectos IT →». | Texto `brand-text`, subrayado al hover. |

- Alto mínimo 44px, padding de 20px horizontal, forma de píldora (`radius-full`), estilo de texto `button`.
- Movimiento: 150ms en hover; al pulsar se escala a 0.97; la flecha de los enlaces se desplaza 3px a la derecha al pasar el ratón.
- Destacado: en Home y Proyectos IT, solo uno por pantalla. En Proyectos personales los botones principales siguen en `brand`.
- Icono Lucide de 16px a la izquierda para acciones (descargar, correo) y flecha a la derecha para navegación o enlaces externos.
- Foco: anillo de 2px en `focus` con 2px de separación.
- Usa `<a>` si lleva a otra página o enlace y `<button>` si ejecuta una acción.
