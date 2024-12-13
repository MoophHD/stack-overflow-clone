import styled, { css } from "styled-components";

export default styled.span`
  padding: 0.25rem 0.5rem;
  font-size: var(--fs-small);
  color: var(--coror-text-gray);
  border: 1px solid var(--color-gray);
  border-radius: var(--br);
  background-color: var(--color-plain);
  cursor: pointer;
  margin-right: 0.25rem;

  &:hover,
  &:focus {
    background-color: white;
  }

  ${(props) =>
    props.light &&
    css`
      background-color: white;

      &:hover,
      &:focus {
        background-color: var(--color-plain);
      }
    `}
`;
