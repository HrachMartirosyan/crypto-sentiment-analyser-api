export function camelCaseToDashed(str: string): string {
  str = str.replace(/([A-Z])/g, '-$1');
  return str.slice(1).toLowerCase();
}
