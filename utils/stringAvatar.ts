export function stringToAvatar(string: string) {
  let hash = 0;

  /* eslint-disable no-bitwise */
  for (let i = 0; i < string.length; i++) {
    hash = (hash << 5) + hash + string.charCodeAt(i);
  }
  /* eslint-enable no-bitwise */

  let red = (hash >> 16) & 0xff; // Extract red value
  let green = (hash >> 8) & 0xff; // Extract green value
  let blue = hash & 0xff; // Extract blue value

  // Reduce saturation while keeping some lightness
  red = Math.floor(red / 2) + 92;
  green = Math.floor(green / 2) + 92;
  blue = Math.floor(blue / 2) + 92;

  // Ensure values stay within 0-255 range
  red = Math.max(0, Math.min(255, red));
  green = Math.max(0, Math.min(255, green));
  blue = Math.max(0, Math.min(255, blue));

  // Convert to hex string with leading zeros
  const color =
    "#" +
    red.toString(16).padStart(2, "0") +
    green.toString(16).padStart(2, "0") +
    blue.toString(16).padStart(2, "0");

  // Split the string into words
  const words = string.split(" ");

  // Extract initials safely
  const initials =
    words.length > 1 ? `${words[0][0]}${words[1][0]}` : words[0][0];

  return {
    className: `bg-[${color}]`,
    children: initials,
  };
}
