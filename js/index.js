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
	
	var prisoner1 = new Prisoner(0, document.getElementById("alg1").value);	
	var prisoner2 = new Prisoner(1, document.getElementById("alg2").value);
	var iterations = document.getElementById("iterations").value;
	
	for (let i = 0; i < iterations; i++) {
	
		var statePrisoner1 = prisoner1.algorithmMethod(prisoner1.history, prisoner2.history);
		var statePrisoner2 = prisoner2.algorithmMethod(prisoner2.history, prisoner1.history);
		
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
		
		prisoner1.history.push(statePrisoner1);
		prisoner2.history.push(statePrisoner2);
		
				console.log("Iteration: " + i);
		console.log("Prisoner 1: " + prisoner1.score);
		console.log("Prisoner 2: " + prisoner2.score);
		
		setTimeout(function() {
		console.log("Iteration: " + i);
		console.log("Prisoner 1: " + prisoner1.score);
		console.log("Prisoner 2: " + prisoner2.score);
		}, 100);
	}
	
}