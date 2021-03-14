/*
 * Created 2021 by Vojtech Danisik and Jan Carnogursky.
 *
 * The author dedicates this file to the public domain.
 */
 
 
/**
* Cooperate every move.
* @param myHistory - My history of moves.
* @param hisHistory - Other prisoner's history of moves.
*/
function ALLC(myHistory, hisHistory) {
		
	return true;
}

/**
* Defect every move.
* @param myHistory - My history of moves.
* @param hisHistory - Other prisoner's history of moves.
*/
function ALLD(myHistory, hisHistory) {
	
	return false;
}

/**
* Start by cooperating, then cooperate and defect alternately.
* @param myHistory - My history of moves.
* @param hisHistory - Other prisoner's history of moves.
*/
function ALT(myHistory, hisHistory) {
	
	if (myHistory.length % 2 === 0) {
	
		return true;
	}
	
	return false;		
}

/**
* Start by cooperating, then repeat your previous move if the other player has cooperated or do the opposite if they have defected.
* @param myHistory - My history of moves.
* @param hisHistory - Other prisoner's history of moves.
*/
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

/**
* Choose a random move, but with a probability distribution that matches the other player\'s move distribution. In other words, if the other player has cooperated for 20% of the time, cooperate with a probability of 20%.
* @param myHistory - My history of moves.
* @param hisHistory - Other prisoner's history of moves.
*/
function CPAVG(myHistory, hisHistory) {
	
	return Math.random() <= (hisHistory.filter(record => record == true).length / hisHistory.length);
}

/**
* Cooperate until the other player defects, after that always defect.
* @param myHistory - My history of moves.
* @param hisHistory - Other prisoner's history of moves.
*/
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

/**
* Start by cooperating, then repeat the previous move if had a positive outcome or do the opposite otherwise.
* @param myHistory - My history of moves.
* @param hisHistory - Other prisoner's history of moves.
*/
function PAV(myHistory, hisHistory) {
	
	const myPreviousRecord = myHistory[myHistory.length - 1] == true
    const hisPreviousRecord = hisHistory[hisHistory.length - 1] == true
	
	if (myHistory.length == 0) {
	
		return true;
	}
	
	return (myPreviousRecord && hisPreviousRecord || !myPreviousRecord && hisPreviousRecord) ? myPreviousRecord : !myPreviousRecord;
	
}

/**
* Make a random move.
* @param myHistory - My history of moves.
* @param hisHistory - Other prisoner's history of moves.
*/
function RAND(myHistory, hisHistory) {
		
	return Math.random() >= 0.5;
}

/**
* Start by cooperating, then copy the other player\'s moves.
* @param myHistory - My history of moves.
* @param hisHistory - Other prisoner's history of moves.
*/
function TFT(myHistory, hisHistory) {
	
	if (myHistory.length === 0) {
	
		return true;
		
	} else {
		
		return hisHistory[hisHistory.length - 1];
	}
}

/**
* Always cooperate, unless the other player has defected the last two times.
* @param myHistory - My history of moves.
* @param hisHistory - Other prisoner's history of moves.
*/
function TFTT(myHistory, hisHistory) {
	
	if (hisHistory[hisHistory.length - 1] == false && hisHistory[hisHistory.length - 2] == false) {
		
		return false;
	}
	
	return true;
}

/**
* Always cooperate, unless the other player has betrayed at least once in the last two moves.
* @param myHistory - My history of moves.
* @param hisHistory - Other prisoner's history of moves.
*/
function TTFT(myHistory, hisHistory) {
	
	if (hisHistory[hisHistory.length - 1] == false || hisHistory[hisHistory.length - 2] == false) {
		
		return false;
	}
	
	return true;
}