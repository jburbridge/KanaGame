function nextHiragana(code)
{
	ctx.clearRect(0, 0, canv.width, canv.height)
	ctx.strokeRect(0, 0, canv.width, canv.height);
	ctx.font = "80px Times";
	ctx.fillText(code, 10, 80);
}

function checkAnswer(userAnswer, actualAnswer)
{
	if(userAnswer == actualAnswer)
		document.getElementById('message').innerHTML = "Correct!"
	else
		document.getElementById('message').innerHTML = "Try again!"
}

//Main
canv=document.getElementById("gc");
ctx=canv.getContext("2d");

var codes = new File("data/hiragana_codes.txt");
codes.open("r");

while(!file.eof)
{
    console.log(file.readln() + "\n");
}

nextHiragana("\u3042")
checkAnswer()
