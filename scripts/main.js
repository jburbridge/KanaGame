window.onload = function()
{
	canv=document.getElementById("gc");
	ctx=canv.getContext("2d");
	game()
}

function game()
{
	ctx.clearRect(0, 0, canv.width, canv.height)
	ctx.strokeRect(0, 0, canv.width, canv.height);
	ctx.font = "80px Times";

	var selector = Math.random();
	var answer;

	if(selector < 0.5)
	{
		ctx.fillText("\u3042", 10, 80);
		answer = "a";
	}

	else
	{
		ctx.fillText("\u3058", 10, 80);
		answer = "ji"
	}

}

function checkAnswer()
{
	var response=document.getElementById('userAnswer').value;
	if(response == "a")
		document.getElementById('message').innerHTML = "Correct!"
	else
		document.getElementById('message').innerHTML = "Try again!"
}
