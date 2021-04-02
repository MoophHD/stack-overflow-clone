import { useState } from "react";
import styled from "styled-components";
import { Button, TextArea, Heading } from "components/shared/lib";

const AddAnswer = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  return (
    <Container>
      <Heading margin>Your answer: </Heading>
      <TextArea
        light
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

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

const StyledButton = styled(Button)`
  margin-top: 1rem;
  width: 15rem;
  align-self: center;
`;

export default AddAnswer;
