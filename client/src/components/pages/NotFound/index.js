import styled from "styled-components";
import { Page, Heading } from "components/shared/lib";

const NotFound = () => (
  <Page>
    <Center>
      <Title>404</Title>
      <Text>Page wasn't Found</Text>
    </Center>
  </Page>
);

const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 1rem;
`

const Title = styled(Heading)`
  font-size: 12rem;
`;

const Text = styled.p`
  font-size: var(--fs-xlarge);
`

export default NotFound;
