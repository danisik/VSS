/*
 * Created 2021 by Vojtech Danisik and Jan Carnogursky.
 *
 * The author dedicates this file to the public domain.
 */


var prisoners = [ ];

var selectsCount;
var iterations;
var interference;
var rememberHistory;
var mutation;
var speed;
var repeatMutation;

var lastPrisonerName = "";
var lastPrisonerCount = 0;

var chartPoints;
var chartStrategies;

var loop = 0;

/**
* Add event listener to visualize button.
*/
document.addEventListener("DOMContentLoaded", function(event) {

			document.getElementById("vizualize-btn").addEventListener('click', function(e) {

					e.preventDefault();
					prisonersDilemma();

					disableButton();
			});
});


/**
* Method for running prisonners dilemma.
*/
function prisonersDilemma() {

	var oldRememberHistory = rememberHistory;

	// Get inputs from elements.
	iterations = document.getElementById("iterations").value;
	interference = document.getElementById('inteference').value;
	rememberHistory = document.getElementById('history').checked;
	mutation = document.getElementById('mutation').checked;
	speed = document.getElementById('speed').value;

	for (let i = 0; i < prisoners.length; i++) {

		// Get prisoner and actualize his algorithm.
		var prisoner = prisoners[i];
		prisoner.actualizeAlgorithm();

		// Reseting history.
		if (!rememberHistory || (!oldRememberHistory && prisoner.history.size > 0)) {

			prisoner.history.forEach((value, key) => {

				prisoner.history.set(key, [ ]);
				prisoner.score = 0;
			});
		}
	}

	loop = 0;

	// Initialize graphs.
	initGraphs();

	// Run simulation.
	runGame();
}


/**
* Run simulation.
*/
function runGame() {

		setTimeout(function() {

			var indexes = [ ];

			// Push available indexes for prisoners.
			for (let i = 0; i < prisoners.length; i++) {

				indexes.push(i);
			}

			// Create random pairs and run simulation between them.
			while(true) {

				// Get random index from possible indexes.
				var firstRandomIndex = Math.floor(Math.random() * indexes.length);

				// Get index to array of prisoners.
				var firstIndex = indexes[firstRandomIndex];

				// Remove this index from possible indexes.
				indexes.splice(indexes.indexOf(firstIndex), 1);

				// Do the same for second prisoner.
				var secondRandomIndex = Math.floor(Math.random() * indexes.length);
				var secondIndex = indexes[secondRandomIndex];

				// Check odd prisoner.
				if (secondIndex == undefined) {

					break;
				}
				indexes.splice(indexes.indexOf(secondIndex), 1);

				// Run simulation between both prisoners.
				prisonersDilemmaCalculate(prisoners[firstIndex], prisoners[secondIndex], interference);

				if (indexes.length == 0) {

					break;
				}
			}

			// Update points in graph.
			updatePoints();

			loop++;

			// Run this simulations from 0 to iterations.
			if (loop < iterations) {

				runGame();

			} else {

				// If simulation ends and mutation checkbox is set, then do mutation and repeat the simulation with new data.
				if (mutation) {

					doMutation();

					if (repeatMutation) {

						loop = 0;
						runGame();
					}
				}
				else {

					enableButton();
				}
			}

		}, getSpeed());
}

/**
* Do a mutation.
*/
function doMutation() {

	var algorithmName = prisoners[0].algorithmName;
	var sameAlgorithmCount = 0;

	var min = Number.MAX_VALUE;
	var idMin = 0;
	var max = 0;
	var idMax = 0;

	// Get minimal and maximal score from all prisoners.
	for (let i = 0; i < prisoners.length; i++) {

		// Check how many algorithm are same.
		if (algorithmName == prisoners[i].algorithmName) {

			sameAlgorithmCount++;
		}

		var score = prisoners[i].score;

		if (score > max) {

			max = score;
			idMax = i;
			continue;
		}

		if (score < min) {

			min = score;
			idMin = i;
			continue;
		}
	}

	// Get last prisoner (prisoner with highest score).
	var lastPrisoner = prisoners[idMax];
	// Get first prisoner (prisoner with lowest score).
	var firstPrisoner = prisoners[idMin];

	// Check if current last prisoner is the same as the previous last prisoner.
	if (lastPrisoner.name == lastPrisonerName) {

		lastPrisonerCount++;

	} else {

		lastPrisonerName = lastPrisoner.name;
		lastPrisonerCount = 1;
	}

	// Break conditions - there is only 1 algorithm used or one prisoner is last for the last 5 times.
	if (sameAlgorithmCount == prisoners.length || lastPrisonerCount >= 5) {

		// If at least 1 break condition is true, end the simulation.
		lastPrisonerName = "";
		lastPrisonerCount = 0;
		repeatMutation = false;
		enableButton();

	} else {

		// If not, repeat the mutation.
		repeatMutation = true;

		// Also, for the last prisoner, set new algorithm, which is algorithm used for first prisoner.
		lastPrisoner.setAlgorithm(firstPrisoner.algorithmName);

		// Also, reset all prisoners score.
		for (let i = 0; i < prisoners.length; i++) {
			prisoners[i].score = 0;
		}

		// And update all graphs.
		initGraphs();
		updatePoints();

	}
}

