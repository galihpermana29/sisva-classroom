/** Format given number to rupiah string
 * @param {number} number - Number to be formatted to rupiah string
 * @returns {string} Formatted number to rupiah string
 * @example const currency = formatToRupiah(123456);
 * console.log(currency) // Rp 123,456
 */
export const formatToRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
