import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  // { register, errors, setValue, getValues }
  const { register, getValues } = useForm({
    mode: "onChange",
  });

  return (
    <Wrapper>
      <Container>
        <ChangeTypeBtn onClick={() => setIsLogin(!isLogin)} href="#">
          {isLogin ? "Register instead" : "Login instead"}
        </ChangeTypeBtn>
        <Title>{isLogin ? "Login" : "Register"}</Title>

        <Input type="email" name="email" placeholder="email" ref={register()} />

        {!isLogin && (
          <>
            <Input name="firstName" placeholder="first name" ref={register()} />
            <Input name="lastName" placeholder="last name" ref={register()} />
            <Input
              name="jobPosition"
              placeholder="job position"
              ref={register()}
            />
            <Input
              name="jobExperience"
              placeholder="job experience"
              ref={register()}
            />
            <Input name="techStack" placeholder="tech stack" ref={register()} />
          </>
        )}

        <Input
          type="password"
          name="password"
          placeholder="password"
          ref={register()}
        />

        <SubmitBtn
          onClick={() => {
            const data = getValues();
            console.log(data);
            
            fetch("/api/auth/login", {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify(data),
            })
              .then((res) => res.json())
              .then((data) => console.log(data));
          }}
        >
          Submit
        </SubmitBtn>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 5rem;
  height: 100vh;
  width: 100vw;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 2rem;
  background-color: darkseagreen;
  position: relative;
`;

const Title = styled.h2`
  font-size: 2rem;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  &:last-child {
    margin: 0;
  }
`;

const ChangeTypeBtn = styled.a`
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 0.9rem;
  color: inherit;
  text-decoration: none;
`;

const SubmitBtn = styled.button``;

export default Auth;
