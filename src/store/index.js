import { createStore } from 'redux';

const initialState = { quantity: 0
};

const counterReducer = (state = initialState, action) => {
  if (action.type === 'increment') {
    return { ...state, quantity: state.quantity + 1 }; 
  }
  if (action.type === 'decrement') {
    if(state.quantity>1){return { ...state, quantity: state.quantity - 1 };}
    else return { ...state, quantity: 0 }; 
  }
  return state;
};

const store = createStore(counterReducer);

export default store;

// const CounterSubscriber = () => {
//   const latestState = store.getState();
//   console.log(latestState);
// };

// store.subscribe(CounterSubscriber);

// store.dispatch({ type: 'increment' });
