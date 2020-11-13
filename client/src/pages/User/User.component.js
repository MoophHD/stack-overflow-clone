import { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getUser } from "../../redux/user/user.actions";

const User = ({ match, data, getUser }) => {
  useEffect(() => {
    if (match.params.id) getUser(match.params.id);
  }, [match.params.id, getUser]);

  return <Wrapper>{JSON.stringify(data)}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  width: 100vw;
`;

const mapStateToProps = (state) => ({
  data: state.user.data,
});

export default connect(mapStateToProps, { getUser })(User);
