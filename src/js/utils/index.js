export function parseCoords(coords, prefix = "") {
    return coords.map((n, i) => `${prefix}${"xyzw".charAt(i)}:${n}`).join("\t");
}