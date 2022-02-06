// GameController.js
// Version: 0.0.1
// Event: On Awake
// Description: Create a basic scan example with calling the scan module on update  

//@input Component.ScriptComponent Translate
//@input Component.Text findABlank 

script.words = ['Guitar', 'Glasses', 'Bottle', 'Drink', 'Laptop']

script.word = "";

chooseWord();

function chooseWord() {
    script.word = script.words[Math.floor(Math.random() * script.words.length)];
    var translation = script.word;
    translation = translateWordToLang(script.word, global.language);
    script.findABlank.text = "Find a " + translation + "!";
}

function onScan(scannedWord) {
    if (scannedWord === script.word) {
        onSuccess();
    }
}

function onSuccess() {
    print("success");
    chooseWord();
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
    // print(translatedWord);
    return translatedWord;
}

script.api.onScan = onScan;
