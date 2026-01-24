import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    // When deploying to GitHub Pages under a repository path like /newsApp/,
    // set the base to the repo name. This makes `import.meta.env.BASE_URL`
    // resolve to "/newsApp/" so asset fetches work.
    base: '/newsApp/',
});
