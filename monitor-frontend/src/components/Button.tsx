import './Button.css';

function buttonPressed(buttonId: string): void {
  console.log('Button clicked: ', buttonId);
}

function Button(){

    return (
        <div className='Buttons'>
            <button className='Button' id='text' onClick={(e)=>buttonPressed(e.currentTarget.id)}>TEXT</button>
            <button className='Button' id='visual' onClick={(e)=>buttonPressed(e.currentTarget.id)}>VISUAL</button>
            <button className='Button' id='plus' onClick={(e)=>buttonPressed(e.currentTarget.id)}>+</button>
        </div>
    );
}
export default Button;