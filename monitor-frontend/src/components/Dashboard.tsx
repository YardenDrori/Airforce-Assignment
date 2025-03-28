import React, { useState, ReactElement, useRef, useEffect} from 'react';
import './Dashboard.css';
const max_altitude = 3000;
const altitude_bar_visual_height = 30;
const filled = 2750; /*temp untill backend is set up*/
const angle = 75; /*temp untill backend is set up*/


function Dashboard() {
  const [content, setContent] = useState<ReactElement | null>(null);
  const [rotation, setRotation] = useState(45);
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const primary_button = useRef<HTMLDivElement>(null);
  const [activeButton, setActiveButton] = useState('');

  function handleClickOutside(event: MouseEvent) {
    console.log('found mouse click');
    if (popoverRef.current && !popoverRef.current.contains(event.target as Node) && !primary_button.current?.contains(event.target as Node)) {
      setShowPopover(false);
    }
  }

  useEffect(() => {
    if (showPopover) {
      document.addEventListener('mousedown', handleClickOutside);
    }
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopover]);

  function handleClick(buttonId: string) {
    console.log('Button clicked: ', buttonId);
      
    if (buttonId === 'text') {
      if (activeButton === 'text') {
        setActiveButton('');
        setContent(null);
        return;
      }
      setActiveButton('text');
      setContent(
      <div className='data-boxes'>
        <div className='data-box-text'>Altitude: [value]</div>
        <div className='data-box-text'>HIS: [value]</div>
        <div className='data-box-text'>ADI: [value]</div>
      </div>
    );




    } else if (buttonId === 'visual') {
      const skyOffset = (angle/100*10)-5
      if (activeButton === 'visual') {
        setActiveButton('');
        setContent(null);
        return;
      }
      setActiveButton('visual');
      setRotation(35);
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
              <div className='angle-indicator-ground'></div>
            </div>
          </div>
        </div>
        
      );
  } else if (buttonId === 'plus') {
    setShowPopover(!showPopover);
    } else if (buttonId === 'submit') {
      console.log('Button clicked: ', buttonId);
      setShowPopover(!showPopover);
    } else {
      console.log('ERROR: unknown buttonID');
    }
  }

  return (
    <div className='main-body'>
      <div className='button-wrapper'>
        <div className='primary-buttons' ref={primary_button}>
          <button className='button' onClick={() => handleClick('text')}>TEXT</button>
          <button className='button' onClick={() => handleClick('visual')}>VISUAL</button>
        </div>
        {!showPopover && (
          <button className='button' id='plus-button' onClick={() => handleClick('plus')}>+</button>
        )}
      </div>
      <div className='content'>
        {content}
      </div>
      {showPopover && (
        <div className='add-data-popover' ref={popoverRef}>
          <div className='data-popover-center'>
            <div className='data-boxes' id='data-boxes-input'>
                <input className='data-box-input' type='text' placeholder='Altitude' />
                <input className='data-box-input' type='text' placeholder='HIS' />
                <input className='data-box-input' type='text' placeholder='ADI' />
            </div>
            <button className='button' id='submit-button' onClick={() => handleClick('submit')}>SEND</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;