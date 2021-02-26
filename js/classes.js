class Prisoner {

	constructor(index, selectElement) {

		this.score = 0;
		this.name = index;
		this.algorithmName = "";
		this.iterationResult = 0;
		this.selectElement = selectElement;
		this.setUpColors();

		// Map, where key is name of prisoner and value is history with this prisoner.
		this.history = new Map();
	}
	
	setAlgorithm() {
		
		this.algorithmName = this.selectElement.value;
		this.algorithmMethod = window[this.algorithmName.toUpperCase()];
	}

	setUpColors() {
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);

		this.backgroundColor = "rgba(" + r + "," + g + "," + b + ", 0.5)";

		this.borderColor = "rgba(" + r + "," + g + "," + b + ", 1)";
	}



	// Get count of cooperates / deflects of current person.
	getTypeCount(prisonerName, cooperate) {

		var prisonerHistory = this.history.get(prisonerName);

		if (prisonerHistory == null) {

			return 0;
		}

		var count = 0;

		for (let i = 0; i < prisonerHistory.length; i++) {

			if (prisonerHistory[i] == cooperate) {

				count++;
			}
		}

		return count;
	}
}