/**
* Get time for pause between iterations.
*/
function getSpeed() {

		switch (speed) {

			case "0":
				return 500;
				break;
			case "1":
				return 250;
				break;
			case "2":
				return 50;
				break;
			default:
				return 250;
		}
}

/**
* Update both graphs.
*/
function updateGraphs() {

		updatePoints();
		updateRepresentation();
}

/**
* Initialize both graphs.
*/
function initGraphs() {

		initPointsGraph();
		initRepresentationGraph();

		updateRepresentation();
}

/**
* Initialize graph with scores.
*/
function initPointsGraph() {

		if (chartPoints) {

			 chartPoints.destroy();
		}

		chartPoints = initGraph('chart-points', 'Strategies result');

		var backgroundColor = [];
		var borderColor = [];
		var labels = [];

		for (i = 0 ; i < prisoners.length ; i++) {

				let prisoner = prisoners[i];

				backgroundColor[i] = prisoner.backgroundColor;
				borderColor[i] = prisoner.borderColor;
				labels[i] = prisoner.graphLabel;
		}

		chartPoints.data.labels = labels;
		chartPoints.data.datasets[0].backgroundColor = backgroundColor;
		chartPoints.data.datasets[0].borderColor = borderColor;

		chartPoints.update();
}



/**
* Initialize graph with algorithm representation count.
*/
function initRepresentationGraph() {

		if (chartStrategies) {

				chartStrategies.destroy();
		}

		chartStrategies = initGraph('chart-strategies', 'Representation of strategies');

		var backgroundColor = {};
		var borderColor = {};
		var labels = {};

		for (i = 0 ; i < prisoners.length ; i++) {

				let prisoner = prisoners[i];
				let key = prisoner.algorithmName;

				if (!labels[key]) {

						backgroundColor[key] = prisoner.backgroundColor;
						borderColor[key] = prisoner.borderColor;
						labels[key] = key;
				}

		}

		chartStrategies.data.labels = Object.values(labels);
		chartStrategies.data.datasets[0].backgroundColor = Object.values(backgroundColor);
		chartStrategies.data.datasets[0].borderColor = Object.values(borderColor);

		chartStrategies.update();
}

/**
* Initialize specific graph.
* @param element - Graph element.
* @param title - Title of graph.
*/
function initGraph(element, title) {

		let chartDOM = document.getElementById(element);

		return new Chart(chartDOM, {

		    type: 'bar',
		    data: {
		        datasets: [{
		            label: title,
		            borderWidth: 1
		        }]
		    },
		    options: {
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero: true
		                }
		            }]
		        }
		    }
		});
}

/**
* Update scores in graph.
*/
function updatePoints() {

		var values = [];

		for (i = 0 ; i < prisoners.length ; i++) {

				let prisoner = prisoners[i];

				values[i] = prisoner.score;
		}

		chartPoints.data.datasets[0].data = values;

		chartPoints.update();
}

/**
* Update algorithm representation count in graph.
*/
function updateRepresentation() {

	var values = {};

	for (i = 0 ; i < prisoners.length ; i++) {

			let prisoner = prisoners[i];
			let key = prisoner.algorithmName;

			if (values[key]) {

					values[key] += 1;
			}
			else {
					values[key] = 1;
			}

	}
	chartStrategies.data.datasets[0].data = Object.values(values);
	chartStrategies.update();
}

