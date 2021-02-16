var prisoner1;
var prisoner2;

prepareAlgorithmsOptions();

function prepareAlgorithmsOptions() {

	var optionAlg1 = document.getElementById("alg1");
	var optionAlg2 = document.getElementById("alg2");
		
	var algorithms = getAlgorithms();
		
	for (i = 0; i < algorithms.length; i++) {
		
		let option = document.createElement('option');
		option.value = algorithms[i];
		option.innerHTML = algorithms[i];
			
		optionAlg1.appendChild(option);
		optionAlg2.appendChild(option.cloneNode(true));
		
		if (i == 0) {
			
			optionAlg1.value = algorithms[i];
			optionAlg2.value = algorithms[i];
		}
	}
	const urlParams = new URLSearchParams(window.location.search)
	
	optionAlg1.value = urlParams.get('alg1') || 'ALLC'
	optionAlg2.value = urlParams.get('alg2') || 'ALLC'

	document.getElementById('iterations').value = parseInt(urlParams.get('iterations') || 1);
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

function prisonersDilemma() {
	
	if (prisoner1 == null || ((prisoner1 != null) && prisoner1.algorithmName != document.getElementById("alg1").value)) {
		
		prisoner1 = new Prisoner(0, document.getElementById("alg1").value);	
	}
	
	if (prisoner2 == null || ((prisoner2 != null) && prisoner2.algorithmName != document.getElementById("alg2").value)) { 
	
		prisoner2 = new Prisoner(1, document.getElementById("alg2").value);
	}
	
	var iterations = document.getElementById("iterations").value;
	
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
		
		// True - cooperate with police, betray the other prisoner.
		// False - do not cooperate with police.
		if (statePrisoner1 && statePrisoner2) {
			
			// If A and B each betray the other, each of them serves two years in prison.
			prisoner1.score += 2;
			prisoner2.score += 2;
			
						P1BetraysP2Count++;
			P2BetraysP1Count++;
			
		} else if (!statePrisoner1 && !statePrisoner2){
			
			// If A and B both remain silent, both of them will only serve one year in prison (on the lesser charge).
			prisoner1.score += 1;
			prisoner2.score += 1;		
			
		} else {
				
			// If A betrays B but B remains silent, A will be set free and B will serve three years in prison (and vice versa)			
			if (statePrisoner1) {
				
				P1BetraysP2Count++;
				
			} else {
				
				prisoner1.score += 3;
			}
			
			if (statePrisoner2) {
				
				P2BetraysP1Count++;
				
			} else {
				
				prisoner2.score += 3;
			}
		}
		
		P1P2HistoryCount++;
		
		tmpHistory1.push(statePrisoner1);
		tmpHistory2.push(statePrisoner2);
		
		console.log("\tIteration: " + (i + 1));
		console.log("\t\tPrisoner 1: " + prisoner1.score);
		console.log("\t\tPrisoner 2: " + prisoner2.score);
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
	prisoner2.history.set(prisoner1.name, oldHistory2);
}