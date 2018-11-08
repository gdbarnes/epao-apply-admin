import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import Button from "./Button";

const Container = styled.div`
  border: ${props =>
    props.isDragging ? "1px solid #e4ffcd" : "1px solid lightgrey"};
  margin-bottom: 8px;
  background-color: ${props =>
    props.isDragDisabled
      ? "lightgrey"
      : props.isDragging
      ? "#e4ffcd"
      : "white"};
  display: flex;
  flex-direction: column;
`;

const QuestionContent = styled.div`
  padding: 8px;
`;

// const Handle = styled.div`
//   width: 20px;
//   height: 20px;
//   background-color: ${props => (props.isDragging ? "lightgreen" : "white")};
//   border: 1px solid lightgrey;
//   margin-right: 10px;
// `;

export default class Question extends React.Component {
  handleButtonClick = () => {
    this.props.handleEditQuestion(this.props.question.id);
  };

  render() {
    const isDragDisabled = this.props.question.id === "question-1";
    return (
      <Draggable
        draggableId={this.props.question.id}
        index={this.props.index}
        isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
            isDragging={snapshot.isDragging}
            isDragDisabled={isDragDisabled}
          >
            {/* <Handle
              {...provided.dragHandleProps}
              isDragging={snapshot.isDragging}
            /> */}
            <QuestionContent>{this.props.question.content}</QuestionContent>
            <Button
              buttonAction={this.handleButtonClick}
              propOnButton={this.props.propOnQuestion} // 'Passed down data' (sent all the way from line 249 on index.js (propOnInnerList="Passed down data"))
              text="✎ Edit question"
              value="✎ Edit question"
            />
          </Container>
        )}
      </Draggable>
    );
  }
}
