var SELECT_DEFAULT_NAME = 'alg';

var list = [ ];
var prisoners = [ ];

var selectsCount;
var iterations;
var interference;
var rememberHistory;
var mutation;
var speed;

var chartPoints;
var chartStrategies;

var loop = 0;

document.addEventListener("DOMContentLoaded", function(event) {
			document.getElementById("vizualize-btn").addEventListener('click', function(e) {
					e.preventDefault();
					prisonersDilemma();
			})
});



function prisonersDilemma() {
	list = document.getElementsByClassName("strategy-select");

	selectsCount = document.getElementsByClassName('iteration-strategy').length;
	iterations = document.getElementById("iterations").value;
	interference = document.getElementById('inteference').value;
	rememberHistory = document.getElementById('history').value;
	mutation = document.getElementById('mutation').value;
	speed = document.getElementById('speed').value;


	var sameAlgorithms = true;
	if (prisoners != null && prisoners.length == selectsCount) {

		for (let i = 0; i < selectsCount; i++) {

			if (prisoners[i].algorithmName != list[i].value) {

				sameAlgorithms = false;
				break;
			}
		}

	} else {

		sameAlgorithms = false;
	}

	// Create prisoners.
	if (!sameAlgorithms) {

		prisoners = [ ];
		for (let i = 0; i < list.length; i++) {

			prisoners.push(new Prisoner(i, list[i].value));
		}
	}

	// pro iterace
	loop = 0;



	initGraphs();

	runGame();




	// Print results.
	console.log("");
	console.log("Results:");
	for (let i = 0; i < list.length; i++) {

		console.log("Prisoner " +  (i + 1) + " [" + list[i].value + "]: \t" + prisoners[i].score);

		prisoners[i].history.forEach((value, key) => {

			console.log(key, value)
		});
	}
}


function runGame() {
		setTimeout(function() {

			// Start calculating scores.
			for (let i = 0; i < list.length; i++) {

				for (let j = i + 1; j < list.length; j++) {

					//console.log("Comparation: [" + (i + 1) + ". " + list[i].value + "] - [" + (j + 1) + ". " + list[j].value + "]");
					prisonersDilemmaCalculate(prisoners[i], prisoners[j], iterations, interference);
				}
			}

			updatePoints();

			loop++;

			if (loop < iterations) {
				runGame();

			}
		}, getSpeed());
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
				labels[i] = prisoner.algorithmName;
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
						labels[key] = prisoner.algorithmName;
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
console.log(values[key]);
			if (values[key])
			{
				console.log(1);
					values[key] += 1;
			}
			else {
				console.log(2);
					values[key] = 1;
			}

	}
console.log(values);
	chartStrategies.data.datasets[0].data = Object.values(values);
	//chartStrategies.data.labels = labels;
	//chartStrategies.data.datasets[0].backgroundColor = backgroundColor;
	//chartStrategies.data.datasets[0].borderColor = borderColor;

	chartStrategies.update();
}



function prisonersDilemmaCalculate(prisoner1, prisoner2, iterations, interference) {

	var tmpScore1 = 0;
	var tmpScore2 = 0;

	var tmpHistory1 = [ ];
	var tmpHistory2 = [ ];

	var P1P2HistoryCount = prisoner1.history.has(prisoner2.name) ? prisoner1.history.get(prisoner2.name).length : 0;
	var P1BetraysP2Count = prisoner2.getTypeCount(prisoner1.name, true);
	var P2BetraysP1Count = prisoner1.getTypeCount(prisoner2.name, true);

	for (let i = 0; i < iterations; i++) {

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

		if (interferenceRandomNumber1 > interference) {

			statePrisoner1 = !statePrisoner1;
		}

		if (interferenceRandomNumber2 > interference) {

			statePrisoner2 = !statePrisoner2;
		}

		// True - cooperate with police, betray the other prisoner.
		// False - do not cooperate with police.
		if (statePrisoner1 && statePrisoner2) {

			// If A and B each betray the other, each of them serves two years in prison.
			tmpScore1 += 2;
			tmpScore2 += 2;

			P1BetraysP2Count++;
			P2BetraysP1Count++;

		} else if (!statePrisoner1 && !statePrisoner2){

			// If A and B both remain silent, both of them will only serve one year in prison (on the lesser charge).
			tmpScore1 += 1;
			tmpScore2 += 1;

		} else {

			// If A betrays B but B remains silent, A will be set free and B will serve three years in prison (and vice versa)

			if (statePrisoner1) {

				P1BetraysP2Count++;

			} else {

				tmpScore1 += 3;
			}

			if (statePrisoner2) {

				P2BetraysP1Count++;

			} else {

				tmpScore2 += 3;
			}
		}

		P1P2HistoryCount++;

		tmpHistory1.push(statePrisoner1);
		tmpHistory2.push(statePrisoner2);

		console.log("\tIteration: " + (i + 1));
		console.log("\t\tPrisoner 1: " + tmpScore1);
		console.log("\t\tPrisoner 2: " + tmpScore2);
	}

	// Set history.
	var oldHistory1 = prisoner1.history.get(prisoner2.name);
	if (oldHistory1 == null) {

		oldHistory1 = [ ];
	}
	oldHistory1 = oldHistory1.concat(tmpHistory2);

	var oldHistory2 = prisoner2.history.get(prisoner1.name);
	if (oldHistory2 == null) {

		oldHistory2 = [ ];
	}
	oldHistory2 = oldHistory2.concat(tmpHistory1);

	prisoner1.history.set(prisoner2.name, oldHistory1);
	prisoner1.score += tmpScore1;

	prisoner2.history.set(prisoner1.name, oldHistory2);
	prisoner2.score += tmpScore2;
}
