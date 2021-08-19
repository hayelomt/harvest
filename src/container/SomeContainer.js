import React, { Component } from 'react';
import { connect } from 'react-redux';
import some from '../store/actions/someAction';

class SomeContainer extends Component {
  // state = {
  //   isLoading: false,
  //   data: null
  // };

  // componentDidMount() {
  //   const { some = {}, someAction } = this.props;
  //   const { isLoading, data } = some;

  //   if (!data) {
  //     console.log('Dispatch new');
  //     someAction();
  //   } else {
  //     console.log('Already in props');
  //     this.setState({
  //       isLoading: false,
  //       data
  //     });
  //   }
  // }

  // static getDerivedStateFromProps(props, state) {
  //   let newState = { ...state };
  //   if (props.some) {
  //     console.log('GDFP Updated props', props.some);
  //     newState = {
  //       ...newState,
  //       isLoading: props.some.isLoading,
  //       data: props.some.data
  //     };
  //   }

  //   return newState;
  // }

  render() {
    // const { isLoading, data } = this.state;

    return (
      <div>
        Some Container
        {/* {isLoading || data === null ? (
          <div>Loading...</div>
        ) : (
          <div>{JSON.stringify(data)}</div>
        )} */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  some: state.some
});

export default connect(
  mapStateToProps,
  {
    someAction: some
  }
)(SomeContainer);
