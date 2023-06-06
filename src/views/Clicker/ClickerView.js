import { useEffect, useRef, useReducer } from 'react';

import ClicksReducer from '../../reducers/ClicksReducer'
import Clicker from '../../components/Clicker/Clicker';
import Autoclicker from '../../components/AutoClickers/AutoClickers';

import  getInitialState  from './GetInitialState';

const ClickerView = ({user}) => {

  const initialState = getInitialState({user})

  const [state, dispatch] = useReducer(ClicksReducer, initialState);
  const callback = useRef();

  useEffect(() => {
    callback.current = () => {
      const currentClics = state.clicks.amount;
      const totalCount = Object.keys(state)
        .reduce(
          (acc, cur, idx) => idx === 0
            ? acc
            : acc + state[cur].amount * (state[cur].cost * 0.1),
          currentClics,
        );

      dispatch({ type: 'update', payload: totalCount });
    };
  }, [state]);

  useEffect(() => {
    const interval = setInterval(() => callback.current(), 1000);
    return () => clearInterval(interval);
  }, [callback]);

  return (
    <div className="game">
      <div className="banner">
        Original example can be found in:
        <a href="https://github.com/Alaricus/clicker-tutorial-react"> GitHub</a>

      </div>
      <Clicker amount={state.clicks.amount} dispatch={dispatch} />
      {
        Object.keys(state).map((tier, idx) => {
          if (idx === 0) { return null; }
          const { cost, amount } = state[tier];
          return (state.clicks.amount >= cost || amount > 0) && (
            <Autoclicker
              key={tier}
              tier={tier}
              amount={amount}
              cost={cost}
              enabled={state.clicks.amount >= cost}
              dispatch={dispatch}
            />
          );
        })
      }
    </div>
  );
};

export default ClickerView;
