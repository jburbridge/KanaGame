function nextKana(code) {
	document.getElementById('message').innerHTML = "What sound does this character make?";
	document.getElementById('userAnswer').value = "";
	var kana = document.getElementById("kana");

	//If it's a monograph
	if(code.length < 5) {
		kana.innerHTML = String.fromCharCode(parseInt(code, 16));
	}

	//Else, it's a digraph, so split the two codes apart and print each
	else {
		var kana1 = String.fromCharCode(parseInt(code.substring(0, 4), 16));
		var kana2 = String.fromCharCode(parseInt(code.substring(5, 9), 16))
		kana.innerHTML = kana1 + kana2;
	}
}

function checkAnswer(actualAnswer) {
	var userAnswer = document.getElementById('userAnswer');
	var message = document.getElementById('message');

	//If they submitted a blank answer, don't respond
	if(userAnswer.value.length === 0) {
		return;
	}

	//Right answer
	else if (userAnswer.value == actualAnswer) {
	 	message.innerHTML = "Correct! It's " + actualAnswer + "!";
	}

	//Wrong answer
	else {
	 	message.innerHTML = "Nope, it's not " + userAnswer.value + ".";
	}
	userAnswer.value = "";
}

function showAnswer(actualAnswer) {
	document.getElementById('message').innerHTML = "Answer: " + actualAnswer;
}

function readTextFile(file) {
	var codes = [];
	var romaji = [];

	var learnHiragana = true;
	var learnKatakana = true;

    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {

                var allText = rawFile.responseText;
                splitText = allText.split(/ |\r\n/);

				if(learnHiragana) {

					//71 hiragana monographs
					for(var i = 0; i < 142; i+=2) {
						codes.push(splitText[i]);
						romaji.push(splitText[i+1]);
					}

					//36 hiragana digraphs
					for(var i = 142; i < 250; i+=3) {
						codes.push(splitText[i] + '-' + splitText[i+1]);
						romaji.push(splitText[i+2]);
					}
				}

				if(learnKatakana) {

					//71 katakana monographs
					for(var i = 250; i < 392; i+=2) {
						codes.push(splitText[i]);
						romaji.push(splitText[i+1]);
					}
				}
            }
        }
    }
    rawFile.send(null);
	return [codes, romaji];
}

//Main
var codes = [];
var romaji = [];

var output = readTextFile("data/kana_codes.txt");
codes = output[0];
romaji = output[1];

var index = Math.floor(Math.random() * codes.length);
nextKana(codes[index])

var input = document.getElementById("userAnswer");
document.getElementById("userAnswer").focus();
input.addEventListener("keydown", function(event) {

	//Enter: submit answer
	if(event.which === 13) {
		checkAnswer(romaji[index]);
	}

	//Shift: show answer
	else if(event.which === 16) {
		showAnswer(romaji[index]);
	}

	//Space next kana
	else if(event.which === 32) {
		index = Math.floor(Math.random() * codes.length);
		nextKana(codes[index]);
	}
});

//Sloppy way of clearing input buffer
input.addEventListener("keyup", function(event) {
	if(event.which === 32) {
		this.value = "";
	}
});