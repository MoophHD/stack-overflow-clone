import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { tablet, laptopLarge, mobile } from "constants/screenBreakpoints";

export const Background = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex: 1;
  background-color: var(--color-plain);
  flex-direction: column;
  align-items: center;
`;

export const ContainerLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const StyledLink = styled(Link)`
  color: var(--color-text-link);
  text-decoration: none;
  font-weight: bold;
`;

export const Page = styled.div`
  flex: 1;
  width: 100%;
  max-width: var(--width-page);
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  position: relative;

  @media (max-width: calc(${laptopLarge}px + 6*16px)) {
    padding: 0 3rem;
    max-width: 100%;
  }

  @media (max-width: calc(${tablet}px + 4*16px)) {
    baxckground-color: tomato;
    padding: 0 2rem;
  }

  @media (max-width: calc(${mobile}px + 2*16px)) {
    padding: 0 1rem;
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
  margin: 0;

  ${(props) =>
    props.light &&
    css`
      color: var(--color-text-gray);
      font-weight: 500;
    `}

  ${(props) =>
    props.margin &&
    css`
      margin: 1rem 0;
    `}
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

export const Button = styled.button`
  font-size: 100%;
  font-family: inherit;
  border: 0;
  padding: 0;

  display: inline-block;
  text-align: center;
  color: var(--color-text-dark);
  padding: 0.65rem 1rem;
  border-radius: var(--br);
  cursor: pointer;
  background-color: white;
  transition: box-shadow 0.2s ease-in-out, background 0.2s ease-in-out;
  outline: none;

  ${(props) =>
    props.primary &&
    css`
      background-color: var(--color-main);
      color: var(--color-text-light);
    `}

  &:focus {
    transition-duration: 0s;
    box-shadow: var(--color-main) 0px 0px 0px 0.125rem;
  }

  &:hover {
    box-shadow: var(--color-main-light) 0px 0px 3px 0.125rem;
  }

  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
      box-shadoow: none;
      color: var(--color-text-gray);

      &:focus,
      &:hover {
        box-shadow: none;
      }
    `}
`;
