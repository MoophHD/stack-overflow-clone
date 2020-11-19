import styled from "styled-components";
import Avatar from "../../Avatar/Avatar.component";

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

const Name = styled.span`
  color: var(--color-main);
`;

export default User;
