const colors = [
  "bg-red-600",
  "bg-blue-600",
  "bg-green-600",
  "bg-yellow-600",
  "bg-purple-600",
  "bg-pink-600",
];

export function generateRandomString() {
  return Math.random().toString(36).substring(7) + Date.now().toString(36);
}

export function generateRandomColor() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return randomColor;
}
