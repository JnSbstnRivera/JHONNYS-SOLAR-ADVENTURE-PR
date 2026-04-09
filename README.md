# Solar Biker: Jhonny's PR Adventure

## Despliegue en Netlify

Este proyecto está configurado para ser desplegado fácilmente en Netlify.

### Pasos para desplegar:

1.  **Conecta tu repositorio** (GitHub, GitLab, Bitbucket) a Netlify.
2.  **Configuración de Build**:
    *   **Build Command**: `npm run build`
    *   **Publish directory**: `dist`
3.  **Variables de Entorno**:
    *   Si usas alguna API key, configúrala en el panel de Netlify.
4.  **Desplegar**: Netlify detectará automáticamente el archivo `netlify.toml` y aplicará la configuración necesaria.

### Archivos de Configuración Incluidos:

*   `netlify.toml`: Configura el comando de build y el directorio de publicación.
*   `public/_redirects`: Asegura que las rutas de la aplicación funcionen correctamente (SPA).
