import Line from "./line";

class Header extends Line {
  getEstimate() {
    const reducer = (accumulator: any, currentValue: Line) => {
      if (currentValue.estimate) {
        return accumulator + currentValue.estimate;
      }
    };
    return this.children.reduce(reducer, 0);
  }
}

export default Header;
