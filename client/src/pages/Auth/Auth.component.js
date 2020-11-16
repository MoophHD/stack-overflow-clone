import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { connect } from "react-redux";
import { login, register } from "../../redux/auth/auth.actions";
import Input from "../../components/Input/Input.component";
import Button from "../../components/Button/Button.component";

const Auth = ({ isAuthenticated, login, register }) => {
  const [isLogin, setIsLogin] = useState(true);
  // { register, errors, setValue, getValues }
  const { register: registerForm, getValues } = useForm({
    mode: "onChange",
  });

  return (
    <Wrapper>
      <Container>
        <p>isAuthed {isAuthenticated ? "true" : "false"}</p>

        <ChangeTypeBtn onClick={() => setIsLogin(!isLogin)} href="#">
          {isLogin ? "Register instead" : "Login instead"}
        </ChangeTypeBtn>

        <Title>{isLogin ? "Login" : "Register"}</Title>

        <AuthInput
          type="email"
          name="email"
          placeholder="email"
          ref={registerForm()}
        />

        {!isLogin && (
          <>
            <AuthInput
              name="firstName"
              placeholder="first name"
              ref={registerForm()}
            />
            <AuthInput
              name="lastName"
              placeholder="last name"
              ref={registerForm()}
            />
            <AuthInput
              name="jobPosition"
              placeholder="job position"
              ref={registerForm()}
            />
            <AuthInput
              name="jobExperience"
              placeholder="job experience"
              ref={registerForm()}
            />
            <AuthInput
              name="techStack"
              placeholder="tech stack"
              ref={registerForm()}
            />
          </>
        )}

        <AuthInput
          type="password"
          name="password"
          placeholder="password"
          ref={registerForm()}
        />

        <SubmitBtn
          onClick={() => {
            isLogin ? login(getValues()) : register(getValues());
            // const data = getValues();
            // console.log(data);

            // fetch("/api/auth/login", {
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   method: "POST",
            //   body: JSON.stringify(data),
            // })
            //   .then((res) => res.json())
            //   .then((data) => console.log(data));
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

const ChangeTypeBtn = styled.a`
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 0.9rem;
  color: inherit;
  text-decoration: none;
`;

const AuthInput = styled(Input)`
  margin-bottom: 1rem;
  &:last-child {
    margin: 0;
  }
`;

const SubmitBtn = styled(Button)``;

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, register })(Auth);
