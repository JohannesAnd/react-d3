const chronostrat = [
  { name: 'quaternary', age: [0, 2.588], color: '#fff673' },
  { name: 'neogene', age: [2.588, 23.03], color: '#ffd310' },
  { name: 'paleogene', age: [23.03, 66.0], color: '#ff8552' },
  { name: 'cretaceous', age: [66.0, 145], color: '#63ae53' },
  { name: 'jurrasic', age: [145, 201.3], color: '#0096d5' },
  { name: 'triassic', age: [201.3, 252.2], color: '#63347c' },
  { name: 'permian', age: [252.2, 298.9], color: '#dd4530' },
  { name: 'carboniferous', age: [298.9, 358.9], color: '#218e93' }
].reduce((acc, el) => {
  acc[el.name] = { age: el.age, color: el.color };
  return acc;
}, {});

module.exports = data => {
  return [].concat(
    ...data.svg.g.g.map(group => {
      const polylines = (group.polyline || []).map(line => {
        return {
          id: line.id,
          points: parsePoints(line.points),
          fill: line.fill || 'none',
          stroke: line.stroke || 'black',
          type: line.id.substring(0, 5) === 'fault' ? 'fault' : 'layer'
        };
      });
      const lines = (group.line || []).map(line => {
        return {
          id: line.id,
          points: parseLine(line.x1, line.x2, line.y1, line.y2),
          fill: line.fill || 'none',
          stroke: line.stroke || 'black',
          type: line.id.substring(0, 5) === 'fault' ? 'fault' : 'layer'
        };
      });

      return lines.concat(polylines);
    })
  );
};

function parseLine(x1, x2, y1, y2) {
  return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
}

function parsePoints(points, extra = {}) {
  const split = points.split(' ');
  const result = [];
  for (let i = 0; i < split.length - 1; i += 2) {
    result.push(
      Object.assign(Object.assign({}, extra), {
        x: removePreZeroes(split[i]),
        y: removePreZeroes(split[i + 1])
      })
    );
  }
  return result;
}

function removePreZeroes(number) {
  if (number.length === 1) return Number(number);
  else if (number.substring(0, 1) === '0') {
    return removePreZeroes(number.substring(1));
  }
  return Number(number);
}

function getId(el) {
  const idStart = el.indexOf('id=');
  if (idStart === -1) return null;
  let idLength = 4;
  while (el[idStart + idLength] !== '"') {
    idLength += 1;
  }
  return el.substring(idStart + 4, idStart + idLength);
}

function getPoints(el) {
  const dStart = el.indexOf('points=');
  if (dStart === -1) return null;
  let dLength = 8;
  while (el[dStart + dLength] !== '"') {
    dLength += 1;
  }
  return el.substring(dStart + 8, dStart + dLength);
}
