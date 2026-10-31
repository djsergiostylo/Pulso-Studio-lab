# Pulso Studio

Groovebox para el móvil: secuenciador de 9 pistas (batería, sub, acid 303, stab), pads en directo, modo canción con pistas de audio, mezclador, 8 efectos, EQ de 5 bandas y exportación WAV.

Abre `index.html` en Chrome. Para publicarlo: GitHub → Settings → Pages → rama `main`.

## Manual

- **Manual completo con capturas:** [MANUAL.md](MANUAL.md). Se ve directamente en GitHub.
- **En la app:** pestaña **Aspecto** → **Abrir el manual** (carga `manual.html`, que lee `MANUAL.md`).
- Las capturas están en `manual/img/`. Al cambiar la interfaz hay que rehacerlas y actualizar `MANUAL.md`.

El historial de versiones está en [CHANGELOG.md](CHANGELOG.md).

## Versionado (leer antes de subir una versión)

La versión se escribe en **tres sitios de `index.html`** y en el **CHANGELOG**. Nunca se edita a mano: lo hace el script `tools/bump-version.py`.

| Dónde | Qué es |
|---|---|
| `index.html` → `<span class="ver" aria-label="Versión vX.Y">vX.Y</span>` | Etiqueta que se ve en pantalla, encima de las letras BPM |
| `index.html` → `app.js?v=X.Y` y `styles.css?v=X.Y` | Rompen la caché del navegador. Si no suben, el móvil sigue con el código viejo |
| `CHANGELOG.md` → `## vX.Y (fecha) — autor` | Entrada de la versión nueva (la más reciente va justo antes de la sección "Manual") |

**Pasos para cada versión nueva:**
1. Haz el cambio de código (solo los archivos necesarios).
2. `python tools/bump-version.py X.Y` — sube la etiqueta y los dos `?v=`.
3. Añade la entrada `## vX.Y` en `CHANGELOG.md` con qué cambia y "Para revertir: git revert del commit vX.Y".
4. `python tools/bump-version.py --check` — debe decir `OK: todo en vX.Y`. Si falla, las versiones no coinciden.
5. `git add -A && git commit -m "vX.Y: resumen corto"`, `git tag vX.Y`, `git push <remoto> main --tags`.

**Reglas:**
- Una versión = un cambio = un commit = una etiqueta. Se revierte con `git revert`.
- Nada de `push --force`. Si falta algo, nueva versión.
- No cambies el HTML de la etiqueta `.ver` (la expresión regular del script busca `class="ver" aria-label="Versión v…">v…<`). Se puede mover de sitio, pero debe conservar ese texto.
- `versions/` guarda copias completas de las versiones antiguas v1.0 a v2.5. No se tocan ni se borran. Desde la v2.6 cada versión se recupera con su etiqueta de git (`git checkout vX.Y`).
- Cambios solo de documentación (README, MANUAL) no suben versión.
