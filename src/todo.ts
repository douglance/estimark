import Line from "./line";

import { ESTIMATE_REGEX } from "./regex";

class Todo extends Line {
  best: number | null;
  mostLikely: number | null;
  worst: number | null;
  estimateMatch: RegExpMatchArray | null;

  constructor(content: string, number: number) {
    super(content, number);
    this.estimateMatch = this.matchEstimate();
    this.best = this.getBest();
    this.mostLikely = this.getMostLikely();
    this.worst = this.getWorst();
    this.update();
  }

  matchEstimate() {
    return this.content.match(ESTIMATE_REGEX);
  }

  getBest() {
    return Number(this.estimateMatch?.[1]);
  }

  getMostLikely() {
    return Number(this.estimateMatch?.[2]);
  }

  getWorst() {
    return Number(this.estimateMatch?.[3]);
  }

  updateEstimate() {
    this.estimateMatch = this.matchEstimate();
    this.best = this.getBest();
    this.mostLikely = this.getMostLikely();
    this.worst = this.getWorst();
  }

  getEstimate() {
    this.updateEstimate();
    if (this.best && this.mostLikely && this.worst) {
      const estimate = Math.round(
        (this.best + this.mostLikely * 4 + this.worst) / 6
      );
      return estimate;
    }
    return undefined;
  }
}

export default Todo;
