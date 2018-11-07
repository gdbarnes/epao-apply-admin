import React from "react";
import styled from "styled-components";
import Button from "./Button";

const Form = styled.form`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
`;

// const Button = styled.input`
//   border-radius: 0;
//   border-width: 1px 0 0 0;
//   background-color: blanchedalmond;
//   cursor: pointer;
//   &:hover {
//     background-color: lightgrey;
//   }
// `;

const FormBlock = styled.div`
  padding: 8px;
  margin-bottom: 5px;
`;
const FormLabel = styled.div`
  display: block;
`;

export default class Section extends React.Component {
  state = { contentValue: "", hintValue: "", buttonValue: "" };

  handleChange = event => {
    const inputStateId = `${event.target.name}Value`;
    this.setState({ [inputStateId]: event.target.value });
  };

  handleSubmit = event => {
    // this.setState({ contentValue: event.target.value });
    alert(`
      Data submitted:
        ${this.state.contentValue}
        ${this.state.hintValue}
        ${this.state.buttonValue}
      `);
    event.preventDefault();
  };

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <FormBlock>
            <h3>Update question</h3>
          </FormBlock>
          <FormBlock>
            <FormLabel htmlFor="content">Content:</FormLabel>
            <input
              type="text"
              value={this.state.contentValue}
              onChange={this.handleChange}
              id="content"
              name="content"
            />
          </FormBlock>
          <FormBlock>
            <FormLabel htmlFor="hint">Hint:</FormLabel>
            <input
              type="text"
              value={this.state.hintValue}
              onChange={this.handleChange}
              id="hint"
              name="hint"
            />
          </FormBlock>
          <FormBlock>
            <FormLabel htmlFor="button">Button text:</FormLabel>
            <input
              type="text"
              value={this.state.buttonValue}
              onChange={this.handleChange}
              id="button"
              name="button"
            />
          </FormBlock>
          <Button
            action=""
            text="↑ Save question"
            type="submit"
            value="↑ Save question"
          />
        </Form>
      </>
    );
  }
}
