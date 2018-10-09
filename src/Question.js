import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: ${props =>
    props.isDragging ? "1px solid lightgreen" : "1px solid lightgrey"};
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? "lightgreen" : "white")};
`;

export default class Question extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.question.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {this.props.question.content}
          </Container>
        )}
      </Draggable>
    );
  }
}
