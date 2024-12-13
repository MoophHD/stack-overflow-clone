import styled, { css } from "styled-components";

// could be expanded to show picture, etc.
const Avatar = ({ initials, large }) => (
  <TextAvatar large={large}>{initials}</TextAvatar>
);

const TextAvatar = styled.span`
  background-color: var(--color-main);
  color: white;
  text-transform: uppercase;
  padding: 0.5rem;
  margin-right: 0.25rem;
  display: inline-block;

  ${(props) =>
    props.large &&
    css`
      margin-right: 1rem;
      padding: 1rem;
      font-size: 4rem;
      font-weight: bold;
    `}
`;

export default Avatar;
