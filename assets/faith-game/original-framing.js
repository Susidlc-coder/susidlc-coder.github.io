// Nondestructive framing of the original photographs. The standard originals
// are 1350×1800; viewBox coordinates follow a clockwise turn. Card 9 instead
// uses the upright 1800×1350 IMG_9472 photograph with its complete phrase bank.
// Bounds retain the entire cardstock, including handwritten edge instructions.
// Individual polygon clips follow the cardstock corners and hide the table.
export const originalBounds = Object.freeze({
  start: [0.2244, 0.1154, 0.8756, 0.7840],
  1: [0.2111, 0.2130, 0.8778, 0.8757],
  2: [0.1978, 0.2380, 0.8622, 0.8994],
  3: [0.1756, 0.2367, 0.8467, 0.9172],
  4: [0.1689, 0.2360, 0.8378, 0.9260],
  5: [0.1667, 0.2440, 0.8356, 0.9112],
  6: [0.1289, 0.2337, 0.8044, 0.9172],
  7: [0.1733, 0.2426, 0.8489, 0.9172],
  8: [0.1689, 0.2337, 0.8444, 0.9172],
  9: [0.0100, 0.0215, 0.9078, 0.7719],
  10: [0.1711, 0.2515, 0.8467, 0.9231],
  11: [0.1778, 0.2396, 0.8467, 0.9112],
  12: [0.1622, 0.2396, 0.8356, 0.9083],
  13: [0.1644, 0.2485, 0.8400, 0.9172],
  14: [0.1267, 0.2337, 0.8022, 0.9172],
  15: [0.1756, 0.2456, 0.8422, 0.9172],
  16: [0.1578, 0.2337, 0.8244, 0.9260],
  17: [0.1356, 0.2396, 0.8133, 0.9201],
  18: [0.1422, 0.2485, 0.8133, 0.9201],
  19: [0.1844, 0.2337, 0.8578, 0.9290],
  20: [0.1644, 0.2396, 0.8400, 0.9290],
  21: [0.2000, 0.2396, 0.8756, 0.9083],
  22: [0.1844, 0.2515, 0.8622, 0.9142],
  23: [0.1689, 0.2456, 0.8444, 0.9260],
  24: [0.1600, 0.2485, 0.8311, 0.9290],
  amen: [0.2156, 0.2396, 0.8867, 0.9083],
});

export const originalCorners = Object.freeze({
  start: [[538,165.8],[1514,249.6],[1558,1044.5],[414,964.6]],
  1: [[442,309.5],[1454,297.6],[1566,1128.3],[390,1160.3]],
  2: [[426,341.5],[1446,341.5],[1538,1180.3],[366,1200.2]],
  3: [[378,353.5],[1398,329.5],[1510,1176.3],[326,1220.2]],
  4: [[354,369.5],[1370,333.5],[1494,1168.3],[314,1236.2]],
  5: [[378,349.5],[1394,345.5],[1490,1188.2],[310,1216.2]],
  6: [[302,353.5],[1330,325.5],[1430,1172.3],[242,1220.2]],
  7: [[386,353.5],[1406,337.5],[1514,1188.2],[322,1224.2]],
  8: [[374,349.5],[1394,325.5],[1506,1172.3],[318,1224.2]],
  9: [[67,31],[1291,52],[1345,994],[20,1039]],
  10: [[386,361.5],[1414,353.5],[1510,1196.2],[318,1228.2]],
  11: [[386,349.5],[1398,333.5],[1510,1176.3],[330,1216.2]],
  12: [[370,345.5],[1394,333.5],[1490,1176.3],[302,1212.2]],
  13: [[378,353.5],[1398,345.5],[1498,1188.2],[306,1224.2]],
  14: [[302,353.5],[1330,329.5],[1430,1172.3],[238,1224.2]],
  15: [[382,353.5],[1402,341.5],[1502,1188.2],[326,1224.2]],
  16: [[338,361.5],[1350,325.5],[1470,1164.3],[294,1236.2]],
  17: [[326,353.5],[1354,337.5],[1450,1184.2],[254,1224.2]],
  18: [[334,357.5],[1354,345.5],[1450,1196.2],[266,1228.2]],
  19: [[378,365.5],[1406,325.5],[1530,1172.3],[342,1240.2]],
  20: [[358,365.5],[1382,333.5],[1498,1180.3],[310,1240.2]],
  21: [[430,349.5],[1454,333.5],[1562,1176.3],[370,1212.2]],
  22: [[422,349.5],[1442,353.5],[1538,1204.2],[342,1216.2]],
  23: [[382,361.5],[1398,345.5],[1506,1196.2],[318,1236.2]],
  24: [[354,365.5],[1374,345.5],[1482,1192.2],[298,1240.2]],
  amen: [[466,349.5],[1486,333.5],[1582,1196.2],[402,1212.2]],
});

