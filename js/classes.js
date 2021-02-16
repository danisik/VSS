class Prisoner {
	
	constructor(index, algorithmName) {
	  
		this.score = 0;
		this.name = 'prisoner' + index;
		this.algorithmName = algorithmName;
		this.algorithmMethod = window[algorithmName.toUpperCase()];
		
		// Map, where key is name of prisoner and value is history with this prisoner.
		this.history = new Map();
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