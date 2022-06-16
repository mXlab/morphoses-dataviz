export function parseCoords(coords, prefix = "") {
    return coords.map((n, i) => `${prefix}${"xyzw".charAt(i)}:${n}`).join("\t");
}

export function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}