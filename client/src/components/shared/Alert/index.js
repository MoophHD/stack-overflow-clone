import styled from "styled-components";
import { connect } from "react-redux";
import { removeAlert } from "redux/alert/alert.actions";
import Toast from "./Toast";

const Alert = ({ alerts, removeAlert }) => (
  <Container>
    {alerts.length > 0 &&
      alerts.map((alert) => (
        <Toast
          key={alert.id}
          onRemove={() => removeAlert(alert.id)}
          text={alert.message}
        />
      ))}
  </Container>
);

const Container = styled.div`
  pointer-events: none;
  z-index: 100;
  position: fixed;
  right: 0;
  top: 0;

  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;

  width: 15rem;
`;

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { removeAlert })(Alert);
