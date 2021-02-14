var SELECT_DEFAULT_NAME = 'alg';

var list = [ ];
var prisoners = [ ];

generateSelects();

function prepareAlgorithmsOptions() {
		
	var algorithms = getAlgorithms();
		
	for (let i = 0; i < algorithms.length; i++) {
		
		let option = document.createElement('option');
		option.value = algorithms[i];
		option.innerHTML = algorithms[i];
		
		list[0].appendChild(option);
		
		for (let j = 1; j < list.length; j++) {
			
			list[j].appendChild(option.cloneNode(true));
		}
	}
	const urlParams = new URLSearchParams(window.location.search)
	
	for (let i = 0; i < list.length; i++) {
		
		list[i].value = urlParams.get(SELECT_DEFAULT_NAME + i) || 'ALLC';
	}
}

function getAlgorithms() {
	
	return [
		"ALLC",
		"ALLD",
		"ALT",
		"APP",
		"CPAVG",
		"GRIM",
		"PAV",
		"RAND",
		"TFT",
		"TFTT",
		"TTFT"
	];
}

function generateSelects() {
	
	var selectDiv = document.getElementById("selectDiv");	
	
	// Remove previous comboboxes.
	while (selectDiv.firstChild) selectDiv.removeChild(selectDiv.firstChild);
	list = [ ];
	
	var algorithmsCount = document.getElementById('selectCount').value;	
	
	// Check count.
	if (algorithmsCount < 2) {
		
		document.getElementById('selectCount').value = 2;
		algorithmsCount = 2;
	}
	
	for (let i = 0; i < algorithmsCount; i++) {
		
		var singleSelectDiv = document.createElement('div');
		var singleSelect = document.createElement('select');
		singleSelect.name = SELECT_DEFAULT_NAME + i;
		
		list.push(singleSelect);
		
		singleSelectDiv.appendChild(singleSelect);
		selectDiv.appendChild(singleSelectDiv);
	}
	
	prepareAlgorithmsOptions();
}

function prisonersDilemma() {

	console.clear();
	prisoners = [ ];
	
	var iterations = document.getElementById("algIterations").value;
	
	// TODO: do it better
	// Create prisoners.
	for (let i = 0; i < list.length; i++) {
		
		prisoners.push(new Prisoner(i, list[i].value));
	}
	
	// Start calculating scores.
	for (let i = 0; i < list.length; i++) {
		
		for (let j = i + 1; j < list.length; j++) {
			
			console.log("Comparation: [" + (i + 1) + ". " + list[i].value + "] - [" + (j + 1) + ". " + list[j].value + "]");
			prisonersDilemmaCalculate(prisoners[i], prisoners[j], iterations);
		}
	}
	
	// Print results.
	console.log("");
	console.log("Results:");
	for (let i = 0; i < list.length; i++) {
		
		console.log("Prisoner " +  (i + 1) + " [" + list[i].value + "]: \t" + prisoners[i].score);
	}
}

function prisonersDilemmaCalculate(prisoner1, prisoner2, iterations) {


	var tmpScore1 = 0;
	var tmpScore2 = 0;
	
	for (let i = 0; i < iterations; i++) {
	
		var statePrisoner1 = prisoner1.algorithmMethod(prisoner1.history, prisoner2.history);
		var statePrisoner2 = prisoner2.algorithmMethod(prisoner2.history, prisoner1.history);
		
		if (statePrisoner1 && statePrisoner2) {
			
			// If A and B each betray the other, each of them serves two years in prison.
			tmpScore1 += 2;
			tmpScore2 += 2;
			
		} else if (!statePrisoner1 && !statePrisoner2){
			
			// If A and B both remain silent, both of them will only serve one year in prison (on the lesser charge).
			tmpScore1 += 1;
			tmpScore2 += 1;		
			
		} else {
				
			// If A betrays B but B remains silent, A will be set free and B will serve three years in prison (and vice versa)
			tmpScore1 += statePrisoner1 ? 0 : 3;
			tmpScore2 += statePrisoner2 ? 0 : 3;
		}
		
		prisoner1.history.push(statePrisoner1);
		prisoner2.history.push(statePrisoner2);
		
		console.log("\tIteration: " + i);
		console.log("\t\tPrisoner 1: " + tmpScore1);
		console.log("\t\tPrisoner 2: " + tmpScore2);
	}
	
	// TEMPORARY:
	// pamatování si minulých her s protivníkem – na základě toho při výpočtu rozhodnutí, 
	// může pozměnit svoje rozhodnutí (bude to něco jako rušení, ale pravděpodobnost na 
	// změnu se bude vypočítávat na základě toho kolikrát mě ne/podrazil v minulých hrách)
	// -> mapa se jménem protivníka jako klíč a historie jako hodnota
	prisoner1.history = [ ];
	prisoner1.score += tmpScore1;
	
	prisoner2.history = [ ];
	prisoner2.score += tmpScore2;
}