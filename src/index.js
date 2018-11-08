import React from "react";
import ReactDOM from "react-dom";
import "@atlaskit/css-reset";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import initialData from "./initial-data";
import Section from "./Section";
import QuestionForm from "./QuestionForm";
import Saving from "./Saving";

const Container = styled.div`
  display: flex;
`;

// load data from localStorage if available
const applyJourneyData =
  localStorage.getItem("applyJourneyData") !== null
    ? JSON.parse(localStorage["applyJourneyData"])
    : initialData;

class InnerList extends React.PureComponent {
  render() {
    const {
      section,
      questionMap,
      index,
      addQuestionButtonAction,
      // editQuestionButtonAction,
      handleEditQuestion
    } = this.props;
    const questions = section.questionIds.map(
      questionId => questionMap[questionId]
    );
    return (
      <Section
        section={section}
        questions={questions}
        index={index}
        addQuestionButtonAction={addQuestionButtonAction}
        handleEditQuestion={handleEditQuestion}
        // editQuestionButtonAction={editQuestionButtonAction}
        propOnSection={this.props.propOnInnerList}
      />
    );
  }
}

// fetch("http://localhost:59022/Apply/Sequences").then(result => {
//   console.log(result);
// });

class App extends React.Component {
  state = {
    data: applyJourneyData,
    saving: false,
    clickedQuestionId: "",
    showQuestionForm: false
  };

  handleEditQuestion = questionId => {
    this.setState({
      clickedQuestionId: questionId,
      showQuestionForm: true
    });

    // TODO:
    // Open the Question Form with the details for the question (using the questionId) and then
    // add or edit that question
  };

  handleQuestionUpdate = updatedQuestion => {
    console.log("clickedQuestionId", this.state.clickedQuestionId);
    console.log("updated", updatedQuestion);
  };

  handleAddQuestion = sectionId => {
    console.log("sectionId", sectionId);

    const nextQuestionId = `question-${Object.keys(this.state.data.questions)
      .length + 1}`;

    const newState = {
      ...this.state, // spread current state
      data: {
        ...this.state.data, // spread current data
        questions: {
          ...this.state.data.questions, // spreead current questions
          [nextQuestionId]: {
            button: "Set me up",
            content: "Email",
            hint: "We'll send you an email to confirm your identity",
            id: nextQuestionId
          }
        },
        sections: {
          ...this.state.data.sections,
          [sectionId]: {
            ...this.state.data.sections[sectionId],
            questionIds: [
              ...this.state.data.sections[sectionId].questionIds,
              nextQuestionId
            ]
          }
        }
      },
      saving: true
    };

    this.setState(newState);
    this.updateServer(newState);
    return;
  };

  updateServer = newState => {
    // mock re-order api call
    setTimeout(() => {
      localStorage.setItem("applyJourneyData", JSON.stringify(this.state.data));
      this.setState({
        saving: false
      });
      console.log(newState);
    }, 1500);
  };

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    // If dropped outside droppable zone (destination === null)
    if (!destination) return;

    // If dropped in the same place as picked up
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "section") {
      const newSectionOrder = Array.from(this.state.data.sectionOrder);
      newSectionOrder.splice(source.index, 1);
      newSectionOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        data: {
          ...this.state.data,
          sectionOrder: newSectionOrder
        },
        saving: true
      };

      this.setState(newState);
      this.updateServer(newState);
      return;
    }

    const start = this.state.data.sections[source.droppableId];
    const finish = this.state.data.sections[destination.droppableId];

    if (start === finish) {
      // Duplicate question array
      const newQuestionIds = Array.from(start.questionIds);

      // Swap source and destination
      newQuestionIds.splice(source.index, 1); // remove source at index
      newQuestionIds.splice(destination.index, 0, draggableId); // place at destination index

      // reflect changes to question order in the section
      const newSection = {
        ...start, // spread previous values for section
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

      this.setState(newState);

      // Call an endpoint after performing this optomistic update to let the server know a re-order has occured
      this.updateServer(newState);
      return;
    }

    // Moving from one section to another
    const startQuestionIds = Array.from(start.questionIds);
    startQuestionIds.splice(source.index, 1);
    const newStart = {
      ...start,
      questionIds: startQuestionIds
    };

    const finishQuestionIds = Array.from(finish.questionIds);
    finishQuestionIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      questionIds: finishQuestionIds
    };

    const newState = {
      ...this.state, // spread current state
      data: {
        ...this.state.data, // spread current data
        sections: {
          ...this.state.data.sections, // spreead current sections
          [newStart.id]: newStart, // update correct section with new section defined above
          [newFinish.id]: newFinish
        }
      },
      saving: true
    };

    this.setState(newState);
    this.updateServer(newState);
  };

  render() {
    return (
      <>
        <DragDropContext
          // onDragStart
          // onDragUpdate
          // onDragEnd //required
          onDragEnd={this.onDragEnd}
        >
          <Droppable
            droppableId="all-sections"
            direction="horizontal"
            type="section"
          >
            {provided => (
              <Container
                {...provided.droppableProps}
                innerRef={provided.innerRef}
              >
                {this.state.data.sectionOrder.map((sectionId, index) => {
                  const section = this.state.data.sections[sectionId];
                  return (
                    <InnerList
                      key={sectionId}
                      section={section}
                      questionMap={this.state.data.questions}
                      index={index}
                      addQuestionButtonAction={() =>
                        this.handleAddQuestion(sectionId)
                      }
                      handleEditQuestion={this.handleEditQuestion}
                      // editQuestionButtonAction={event =>
                      //   this.handleEditQuestion()
                      // }
                      propOnInnerList="Passed down data"
                    />
                  );
                })}
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
          {this.state.saving ? <Saving /> : null}
        </DragDropContext>
        {this.state.showQuestionForm && (
          <QuestionForm onQuestionFormSubmit={this.handleQuestionUpdate} />
        )}
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
