import React from 'react';
import PropTypes from 'prop-types';
//import { CSSTransitionGroup } from 'react-transition-group';

function Result(props) {
  return (

      <div>
        Correct Answers <strong>{props.quizResult}</strong>
      </div>

  );
}

Result.propTypes = {
  quizResult: PropTypes.string.isRequired
};

export default Result;