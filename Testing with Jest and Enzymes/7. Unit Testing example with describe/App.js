import { useState } from 'react';
import './App.css';

function App() {
  const [buttonColor, setButtonColor] = useState('red');
  const [buttonState, setButtonState] = useState(false)
  const newButtonColor = buttonColor === 'red' ? 'blue' : 'red';

  return (
    <div className="App">
      <button
        disabled = {buttonState} 
        style={{ backgroundColor: buttonState  ? 'grey' : buttonColor }}
        onClick={(event) => setButtonColor(newButtonColor)}
        >Change to {newButtonColor}
      </button>
      <input 
       type='checkbox'
       id="disable-button-checked"
       defaultChecked={buttonState}
       aria-checked={buttonState} 
       onChange={(e) => setButtonState(e.target.checked)}
      />
      <label htmlFor="disable-button-checked">Disable button</label>
    </div>
  );
}

export default App;
