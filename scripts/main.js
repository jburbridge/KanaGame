function nextHiragana(code)
{
	document.getElementById('message').innerHTML = "What sound does this character make?";
	document.getElementById('userAnswer').value = "";
	ctx.clearRect(0, 0, canv.width, canv.height);
	ctx.strokeRect(0, 0, canv.width, canv.height);
	ctx.font = "80px Times";

	//If it's a monograph
	if(code.length < 4)
		ctx.fillText(String.fromCharCode(parseInt(code, 16)), 10, 80);

	//Else, it's a digraph, so split the two codes apart and print each
	else
	{
		ctx.fillText(String.fromCharCode(parseInt(code.substring(0, 4), 16)), 10, 80);
		ctx.fillText(String.fromCharCode(parseInt(code.substring(5, 9), 16)), 80, 80);
	}
}

function checkAnswer(actualAnswer)
{
	var userAnswer = document.getElementById('userAnswer').value;
	if(userAnswer == actualAnswer)
		document.getElementById('message').innerHTML = "Correct!"
	else
		document.getElementById('message').innerHTML = "Try again!"
}

function showAnswer(actualAnswer)
{
	document.getElementById('message').innerHTML = "Answer: " + actualAnswer;
}

function readTextFile(file)
{
	var codes = [];
	var romaji = [];

    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                splitText = allText.split(/ |\r\n/);

				//71 monographs
				for(var i = 0; i < 142; i+=2)
				{
					codes.push(splitText[i]);
					romaji.push(splitText[i+1]);
				}

				//36 digraphs
				for(var i = 142; i < 250; i+=3)
				{
					codes.push(splitText[i] + '-' + splitText[i+1]);
					romaji.push(splitText[i+2]);
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

var output = readTextFile("data/hiragana_codes.txt");
codes = output[0];
romaji = output[1];

canv=document.getElementById("gc");
ctx=canv.getContext("2d");

var index = Math.floor(Math.random() * codes.length);
nextHiragana(codes[index])
