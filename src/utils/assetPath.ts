/**
 * Resolves the correct path for an asset, taking into account the Vite base URL.
 * This is essential for GitHub Pages where the app is hosted on a subpath.
 */
export function getAssetPath(path: string): string {
    if (!path) return '';

    // If the path is already absolute (starts with http or https), return it as is
    if (path.startsWith('http')) return path;

    // Ensure the path doesn't have a leading slash if we're joining it with BASE_URL
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    // import.meta.env.BASE_URL is provided by Vite and includes the trailing slash
    return `${import.meta.env.BASE_URL}${cleanPath}`;
}
