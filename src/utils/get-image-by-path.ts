const URL = process.env.NEXT_PUBLIC_API_URL;

export function getImageByPath(path: string): string {
  return `${URL}/uploads/${path}`;
}
