import {useDispatch, useSelector} from "react-redux";
import {decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  selectCounterValue,
  selectCounterState,
  reselectDouble,
} from "./counterSlice";
import React, {useState} from "react";

function Counter(){

  const count = useSelector(selectCounterValue);
  const state = useSelector(selectCounterState);
  const double = useSelector(reselectDouble);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div className='my-10'>
      <button className="mr-5 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
              aria-label="Decrement value"
              onClick={() => dispatch(decrement())}
      >
        -1
      </button>

      <div className="inline-block mr-5 px-2 text-center w-1/12">
        <div className="bg-gray-100 flex my-2 px-4 py-4 rounded-lg shadow">
          <div className="flex-1">
            <h2 className="font-bold text-gray-700 my-0">{count}</h2>
          </div>
        </div>
      </div>

      <button className="mr-5 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
              aria-label="Increment value"
              onClick={() => dispatch(increment())}
      >
        +1
      </button>
      <input
        type='number' className="border focus:border-green-500 focus:outline-none mb-6 mr-5 mt-2 px-4 py-2 rounded-lg text-center text-gray-700 w-1/12"
        aria-label="Set increment amount"
        value={incrementAmount}
        onChange={e => setIncrementAmount(e.target.value)}
      />
      <button className="mr-5 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
              onClick={() =>
                dispatch(incrementByAmount(Number(incrementAmount) || 0))
              }
      >
        Add Amount
      </button>
      <button className="mr-5 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
              onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
      >
        Add Async
      </button>
      {state.addingAsync? <span>ADDING ASYNC</span> : <span>&nbsp;</span>}
      <span style={{display: 'block'}}>Double derived with reselect: {double}</span>
    </div>
  );
}

export default Counter;
