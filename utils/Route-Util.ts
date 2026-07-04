export function encodePath(path: string): string {
  return path
    .split('/')
    .map((segment) => (segment ? encodeURIComponent(segment) : segment))
    .join('/');
}

export function postHref(slug: string): string {
  return encodePath(`/${slug}`);
}

export function categoryHref(category: string): string {
  return encodePath(`/posts/${category}`);
}

export function tagHref(tag: string): string {
  return encodePath(`/posts/tag/${tag}`);
}

export function decodeRouteSegment(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}
