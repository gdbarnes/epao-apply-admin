import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
`;

export default class Question extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.question.id} index={this.props.index}>
        {provided => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
          >
            {this.props.question.content}
          </Container>
        )}
      </Draggable>
    );
  }
}
