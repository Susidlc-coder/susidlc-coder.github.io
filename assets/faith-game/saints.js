// A curated collection, not a complete liturgical calendar. All sources and
// unaltered portraits were checked against Vatican News on 13 October 2026.
// The facts are original paraphrases; the images retain their source credits.
export const saints = [
  {
    id: 'therese',
    name: { es: 'Santa Teresita del Niño Jesús', en: 'Saint Thérèse of the Child Jesus' },
    feastMonth: 10,
    feastDay: 1,
    headline: { es: 'Un amor que cabe en lo pequeño', en: 'Love in the smallest things' },
    fact: {
      es: 'Teresita entró en el Carmelo de Lisieux a los quince años. Su pequeño camino proponía amar a Dios mediante los gestos cotidianos, incluso los que parecen insignificantes. Aconsejada por su superiora, comenzó a escribir sobre su vida interior: esas páginas permitirían conocer la profundidad espiritual de una joven que murió a los veinticuatro años.',
      en: 'Thérèse entered the Carmel of Lisieux at fifteen. Her little way placed love for God in everyday gestures, including those that seem insignificant. Encouraged by her superior, she began writing about her inner life. Those pages would reveal the spiritual depth of a young woman who died at only twenty-four.'
    },
    source: {
      es: 'https://www.vaticannews.va/es/santos/10/01/s--teresa-del-nino-jesus--virgen-carmelita--doctora-de-la-iglesi.html',
      en: 'https://www.vaticannews.va/en/saints/10/01/st--therese-of-the-child-jesus--carmelite---virgin-doctor-of-the.html'
    },
    image: '/assets/faith-game/saints/therese.jpg',
    imageSource: 'https://www.vaticannews.va/content/dam/vaticannews/santi/20171201_%C3%96kumenisches%20Heiligenlexikon_otto%20anni_TERESA%20DI%20LISIEUX.jpg/_jcr_content/renditions/cq5dam.thumbnail.cropped.1500.844.jpeg',
    imageAlt: { es: 'Fotografía de Teresita durante su infancia, publicada por Vatican News', en: 'Childhood photograph of Thérèse, published by Vatican News' },
    imagePosition: '50% 50%',
    attribution: 'Joachim Schäfer · Ökumenisches Heiligenlexikon · Vatican News'
  },
  {
    id: 'francis',
    name: { es: 'San Francisco de Asís', en: 'Saint Francis of Assisi' },
    feastMonth: 10,
    feastDay: 4,
    headline: { es: 'Una Navidad que se volvió escena', en: 'A Christmas brought to life' },
    fact: {
      es: 'En la Navidad de 1223, Francisco representó en Greccio el nacimiento de Jesús con un pesebre viviente. Vatican News lo presenta como una expresión de su amor por Cristo. Esa misma vida de alabanza inspiró el Cántico del Hermano Sol, que escribió cuando la enfermedad lo mantenía postrado.',
      en: 'At Christmas in 1223, Francis brought the birth of Jesus to life with a living Nativity at Greccio. Vatican News describes it as an expression of his love for Christ. His life of praise also inspired the Canticle of Brother Sun, which he wrote while confined by illness.'
    },
    source: {
      es: 'https://www.vaticannews.va/es/santos/10/04/s--francisco-de-asis--fundador-de-la-orden-franciscana--patron-d.html',
      en: 'https://www.vaticannews.va/en/saints/10/04/st--francis-of-assisi--founder-of-the-franciscan--order--patron-.html'
    },
    image: '/assets/faith-game/saints/francis.jpg',
    imageSource: 'https://www.vaticannews.va/content/dam/vaticannews/santi/20170818_MV_Inv%2040002%20IFC%202_FRANCESCO%20D%27ASSISI.jpg/_jcr_content/renditions/cq5dam.thumbnail.cropped.1500.844.jpeg',
    imageAlt: { es: 'Pintura de san Francisco de Asís con un libro, de los Museos Vaticanos', en: 'Painting of Saint Francis of Assisi holding a book, from the Vatican Museums' },
    imagePosition: '50% 50%',
    attribution: '© Musei Vaticani · Vatican News'
  },
  {
    id: 'teresa',
    name: { es: 'Santa Teresa de Jesús', en: 'Saint Teresa of Ávila' },
    feastMonth: 10,
    feastDay: 15,
    headline: { es: 'La oración también encontró poesía', en: 'Prayer found a voice in poetry' },
    fact: {
      es: 'Teresa tenía un carácter alegre y disfrutaba de la música, la poesía, la lectura y la escritura. Esa facilidad con las palabras acompañó su vida de oración: relató su experiencia espiritual en una autobiografía, cartas y otros textos. Vatican News destaca la claridad y la fuerza poética de sus escritos místicos.',
      en: 'Teresa had a cheerful personality and loved music, poetry, reading and writing. Her gift with words accompanied her life of prayer: she described her spiritual experiences in an autobiography, letters and other works. Vatican News highlights the clarity and poetic power of the mystical writings that grew from her inner life.'
    },
    source: {
      es: 'https://www.vaticannews.va/es/santos/10/15/s--teresa-de-jesus--virgen--doctora-de-la-iglesia--carmelita-des.html',
      en: 'https://www.vaticannews.va/en/saints/10/15/st--theresa-of-jesus--virgin--doctor-of-the-church--discalced-ca.html'
    },
    image: '/assets/faith-game/saints/teresa.jpg',
    imageSource: 'https://www.vaticannews.va/content/dam/vaticannews/santi/20171201_%C3%96kumenisches%20Heiligenlexikon_Anonimo_TERESA%20DI%20AVILA.jpg/_jcr_content/renditions/cq5dam.thumbnail.cropped.1500.844.jpeg',
    imageAlt: { es: 'Retrato pintado de santa Teresa de Jesús con hábito carmelita', en: 'Painted portrait of Saint Teresa of Ávila in a Carmelite habit' },
    imagePosition: '50% 50%',
    attribution: 'Joachim Schäfer · Ökumenisches Heiligenlexikon · Vatican News'
  },
  {
    id: 'ignatius',
    name: { es: 'San Ignacio de Antioquía', en: 'Saint Ignatius of Antioch' },
    feastMonth: 10,
    feastDay: 17,
    headline: { es: 'Siete cartas desde el camino', en: 'Seven letters from the journey' },
    fact: {
      es: 'De Ignacio de Antioquía conservamos siete cartas, escritas después de su arresto mientras lo llevaban de Antioquía a Roma. Son una ventana a la vida y la fe de las primeras comunidades cristianas. En medio de ese viaje como prisionero, el obispo seguía comunicándose con los creyentes a través de la escritura.',
      en: 'Seven letters survive from Ignatius of Antioch, written after his arrest while he was being taken from Antioch to Rome. They offer a window into the life and faith of the earliest Christian communities. In the midst of his journey as a prisoner, the bishop kept communicating with believers through his writing.'
    },
    source: {
      es: 'https://www.vaticannews.va/es/santos/10/17/s--ignacio-de-antioquia--obispo--martir-a-roma.html',
      en: 'https://www.vaticannews.va/en/saints/10/17/st--ignatius-of-antioch--bishop--martyr-in-rome.html'
    },
    image: '/assets/faith-game/saints/ignatius.jpg',
    imageSource: 'https://www.vaticannews.va/content/dam/vaticannews/santi/20181017_Wikimedia%20Commons_Pushkin%20museum_sec.%20XVII_IGNAZIO%20DI%20ANTIOCHIA.jpg/_jcr_content/renditions/cq5dam.thumbnail.cropped.1500.844.jpeg',
    imageAlt: { es: 'Icono del siglo XVII de san Ignacio de Antioquía, publicado por Vatican News', en: 'Seventeenth-century icon of Saint Ignatius of Antioch, published by Vatican News' },
    imagePosition: '50% 50%',
    attribution: 'Vatican News · Wikimedia Commons / Pushkin Museum · XVII'
  },
  {
    id: 'john-paul',
    name: { es: 'San Juan Pablo II', en: 'Saint John Paul II' },
    feastMonth: 10,
    feastDay: 22,
    headline: { es: 'Una vocación que creció en secreto', en: 'A calling that grew in secret' },
    fact: {
      es: 'Antes de ser papa, Karol Wojtyła trabajó en una cantera y después en una fábrica química durante la ocupación nazi de Polonia. Se preparó para el sacerdocio en el seminario clandestino de Cracovia. Tras la guerra continuó sus estudios y fue ordenado sacerdote en 1946.',
      en: 'Before becoming pope, Karol Wojtyła worked in a stone quarry and then a chemical factory during the Nazi occupation of Poland. He prepared for the priesthood in Kraków’s clandestine seminary. After the war, he continued his studies and was ordained a priest in 1946.'
    },
    source: {
      es: 'https://www.vaticannews.va/es/santos/10/22/s--juan-pablo-ii--papa.html',
      en: 'https://www.vaticannews.va/en/saints/10/22/st--john-paul--ii--pope.html'
    },
    image: '/assets/faith-game/saints/john-paul.jpg',
    imageSource: 'https://www.vaticannews.va/content/dam/vaticannews/santi/20191011_Basilica-di-san-Paolo-fuori-le-mura_medaglioni-papi_GIOVANNI-PAOLO-II.jpg/_jcr_content/renditions/cq5dam.thumbnail.cropped.1500.844.jpeg',
    imageAlt: { es: 'Medallón de san Juan Pablo II en la Basílica de San Pablo Extramuros', en: 'Medallion of Saint John Paul II in the Basilica of Saint Paul Outside the Walls' },
    imagePosition: '50% 50%',
    attribution: 'Vatican News · Basilica di San Paolo fuori le mura'
  },
  {
    id: 'simon-jude',
    name: { es: 'Santos Simón y Judas Tadeo', en: 'Saints Simon and Jude Thaddeus' },
    feastMonth: 10,
    feastDay: 28,
    headline: { es: 'Dos caminos que la tradición reúne', en: 'Two journeys remembered together' },
    fact: {
      es: 'Simón y Judas Tadeo comparten su celebración el 28 de octubre. Según la tradición que recoge Vatican News, sus caminos se encontraron en la antigua Persia, donde anunciaron juntos el Evangelio y sufrieron el martirio. La misma reseña señala que sus reliquias se custodian en la Basílica de San Pedro.',
      en: 'Simon and Jude Thaddeus share a feast on October 28. According to the tradition recounted by Vatican News, their paths met in ancient Persia, where they proclaimed the Gospel together and suffered martyrdom. The same account notes that their relics are kept in Saint Peter’s Basilica.'
    },
    source: {
      es: 'https://www.vaticannews.va/es/santos/10/28/ss--simone-y-judas--tadeo---apostoles.html',
      en: 'https://www.vaticannews.va/en/saints/10/28/sts--simon-and-jude--taddeo---apostles.html'
    },
    image: '/assets/faith-game/saints/jude.jpg',
    imageSource: 'https://www.vaticannews.va/content/dam/vaticannews/santi/20170818_MV_Inv%2064647%20IFC_GIUDA%20TADDEO.jpg/_jcr_content/renditions/cq5dam.thumbnail.cropped.1500.844.jpeg',
    imageAlt: { es: 'Relieve de los santos Simón y Judas Tadeo publicado por Vatican News', en: 'Relief of Saints Simon and Jude Thaddeus published by Vatican News' },
    imagePosition: '50% 50%',
    attribution: '© Musei Vaticani · Vatican News'
  }
];

