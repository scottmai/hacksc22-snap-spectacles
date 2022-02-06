global.languages = {
  english: ['Alarm clock', 'Apple', 'Arm', 'Bagel', 'Banana', 'Bathtub', 'Bed', 'Belt', 'Bicycle', 'Book', 'Bookcase', 'Boot', 'Bowl', 'Box', 'Calculator', 'Candle', 'Car', 'Cat', 'Chair', 'Clock', 'Coin', 'Computer keyboard', 'Cookie', 'Dog', 'Door', 'Egg (Food)', 'Flower', 'Foot', 'Fork', 'Guitar', 'Hand', 'Hat', 'Headphones', 'Lamp', 'Laptop', 'Microwave oven', 'Milk', 'Mobile phone', 'Paper towel', 'Pen', 'Pizza', 'Scissors', 'Sock', 'Stairs', 'Suit', 'Suitcase', 'Sunglasses', 'Table', 'Table tennis racket', 'Tennis ball', 'Tennis racket', 'Toilet paper', 'Tree', 'Violin', 'Zucchini'],
  spanish: ['Despertador', 'manzana', 'Brazo', 'Rosquilla', 'Pl?tano', 'Ba?era', 'Cama', 'Cintur?n', 'Bicicleta', 'Libro', 'Librero', 'Bota', 'cuenco', 'Caja', 'Calculadora', 'Vela', 'Carro', 'Gato', 'Silla', 'Reloj', 'Moneda', 'Teclado', 'Galleta', 'Perro', 'Puerta', 'Huevo (comida)', 'Flor', 'Pie', 'Tenedor', 'Guitarra', 'Mano', 'Sombrero', 'Auriculares', 'L?mpara', 'Ordenador port?til', 'Horno microondas', 'Leche', 'Tel?fono m?vil', 'Toalla de papel', 'L?piz', 'Pizza', 'Tijeras', 'Calcet?n', 'Escalera', 'Traje', 'Maleta', 'Gafas de sol', 'Mesa', 'Raqueta de tenis de mesa', 'Pelota de tenis', 'Raqueta de tenis', 'Papel higi?nico', '?rbol', 'Viol?n', 'Calabac?n'],
  french: ['R?veil', 'Pomme', 'Bras', 'Beignet', 'Banane', 'Baignoire', 'Lit', 'Ceinture', 'V?lo', 'Livre', 'Biblioth?que', 'Botte', 'bol', 'Bo?te', 'Calculatrice', 'Bougie', 'Auto', 'Chat', 'Chaise', 'Horloge', 'Pi?ce de monnaie', 'Clavier d\'ordinateur', 'Biscuit', 'Chien', 'Porte', 'Oeuf (nourriture)', 'Fleur', 'Le pied', 'Fourchette', 'Guitare', 'Main', 'Chapeau', '?couteurs', 'Lampe', 'Ordinateur portable', 'Four micro-onde', 'Lait', 'T?l?phone mobile', 'Essuie-tout', 'Stylo', 'Pizza', 'Ciseaux', 'Chaussette', 'Escaliers', 'Combinaison', 'Valise', 'Des lunettes de soleil', 'Tableau', 'Raquette de tennis de table', 'Balle de tennis', 'Raquette de tennis', 'Papier toilette', 'Arbre', 'Violon', 'Courgette'],
  chinese: ['??', '??', '??', '???', '??', '??', '?', '??', '???', '?', '??', '??', '?', '??', '???', '??', '?', '?', '??', '?', '??', '?????', '???', '?', '?', '??(??)', '?', '?', '?', '??', '?', '??', '??', '?', '?????', '???', '??', '????', '??', '??', '??', '??', '??', '??', '??', '???', '???', '??', '?????', '??', '???', '???', '?', '???', '???'],
  pinyin: ['n?ozhong', 'p?ngguo', 'shoub?', 'baij?bing', 'xiangjiao', 'y?gang', 'chu?ng', 'yaod?i', 'z?x?ngche', 'shu', 'shugu?', 'xuezi', 'wan', 'h?zi', 'j?su?nq?', 'l?zh?', 'che', 'mao', 'yizi', 'zhong', 'y?ngb?', 'j?su?nji ji?np?n', 'quq?bing', 'gou', 'm?n', 'jid?n ( sh?w? )', 'hua', 'jiao', 'cha', 'j?ta', 'shou', 'm?ozi', 'erji', 'deng', 'bij?bendi?nnao', 'weibol?', 'ni?nai', 'y?d?ngdi?nhu?', 'zhijin', 'gangbi', 'bis?', 'jiandao', 'duanw?', 'l?uti', 't?ozhuang', 'shout?xiang', 't?iy?ngj?ng', 'zhuozi', 'pingpangqi? qi?pai', 'wangqi?', 'wangqi?pai', 'w?ishengzhi', 'sh?', 'xiaot?q?n', 'xi? n?ngua'],
}

function translateWordToLang(word, lang) {
  //find index of the target eng word in the target lang
  lang = lang.toLowerCase()
  var index = global.languages.english.indexOf(word);
  var translatedWord = "";
  if (lang in languages) {
    translatedWord = global.languages[lang][index];
  } else {
    print("Error: language not found");
  }
  return translatedWord;
}

//print("Book in spanish is: " + translateWordToLang("Book", "spanish"));
