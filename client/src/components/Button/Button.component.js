import styled from "styled-components";

const Button = styled.div.attrs(() => ({
  role: "button",
  tabIndex: 0,
}))`
  display: inline-block;
  padding: 0.65rem 1rem;
  border-radius: var(--br);
  cursor: pointer;
  text-align: center;
  background-color: ${(props) =>
    props.primary ? "var(--color-main)" : "var(--color-white)"};
  color: ${(props) =>
    props.primary ? "var(--color-text-light)" : "var(--color-text-dark)"};
  transition: box-shadow 0.2s ease-in-out, background 0.2s ease-in-out;

  &:focus {
    transition-duration: 0s;
    box-shadow: var(--color-dark) 0px 0px 0px 0.125rem;
    outline: none;
  }

  &:hover {
    box-shadow: var(--color-main-light) 0px 0px 3px 0.125rem;
  }
`;

export default Button;
