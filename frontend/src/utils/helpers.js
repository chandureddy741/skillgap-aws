export const asList = (value) => (Array.isArray(value) ? value : value ? [value] : []);

export const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString(undefined, { dateStyle: 'medium' }) : '';

export const percent = (value) => {
  const n = Number(value);
  if (Number.isNaN(n)) return null;
  return Math.max(0, Math.min(100, n));
};
