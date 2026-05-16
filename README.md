# Nutrición Morfe

App PWA familiar para seguir la dieta de Martín y su mamá.

## Datos y guardado

La app está publicada en GitHub Pages, pero GitHub Pages solo sirve archivos estáticos: no puede guardar registros por sí mismo. Para no exponer un token de GitHub en el navegador, los registros siguen entrando por el backend de Google Apps Script y se guardan automáticamente en Google Sheets.

Los planes editables viven en `data/plans.v1.json`. Ahí se cambian comidas, rutinas, módulos y ejercicios sin rediseñar la app.

Los registros diarios viven en Google Sheets:

- `Body_Log`: peso, medidas y pasos.
- `Meal_Log`: comidas planificadas/registradas.
- `Workout_Log`: ejercicios registrados.
- `Registros`: pestaña antigua conservada como compatibilidad.

El código de backend actualizado está en `apps-script.gs` y debe desplegarse en el Web App de Google Apps Script para activar las acciones nuevas.

## Archivos

- `index.html`: app completa.
- `data/plans.v1.json`: planes de alimentación y rutinas versionados.
- `apps-script.gs`: backend de Google Apps Script para Sheets.
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
