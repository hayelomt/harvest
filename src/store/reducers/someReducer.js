const initState = {
  isLoading: false,
  data: null
};

export default function(state = initState, action) {
  switch (action.type) {
    case 'START_GO':
      return {
        isLoading: true,
        data: null
      };
    case 'DONE_GO':
      return {
        isLoading: false,
        data: action.payload
      };
    default:
      return state;
  }
}
