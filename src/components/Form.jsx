import { useState } from "react";
import "./Form.css";

function Form(props) {
  let [current, setCurrent] = useState(0);

  let handleOnChange = function (event) {
    setCurrent(event.target.value);
  };

  let handleOnBlur = function () {
    let index = props.id;
    props.onChangeInChild(`${index}${current}`);
  };

  return (
    <div className="form-block">
      <label htmlFor="forms">{props.hint}</label>
      <input
        type="number"
        name="forms"
        className="form-dec"
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      />
    </div>
  );
}

export default Form;
