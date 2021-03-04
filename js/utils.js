/*
 * Created 2021 by Vojtech Danisik and Jan Carnogursky.
 *
 * The author dedicates this file to the public domain.
 */
 
 
/**
* Try to change result of prisoner's decision using interference probability.
* @param probability - Probability of interference.
* @return True if generated random number is higher that addition to probability, false if not.
*/
function changeState(probability) {
	
	var randomNumber = Math.random().toFixed(2);
	var addition = (1 - probability).toFixed(2);
	
	if (randomNumber <= addition) {

		return false;
	}

	return true;
}

/**
* Disable visualize button.
*/
function disableButton()
{
		let btn = document.getElementById("vizualize-btn");
		btn.innerHTML = "Running...";
		btn.disabled = true;
}

/**
* Enable visualize button.
*/
function enableButton()
{
		let btn = document.getElementById("vizualize-btn");
		btn.innerHTML = "Visualize!";
		btn.disabled = false;
}
