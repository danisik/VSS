class Prisoner {

	constructor(index, selectElement) {


		this.score = 0;
		this.id = index;
		this.name = "Prisoner&nbsp;" + (index + 1) + ":";
		this.algorithmName = selectElement.value;
		this.algorithmMethod = window[this.algorithmName.toUpperCase()];
		this.iterationResult = 0;
		this.selectElement = selectElement;

		this.graphLabel = "Prisoner " + (this.id + 1) + " (" + this.algorithmName + ")";
		this.setUpColors();

		// Map, where key is name of prisoner and value is history with this prisoner.
		this.history = new Map();
	}

	actualizeAlgorithm() {

		this.algorithmName = this.selectElement.value;
		this.algorithmMethod = window[this.algorithmName.toUpperCase()];
		this.graphLabel = "Prisoner " + (this.id + 1) + " (" + this.algorithmName + ")";
	}

	setAlgorithm(algorithmName) {

		this.algorithmName = algorithmName;
		this.algorithmMethod = window[this.algorithmName.toUpperCase()];
		this.graphLabel = "Prisoner " + (this.id + 1) + " (" + this.algorithmName + ")";
	}

	setUpColors() {
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);

		this.backgroundColor = "rgba(" + r + "," + g + "," + b + ", 0.5)";

		this.borderColor = "rgba(" + r + "," + g + "," + b + ", 1)";
	}



	// Get count of cooperates / deflects of current person.
	getTypeCount(prisonerId, cooperate) {

		var prisonerHistory = this.history.get(prisonerId);

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
