import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  incrementCount,
  decrementCount
} from '../store/actions/counterActions';
import Counter from '../components/counter/Counter';

class CounterContainer extends Component {
  render() {
    const { count, incrementCountAction, decrementCountAction } = this.props;

    return (
      <React.Fragment>
        <Counter
          count={count.counter}
          incrementCount={incrementCountAction}
          decrementCount={decrementCountAction}
        />
      </React.Fragment>
    );
  }
}

CounterContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  count: PropTypes.object.isRequired,
  incrementCountAction: PropTypes.func.isRequired,
  decrementCountAction: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  count: store.count
});

export default connect(
  mapStateToProps,
  { incrementCountAction: incrementCount, decrementCountAction: decrementCount }
)(CounterContainer);
