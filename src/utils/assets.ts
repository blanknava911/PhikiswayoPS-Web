export function publicAssetPath(filename: string) {
  const baseUrl = import.meta.env.BASE_URL || '/';
  return `${baseUrl}${filename.replace(/^\/+/, '')}`;
}
