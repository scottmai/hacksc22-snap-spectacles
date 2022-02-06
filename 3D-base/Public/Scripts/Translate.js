// DO NOT OPEN THIS FILE IN LENS STUDIO
global.languages = {
  english: ['Alarm clock', 'Apple', 'Arm', 'Bagel', 'Banana', 'Bathtub', 'Bed', 'Belt', 'Bicycle', 'Book', 'Bookcase', 'Boot', 'Bowl', 'Box', 'Calculator', 'Candle', 'Car', 'Cat', 'Chair', 'Clock', 'Coin', 'Computer keyboard', 'Cookie', 'Dog', 'Door', 'Egg (Food)', 'Flower', 'Foot', 'Fork', 'Guitar', 'Hand', 'Hat', 'Headphones', 'Lamp', 'Laptop', 'Microwave oven', 'Milk', 'Mobile phone', 'Paper towel', 'Pen', 'Pizza', 'Scissors', 'Sock', 'Stairs', 'Suit', 'Suitcase', 'Sunglasses', 'Table', 'Table tennis racket', 'Tennis ball', 'Tennis racket', 'Toilet paper', 'Tree', 'Violin', 'Zucchini'],
  spanish: ['Despertador', 'manzana', 'Brazo', 'Rosquilla', 'Plátano', 'Bañera', 'Cama', 'Cinturón', 'Bicicleta', 'Libro', 'Librero', 'Bota', 'cuenco', 'Caja', 'Calculadora', 'Vela', 'Carro', 'Gato', 'Silla', 'Reloj', 'Moneda', 'Teclado', 'Galleta', 'Perro', 'Puerta', 'Huevo (comida)', 'Flor', 'Pie', 'Tenedor', 'Guitarra', 'Mano', 'Sombrero', 'Auriculares', 'Lámpara', 'Ordenador portátil', 'Horno microondas', 'Leche', 'Teléfono móvil', 'Toalla de papel', 'Lápiz', 'Pizza', 'Tijeras', 'Calcetín', 'Escalera', 'Traje', 'Maleta', 'Gafas de sol', 'Mesa', 'Raqueta de tenis de mesa', 'Pelota de tenis', 'Raqueta de tenis', 'Papel higiénico', 'Árbol', 'Violín', 'Calabacín'],
  french: ['Réveil', 'Pomme', 'Bras', 'Beignet', 'Banane', 'Baignoire', 'Lit', 'Ceinture', 'Vélo', 'Livre', 'Bibliothèque', 'Botte', 'bol', 'Boîte', 'Calculatrice', 'Bougie', 'Auto', 'Chat', 'Chaise', 'Horloge', 'Pièce de monnaie', 'Clavier d\'ordinateur', 'Biscuit', 'Chien', 'Porte', 'Oeuf (nourriture)', 'Fleur', 'Le pied', 'Fourchette', 'Guitare', 'Main', 'Chapeau', 'Écouteurs', 'Lampe', 'Ordinateur portable', 'Four micro-onde', 'Lait', 'Téléphone mobile', 'Essuie-tout', 'Stylo', 'Pizza', 'Ciseaux', 'Chaussette', 'Escaliers', 'Combinaison', 'Valise', 'Des lunettes de soleil', 'Tableau', 'Raquette de tennis de table', 'Balle de tennis', 'Raquette de tennis', 'Papier toilette', 'Arbre', 'Violon', 'Courgette'],
  chinese: ['闹钟', '苹果', '手臂', '百吉饼', '香蕉', '浴缸', '床', '腰带', '自行车', '书', '书柜', '靴子', '碗', '盒子', '计算器', '蜡烛', '车', '猫', '椅子', '钟', '硬币', '计算机键盘', '曲奇饼', '狗', '门', '鸡蛋（食物）', '花', '脚', '叉', '吉他', '手', '帽子', '耳机', '灯', '笔记本电脑', '微波炉', '牛奶', '移动电话', '纸巾', '钢笔', '比萨', '剪刀', '短袜', '楼梯', '套装', '手提箱', '太阳镜', '桌子', '乒乓球球拍', '网球', '网球拍', '卫生纸', '树', '小提琴', '夏南瓜'],
  pinyin: ['nàozhōng', 'píngguǒ', 'shǒubì', 'bǎijíbǐng', 'xiāngjiāo', 'yùgāng', 'chuáng', 'yāodài', 'zìxíngchē', 'shū', 'shūguì', 'xuēzi', 'wǎn', 'hézi', 'jìsuànqì', 'làzhú', 'chē', 'māo', 'yǐzi', 'zhōng', 'yìngbì', 'jìsuànjī jiànpán', 'qūqíbǐng', 'gǒu', 'mén', 'jīdàn （ shíwù ）', 'huā', 'jiǎo', 'chā', 'jítā', 'shǒu', 'màozi', 'ěrjī', 'dēng', 'bǐjìběndiànnǎo', 'wēibōlú', 'niúnǎi', 'yídòngdiànhuà', 'zhǐjīn', 'gāngbǐ', 'bǐsà', 'jiǎndāo', 'duǎnwà', 'lóutī', 'tàozhuāng', 'shǒutíxiāng', 'tàiyángjìng', 'zhuōzi', 'pīngpāngqiú qiúpāi', 'wǎngqiú', 'wǎngqiúpāi', 'wèishēngzhǐ', 'shù', 'xiǎotíqín', 'xià nánguā'],
}

function translateWordToLang(word, lang) {
  //find index of the target eng word in the target lang
  lang = lang.toLowerCase()
  var index = global.languages.english.indexOf(word);
  var translatedWord = "";
  if (lang in languages) {
    translatedWord = global.languages[lang][index];
    if (translatedWord && lang === 'chinese') {
      translatedWord += '\n(' + global.languages.pinyin[index] + ')';
    }
  } else {
    print("Error: language not found");
  }
  print(translatedWord);
  return translatedWord;
}

script.api.translateWordToLang = translateWordToLang;

// print("Book in spanish is: " + translateWordToLang("Book", "spanish"));
