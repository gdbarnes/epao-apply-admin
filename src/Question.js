import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: ${props =>
    props.isDragging ? "1px solid lightgreen" : "1px solid lightgrey"};
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props =>
    props.isDragDisabled
      ? "lightgrey"
      : props.isDragging
        ? "lightgreen"
        : "white"};
  display: flex;
`;

// const Handle = styled.div`
//   width: 20px;
//   height: 20px;
//   background-color: ${props => (props.isDragging ? "lightgreen" : "white")};
//   border: 1px solid lightgrey;
//   margin-right: 10px;
// `;

export default class Question extends React.Component {
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
            {this.props.question.content}
          </Container>
        )}
      </Draggable>
    );
  }
}
