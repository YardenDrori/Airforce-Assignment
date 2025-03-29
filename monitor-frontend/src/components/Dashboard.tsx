import React, { useState, ReactElement, useRef, useEffect, useCallback } from 'react';
import './Dashboard.css';
const max_altitude = 3000; //max altitude value
const min_altitude = 0; //minimum altitude value
const max_hsi = 360; //max hsi (compass) value
const min_hsi = 0; //min hsi (compass) value
const max_adi = 100; //max adi (attidue indicator) value
const min_adi = 0; //min adi (attitude indicator) value
const altitude_bar_visual_height = 30; //visual height of the altitude bar in EM
const circular_diagnostics_visual_radius = 10; //radius of compass and attitude indicator in EM

function Dashboard(): ReactElement {
  const [content, setContent] = useState<ReactElement | null>(null); //dynamic content loading depending on selected button
  const [altitude_visual, setAltitudeVisual] = useState(0); //the altitude shown in visual tab
  const [hsi_visual, setHSIVisual] = useState(0); //the HSI value shown in visual tab
  const [adi_visual, setADIVisual] = useState(50); //the ADI value shown in visual tab
  const [showPopover, setShowPopover] = useState(false); //popover boolean
  const popoverRef = useRef<HTMLDivElement>(null); //reference to the popover div
  const [activeButton, setActiveButton] = useState(''); //last pressed button
  const [altitude, setAltitude] = useState(''); //input text box value for altitude
  const [hsi, setHsi] = useState(''); //input text box value for HSI
  const [adi, setAdi] = useState(''); //input text box value for ADI
  const [showInvalidInputMsg, setShowInvalidInputMsg] = useState(false); //whether an invalid input msg should be shown in the popover
  const data = {
    altitude: altitude === '' ? undefined : Number(altitude),
    hsi: hsi === '' ? undefined : Number(hsi),
    adi: adi === '' ? undefined : Number(adi),
  };//post schema

  //object containing html for text tab
  const renderText = useCallback(() => {
    return (
      <div className='data-boxes'>
      <div className='data-box-text'>Altitude: {altitude_visual}</div>
      <div className='data-box-text'>HSIf: {hsi_visual}</div>
      <div className='data-box-text'>ADI: {adi_visual}</div>
    </div>
    )
  }, [adi_visual, altitude_visual, hsi_visual]);

  //object contaibing html for visual tab
  const renderVisual = useCallback(() => {
    const skyOffset = (adi_visual/100)*circular_diagnostics_visual_radius
    return (
      <div className='visual-data'>
          <div className='altitude-bar'>
            <div className='arrow-indicater' style={{ top: altitude_bar_visual_height-(altitude_visual / max_altitude*altitude_bar_visual_height)-1+ `rem`}}></div>
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
          <div className='compass' style={{height:circular_diagnostics_visual_radius + 'em', width: circular_diagnostics_visual_radius + 'em'}}>
            <div className='circle'>
              <div className='circle-center'>
              <div className='compass-stationary-needle' style={{height:circular_diagnostics_visual_radius*0.5 + 'em', width: circular_diagnostics_visual_radius*0.8 + 'em', bottom: circular_diagnostics_visual_radius*0.15 + 'em'}}></div>
              <div className='degree-measurements' style={{ transform: `rotate(-${hsi_visual}deg)` }}>
                  <label className='degree-measurement' id='north' style={{transform: `translate(-50%, -50%) rotate(${hsi_visual}deg)`}}>0</label>
                  <label className='degree-measurement' id='east' style={{transform: `translate(-50%, -50%) rotate(${hsi_visual}deg)`}}>90</label>
                  <label className='degree-measurement' id='south' style={{transform: `translate(-50%, -50%) rotate(${hsi_visual}deg)`}}>180</label>
                  <label className='degree-measurement' id='west' style={{transform: `translate(-50%, -50%) rotate(${hsi_visual}deg)`}}>270</label>
                </div>
              </div>
            </div>
          </div>
          <div className='angle-indicator' style={{height:circular_diagnostics_visual_radius + 'em', width: circular_diagnostics_visual_radius + 'em'}}>
            <div className='circle'>
              <div className='angle-indicator-sky'></div>
              <div className='angle-indicator-ground' style={{top: skyOffset + 'em'}}></div>
            </div>
          </div>
        </div>
    )
  }, [adi_visual, altitude_visual, hsi_visual]);

  //function updating info shown when data changes or a button was pressed
  useEffect(() => {
    if (activeButton === 'visual'){
      setContent(renderVisual);
    }
    if (activeButton === 'text'){
      setContent(renderText);
    }
  }, [renderVisual, renderText, activeButton]);

  //function that validates input box input
  function handleValidInput(e: React.ChangeEvent<HTMLInputElement>,min : number,max : number,setState: React.Dispatch<React.SetStateAction<string>>): void{
    const value = e.target.value;
    setState('')
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

  //function that closes the popover if it detects a click outside the popover
  function handleClickOutside(event: MouseEvent): void {
    console.log('found mouse click');
    if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
      setShowPopover(false);
    }
  }

  //function that adds / removes the event listener for button presses depending on if the
  //popover is active or not
  useEffect(() => {
    if (showPopover) {
      document.addEventListener('mousedown', handleClickOutside);
    }
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopover]);

  //function that handles each of the tab buttons and send button
  function handleButtonPress(buttonId: string): void {
    console.log('Button clicked: ', buttonId);
      
    if (buttonId === 'text') {
      if (activeButton === 'text') {
        setActiveButton('');
        setContent(null);
        return;
      }
      setActiveButton('text');
      setContent(renderText);
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
      setShowInvalidInputMsg(false);
    } else if (buttonId === 'submit') {
      //send info on json format to server
      fetch('http://localhost:8080/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      //print server response
      .then(async response => {
        const result = await response.text();
        console.log('Status code:', response.status);
        console.log('Server response:', result);
      
        if (response.status ===200 || response.status === 201) {
          setShowInvalidInputMsg(false);
          setShowPopover(false);//disable popover
          //update visual data
          setAltitudeVisual(Number(altitude));
          setHSIVisual(Number(hsi));
          setADIVisual(Number(adi));
          //remove data from input boxes

        } else if (response.status === 400) {
          setShowInvalidInputMsg(true);
        }
      })

      setAltitude('');
      setHsi('');
      setAdi('');
      console.log('Button clicked: ', buttonId);
    } else {
      console.log('ERROR: unknown buttonID');
    }
  }

  return (
    <div className='main-body'>
      <div className='button-wrapper'>
        <div className='primary-buttons'>
          <button className='button' onClick={() => handleButtonPress('text')}>TEXT</button>
          <button className='button' onClick={() => handleButtonPress('visual')}>VISUAL</button>
        </div>
        {!showPopover && (
          <button className='button' id='plus-button' onClick={() => handleButtonPress('plus')}>+</button>
        )}
      </div>
      <div className='content'>
        {content}
      </div>
      {showPopover && (
        <div className='add-data-popover' ref={popoverRef}>
          <div className='data-popover-center'>
            <div className='data-boxes' id='data-boxes-input'>
              <div className='input-boxes'>
                <label className='input-category'>ALTITUDE:</label>
                <div className='input-box-wrapper'>
                <input className='data-box-input' type='number' placeholder='Altitude' value={altitude} onChange={(e) => handleValidInput(e,min_altitude,max_altitude,setAltitude)}/>
                <p className='input-max-text'>max: {max_altitude}</p>
                </div>
              </div>

              <div className='input-boxes'>
                <label className='input-category'>ADI:</label>
                <div className='input-box-wrapper'>
                  <input className='data-box-input' type='number' placeholder='HSI' value={hsi} onChange={(e) => handleValidInput(e,min_hsi,max_hsi,setHsi)}/>
                  <p className='input-max-text'>max: {max_hsi}</p>
                </div>
              </div>
              <div className='input-boxes'>
                <label className='input-category'>ADI:</label>
                <div className='input-box-wrapper'>
                  <input className='data-box-input' type='number' placeholder='ADI' value={adi} onChange={(e) => handleValidInput(e,min_adi,max_adi,setAdi)}/>
                  <p className='input-max-text'>max: {max_adi}</p>
                </div>
              </div>
            </div>
            <button className='button' id='submit-button' onClick={() => handleButtonPress('submit')}>SEND</button>
          </div>
          {showInvalidInputMsg && (
            <p className='invalid-input-msg'>Invalid input, try again.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;