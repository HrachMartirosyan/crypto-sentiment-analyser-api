export function camelCaseToDashed(str: string): string {
  str = str.replace(/([A-Z])/g, '-$1');
  return str.slice(1).toLowerCase();
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
