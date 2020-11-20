import styled from "styled-components";

const Input = styled.input`
  border: none;
  padding: 0.65rem 1rem;
  border-radius: var(--br);
  transition: all 0.2s ease-in-out;
  font-size: var(--fs-med);
  outline: none;

  font-family: var(--font-main);
  color: var(--color-text-dark);

  &:focus {
    box-shadow: var(--color-main) 0px 0px 0px 0.125rem;
  }
`;

export default Input;
