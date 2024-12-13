import { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Button, Background } from "components/shared/lib";
import Field from "components/shared/Field";
import { login, register } from "redux/auth/auth.actions";

export const Auth = ({ isAuthenticated, login, register }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { register: registerForm, errors, handleSubmit } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    if (isLogin) {
      login(data);
    } else {
      register(data);
    }
  };

  return isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <Background>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ChangeTypeBtn onClick={() => setIsLogin(!isLogin)} href="#">
          {isLogin ? "New? Register Instead" : "Already a User? Login instead"}
        </ChangeTypeBtn>

        <Title>{isLogin ? "Login" : "Register"}</Title>

        <Field
          id="email"
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
            <Field
              id="first_name"
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
            <Field
              id="last_name"
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

        <Field
          id="password"
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
            <Field
              id="nick_name"
              optional
              label="Nick Name"
              name="nickName"
              ref={registerForm()}
            />
            <Field
              id="current_job"
              optional
              label="Current Job Position"
              name="jobPosition"
              ref={registerForm()}
            />
            <Field
              id="job_experience"
              optional
              label="Job Experience"
              name="jobExperience"
              ref={registerForm()}
            />
            <Field
              id="tech_stack"
              optional
              label="Tech Stack"
              name="techStack"
              ref={registerForm()}
            />
          </>
        )}

        <SubmitBtn type="submit" primary>
          Submit
        </SubmitBtn>
      </Form>
    </Background>
  );
};

const Form = styled.form`
  width: 32rem;
  display: flex;
  padding: 2rem 3rem;
  background-color: white;
  border-radius: var(--br);
  box-shadow: var(--bs-main);
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;

  @media (max-width: 32rem) {
    width: 100%;
    margin: auto 0;
  }
`;

const Title = styled.h2`
  font-size: var(--fs-xlarge);
  font-weight: normal;
  margin: 2rem 0;
`;

const ChangeTypeBtn = styled.a`
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: var(--fs-small);
  font-weight: bold;
  color: inherit;
  text-decoration: underline;
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
  margin-top: 2rem;
`;

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, register })(Auth);
