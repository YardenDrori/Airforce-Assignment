import React, { useState, ReactElement, useRef, useEffect, useCallback } from 'react';
import './Dashboard.css';
const max_altitude = 3000;
const min_altitude = 0;
const max_hsi = 360;
const min_hsi = 0;
const max_adi = 100;
const min_adi = -100;
const altitude_bar_visual_height = 30;

function Dashboard(): ReactElement {
  const [content, setContent] = useState<ReactElement | null>(null);
  const [altitude_visual, setAltitudeVisual] = useState(0);
  const [hsi_visual, setHSIVisual] = useState(0);
  const [adi_visual, setADIVisual] = useState(50);
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [activeButton, setActiveButton] = useState('');
  const [altitude, setAltitude] = useState('');
  const [hsi, setHsi] = useState('');
  const [adi, setAdi] = useState('');
  const data = {
    altitude: Number(altitude),
    hsi: Number(hsi),
    adi: Number(adi),
  };

  const renderVisual = useCallback(() => {
    const skyOffset = (adi_visual/10)
    return (
      <div className='visual-data'>
          <div className='altitude-bar'>
            <div className='arrow-indicater' style={{ top: altitude_bar_visual_height-altitude_visual / max_altitude*altitude_bar_visual_height-1+ `rem`}}></div>
            <div className='vertical-bar' style={{ height: altitude_bar_visual_height + `rem` }}>
              <div
                className='filled-bar-area'style={{height: (altitude_visual / max_altitude) * altitude_bar_visual_height + 'rem'}}
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
              <div className='degree-measurement' style={{ transform: `rotate(-${hsi_visual}deg)` }}>
                  <label className='degree-measurement' id='north' style={{transform: `translate(-50%, -50%) rotate(${hsi_visual}deg)`}}>0</label>
                  <label className='degree-measurement' id='east' style={{transform: `translate(-50%, -50%) rotate(${hsi_visual}deg)`}}>90</label>
                  <label className='degree-measurement' id='south' style={{transform: `translate(-50%, -50%) rotate(${hsi_visual}deg)`}}>180</label>
                  <label className='degree-measurement' id='west' style={{transform: `translate(-50%, -50%) rotate(${hsi_visual}deg)`}}>270</label>
                </div>
              </div>
            </div>
          </div>
          <div className='angle-indicator'>
            <div className='circle'>
              <div className='angle-indicator-sky' style={{bottom: skyOffset + 'em'}}></div>
              <div className='angle-indicator-ground'></div>
            </div>
          </div>
        </div>
    )
  }, [adi_visual, altitude_visual, hsi_visual]);

  useEffect(() => {
    setContent(renderVisual);
  }, [renderVisual]);

  function handleValidInput(e: React.ChangeEvent<HTMLInputElement>,min : number,max : number,setState: React.Dispatch<React.SetStateAction<string>>): void{
    const value = e.target.value;
    
    if (value === ""){
      setState('')
    }
    if (!/^\d*$/.test(value)) {
      return;
    }
    
    const numValue = Number(value);
    if (numValue >= min && numValue <= max) {
      setState(value)
    }
    if (numValue < min)
      setState(String(min));
    if (numValue > max)
      setState(String(max));
  }

  function handleClickOutside(event: MouseEvent): void {
    console.log('found mouse click');
    if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
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

  function handleClick(buttonId: string): void {
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
        <div className='data-box-text'>Altitude: {altitude_visual}</div>
        <div className='data-box-text'>HSIf: {hsi_visual}</div>
        <div className='data-box-text'>ADI: {adi_visual}</div>
      </div>
    );

    } else if (buttonId === 'visual') {
      if (activeButton === 'visual') {
        setActiveButton('');
        setContent(null);
        return;
      }
      setActiveButton('visual');
      setContent(renderVisual);

    } else if (buttonId === 'plus') {
      setShowPopover(!showPopover);
    } else if (buttonId === 'submit') {
      fetch('http://localhost:8080/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setAltitudeVisual(Number(altitude));
      setHSIVisual(Number(hsi));
      setADIVisual(Number(adi));

      if (activeButton === 'visual') {
        setContent(renderVisual());
      }

      setAltitude('');
      setHsi('');
      setAdi('');
      console.log('Button clicked: ', buttonId);
      setShowPopover(!showPopover);

    } else {
      console.log('ERROR: unknown buttonID');
    }
  }

  return (
    <div className='main-body'>
      <div className='button-wrapper'>
        <div className='primary-buttons'>
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
              <input className='data-box-input' type='number' placeholder='Altitude' value={altitude} onChange={(e) => handleValidInput(e,min_altitude,max_altitude,setAltitude)}/>
              <input className='data-box-input' type='number' placeholder='HIS' value={hsi} onChange={(e) => handleValidInput(e,min_hsi,max_hsi,setHsi)}/>
              <input className='data-box-input' type='number' placeholder='ADI' value={adi} onChange={(e) => handleValidInput(e,min_adi,max_adi,setAdi)}/>
            </div>
            <button className='button' id='submit-button' onClick={() => handleClick('submit')}>SEND</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;