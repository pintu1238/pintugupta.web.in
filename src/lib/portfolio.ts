export type CarouselDirection = 'next' | 'previous';

export function getProjectPage<T>(items: T[], requestedPage: number, pageSize: number) {
  const safePageSize = Math.max(1, Math.floor(pageSize));
  const pageCount = Math.max(1, Math.ceil(items.length / safePageSize));
  const page = Math.min(pageCount, Math.max(1, Math.floor(requestedPage)));
  const start = (page - 1) * safePageSize;

  return {
    items: items.slice(start, start + safePageSize),
    page,
    pageCount,
  };
}

export function getNextIndex(
  current: number,
  count: number,
  direction: CarouselDirection,
) {
  if (count <= 0) return 0;

  const normalized = ((current % count) + count) % count;
  return direction === 'next'
    ? (normalized + 1) % count
    : (normalized - 1 + count) % count;
}
