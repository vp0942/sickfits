import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Dot = styled.div`
  background: var(--red);
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-feature-settings: 'tnum'; // This is to make sure that the font size doesn't change when the number of items in the cart changes
  font-variant-numeric: tabular-nums; // This is to make sure that the font size doesn't change when the number of items in the cart changes
`;

const AnimationStyles = styled.span`
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: transform 0.4s;
    backface-visibility: hidden; // This is to prevent the text from being visible from the back when it's being animated
  }
  /* Initial state of the entered Dot */
  .count-enter {
    transform: scale(4) rotateX(0.5turn);
  }
  /* Intermediate state of the entered Dot */
  .count-enter-active {
    transform: rotateX(0);
  }
  /* Final state of the entered Dot */
  .count-exit {
    top: 0; // This is to prevent the Dot from moving down when it's being animated
    position: absolute;
    transform: rotateX(0);
  }
  /* Intermediate state of the exited Dot */
  .count-exit-active {
    transform: scale(4) rotateX(0.5turn);
  }
`;

export default function CartCount({ count }) {
  return (
    <AnimationStyles>
      <TransitionGroup>
        <CSSTransition
          unmountOnExit
          className="count"
          classNames="count"
          key={count}
          timeout={{ enter: 400, exit: 400 }}
        >
          <Dot>{count}</Dot>
        </CSSTransition>
      </TransitionGroup>
    </AnimationStyles>
  );
}

CartCount.propTypes = {
  count: PropTypes.number.isRequired,
};
