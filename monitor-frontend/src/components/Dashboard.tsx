import React, { useState, ReactElement } from 'react';
import './Dashboard.css';
const max_altitude = 3000;
const altitude_bar_visual_height = 30;
const filled = 2750; /*temp untill backend is set up*/
const angle = -50; /*temp untill backend is set up*/


function Dashboard() {
  const [content, setContent] = useState<ReactElement | null>(null);
  const [rotation, setRotation] = useState(45);

  function handleClick(buttonId: string) {
    console.log('Button clicked: ', buttonId);
      
    if (buttonId === 'text') {
      setContent(
      <div className='data-boxes'>
        <div className='data-box-text'>Altitude: [value]</div>
        <div className='data-box-text'>HIS: [value]</div>
        <div className='data-box-text'>ADI: [value]</div>
      </div>
    );




    } else if (buttonId === 'visual') {
      const skyOffset = (angle/100*5)
      setContent(
        <div className='visual-data'>
          <div className='altitude-bar'>
            <div className='arrow-indicater' style={{ top: altitude_bar_visual_height-filled / max_altitude*altitude_bar_visual_height-1+ `rem`}}></div>
            <div className='vertical-bar' style={{ height: altitude_bar_visual_height + `rem` }}>
              <div
                className='filled-bar-area'style={{height: (filled / max_altitude) * altitude_bar_visual_height + 'rem'}}
              ></div>
              <div className="measurement-indicators">
                <div className="measurement-indicator">{max_altitude}</div>
                <div className="measurement-indicator">{(2 * max_altitude) / 3}</div>
                <div className="measurement-indicator">{max_altitude / 3}</div>
                <div className="measurement-indicator">0</div>
              </div>
            </div>
          </div>
          <div className='compass'>
            <div className='circle'>
              <div className='circle-center'>
              <div className='compass-stationary-needle'></div>
              <div className='degree-measurements' style={{ transform: `rotate(-${rotation}deg)` }}>
                  <label className='degree-measurenent' id='north' style={{transform: `translate(-50%, -50%) rotate(${rotation}deg)`}}>0</label>
                  <label className='degree-measurenent' id='east' style={{transform: `translate(-50%, -50%) rotate(${rotation}deg)`}}>90</label>
                  <label className='degree-measurenent' id='south' style={{transform: `translate(-50%, -50%) rotate(${rotation}deg)`}}>180</label>
                  <label className='degree-measurenent' id='west' style={{transform: `translate(-50%, -50%) rotate(${rotation}deg)`}}>270</label>
                </div>
              </div>
            </div>
          </div>
          <div className='angle-indicator'>
            <div className='circle'>
              <div className='angle-indicator-sky' style={{bottom: 5-skyOffset + 'em'}}></div>
              <div className='angle-indicator-ground' style={{top: 5+skyOffset + 'em'}}></div>
            </div>
          </div>
        </div>
        
      );
      setRotation(rotation);
  } else if (buttonId === 'plus') {
      setContent(
      <div className='data-boxes'>
        <div>
          <input className='data-box-plus' type='text' placeholder='Altitude' />
          <input className='data-box-plus' type='text' placeholder='HIS' />
          <input className='data-box-plus' type='text' placeholder='ADI' />
        </div>
        <button className='arrow-button' id='submit-button' onClick={() => handleClick('submit')}>SEND</button>
      </div>
    );
    } else {
      console.log('ERROR: unknown buttonID');
    }
  }

  return (
    <div className='main-body'>
      <div className='Buttons'>
        <button className='Button' onClick={() => handleClick('text')}>TEXT</button>
        <button className='Button' onClick={() => handleClick('visual')}>VISUAL</button>
        <button className='Button' onClick={() => handleClick('plus')}>+</button>
      </div>
      <div className='content'>
        {content}
      </div>
    </div>
  );
}

export default Dashboard;