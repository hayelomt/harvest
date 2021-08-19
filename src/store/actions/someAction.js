export default () => dispatch => {
  dispatch({
    type: 'START_GO'
  });

  setTimeout(() => {
    dispatch({
      type: 'DONE_GO',
      payload: { count: 6 }
    });
  }, 5000);
};
