module.exports = data => {
  return data
    .split("<polyline")
    .map(el => {
      const points = getPoints(el);
      const id = getId(el);

      if (!points || !id) return null;

      return {
        id,
        points: parsePoints(points),
        type: id.substring(0, 10) === 'id="fault-' ? "fault" : "layer"
      };
    })
    .filter(el => el);
};

function parsePoints(points) {
  const split = points.split(" ");
  const result = [];
  for (let i = 0; i < split.length - 1; i += 2) {
    result.push({
      x: removePreZeroes(split[i]),
      y: removePreZeroes(split[i + 1])
    });
  }
  return result;
}

function removePreZeroes(number) {
  if (number.length === 1) return Number(number);
  else if (number.substring(0, 1) === "0") {
    return removePreZeroes(number.substring(1));
  }
  return Number(number);
}

function getId(el) {
  const idStart = el.indexOf("id=");
  if (idStart === -1) return null;
  let idLength = 4;
  while (el[idStart + idLength] !== '"') {
    idLength += 1;
  }
  return el.substring(idStart + 4, idStart + idLength);
}

function getPoints(el) {
  const dStart = el.indexOf("points=");
  if (dStart === -1) return null;
  let dLength = 8;
  while (el[dStart + dLength] !== '"') {
    dLength += 1;
  }
  return el.substring(dStart + 8, dStart + dLength);
}
