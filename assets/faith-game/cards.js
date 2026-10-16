// Transcribed from Susi's handmade cards; Spanish is a faithful translation.
// Evidence, uncertainties and implementation-only rules are in content-notes.json.
const t = (es, en) => ({ es, en });
const palettes = {
  red: ['#ff5360', '#e52745'], white: ['#fbfbf5', '#83c6b2'],
  lime: ['#b0f24c', '#75cb65'], blue: ['#65b8f1', '#3c8dd4'],
  orange: ['#ffbd59', '#ec9b46'], gold: ['#e6cd78', '#b39337'],
  yellow: ['#d8ef55', '#a9c34a'],
};
const card = (id, title, type, paper, body, extra = {}) => ({
  id, number: typeof id === 'number' && id > 0 ? id : null,
  title, subtitle: t('', ''), type, paper,
  color: palettes[paper][0], accent: palettes[paper][1],
  stickers: [], decorations: [], body,
  photo: `assets/cards/${id === 0 ? 'start' : id}.jpg`,
  ...extra,
});
const categories = [
  { id: 'self', label: t('YO', 'SELF') },
  { id: 'spirit', label: t('ESPÍRITU SANTO', 'HOLY SPIRIT') },
  { id: 'evil', label: t('MAL', 'EVIL') },
];
const fillInstructions = t('Toca las palabras en orden. Cada una llena el siguiente espacio.', 'Tap the words in order. Each one fills the next blank.');
const fill = (segments, answers, confirmed = true) => ({ segments, answers, words: answers, confirmed });

