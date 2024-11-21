export function uuid() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16),
  );
}

export function struct2dict(structure) {
  if (!Array.isArray(structure)) {
    return structure;
  }

  let result = {};
  structure.forEach((bone) => (result[bone[0]] = bone[1]));

  return result;
}