export const saintCatalogInfo = {
  checkedOn: '2026-10-13',
  publisher: 'Vatican News',
  completeCalendar: false,
  sourceLabel: { es: 'Vatican News · Santo del día', en: 'Vatican News · Saint of the day' },
  coverage: {
    es: 'Selección de seis celebraciones de octubre. Fuera de esas fechas se presenta una figura del mes o un santo por descubrir.',
    en: 'A selection of six October celebrations. On other dates, a saint from the month or a saint to discover is presented.'
  }
};

const mod = (n, size) => ((n % size) + size) % size;

function calendarDate(value, timeZone) {
  // An explicit calendar date must not shift to the previous day in Pacific time.
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split('-').map(Number);
    const check = new Date(Date.UTC(year, month - 1, day));
    if (check.getUTCFullYear() !== year || check.getUTCMonth() + 1 !== month || check.getUTCDate() !== day) {
      throw new RangeError('Invalid saint calendar date');
    }
    return { year, month, day };
  }
  const date = value instanceof Date ? value : new Date(value);
  if (!Number.isFinite(date.getTime())) throw new RangeError('Invalid saint calendar date');
  const parts = new Intl.DateTimeFormat('en-US', { timeZone, year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(date);
  return Object.fromEntries(parts.filter(part => ['year', 'month', 'day'].includes(part.type)).map(part => [part.type, Number(part.value)]));
}

/** Rotate through the whole verified collection, prioritising today's saint once.
 * Only kind === 'day' claims that the selected saint is celebrated today.
 * The previous card can be excluded across reloads, date changes and gallery use.
 */
export function selectSaint(date = new Date(), rotation = 0, { timeZone = 'America/Los_Angeles', previousSaintId = null } = {}) {
  const { year, month, day } = calendarDate(date, timeZone);
  const step = Number.isFinite(rotation) ? Math.trunc(rotation) : 0;
  const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const daily = saints.filter(saint => saint.feastMonth === month && saint.feastDay === day);
  const monthly = saints.filter(saint => saint.feastMonth === month);
  const pool = [...daily, ...monthly.filter(saint => !daily.includes(saint)), ...saints.filter(saint => !monthly.includes(saint))];
  const dayIndex = Math.floor(Date.UTC(year, month - 1, day) / 86400000);
  const offset = daily.length ? 0 : monthly.length ? day - 1 : dayIndex;
  let index = mod(offset + step, pool.length);
  if (pool.length > 1 && pool[index].id === previousSaintId) index = mod(index + 1, pool.length);
  const saint = pool[index];
  if (saint.feastMonth === month && saint.feastDay === day) {
    return { saint, kind: 'day', label: { es: 'Santoral de hoy', en: 'Today’s saint' }, dateKey };
  }
  if (saint.feastMonth === month) {
    const displayDate = new Date(Date.UTC(year, month - 1, 15, 12));
    const monthEs = new Intl.DateTimeFormat('es', { month: 'long', timeZone: 'UTC' }).format(displayDate);
    const monthEn = new Intl.DateTimeFormat('en', { month: 'long', timeZone: 'UTC' }).format(displayDate);
    return { saint, kind: 'month', label: { es: `Santos de ${monthEs}`, en: `${monthEn} saints` }, dateKey };
  }
  return { saint, kind: 'discovery', label: { es: 'Un santo por descubrir', en: 'A saint to discover' }, dateKey };
}
