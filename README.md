# Nutrición Morfe

App PWA familiar para seguir la dieta de Martín y su mamá.

## Guardado de datos

La app está publicada en GitHub Pages, pero GitHub Pages solo sirve archivos estáticos: no puede guardar registros por sí mismo. Para no exponer un token de GitHub en el navegador, los registros siguen entrando por el backend de Google Apps Script y se guardan automáticamente en Google Sheets.

No hace falta editar la hoja a mano. Cada registro enviado desde la app incluye fecha, hora, día de la semana, comida seleccionada y tipo de rutina dentro de las notas, además de peso, cintura y pasos.

## Archivos

- `index.html`: app completa.
- `manifest.json`: configuración PWA.
- `sw.js`: service worker básico.
- `icon.svg`: icono de la app.

## Publicar en GitHub Pages

1. Sube estos archivos a la raíz del repositorio.
2. Ve a Settings → Pages.
3. En Source selecciona `Deploy from a branch`.
4. Branch: `main`.
5. Folder: `/root`.
6. Save.

La app quedará en:

`https://morfemartin.github.io/nutricion-morfe/`
