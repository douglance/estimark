import {
  TextEditorDecorationType,
  TextEditor,
  Range,
  Position,
  window
} from "vscode";
import Line from "./line";
import Todo from "./todo";
import Header from "./header";
import { TODO_REGEX, HEADER_REGEX } from "./regex";

class Specification {
  lines: any[] = [];
  source: string | undefined;
  editor: TextEditor | undefined = window.activeTextEditor;

  constructor(source: string | undefined, editor: TextEditor | undefined) {
    this.source = source;
    this.editor = editor;
    this.parse();
  }

  isTodo(content: string) {
    return !!content.match(TODO_REGEX);
  }

  isHeader(content: string) {
    return !!content.match(HEADER_REGEX);
  }

  parse() {
    const sourceByLine = this.source?.split("\n");
    sourceByLine?.forEach((content, index) => {
      const lineExists = !!this.lines[index];
      if (lineExists) {
        console.log(`UPDATING # ${index}`);
        this.lines[index].update(content);
      } else {
        if (this.isHeader(content)) {
          this.lines.push(new Header(content, index));
        } else if (this.isTodo(content)) {
          const todo = new Todo(content, index);
          this.lines.push(todo);
          this.lines[0].children.push(todo);
        } else {
          this.lines.push(new Line(content, index));
        }
      }
    });
  }
}

export default Specification;
