# Instrucciones para IA y editores de código

Pulso Studio es una groovebox web para móvil (Web Audio, sin librerías). Interfaz en español.
Archivos: `index.html`, `app.js` (toda la lógica), `styles.css`, `tools/` (scripts), `manual*` (manual con capturas), `versions/` (copias antiguas).

## Cómo trabajar
- El usuario trabaja casi siempre desde el móvil y no es programador experto: respuestas cortas, cambios pequeños, una tarea por versión.
- Lee solo la parte del código que vayas a tocar (busca los comentarios `/* ---------- ... ---------- */`). No hace falta leer `app.js` entero.
- Prueba a 390 y 360 px de ancho, sin errores en consola, y sin letras desbordadas en la fila de transporte.
- Para probar en local: `python -m http.server` en la carpeta del proyecto. El navegador cachea `app.js?v=X.Y`: recarga con fetch `cache:'reload'` o cambia la versión.

## Versiones
Sigue la sección *Versionado* de [README.md](README.md). Siempre con `tools/bump-version.py`; nunca edites la versión a mano. Sube con `git push <remoto> main --tags` al repositorio Pulso-Studio-lab. No uses `push --force` y no toques el repositorio antiguo `pulso-studio`.

## Guardado (no romper)
- `localStorage` clave `pulsostudio1`, proyectos `.json` y códigos `PS1:`. Si cambias datos, añade migración en `fixP` / `fixSong`.
- Un ajuste nuevo va en **`SAVE`** si es del dispositivo (se recuerda en el móvil) o en **`PROJ`** si es del proyecto (viaja en el `.json`). Elegir mal cambia lo que se guarda o se exporta.

## Windows y codificación
- Escribe los archivos en **UTF-8 sin BOM** y sin pasar por `Set-Content` de PowerShell, que rompe los acentos. Los avisos "LF will be replaced by CRLF" de git son normales.

## Decisiones del usuario que se respetan
- Mezcla (Canal, Mix, FX, EQ) vive en el panel fijo "Sonido" bajo el secuenciador, dentro de Crear. Cada canal conserva su color en Canal, Mix y EQ.
- Al reproducir solo se anima el cursor del secuenciador (luces extra apagadas por defecto), para gastar poco.
- Botones y letras deben leerse bien en todas las carátulas (contraste mínimo 4,5:1).
- Si cambias la interfaz, rehaz las capturas de `manual/img/` (script `tools/capturas-manual.js`) y actualiza `MANUAL.md`.
