function changeState(probability) {
	
	var randomNumber = Math.random().toFixed(2);
	var addition = (1 - probability).toFixed(2);
	
	if (randomNumber <= addition) {
	
		return false;
	}
	
	return true;
}