import {
  TextEditorDecorationType,
  TextEditor,
  Range,
  Position,
  window
} from "vscode";
import { ESTIMATE } from "./decorators";

class Line {
  number: number;
  content: string;
  range: Range | null = null;
  decorator: TextEditorDecorationType | undefined;
  estimate: number | undefined;
  editor: TextEditor | undefined = window.activeTextEditor;
  children: Line[] = [];

  constructor(content: string, number: number) {
    this.content = content;
    this.number = number;
    this.update();
  }

  getEstimate() {
    return this.estimate;
  }

  getRange() {
    return new Range(
      new Position(this.number, 0),
      new Position(this.number, this.content.length)
    );
  }

  update(content?: string) {
    if (content) {
      this.content = content;
    }
    this.range = this.getRange();
    this.estimate = this.getEstimate();
    this.decorate();
  }

  setDecoration(decorator: TextEditorDecorationType) {
    if (decorator && this.range) {
      this.editor?.setDecorations(decorator, [this.range]);
    }
  }

  decoratorText(estimate: number) {
    return `${estimate}h`;
  }

  buildDecorator() {
    const baseDecorator = ESTIMATE();
    if (this.estimate) {
      baseDecorator.after.contentText = this.decoratorText(this.estimate);
      return window.createTextEditorDecorationType(baseDecorator);
    }
    return undefined;
  }

  decorate() {
    this.decorator?.dispose();
    this.decorator = this.buildDecorator();
    if (this.decorator) {
      this.setDecoration(this.decorator);
    }
  }
}

export default Line;
