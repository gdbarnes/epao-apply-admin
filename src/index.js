import React from "react";
import ReactDOM from "react-dom";
import "@atlaskit/css-reset";
import { DragDropContext } from "react-beautiful-dnd";
import initialData from "./initial-data";
import Section from "./Section";

// fetch("http://localhost:59022/Apply/Sequences").then(result => {
//   console.log(result);
// });

class App extends React.Component {
  state = initialData;

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    // If dropped outside droppable zone (destination === null)
    if (!destination) return;
    // If dropped in the same place as picked up
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const section = this.state.sections[source.droppableId];
    const newQuestionIds = Array.from(section.questionIds);
    newQuestionIds.splice(source.index, 1);
    newQuestionIds.splice(destination.index, 0, draggableId);

    const newSection = {
      ...section,
      questionIds: newQuestionIds
    };

    const newState = {
      ...this.state,
      sections: {
        ...this.state.sections,
        [newSection.id]: newSection
      }
    };

    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext
        // onDragStart
        // onDragUpdate
        // onDragEnd //required

        onDragEnd={this.onDragEnd}
      >
        {this.state.sectionOrder.map(sectionId => {
          const section = this.state.sections[sectionId];
          const questions = section.questionIds.map(
            questionId => this.state.questions[questionId]
          );

          return (
            <Section key={sectionId} section={section} questions={questions} />
          );
        })}
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
