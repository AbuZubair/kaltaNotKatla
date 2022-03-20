import React, { useState, useEffect } from "react";

function Keyboard(props) {
  const newData = [...props.masterdata];

  function writeHandle(e) {
    e.preventDefault();
    const letter = e.target.innerText;
    if (
      newData[props.selectedIdx[0]].data[props.selectedIdx[1]] &&
      newData[props.selectedIdx[0]].data[props.selectedIdx[1]].val === ""
    ) {
      newData[props.selectedIdx[0]].data[props.selectedIdx[1]].val = letter;
      if (props.selectedIdx[1] <= 4) {
        props.setSelectedIdx([props.selectedIdx[0], props.selectedIdx[1] + 1]);
      } else {
        if (newData[props.selectedIdx[0]].status != 0)
          props.setSelectedIdx([props.selectedIdx[0] + 1, 0]);
        else return;
      }
      props.setData(newData);
    }
  }

  function backHandle(e) {
    e.preventDefault();
    if (newData[props.selectedIdx[0]].data[props.selectedIdx[1] - 1]) {
      newData[props.selectedIdx[0]].data[props.selectedIdx[1] - 1].val = "";
      props.setSelectedIdx([props.selectedIdx[0], props.selectedIdx[1] - 1]);
      props.setData(newData);
    }
  }

  return (
    <div className="keyboard">
      <div className="flex">
        {props.keyboard[0].map((row, rowIndex) => {
          return (
            <button
              disabled={props.disabled}
              onClick={writeHandle}
              key={rowIndex}
              className={`${
                row.status == 1 ? "green" : row.status == 2 ? "yellow" : row.status == -1 ? "none" : ""
              }`}
            >
              {row.val}
            </button>
          );
        })}
      </div>
      <div className="flex">
        <div className="space"></div>
        {props.keyboard[1].map((row, rowIndex) => {
          return (
            <button
              disabled={props.disabled}
              onClick={writeHandle}
              key={rowIndex}
              className={`${
                row.status == 1 ? "green" : row.status == 2 ? "yellow" : row.status == -1 ? "none" : ""
              }`}
            >
              {row.val}
            </button>
          );
        })}
        <div className="space"></div>
      </div>
      <div className="flex">
        <button
          disabled={props.disabled}
          className="enter-back"
          onClick={props.enterHandle}
        >
          Enter
        </button>
        {props.keyboard[2].map((row, rowIndex) => {
          return (
            <button
              disabled={props.disabled}
              onClick={writeHandle}
              key={rowIndex}
              className={`${
                row.status == 1 ? "green" : row.status == 2 ? "yellow" : row.status == -1 ? "none" : ""
              }`}
            >
              {row.val}
            </button>
          );
        })}
        <button
          disabled={props.disabled}
          className="enter-back"
          onClick={backHandle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              fill="currentColor"
              d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Keyboard;
