import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  color: var(--color-text-link);
  text-decoration: none;
  font-weight: bold;
`;

export const Page = styled.div`
  height: 100%;
  max-width: 1770px;
  margin: auto;

  @media (max-width: #{1870}) {
    margin: 0 3rem;
    max-width: 100%;
  }

  @media (max-width: 768) {
    margin: 0 2rem;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: var(--br);
  background-color: white;
  padding: 1.5rem;
  transition: box-shadow 0.15s ease-in-out;

  ${(props) =>
    props.dark &&
    css`
      background-color: var(--color-plain);
    `}

  ${(props) =>
    props.shadow &&
    css`
      box-shadow: var(--bs-main);
    `}

  ${(props) =>
    props.hoverable &&
    css`
      &:hover {
        box-shadow: var(--bs-large);
      }
    `}
`;

export const Heading = styled.h2`
  font-size: var(--fs-large);
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.65rem 1rem;
  font-family: var(--font-main);
  font-size: var(--fs-med);
  color: var(--color-text-dark);
  border: none;
  border-radius: var(--br);
  outline: none;
  background-color: var(--color-plain);
  transition: all 0.2s ease-in-out;

  ${(props) =>
    props.light &&
    css`
      background-color: white;
    `}

  ${(props) =>
    props.shadow &&
    css`
      box-shadow: var(--bs-main);
    `}

  ${(props) =>
    props.danger &&
    css`
      box-shadow: var(--color-danger) 0px 0px 0px 0.125rem;
    `}

    &:focus {
    box-shadow: var(--color-main) 0px 0px 0px 0.125rem;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 13rem;
  resize: none;
  padding: 0.5rem 1rem;
  font-family: var(--font-main);
  font-size: var(--fs-med);
  border: none;
  border-radius: var(--br);
  outline: none;
  background-color: var(--color-plain);
  transition: all 0.2s ease-in-out;

  ${(props) =>
    props.light &&
    css`
      background-color: white;
    `}

  ${(props) =>
    props.shadow &&
    css`
      box-shadow: var(--bs-main);
    `}

  ${(props) =>
    props.danger &&
    css`
      box-shadow: var(--color-danger) 0px 0px 0px 0.125rem;
    `}

  &:focus {
    box-shadow: var(--color-main) 0px 0px 0px 0.125rem;
  }
`;

export const Button = styled.div.attrs(() => ({
  role: "button",
  tabIndex: 0,
}))`
  display: inline-block;
  text-align: center;
  color: var(--color-text-dark);
  padding: 0.65rem 1rem;
  border-radius: var(--br);
  cursor: pointer;
  background-color: var(--color-white);
  transition: box-shadow 0.2s ease-in-out, background 0.2s ease-in-out;

  ${(props) =>
    props.primary &&
    css`
      background-color: var(--color-main);
      color: var(--color-text-light);
    `}

  &:focus {
    transition-duration: 0s;
    box-shadow: var(--color-dark) 0px 0px 0px 0.125rem;
    outline: none;
  }

  &:hover {
    box-shadow: var(--color-main-light) 0px 0px 3px 0.125rem;
  }
`;
