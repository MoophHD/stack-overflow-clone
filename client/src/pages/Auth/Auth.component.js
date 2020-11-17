import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { connect } from "react-redux";
import { login, register } from "../../redux/auth/auth.actions";
import Button from "../../components/Button/Button.component";
import AuthInput from "./AuthInput.component";
import { Redirect } from "react-router";

const Auth = ({ isAuthenticated, login, register }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { register: registerForm, getValues, errors } = useForm({
    mode: "onChange",
  });

  return isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <Wrapper>
      <Container>
        <ChangeTypeBtn onClick={() => setIsLogin(!isLogin)} href="#">
          {isLogin ? "New? Register Instead" : "Already a User? Login instead"}
        </ChangeTypeBtn>

        <Title>{isLogin ? "Login" : "Register"}</Title>

        <AuthInputGroup>
          <AuthInput
            label="Email"
            error={errors.email}
            type="email"
            name="email"
            ref={registerForm({
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
          />

          {!isLogin && (
            <InputRow>
              <AuthInput
                label="First Name"
                name="firstName"
                error={errors.firstName}
                ref={registerForm({
                  required: { value: true, message: "First Name is required" },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Please only use letters",
                  },
                })}
              />
              <AuthInput
                label="Last Name"
                name="lastName"
                error={errors.lastName}
                ref={registerForm({
                  required: { value: true, message: "Last Name is required" },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Please only use letters",
                  },
                })}
              />
            </InputRow>
          )}

          <AuthInput
            label="Password"
            type="password"
            name="password"
            error={errors.password}
            ref={registerForm({
              required: { value: true, message: "Password is required" },
              minLength: {
                value: 6,
                message: "Password length should be >= 6",
              },
              maxLength: {
                value: 48,
                message: "Password length should be <= 48",
              },
              validate: {
                hasDigit: (value) =>
                  /\d/.test(value) ||
                  "Password should contain at least one digit",
              },
            })}
          />

          {!isLogin && (
            <>
              <AuthInput
                optional
                label="Current Job Position"
                name="jobPosition"
                ref={registerForm()}
              />
              <AuthInput
                optional
                label="Job Experience"
                name="jobExperience"
                ref={registerForm()}
              />
              <AuthInput
                optional
                label="Tech Stack"
                name="techStack"
                ref={registerForm()}
              />
            </>
          )}
        </AuthInputGroup>

        <SubmitBtn
          primary
          onClick={() => {
            if (errors.length === 0) {
              isLogin ? login(getValues()) : register(getValues());
            }
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
  padding: 2% 0;
  min-height: 100vh;
  width: 100%;
  background-color: var(--color-plain);
  overflow-y: hidden;
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 3rem;
  width: 32rem;
  background-color: white;
  position: relative;
  border-radius: 0.35rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: normal;
  margin: 2rem 0;
`;

const ChangeTypeBtn = styled.a`
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 0.85rem;
  font-weight: bold;
  color: inherit;
  text-decoration: underline;
`;

const AuthInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  width: 100%;
`;

const InputRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

const SubmitBtn = styled(Button)`
  width: 100%;
  font-weight: bold;
`;

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, register })(Auth);
