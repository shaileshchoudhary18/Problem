const fs = require('fs');

function isCompoundWord(word, wordSet, original = true) {
    if (!original && wordSet.has(word)) {
        return true;
    }
    for (let i = 1; i < word.length; i++) {
        let prefix = word.substring(0, i);
        let suffix = word.substring(i);
        if (wordSet.has(prefix) && isCompoundWord(suffix, wordSet, false)) {
            return true;
        }
    }
    return false;
}

function findLongestCompoundWords(words) {
    let wordSet = new Set(words);
    let compoundWords = [];
    for (let i = 0; i < words.length; i++) {
        if (isCompoundWord(words[i], wordSet)) {
            compoundWords.push(words[i]);
        }
    }

    compoundWords.sort((a, b) => b.length - a.length);
    return {
        longest: compoundWords[0] || null,
        secondLongest: compoundWords[1] || null,
    };
}

function main() {
    let files = ['Input_01.txt', 'Input_02.txt'];
    for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
        let fileName = files[fileIndex];
        console.log('Reading file: ' + fileName);

        let start = new Date().getTime(); // Start time
        let data = fs.readFileSync(fileName, 'utf-8');
        let words = data.split('\n').map((word) => word.trim()).filter((word) => word.length > 0);

        let results = findLongestCompoundWords(words);
        let end = new Date().getTime(); // End time

        console.log('Longest Compound Word: ' + results.longest);
        console.log('Second Longest Compound Word: ' + results.secondLongest);
        console.log('Time taken to process ' + fileName + ': ' + (end - start) + ' ms');
    }
}

main();
