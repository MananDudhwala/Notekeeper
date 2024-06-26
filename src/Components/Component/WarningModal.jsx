import '../CSS/Popups.css'

export default function WarningModal(props) {

  const handleFunc = (btn) => {

    // Check if user has clicked the red button, if yes then call the callback function.
    btn === 'red' && props.warning.func();

    // Close the warning modal immediately after the user has clicked a button.
    props.updateWarning({ ...props.warning, show: false });
  }

  return (
    <div id='warningModal'>

      <div id="warningCont">

        <div id="wpTop">
          <p>{props.warning.msg}</p>
        </div>

        <div id="wpBottom">
          <button id="wpGreenBtn" onClick={() => handleFunc('green')}>{props.warning.greenMsg}</button>
          <button id="wpRedBtn" onClick={() => handleFunc('red')}>{props.warning.redMsg}</button>
        </div>

      </div>

    </div>
  )
}
