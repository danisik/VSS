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

document.addEventListener("DOMContentLoaded", function(event) {
			document.getElementById("vizualize-btn").addEventListener('click', function(e) {
					e.preventDefault();
					prisonersDilemma();

					disableButton();
			})
});



function prisonersDilemma() {

	var oldRememberHistory = rememberHistory;
	iterations = document.getElementById("iterations").value;
	interference = document.getElementById('inteference').value;
	rememberHistory = document.getElementById('history').checked;
	mutation = document.getElementById('mutation').checked;
	speed = document.getElementById('speed').value;

	for (let i = 0; i < prisoners.length; i++) {

		var prisoner = prisoners[i];
		prisoner.actualizeAlgorithm();

		if (!rememberHistory || (!oldRememberHistory && prisoner.history.size > 0)) {

			prisoner.history.forEach((value, key) => {

				prisoner.history.set(key, [ ]);
				prisoner.score = 0;
			});
		}
	}

	// pro iterace
	loop = 0;

	initGraphs();

	runGame();
}


function runGame() {

		setTimeout(function() {

			// Start calculating scores.
			for (let i = 0; i < prisoners.length; i++) {

				for (let j = i + 1; j < prisoners.length; j++) {

					prisonersDilemmaCalculate(prisoners[i], prisoners[j], iterations, interference);
				}
			}

			updatePoints();

			loop++;

			if (loop < iterations) {

				runGame();

			} else {

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

function doMutation() {

	var algorithmName = prisoners[0].algorithmName;
	var sameAlgorithmCount = 0;

	var min = Number.MAX_VALUE;
	var idMin = 0;
	var max = 0;
	var idMax = 0;

	for (let i = 0; i < prisoners.length; i++) {

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

	var lastPrisoner = prisoners[idMax];
	var firstPrisoner = prisoners[idMin];

	if (lastPrisoner.name == lastPrisonerName) {

		lastPrisonerCount++;

	} else {

		lastPrisonerName = lastPrisoner.name;
		lastPrisonerCount = 1;
	}

	if (sameAlgorithmCount == prisoners.length || lastPrisonerCount >= 5) {

		repeatMutation = false;
		enableButton();

	} else {

		repeatMutation = true;
		lastPrisoner.setAlgorithm(firstPrisoner.algorithmName);


		for (let i = 0; i < prisoners.length; i++) {
			prisoners[i].score = 0;
		}

		initGraphs();
		updatePoints();

	}
}

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


function updateGraphs() {
		updatePoints();
		updateRepresentation();
}

function initGraphs() {
		initPointsGraph();
		initRepresentationGraph();

		updateRepresentation();
}

function initPointsGraph()
{
		if (chartPoints)
		{
			 chartPoints.destroy();
		}

		chartPoints = initGraph('chart-points', 'Strategies result');

		var backgroundColor = [];
		var borderColor = [];
		var labels = [];

		for (i = 0 ; i < prisoners.length ; i++)
		{
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

function initRepresentationGraph()
{
		if (chartStrategies)
		{
				chartStrategies.destroy();
		}

		chartStrategies = initGraph('chart-strategies', 'Representation of strategies');

		var backgroundColor = {};
		var borderColor = {};
		var labels = {};

		for (i = 0 ; i < prisoners.length ; i++)
		{
				let prisoner = prisoners[i];
				let key = prisoner.algorithmName;

				if (!labels[key])
				{
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

function updatePoints() {
		var values = [];
		//var backgroundColor = [];
		//var borderColor = [];
		//var labels = [];

		for (i = 0 ; i < prisoners.length ; i++)
		{
				let prisoner = prisoners[i];

				values[i] = prisoner.score;
			//	backgroundColor[i] = prisoner.backgroundColor;
			//	borderColor[i] = prisoner.borderColor;
			//	labels[i] = prisoner.algorithmName;
		}

		chartPoints.data.datasets[0].data = values;
		//chartPoints.data.labels = labels;
		//chartPoints.data.datasets[0].backgroundColor = backgroundColor;
		//chartPoints.data.datasets[0].borderColor = borderColor;

		chartPoints.update();
}

function updateRepresentation() {
	var values = {};
	//var backgroundColor = [];
	//var borderColor = [];
	//var labels = [];

	for (i = 0 ; i < prisoners.length ; i++)
	{
			let prisoner = prisoners[i];
			let key = prisoner.algorithmName;

			if (values[key])
			{
					values[key] += 1;
			}
			else {
					values[key] = 1;
			}

	}
	chartStrategies.data.datasets[0].data = Object.values(values);
	//chartStrategies.data.labels = labels;
	//chartStrategies.data.datasets[0].backgroundColor = backgroundColor;
	//chartStrategies.data.datasets[0].borderColor = borderColor;

	chartStrategies.update();
}



function prisonersDilemmaCalculate(prisoner1, prisoner2, iterations, interference) {

	var tmpHistory1 = [ ];
	var tmpHistory2 = [ ];

	var P1P2HistoryCount = prisoner1.history.has(prisoner2.id) ? prisoner1.history.get(prisoner2.id).length : 0;
	var P1BetraysP2Count = prisoner2.getTypeCount(prisoner1.id, true);
	var P2BetraysP1Count = prisoner1.getTypeCount(prisoner2.id, true);

	var statePrisoner1 = prisoner1.algorithmMethod(tmpHistory1, tmpHistory2);
	var statePrisoner2 = prisoner2.algorithmMethod(tmpHistory2, tmpHistory1);

	if (P1P2HistoryCount >= 10) {

		var probabilityBetrayP1P2 = (P1BetraysP2Count / P1P2HistoryCount).toFixed(2);
		var probabilityBetrayP2P1 = (P2BetraysP1Count / P1P2HistoryCount).toFixed(2);

		if (!statePrisoner1 && changeState(probabilityBetrayP2P1)) {

			statePrisoner1 = true;
		}

		if (!statePrisoner2 && changeState(probabilityBetrayP1P2)) {

			statePrisoner2 = true;
		}
	}

	var interferenceRandomNumber1 = Math.random().toFixed(2);
	var interferenceRandomNumber2 = Math.random().toFixed(2);

	if (interferenceRandomNumber1 > (1 - interference)) {

		statePrisoner1 = !statePrisoner1;
	}

	if (interferenceRandomNumber2 > (1 - interference)) {

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

	// Set history.
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

function deletePrisoner(id) {

	let idOfDeletedPrisoner = 0;

	for (let i = 0; i < prisoners.length; i++) {

		if (prisoners[i].id != id) {

			prisoners[i].history.delete(id);

		} else {

			idOfDeletedPrisoner = i;
		}
	}

	prisoners.splice(idOfDeletedPrisoner, 1);
}
