import React, { useState, useEffect } from "react";

function Grid(props) {
  return (
    <div className="wrapper">
      <div className="title">
        <h1>KALTA(?)</h1>
      </div>
      <div className="grid">
        {props.masterdata.map((row, rowIndex) => {
          return (
            <div
              className={`row ${row.status == -1 ? "error" : ""}`}
              key={rowIndex}
            >
              {row.data.map((col, colIndex) => {
                return (
                  <div
                    className={`col ${col.checked ? "checking" : ""} ${
                      col.res == 1 ? " green" : col.res == 2 ? " yellow" : col.res == -1 ? " none" :""
                    }`}
                    key={colIndex}
                  >
                    {col.val}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Grid;
