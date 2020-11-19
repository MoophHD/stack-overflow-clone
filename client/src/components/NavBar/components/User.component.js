import styled from "styled-components";

const User = ({ firstName, lastName }) => (
  <Container>
    <Avatar>{firstName[0] + lastName[0]}</Avatar>
    <Name>
      {firstName} {lastName}
    </Name>
  </Container>
);

const Container = styled.div`
  display: flex;
  align-items: baseline;
`;

const Avatar = styled.div`
  background-color: var(--color-main);
  color: white;
  text-transform: uppercase;
  padding: 0.5rem;
  margin-right: 0.25rem;
`;

const Name = styled.span`
  color: var(--color-main);
`;

export default User;
