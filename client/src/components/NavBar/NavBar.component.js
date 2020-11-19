import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "./components/Logo.component";
import User from "./components/User.component";

const NavBar = ({ userId, firstName, lastName }) => (
  <Container>
    <Link to="/">
      <Logo />
    </Link>

    <UserLink to={userId ? `/user/${userId}/` : `/auth/`}>
      {firstName && lastName ? (
        <User firstName={firstName} lastName={lastName} />
      ) : (
        <SignText>Sign Up or Sign In</SignText>
      )}
    </UserLink>
  </Container>
);

const Container = styled.header`
  width: 100%;
  padding: 0.35rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-plain);
  border-bottom: 1px solid var(--color-main);
`;

const UserLink = styled(Link)`
  text-decoration: none;
`;

const SignText = styled.span`
  text-decoration: none;
`;

export default NavBar;
