/**
 * Converts an array of name-value pairs (or just a single name-value pair) into a URL query string.
 *
 * @param {Array<{ name: string, value?: string | number }> | {name: string, value?: string | number }} params - An object (or array of objects) containing `name` and optional `value` fields.
 * @returns {string} A URL query string generated from the provided parameters.
 *
 * @example
 * // Returns 'key1=value1&key2=value2'
 * createQueryParam([{ name: 'key1', value: 'value1' }, { name: 'key2', value: 'value2' }]);
 *
 * @example
 * // Returns 'key1=value1'
 * createQueryParam([{ name: 'key1', value: 'value1' }, { name: 'key2' }]);
 *
 * @example
 * // Returns 'key1=value1'
 * createQueryParam({ name: 'key1', value: 'value1' })
 */

export const createQueryParam = (params) => {
  const searchParams = new URLSearchParams();

  if (Array.isArray(params)) {
    params.forEach(
      ({ name, value }) => value && searchParams.append(name, value)
    );
  } else {
    const { name, value } = params;
    value && searchParams.append(name, value);
  }

  return searchParams.toString();
};
