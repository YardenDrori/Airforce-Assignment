import React, { useState, ReactElement } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [content, setContent] = useState<ReactElement | null>(null);

  function handleClick(buttonId: string) {
    console.log('Button clicked: ', buttonId);
    if (buttonId === 'text') {
      setContent(
      <div className="data-boxes">
        <div className="data-box-text">Altitude: [value]</div>
        <div className="data-box-text">HIS: [value]</div>
        <div className="data-box-text">ADI: [value]</div>
      </div>
    );
    } else if (buttonId === 'visual') {
      setContent(
      <p>Visual content coming soon...</p>
    );
    } else if (buttonId === 'plus') {
      setContent(
      <div className="data-boxes">
        <div>
          <input className="data-box-plus" type="text" placeholder="Altitude" />
          <input className="data-box-plus" type="text" placeholder="HIS" />
          <input className="data-box-plus" type="text" placeholder="ADI" />
        </div>
        <button className='arrow-button' id='submit-button' onClick={() => handleClick("submit")}>SUBMIT</button>
      </div>
    );
    } else {
      console.log('ERROR: unknown buttonID');
    }
  }

  return (
    <div className='main-body'>
      <div className='Buttons'>
        <button className='Button' onClick={() => handleClick("text")}>TEXT</button>
        <button className='Button' onClick={() => handleClick("visual")}>VISUAL</button>
        <button className='Button' onClick={() => handleClick("plus")}>+</button>
      </div>
      <div className='content'>
        {content}
      </div>
    </div>
  );
}

export default Dashboard;