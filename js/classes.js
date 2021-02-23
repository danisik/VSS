class Prisoner {

	constructor(index, algorithmName) {

		this.score = 0;
		this.name = 'prisoner' + index;
		this.algorithmName = algorithmName;
		this.algorithmMethod = window[algorithmName.toUpperCase()];
		this.iterationResult = 0;

		this.setUpColors();

		// Map, where key is name of prisoner and value is history with this prisoner.
		this.history = new Map();
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
