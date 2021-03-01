function changeState(probability) {

	var randomNumber = Math.random().toFixed(2);
	var addition = (1 - probability).toFixed(2);

	if (randomNumber <= addition) {

		return false;
	}

	return true;
}

function disableButton()
{
		let btn = document.getElementById("vizualize-btn");
		btn.innerHTML = "Running...";
		btn.disabled = true;
}

function enableButton()
{
		let btn = document.getElementById("vizualize-btn");
		btn.innerHTML = "Visualize!";
		btn.disabled = false;
}
