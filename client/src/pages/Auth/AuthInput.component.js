import { forwardRef } from "react";
import Input from "../../components/Input/Input.component";
import styled from "styled-components";

const AuthInput = forwardRef(({ error, label, optional, ...props }, ref) => (
  <Wrapper>
    <Label>
      {label}
      {optional && <LabelOptional> - optional</LabelOptional>}
    </Label>
    <StyledInput danger={!!error} ref={ref} {...props}></StyledInput>
    {error && <Error>{error.message}</Error>}
  </Wrapper>
));

const Label = styled.label`
  margin-left: 0.5rem;
  margin-bottom: 0.25rem;
  color: var(--color-text-gray);
`;

const LabelOptional = styled.span`
  font-style: italic;
  font-size: 0.85em;
`;

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  position: relative;
`;

const Error = styled.span`
  color: var(--color-danger);
  position: absolute;
  bottom: -1.3rem;
  left: 0;
  font-size: 0.9rem;
  font-weight: bold;
`;

const StyledInput = styled(Input)`
  box-shadow: ${(props) =>
    props.danger ? "var(--color-danger) 0px 0px 0px 0.125rem" : "none"};
  background-color: var(--color-plain);
  width: 100%;
`;

export default AuthInput;