export const cards = [
  card(0, t('ÉL HA RESUCITADO', 'HE IS RISEN'), 'reward', 'yellow',
    t('Da gracias a Dios con tus propias palabras:', 'Thank God in your own words:'), {
      subtitle: t('TU RECOMPENSA', 'YOUR REWARD'),
      activity: { prompt: t('Da gracias a Dios con tus propias palabras.', 'Thank God in your own words.'), optional: false },
    }),
  card(1, t('Y no nos dejes caer en la tentación', 'And lead us NOT into temptation'), 'reflection', 'red',
    t('Le pedimos a Dios que nos ayude a reconocer pronto ese pequeño susurro, que nos dé valor para DETENERNOS, RESPIRAR y ELEGIR lo correcto, incluso cuando nadie nos ve.\n\nDios, ayúdame a escuchar cuando me adviertes por dentro.',
      'We’re asking God to help us notice that small whisper early, to give us courage to STOP, to BREATHE, and to CHOOSE what’s right even when no one’s watching.\n\nGod, help me listen when You warn me inside.'),
    { decorations: ['white-prayer-strip'], prayer: t('Dios, ayúdame a escuchar cuando me adviertes por dentro.', 'God, help me listen when You warn me inside.') }),
  card(2, t('Génesis', 'Genesis'), 'fill', 'white', fillInstructions, {
    subtitle: t('Parte 1', 'Part 1'), decorations: ['envelope-heart'],
    activity: fill(t([
      'Adán y {0} eran felices en el jardín de Dios.',
      'Satanás los {1}.',
      'Adán y {2} dañaron su {3} con Dios cuando pecaron.',
      'Desde entonces, todas las personas nacen con {4}.',
      'Pero Dios prometió un {5} para ayudarnos.',
      'Esta persona es {6}.',
    ], [
      'Adam and {0} were happy in God’s garden.',
      'Satan {1} them.',
      'Adam and {2} hurt their {3} with God when they sinned.',
      'Ever since, all people are born with {4}.',
      'But God promised a {5} to help us.',
      'This person is {6}.',
    ]), t(['Eva', 'tentó', 'Eva', 'amistad', 'pecado original', 'Salvador', 'Jesús'], ['Eve', 'Tempted', 'Eve', 'friendship', 'Original Sin', 'Savior', 'Jesus']), true),
  }),
  card(3, t('Y perdona nuestras ofensas', 'And forgive us our trespasses'), 'reflection', 'red',
    t('Perdonar no significa fingir que no dolió. Perdonar significa dejar que Dios nos ayude para que el dolor no se convierta en odio.\n\nDios nos perdona incluso cuando cometemos grandes errores.',
      'Forgiveness doesn’t mean pretending it didn’t hurt. Forgiveness means letting God help us so the hurt doesn’t turn into hate.\n\nGod forgives us even when we make big mistakes.')),
  card(4, t('¡Discernimiento!', 'Discernment!'), 'classify', 'white',
    t('', ''), { stickers: ['💡'], decorations: ['bulb'], activity: {
      categories,
      items: [
        { id: 'self-dinner', text: t('¿Qué vamos a cenar?', 'What are we having for dinner?'), category: 'self' },
        { id: 'self-pizza', text: t('Quiero pizza para cenar.', 'I want pizza for dinner.'), category: 'self' },
        { id: 'self-game', text: t('Voy a jugar después de hacer la tarea.', 'I will play a game after homework.'), category: 'self' },
        { id: 'spirit-morning', text: t('Siempre rezo por la mañana y por la noche.', 'I pray always in the morning and night.'), category: 'spirit' },
        { id: 'spirit-meal', text: t('Reza antes de comer.', 'Pray before you eat.'), category: 'spirit' },
        { id: 'spirit-bed', text: t('Reza antes de acostarte.', 'Pray before you go to bed.'), category: 'spirit' },
        { id: 'evil-boring', text: t('Nunca reces; es aburrido.', 'Never pray, it is boring.'), category: 'evil' },
        { id: 'evil-love', text: t('Dios nunca te ama.', 'God never loves you.'), category: 'evil' },
        { id: 'evil-listen', text: t('Dios nunca te escucha.', 'God never listens to you.'), category: 'evil' },
      ],
    } }),
  card(5, t('En la tierra como en el cielo', 'On Earth as it is in Heaven'), 'reflection', 'white',
    t('En el cielo todo sigue el orden perfecto de Dios. Estamos llamados a traer esa misma paz y armonía a la tierra.',
      'In Heaven everything follows God’s perfect order. We’re called to bring that same peace and harmony to Earth.'), {
      move: { to: 'amen' }, action: t('Ve a la zona AMÉN.', 'Go to the AMEN zone.'),
    }),
  card(6, t('Tentación', 'Temptation'), 'temptation', 'red',
    t('Querer dejar de ser amigo de alguien que te lastimó y decidir que NUNCA lo perdonarás.',
      'Wanting to stop being friends with someone who hurt you, and deciding you’ll NEVER forgive them.'), {
      decorations: ['fashion-portrait'], move: { to: 3 }, action: t('Retrocede a la casilla 3.', 'Step back to #3.'),
    }),
  card(7, t('Como también nosotros perdonamos a los que nos ofenden', 'As we forgive those who trespass against us'), 'reflection', 'red',
    t('Dios, dame fuerza para perdonar\ny seguir adelante\ncon AMOR.',
      'God, give me strength to forgive\nand move forward\nwith LOVE.'),
    { decorations: ['three-white-strips'] }),
  card(8, t('Tentación', 'Temptation'), 'temptation', 'red',
    t('Saber que algo está mal, pero querer hacerlo de todos modos porque nadie lo verá.',
      'Knowing something is wrong but wanting to do it anyway because no one will see.'), {
      decorations: ['jewelry-collage'], move: { to: 1 }, action: t('Retrocede a la casilla 1.', 'Step back to #1.'),
    }),
  card(9, t('Ave María', 'Hail Mary'), 'order', 'blue',
    t('Toca las frases en el orden de la oración.', 'Tap the phrases in prayer order.'), {
      decorations: ['white-word-pieces', 'envelope-heart'],
      move: { to: 19, condition: 'complete' },
      action: t('Completa la oración y sube a la casilla 19.', 'Complete the prayer and climb to #19.'),
      activity: {
        items: t([
          'Dios te salve, María, llena eres de', 'gracia; el Señor', 'es contigo.',
          'Bendita tú eres', 'entre todas las mujeres', 'y bendito es el',
          'fruto de tu vientre,', 'Jesús. Santa María,', 'Madre de Dios,',
          'ruega por nosotros, pecadores,', 'ahora y en la', 'hora de nuestra', 'muerte. Amén.',
        ], [
          'Hail Mary full of', 'grace the Lord', 'is with thee.',
          'Blessed art thou', 'amongst women', 'and blessed is the',
          'fruit of thy womb', 'Jesus. Holy Mary', 'Mother of God',
          'pray for us sinners', 'now and at the', 'hour of our', 'death. Amen',
        ]),
        solution: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
    }),
  card(10, t('Padre nuestro', 'Our Father'), 'reflection', 'lime',
    t('Dios no está distante. Él es nuestro Padre amoroso y nosotros somos Sus hijos.',
      'God is not distant. He’s our loving Father, and we are His children.'), {
      move: { to: 17 }, action: t('Avanza a la casilla 17.', 'Move up to #17.'),
    }),
  card(11, t('La vida de Jesús', 'Jesus’ Life'), 'fill', 'white', fillInstructions, {
    subtitle: t('Parte 1', 'Part 1'), stickers: ['💡'], decorations: ['bulb', 'envelope-heart'],
    activity: fill(t([
      'El {0} le dijo a María que sería la madre de Jesús.',
      '{1} dijo «¡Sí!» y confió en el plan de Dios.',
      'Cuando Jesús tenía 12 años, habló con los maestros en el {2}.',
      'Más tarde, Jesús comenzó a enseñar sobre {3}.',
      'Eligió {4} para que lo ayudaran.',
    ], [
      'The {0} told Mary she would be the mother of Jesus.',
      '{1} said “Yes!” and trusted God’s plan.',
      'When Jesus was 12, He spoke with teachers in the {2}.',
      'Later, Jesus began to teach about {3}.',
      'He chose {4} to help Him.',
    ]), t(['ángel Gabriel', 'María', 'templo', 'el amor de Dios', 'discípulos'], ['angel Gabriel', 'Mary', 'temple', 'God’s Love', 'disciples'])),
  }),
  card(12, t('Santificado sea Tu nombre', 'Hallowed be Thy Name'), 'reflection', 'orange',
    t('Que Tu nombre sea santificado.\n\nDios, Tú estás por encima de todas las cosas y quiero mantener santo Tu nombre en todo lo que hago.',
      'May Your name be kept holy.\n\nGod, You are above all things, and I want to keep Your name holy in everything I do.'), {
      stickers: ['💡'], decorations: ['bulb', 'purple-underline'],
    }),
  card(13, t('Tentación', 'Temptation'), 'temptation', 'red',
    t('Pensar que eres mejor que alguien que cometió un error. «Yo soy el bueno. Yo nunca haría eso».',
      'Thinking you’re better than someone who messed up. “I’m the good one. I’d never do that.”'), {
      decorations: ['fashion-lounge'], move: { to: 7 }, action: t('Retrocede a la casilla 7.', 'Step back to #7.'),
    }),
  card(14, t('Y líbranos del mal', 'But deliver us from evil'), 'reflection', 'lime',
    t('Dios, ayúdame a seguir Tu camino y protégeme cuando algo intente apartarme de él.',
      'God, help me follow Your way, and keep me safe when something tries to pull me away from it.'), {
      move: { to: 22 }, action: t('Avanza a la casilla 22.', 'Move up to #22.'),
    }),
  card(15, t('Sacramentos', 'Sacraments'), 'match', 'white',
    t('Toca un sacramento y luego la gracia que le corresponde.', 'Tap a sacrament, then tap its matching grace.'), {
      subtitle: t('', ''), stickers: ['💡'], decorations: ['bulb'], activity: {
        pairs: [
          { id: 'baptism', left: t('Bautismo', 'Baptism'), right: t('Vida nueva', 'New Life') },
          { id: 'confession', left: t('Confesión', 'Confession'), right: t('Reconciliación', 'Reconciled') },
          { id: 'eucharist', left: t('Eucaristía', 'Eucharist'), right: t('Alimento', 'Nourished') },
          { id: 'confirmation', left: t('Confirmación', 'Confirmation'), right: t('Fortaleza', 'Strength') },
        ],
      },
    }),
  card(16, t('Génesis', 'Genesis'), 'fill', 'white', fillInstructions, {
    subtitle: t('Parte 2', 'Part 2'), stickers: ['💡', '🐘', '🐑', '⭐'],
    decorations: ['bulb', 'elephant', 'sheep', 'turtle', 'butterfly', 'stars', 'envelope-heart'],
    activity: fill(t([
      'Dios hizo la {0} y la separó de la oscuridad.',
      'Dios hizo el {1} sobre las aguas.',
      'Dios hizo la {2} y todas las {3} que crecen en ella.',
      'Dios hizo el {4}, la {5} y las {6} para dar luz.',
      'Dios llenó los mares de {7} y el cielo de {8}.',
      'Dios hizo a los {9} a Su imagen.',
      'Dios {10} después de todo Su trabajo.',
    ], [
      'God made {0} and separated it from darkness.',
      'God made the {1} above the waters.',
      'God made {2} and all the {3} that grow on it.',
      'God made the {4}, {5} and {6} to give light.',
      'God filled the seas with {7} and the sky with {8}.',
      'God made {9} in His image.',
      'God {10} after all His work.',
    ]), t(['luz', 'cielo', 'tierra', 'plantas', 'sol', 'luna', 'estrellas', 'peces', 'aves', 'seres humanos', 'descansó'], ['light', 'sky', 'land', 'plants', 'Sun', 'Moon', 'stars', 'fish', 'birds', 'humans', 'rested'])),
  }),
  card(17, t('Que estás en el cielo', 'Who art in Heaven'), 'reflection', 'lime',
    t('Dios está por encima de todas las cosas, y todo lo bueno viene de Él.',
      'God is above all things, and everything good comes from Him.'), {
      move: { to: 12 }, action: t('Teletranspórtate a la casilla 12.', 'Teleport to #12.'),
    }),
  card(18, t('La vida de Jesús', 'Jesus’ Life'), 'fill', 'white', fillInstructions, {
    subtitle: t('Parte 2', 'Part 2'), stickers: ['💡'], decorations: ['bulb', 'envelope-heart'],
    activity: fill(t([
      'Jesús comenzó a enseñar a la gente sobre el amor de Dios y realizó muchos {0}.',
      'Algunos líderes se enojaron y querían que Él y Sus {1} se detuvieran.',
      'Jesús fue arrestado y murió en la {2} para salvarnos.',
      'Su cuerpo fue colocado en una {3} con una gran piedra.',
      'Al tercer día, la piedra fue retirada. ¡Jesús había {4}!',
    ], [
      'Jesus began to teach people about God’s love and performed many {0}.',
      'Some leaders became angry and wanted Him and His {1} to stop.',
      'Jesus was arrested and died on the {2} to save us.',
      'His body was placed in a {3} with a large stone.',
      'On the third day, the stone was rolled away. Jesus had {4}!',
    ]), t(['milagros', 'discípulos', 'cruz', 'tumba', 'resucitado'], ['miracles', 'disciples', 'cross', 'tomb', 'Risen'])),
  }),
  card(19, t('Discernimiento', 'Discernment'), 'examples', 'blue',
    t('Escribe un pensamiento en cada espacio: uno tuyo, uno del Espíritu Santo y uno del mal.', 'Write one thought in each space: one of your own, one from the Holy Spirit, and one from evil.'), {
      subtitle: t('', ''), stickers: ['💡'], decorations: ['bulb'],
      activity: { categories, perCategory: 1, review: 'personal-writing' },
    }),
  card(20, t('Danos hoy nuestro pan de cada día', 'Give us this day our daily bread'), 'reflection', 'red',
    t('Dios, ayúdame a reconocer todo lo bueno que TÚ nos das cada día.',
      'God, help me notice all the good YOU provide every day.'),
    { decorations: ['white-prayer-strip'] }),
  card(21, t('Santísima Trinidad', 'Holy Trinity'), 'info', 'orange',
    t('Tres figuras diferentes, una misma Luz.', 'Three different figures, one same Light.'), {
      stickers: ['☀️', '✝️', '🕊️'], decorations: ['trinity-triangle', 'sun', 'cross', 'dove'],
      diagram: { top: t('Padre', 'Father'), left: t('Hijo', 'Son'), right: t('Espíritu Santo', 'Holy Spirit') },
    }),
  card(22, t('Hágase Tu voluntad', 'Thy will be done'), 'reflection', 'lime',
    t('Confía en que Dios ve el panorama completo.\n\nDios, no entiendo, pero CONFÍO en Ti.',
      'Trust that God sees the whole picture.\n\nGod, I don’t understand, but I TRUST You.'),
    { decorations: ['outlined-trust'] }),
  card(23, t('Tentación', 'Temptation'), 'temptation', 'red',
    t('Querer más de lo que necesitas. Ya tienes suficiente comida, juguetes o atención, pero todavía quieres más solo para sentirte satisfecho o importante.',
      'Wanting more than you need. You already have enough food, toys, or attention, but you still want more just to feel satisfied or important.'), {
      decorations: ['fashion-accessories'], move: { to: 20 }, action: t('Retrocede a la casilla 20.', 'Step back to #20.'),
    }),
  card(24, t('Venga a nosotros Tu reino', 'Thy Kingdom Come'), 'reflection', 'white',
    t('Cada vez que elegimos amar, compartir o perdonar, Su reino crece a través de nosotros.\n\nDios, deja que Tu amor reine en mí, para que Tu reino pueda brillar a través de mí.',
      'Every time we choose love, to share, or forgive, His Kingdom grows through us.\n\nGod, let Your love rule in me, so Your Kingdom can shine through me.'), {
      stickers: ['♥', '♥', '☁'], decorations: ['foil-hearts', 'cloud'],
      move: { to: 'amen' }, action: t('Ve a la zona AMÉN.', 'Go to the AMEN zone.'),
    }),
  card('amen', t('AMÉN', 'AMEN'), 'amen', 'gold', t('Que así sea.', 'Let it be done.'), {
    subtitle: t('Santos por descubrir', 'Saints to discover'), decorations: ['black-dashed-line'],
    rule: t('Descubre un santo y sigue jugando. Ir abre la fuente del Vaticano.', 'Discover a saint, then keep playing. Go opens the Vatican source.'),
  }),
];

export const cardsById = Object.fromEntries(cards.map((entry) => [entry.id, entry]));
export const gameRules = {
  start: 0,
  singleSpecialMovePerTurn: true,
  activateDestinationAfterSpecialMove: [1,3,7,12,19,20],
  amenSkipTurns: 0,
  rewardCard: 0,
  // This is an implementation choice for the preview, not printed on the cards.
  finishAfter: 24,
};
