import React from "react";
import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Question from "./Question";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  width: 220px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;

const QuestionList = styled.div`
  padding: 8px;
  background-color: ${props =>
    props.isDraggingOver ? "lightgrey" : "inherit"};
  transition: background-color 0.3s ease;
  flex-grow: 1;
  min-height: 100px;
`;

class InnerQuestions extends React.PureComponent {
  // shouldComponentUpdate = nextProps => {
  //   if (nextProps.questions === this.props.questions) {
  //     return false;
  //   }
  //   return true;
  // };

  render() {
    return this.props.questions.map((question, index) => (
      <Question key={question.id} question={question} index={index} />
    ));
  }
}

export default class Section extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.section.id} index={this.props.index}>
        {provided => (
          <Container {...provided.draggableProps} innerRef={provided.innerRef}>
            <Title {...provided.dragHandleProps}>
              {this.props.section.title}
            </Title>
            <Droppable droppableId={this.props.section.id} type="question">
              {(provided, snapshot) => (
                <QuestionList
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <InnerQuestions questions={this.props.questions} />
                  {provided.placeholder}
                </QuestionList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}
