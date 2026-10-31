# Instrucciones para IA y editores de código

Pulso Studio es una groovebox web para móvil (Web Audio, sin librerías). Interfaz en español.
Archivos: `index.html`, `app.js` (toda la lógica), `styles.css`.

- **Versiones:** sigue la sección *Versionado* de [README.md](README.md). Siempre con `tools/bump-version.py`; nunca edites la versión a mano.
- **Guardado:** no rompas el formato (`localStorage` `pulsostudio1`, proyectos `.json`, códigos `PS1:`). Si cambias datos, añade migración en `fixP` / `fixSong`.
- **Estilo de trabajo:** cambios pequeños, un tema por versión, lee solo la parte del código que vas a tocar. Prueba a 390 px de ancho sin errores en consola.
