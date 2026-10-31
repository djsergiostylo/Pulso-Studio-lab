# Propuesta: reorientar la pestaña Pads como "Tocar" + piano roll

Para Claude Code. Trabaja sobre `CL-V2.5` (versión actual v2.82). Una tarea por versión, con commit y etiqueta, como siempre. Maqueta visual en `PROPUESTA-TOCAR.html` (ábrelo en el navegador).

## Problema actual
- En Pads, modo Notas (`padMel` en `renderPads`, `app.js`), las 8 notas salen enormes: una por fila, ~724x579 px en escritorio. Causa: `styles.css` ~línea 562, `.pads .pad:nth-child(-n+6){grid-column:span 4;aspect-ratio:1.25}`, pensado para la rejilla de 12 columnas de Batería. En Notas el JS pone `repeat(4,1fr)`, así que esos pads ocupan las 4 columnas.
- En Notas el sonido tocado depende de la pista elegida en otro sitio (`melCh()`); si hay una batería elegida, usa una melódica por su cuenta. El usuario no entiende esa lógica ("no tiene sentido").

## Idea general
Pads pasa a ser la pestaña de **tocar en directo** (nombre sugerido: "Tocar"). El secuenciador es para escribir; Pads para interpretar. Todo en una pantalla, sin scroll.

## Cambios propuestos (hacer en este orden, una versión cada uno)

### 1. Arreglo de tamaño de Notas (v2.83)
- Notas en cuadrícula 4x2, pads pequeños (~54-80 px de alto). Anular el `span 4` y el `aspect-ratio` en modo Notas (p. ej. clase `.notes` en `#pads` o regla específica).
- Batería: 10 pads en 5x2, tamaño fijo pequeño (~52 px de alto).
- Filtro DJ siempre visible debajo.

### 2. Elegir el sonido dentro de Notas (v2.84)
- Fila de 4 botones **SUB · ACID · STAB · LEAD** dentro del modo Notas, con el color del sonido (`CHC[i]`). Elegir aquí fija el canal melódico que tocan los pads, sin depender de la selección de otra pantalla.
- Los pads toman el color del sonido y muestran su nota (C, D, E♭...).
- Botones de octava − / +.

### 3. Piano roll (v2.85+)
- Nueva vista en Crear: **Secuenciador · Pads · Piano roll**.
- Filas = notas de la escala (de aguda arriba a grave abajo), columnas = pasos (16, o 32 en ACID con dos páginas, como ya hace LEN).
- Arriba, selector de sonido SUB/ACID/STAB/LEAD (colores `CHC`). Tocar una casilla pone o quita esa nota en ese paso; arrastrar en horizontal pinta.
- Cursor de reproducción por columna, como en la rejilla actual (`ph()` / `S.g`).
- Abajo: OCT −/+, Azar (muta, color del sonido), Borrar.
- **Límites de datos, no romper el guardado:** cada pista melódica es monofónica, una nota por paso (`p[NK[ch]][i]`, velocidad en `p[VK[ch]][i]`, -1 = vacío). Las notas duran un paso (excepto Slide en ACID, `p.asl`). Sin acordes. No cambiar el formato `pulsostudio1` / `.json` / `PS1:`; si hace falta algún dato nuevo, migrar en `fixP`.
- Reutilizar `snap()` para deshacer y `save()` / `histCommit()` como el resto.

### 4. Más adelante (no ahora)
- Botón **Acorde** (un pad toca un acorde) y **Arp** (arpegiador).

## Dudas abiertas para el usuario
- ¿Piano roll como tercera vista (recomendado) o sustituyendo la fila NOTA del secuenciador?
- ¿Mantener Notas en Pads? Recomendación: sí, para tocar en directo y grabar con REC.

## Reglas del proyecto (de CLAUDE.md)
- Respuestas cortas; el usuario trabaja desde el móvil.
- Probar a 390 px y sin errores en consola; medir antes de afirmar mejoras.
- Subir etiqueta `v2.xx` en `index.html` (.ver) y `?v=` de `app.js`/`styles.css`, entrada en CHANGELOG, commit + tag, `git push claude main --tags`. Sin force-push.
- Escribir archivos en UTF-8 sin BOM.
- Contraste de letras y botones >= 4,5:1 en las 10 carátulas.
- No repetir al usuario el aviso de caché de GitHub Pages.
