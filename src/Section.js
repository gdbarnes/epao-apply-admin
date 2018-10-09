import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Question from "./Question";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
`;

const Title = styled.h3`
  padding: 8px;
`;

const QuestionList = styled.div`
  padding: 8px;
`;

export default class Section extends React.Component {
  render() {
    return (
      <Container>
        <Title>{this.props.section.title}</Title>
        <Droppable droppableId={this.props.section.id}>
          {provided => (
            <QuestionList
              innerRef={provided.innerRef}
              {...provided.droppableProps}
            >
              {this.props.questions.map((question, index) => (
                <Question key={question.id} question={question} index={index} />
              ))}
              {provided.placeholder}
            </QuestionList>
          )}
        </Droppable>
      </Container>
    );
  }
}
