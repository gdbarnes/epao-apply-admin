import React from "react";
import ReactDOM from "react-dom";
import "@atlaskit/css-reset";
import { DragDropContext } from "react-beautiful-dnd";
import initialData from "./initial-data";
import Section from "./Section";
import Saving from "./Saving";

// fetch("http://localhost:59022/Apply/Sequences").then(result => {
//   console.log(result);
// });

class App extends React.Component {
  state = {
    data: initialData,
    saving: false
  };

  updateServerQuestionOrder = () => {
    // mock re-order api call
    setTimeout(() => {
      this.setState({
        saving: false
      });
    }, 1500);
  };

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

    const section = this.state.data.sections[source.droppableId];

    // Duplicate question array
    const newQuestionIds = Array.from(section.questionIds);

    // Swap source and destination
    newQuestionIds.splice(source.index, 1); // remove source at index
    newQuestionIds.splice(destination.index, 0, draggableId); // place at destination index

    // reflect changes to question order in the section
    const newSection = {
      ...section, // spread previous values for section
      questionIds: newQuestionIds // replace questionids with re-ordered
    };

    // TODO: Is this the best way of updating state? (spread, spread, spread)
    const newState = {
      ...this.state, // spread current state
      data: {
        ...this.state.data, // spread current data
        sections: {
          ...this.state.data.sections, // spreead current sections
          [newSection.id]: newSection // update correct section with new section defined above
        }
      },
      saving: true
    };

    // console.log(newState);

    this.setState(newState);

    // Call an endpoint after performing this optomistic update to let the server know a re-order has occured
    this.updateServerQuestionOrder(newSection);
  };

  render() {
    return (
      <DragDropContext
        // onDragStart
        // onDragUpdate
        // onDragEnd //required

        onDragEnd={this.onDragEnd}
      >
        {this.state.data.sectionOrder.map(sectionId => {
          const section = this.state.data.sections[sectionId];
          const questions = section.questionIds.map(
            questionId => this.state.data.questions[questionId]
          );

          return (
            <Section key={sectionId} section={section} questions={questions} />
          );
        })}
        {this.state.saving ? <Saving /> : null}
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
