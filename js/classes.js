/*
 * Created 2021 by Vojtech Danisik and Jan Carnogursky.
 *
 * The author dedicates this file to the public domain.
 */
 
 
/**
* Class representing single prisoner in prisonner's dilemma.
*/
class Prisoner {

	/**
	* Constructor.
	* @param index - index of prisoner.
	* @param selectElement - Select element with used algorithm.
	*/
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

	/**
	* Actualize algorithm name from select element.
	*/
	actualizeAlgorithm() {

		this.algorithmName = this.selectElement.value;
		this.algorithmMethod = window[this.algorithmName.toUpperCase()];
		this.graphLabel = "Prisoner " + (this.id + 1) + " (" + this.algorithmName + ")";
	}

	/**
	* Set new algorithm name - used in mutation.
	* @param algorithmName - Name of new algorithm.
	*/
	setAlgorithm(algorithmName) {

		this.algorithmName = algorithmName;
		this.algorithmMethod = window[this.algorithmName.toUpperCase()];
		this.graphLabel = "Prisoner " + (this.id + 1) + " (" + this.algorithmName + ")";
	}

	/**
	* Set up colors for graphs.
	*/
	setUpColors() {
		
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);

		this.backgroundColor = "rgba(" + r + "," + g + "," + b + ", 0.5)";

		this.borderColor = "rgba(" + r + "," + g + "," + b + ", 1)";
	}



	/**
	* Get count of cooperates / deflects of current person.
	* @param prisonerId - Id of other prisoner.
	* @param cooperate - True if we want to count situations where other prisoner cooperates with police, false otherwise.
	*/
	getTypeCount(prisonerId, cooperate) {

		// Get history with other prisoner.
		var prisonerHistory = this.history.get(prisonerId);

		if (prisonerHistory == null) {

			return 0;
		}

		var count = 0;

		// Count cooperates / deflects with other prisoner.
		for (let i = 0; i < prisonerHistory.length; i++) {

			if (prisonerHistory[i] == cooperate) {

				count++;
			}
		}

		return count;
	}
}