/**
* Run a simulation for two prisoners.
* @param prisoner1 - First prisoner.
* @param prisoner2 - Second prisoner.
* @param interference - Interference for changing choices.
*/
function prisonersDilemmaCalculate(prisoner1, prisoner2, interference) {

	var tmpHistory1 = [ ];
	var tmpHistory2 = [ ];

	// Get history between those two prisoners.
	var P1P2HistoryCount = prisoner1.history.has(prisoner2.id) ? prisoner1.history.get(prisoner2.id).length : 0;

	// Calculate how many betrays are there between prisoner1 and prisoner2.
	var P1BetraysP2Count = prisoner2.getTypeCount(prisoner1.id, true);
	var P2BetraysP1Count = prisoner1.getTypeCount(prisoner2.id, true);

	// Get prisoners choices.
	var statePrisoner1 = prisoner1.algorithmMethod(tmpHistory1, tmpHistory2);
	var statePrisoner2 = prisoner2.algorithmMethod(tmpHistory2, tmpHistory1);

	// If there are at least 10 history records, try to change their choices using betrays in history.
	if (P1P2HistoryCount >= 10) {

		var probabilityBetrayP1P2 = (P1BetraysP2Count / P1P2HistoryCount).toFixed(2);
		var probabilityBetrayP2P1 = (P2BetraysP1Count / P1P2HistoryCount).toFixed(2);

		// Change choice only from deflect to cooperate.
		if (!statePrisoner1 && changeState(probabilityBetrayP2P1)) {

			statePrisoner1 = true;
		}

		if (!statePrisoner2 && changeState(probabilityBetrayP1P2)) {

			statePrisoner2 = true;
		}
	}

	// Get random number for interference.
	var interferenceRandomNumber1 = Math.floor(Math.random() * 100);
	var interferenceRandomNumber2 = Math.floor(Math.random() * 100);

	// Try to change choice again using interference.
	if (interferenceRandomNumber1 > (100 - interference)) {

		statePrisoner1 = !statePrisoner1;
	}

	if (interferenceRandomNumber2 > (100 - interference)) {

		statePrisoner2 = !statePrisoner2;
	}

	// True - cooperate with police, betray the other prisoner.
	// False - do not cooperate with police.
	if (statePrisoner1 && statePrisoner2) {

		// If A and B each betray the other, each of them serves two years in prison.
		prisoner1.score += 2;
		prisoner2.score += 2;

	} else if (!statePrisoner1 && !statePrisoner2){

		// If A and B both remain silent, both of them will only serve one year in prison (on the lesser charge).
		prisoner1.score += 1;
		prisoner2.score += 1;

	} else {

		// If A betrays B but B remains silent, A will be set free and B will serve three years in prison (and vice versa)
		prisoner1.score += statePrisoner1 ? 0 : 3;
		prisoner2.score += statePrisoner2 ? 0 : 3;
	}

	P1P2HistoryCount++;

	tmpHistory1.push(statePrisoner1);
	tmpHistory2.push(statePrisoner2);

	// Set new history between prisoner1 and prisoner2..
	var oldHistory1 = prisoner1.history.get(prisoner2.id);
	if (oldHistory1 == null) {

		oldHistory1 = [ ];
	}
	oldHistory1 = oldHistory1.concat(tmpHistory2);

	var oldHistory2 = prisoner2.history.get(prisoner1.id);
	if (oldHistory2 == null) {

		oldHistory2 = [ ];
	}
	oldHistory2 = oldHistory2.concat(tmpHistory1);

	prisoner1.history.set(prisoner2.id, oldHistory1);
	prisoner2.history.set(prisoner1.id, oldHistory2);
}

/**
* Add new prisoner to array of prisoners.
* @param id - id of prisoner.
* @param selectElement - Select element containing used algorithm.
* @return Prisoner's name.
*/
function addPrisoner(id, selectElement) {

	var prisoner = new Prisoner(id, selectElement);
	prisoners.push(prisoner);

	for (let i = 0; i < prisoners.length; i++) {

		if (prisoners[i].id != id) {

			prisoners[i].history.set(id, [ ]);
		}
	}

	return prisoner.name;
}

/**
* Delete prisoner from array of prisoners.
* @param id - Id of prisoner.
*/
function deletePrisoner(id) {

	let idOfDeletedPrisoner = 0;

	// Firstly, delete all history records between current prisoner and other prisoners.
	for (let i = 0; i < prisoners.length; i++) {

		if (prisoners[i].id != id) {

			prisoners[i].history.delete(id);

		} else {

			idOfDeletedPrisoner = i;
		}
	}

	// Delete prisoner from array.
	prisoners.splice(idOfDeletedPrisoner, 1);
}
