import { useState } from "react";

const Switch = () => {
  const [state, setState] = useState<boolean>(false);
  const handleChangeStage = () => {
    setState((value) => !value);
  }
  return (
    <>
      <label className="b-switch" onClick={handleChangeStage}>
        <input type="checkbox" className='hidden'/>
        <div className="b-switch-button b-switch-animation"></div>
      </label>
    </>
  )
}

export default Switch;