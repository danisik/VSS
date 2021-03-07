/*
 * Created 2021 by Vojtech Danisik and Jan Carnogursky.
 *
 * The author dedicates this file to the public domain.
 */


var tmpHistory1 = [ ];
var tmpHistory2 = [ ];

let table = document.getElementById("results");

let tbody = table.getElementsByTagName('tbody')[0];

var iterations = 0;

var i = 0;


/**
* Initialize event listener for visualize button.
*/
document.addEventListener("DOMContentLoaded", function(event) {

			document.getElementById("vizualize-btn").addEventListener('click', function(e) {

					e.preventDefault();
					prisonersDilemma();

					disableButton();
			})
});

/**
* Function for simulating prisonnersDillemma.
*/
function prisonersDilemma() {

	hideTable();

	// Create prisoners from selected strategies.
	var prisoner1 = new Prisoner(0, document.getElementById("strategy-1"));
	var prisoner2 = new Prisoner(1, document.getElementById("strategy-2"));

	// Actualize their used algorithms.
	prisoner1.actualizeAlgorithm();
	prisoner2.actualizeAlgorithm();

	i = 0;

	// Get iterations.
	iterations = document.getElementById("iterations").value;

	// Prepare table for displaying scores.
	prepareTable(prisoner1, prisoner2);

	// Run prisonners Dillema.
	runGame(prisoner1, prisoner2);

	// Display results in table.
	showResults();
}

/**
* Set headers for table.
* @param prisoner1 - First prisoner.
* @param prisoner2 - Second prisoner.
*/
function prepareTable(prisoner1, prisoner2) {
		document.getElementById("alg1-name").innerHTML = prisoner1.algorithmName;
		document.getElementById("alg2-name").innerHTML = prisoner2.algorithmName;

		tbody.innerHTML = "";
}

/**
* Update total score for both prisoners in table.
* @param prisoner1 - First prisoner.
* @param prisoner2 - Second prisoner.
*/
function updateTotalScore(prisoner1, prisoner2) {
		document.getElementById("alg1-score").innerHTML = prisoner1.score;
		document.getElementById("alg2-score").innerHTML = prisoner2.score;
}


/**
* Run prisonners dilemma.
* @param prisoner1 - First prisoner.
* @param prisoner2 - Second prisoner.
*/
function runGame(prisoner1, prisoner2) {

		setTimeout(function() {

				// Get current choices of prisoners.
				var statePrisoner1 = prisoner1.algorithmMethod(tmpHistory1, tmpHistory2);
				var statePrisoner2 = prisoner2.algorithmMethod(tmpHistory2, tmpHistory1);

				// True - cooperate with police, betray the other prisoner.
				// False - do not cooperate with police.
				if (statePrisoner1 && statePrisoner2) {

					// If A and B each betray the other, each of them serves two years in prison.
					prisoner1.iterationResult = 2;
					prisoner2.iterationResult = 2;

				} else if (!statePrisoner1 && !statePrisoner2){

					// If A and B both remain silent, both of them will only serve one year in prison (on the lesser charge).
					prisoner1.iterationResult = 1;
					prisoner2.iterationResult = 1;

				} else {

					// If A betrays B but B remains silent, A will be set free and B will serve three years in prison (and vice versa)
					prisoner1.iterationResult = statePrisoner1 ? 0 : 3;
					prisoner2.iterationResult = statePrisoner2 ? 0 : 3;
				}

				// Update prisoners score.
				prisoner1.score += prisoner1.iterationResult;
				prisoner2.score += prisoner2.iterationResult;

				// Push current choice to history.
				tmpHistory1.push(statePrisoner1);
				tmpHistory2.push(statePrisoner2);

				// Add current choice to table.
				var row = tbody.insertRow();
				row.className = 'row-animation';

				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);

				cell1.innerHTML = (i + 1);
				cell2.innerHTML = getDataForPrisonerCell(prisoner1, statePrisoner1);
				cell3.innerHTML = getDataForPrisonerCell(prisoner2, statePrisoner2);

				setTimeout(function() {
						row.classList.add("visible");
				}, 50);


				// Update total score.
				updateTotalScore(prisoner1, prisoner2);

	    	i++;


	    if (i < iterations) {           //  if the counter < 10, call the loop function

	      runGame(prisoner1, prisoner2);             //  ..  again which will trigger another
	    }                       //  ..  setTimeout()
			else {

				enableButton();
			}
	  }, 100);
}


/**
* Get data for cell in span element - image, score, ...
* @param prisoner - Current prisoner.
* @param state - Current choice of prisoner.
*/
function getDataForPrisonerCell(prisoner, state) {

		var data = document.createElement("span");

		var img = document.createElement('img');
		img.classList.add("result-img");

		if (state) {

				img.src = "img/bro.png"
		}
		else {
				img.src = "img/snitch.png"
		}

		var totalScore = document.createElement("text");
		totalScore.innerHTML = prisoner.score - prisoner.iterationResult;

		var iterationResult = document.createElement("text");
		iterationResult.innerHTML = "+ " + prisoner.iterationResult;

		data.appendChild(totalScore);
		data.appendChild(img);
		data.appendChild(iterationResult);

		return data.innerHTML;
}

/**
* Show results in table.
*/
function showResults() {

		let table = document.getElementById("game-result");

		if (table) {

				table.classList.remove("hidden");
		}
}

/**
* Hide results in table.
*/
function hideTable() {

		let table = document.getElementById("game-result");

		if (table) {

				table.classList.add("hidden");
		}
}
