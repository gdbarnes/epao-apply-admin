import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border-radius: 0;
  border-width: 1px 0 0 0;
  background-color: blanchedalmond;
  cursor: pointer;
  &:hover {
    background-color: lightgrey;
  }
`;

const Button = ({ buttonAction, text }) => (
  <StyledButton onClick={buttonAction}>{text}</StyledButton>
);

export default Button;
