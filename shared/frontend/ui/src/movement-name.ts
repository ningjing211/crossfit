export function splitMovementName(name: string): { english: string; chinese: string } {
  const index = name.search(/\p{Script=Han}/u);
  if (index < 0) {
    return { english: name.trim(), chinese: '' };
  }
  const head = name.slice(0, index);
  const letter = head.match(/^(.*\S)\s+([A-Za-z])\s*$/);
  if (letter) {
    return { english: letter[1], chinese: `${letter[2]} ${name.slice(index).trim()}` };
  }
  return { english: head.trim(), chinese: name.slice(index).trim() };
}