// Separate polygons retain the two white paper strips that extend beyond the
// blue cardstock, without including the surrounding table or adjacent cards.
export const extendedOriginalPhoto = Object.freeze({
  9: {
    source: 'IMG_9472.HEIC',
    asset: '/assets/faith-game/cards/9-expanded.jpg',
    width: 1800,
    height: 1350,
    orientation: 'upright',
    extraPolygons: [
      [[1029,749],[1364,800],[1352,861],[1023,824]],
      [[1330,885],[1631,929],[1630,976],[1325,951]],
    ],
  },
});

const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const round = value => Math.round(value * 100) / 100;

export function getOriginalFraming(cardId) {
  const id = cardId === 0 || cardId === '0' ? 'start' : String(cardId);
  const bounds = originalBounds[id];
  if (!bounds) throw new Error('Unknown original card photograph.');
  const [left, top, right, bottom] = bounds;
  const x = round(left * 1800), y = round(top * 1350);
  const width = round((right - left) * 1800), height = round((bottom - top) * 1350);
  const extended = extendedOriginalPhoto[id];
  return { id, x, y, width, height, viewBox: `${x} ${y} ${width} ${height}`,
    imageTransform: extended ? '' : 'translate(1800 0) rotate(90)',
    imageWidth: extended?.width || 1350, imageHeight: extended?.height || 1800,
    imageHref: extended?.asset || `/assets/faith-game/cards/${id}.jpg`,
  };
}

/** Place inside .original-frame.framed-photo; style the SVG width:100%;height:auto. */
export function originalPhotoMarkup(card, lang = 'es') {
  const frame = getOriginalFraming(card.id);
  const title = typeof card.title === 'object' ? card.title[lang] || card.title.es : card.title;
  const extended = extendedOriginalPhoto[frame.id];
  const label = `${title} · ${extended ? (lang === 'en' ? 'original handmade card with all prayer strips' : 'tarjeta original hecha a mano con todas las frases') : (lang === 'en' ? 'original handmade card' : 'tarjeta original hecha a mano')}`;
  const clipId = `original-card-cut-${frame.id}`;
  const polygons = [originalCorners[frame.id], ...(extended?.extraPolygons || [])].map(points => `<polygon points="${points.map(point => point.join(',')).join(' ')}"/>`).join('');
  return `<svg class="original-photo" xmlns="http://www.w3.org/2000/svg" viewBox="${frame.viewBox}" width="${frame.width}" height="${frame.height}" role="img" aria-label="${escape(label)}" preserveAspectRatio="xMidYMid meet" style="display:block;width:100%;height:auto;overflow:hidden"><title>${escape(label)}</title><defs><clipPath id="${clipId}" clipPathUnits="userSpaceOnUse">${polygons}</clipPath></defs><g clip-path="url(#${clipId})"><image href="${escape(frame.imageHref)}" x="0" y="0" width="${frame.imageWidth}" height="${frame.imageHeight}" transform="${frame.imageTransform}"/></g></svg>`;
}
