class Prisoner {
	
  constructor(index, algorithmName) {
    this.score = 0;
	this.name = 'prisoner' + index;
    this.history = [];
    this.algorithmName = algorithmName;
    this.algorithmMethod = window[algorithmName.toUpperCase()];
  }

  averageScore() {
    if (this.history.length === 0) {
      return this.score;
    }
    return this.score / this.history.length;
  }
}