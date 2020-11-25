import { useState } from "react";
import styled from "styled-components";
import { Button, TextArea } from "components/shared/lib";

const AddAnswer = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  return (
    <Container>
      <Title>Your answer: </Title>
      <TextArea value={value} onChange={(e) => setValue(e.target.value)} />
      <StyledButton primary onClick={() => onSubmit(value)}>
        Submit
      </StyledButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h2`
  margin: 0;
  font-size: var(--fs-large);
  margin-bottom: 1rem;
`;

const StyledButton = styled(Button)`
  margin-top: 1rem;
  width: 15rem;
  align-self: center;
`;

export default AddAnswer;
