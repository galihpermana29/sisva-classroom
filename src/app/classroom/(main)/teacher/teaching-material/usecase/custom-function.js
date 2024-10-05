const colors = [
  "bg-red-200",
  "bg-blue-200",
  "bg-green-200",
  "bg-yellow-200",
  "bg-purple-200",
  "bg-pink-200",
];

export function generateRandomString() {
  return Math.random().toString(36).substring(7) + Date.now().toString(36);
}

export function generateRandomColor() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return randomColor;
}
