export function convertToTitleCase(text) {
  const convertedText = text.toLowerCase().replaceAll("_", " ");
  return convertedText;
}
