// Cooperate every move.
function ALLC(myHistory, hisHistory) {
		
	return true;
}

// Defect every move.
function ALLD(myHistory, hisHistory) {
	
	return false;
}

// Start by cooperating, then cooperate and defect alternately.
function ALT(myHistory, hisHistory) {
	
	if (myHistory.length % 2 === 0) {
	
		return true;
	}
	
	return false;		
}

// Start by cooperating, then repeat your previous move if the other player has cooperated or do the opposite if they have defected.
function APP(myHistory, hisHistory) {
	
	if (myHistory.length == 0) {
	
		return true;
	}
	
	if (hisHistory[hisHistory.length - 1] == true) {
		
		return myHistory[myHistory.length - 1];
		
	} else {
		
		return !myHistory[myHistory.length - 1];
	}
}

// Choose a random move, but with a probability distribution that matches the other player\'s move distribution. In other words, if the other player has cooperated for 20% of the time, cooperate with a probability of 20%.
function CPAVG(myHistory, hisHistory) {
	
	return Math.random() <= (hisHistory.filter(record => record == true).length / hisHistory.length);
}

// Cooperate until the other player defects, after that always defect.
function GRIM(myHistory, hisHistory) {
	
	if (hisHistory.length > 0) {
		
		if (hisHistory[hisHistory.length - 1] == false || myHistory[myHistory.length - 1] == false) {
			
			return false;
			
		} else {
			
			return true;
			
		}
	}
	
	return true;
}

// Start by cooperating, then repeat the previous move if had a positive outcome or do the opposite otherwise.
function PAV(myHistory, hisHistory) {
	
	const myPreviousRecord = myHistory[myHistory.length - 1] == true
    const hisPreviousRecord = hisHistory[hisHistory.length - 1] == true
	
	if (myHistory.length == 0) {
	
		return true;
	}
	
	return (myPreviousRecord && hisPreviousRecord || !myPreviousRecord && hisPreviousRecord) ? myPreviousRecord : !myPreviousRecord;
	
}

// Make a random move.
function RAND(myHistory, hisHistory) {
		
	return Math.random() >= 0.5;
}

// Start by cooperating, then copy the other player\'s moves.
function TFT(myHistory, hisHistory) {
	
	if (myHistory.length === 0) {
	
		return true;
		
	} else {
		
		return hisHistory[hisHistory.length - 1];
	}
}

// Always cooperate, unless the other player has defected the last two times.
function TFTT(myHistory, hisHistory) {
	
	if (hisHistory[hisHistory.length - 1] == false && hisHistory[hisHistory.length - 2] == false) {
		
		return false;
	}
	
	return true;
}

// Always cooperate, unless the other player has betrayed at least once in the last two moves.
function TTFT(myHistory, hisHistory) {
	
	if (hisHistory[hisHistory.length - 1] == false || hisHistory[hisHistory.length - 2] == false) {
		
		return false;
	}
	
	return true;
}