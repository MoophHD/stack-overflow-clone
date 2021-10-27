import { forwardRef } from "react";
import styled, { css } from "styled-components";
import { Input } from "./lib";

const Field = forwardRef(
  ({ error, label, optional, bold, light, id, ...props }, ref) => (
    <Container>
      <Label htmlFor={id} bold={light === true}>
        {label}
        {optional && <Label optional> - optional</Label>}
      </Label>
      <Input
        id={id}
        light={light === true}
        danger={error !== undefined}
        ref={ref}
        {...props}
      ></Input>
      {error && <Error>{error.message}</Error>}
    </Container>
  )
);

const Container = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  margin-left: 0.5rem;
  margin-bottom: 0.25rem;
  color: var(--color-text-gray);

  ${(props) =>
    props.bold &&
    css`
      font-weight: bold;
      color: var(--color-text-dark);
    `}

  ${(props) =>
    props.optional &&
    css`
      font-style: italic;
      font-size: var(--fs-small);
    `}
`;

const Error = styled.span`
  position: absolute;
  bottom: -1.3rem;
  left: 0;
  color: var(--color-danger);
  font-size: var(--fs-small);
  font-weight: bold;
`;

export default Field;
