class Prisoner {
	
  constructor(algorithmName) {
    this.score = 0;
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