import React, { useState, useEffect } from "react";
import raw from "./indonesian-words.txt";
import "./App.css";

function App() {
  const [words, setWords] = useState([]);
  const [word, setWord] = useState('');
  const [masterdata, setData] = useState([
    {
      status: 0,
      data: [
        { checked: false, val: "", res: 0 },
        { checked: false, val: "", res: 0 },
        { checked: false, val: "", res: 0 },
        { checked: false, val: "", res: 0 },
        { checked: false, val: "", res: 0 },
      ],
    },
    {
      status: 0,
      data: [
        { checked: false, val: "", res: 0 },
        { checked: false, val: "", res: 0 },
        { checked: false, val: "", res: 0 },
        { checked: false, val: "", res: 0 },
        { checked: false, val: "", res: 0 },
      ],
    },
    {
      status: 0,
      data: [
        { checked: false, val: "", res: 0 },
        { checked: false, val: "", res: 0 },
        { checked: false, val: "", res: 0 },
        { checked: false, val: "", res: 0 },
        { checked: false, val: "", res: 0 },
      ],
    },
    {
      status: 0,
      data: [
        { checked: false, val: "", res: 0 },
        { checked: false, val: "", res: 0 },
        { checked: false, val: "", res: 0 },
        { checked: false, val: "", res: 0 },
        { checked: false, val: "", res: 0 },
      ],
    },
    {
      status: 0,
      data: [
        { checked: false, val: "", res: 0 },
        { checked: false, val: "", res: 0 },
        { checked: false, val: "", res: 0 },
        { checked: false, val: "", res: 0 },
        { checked: false, val: "", res: 0 },
      ],
    },
    {
      status: 0,
      data: [
        { checked: false, val: "", res: 0 },
        { checked: false, val: "", res: 0 },
        { checked: false, val: "", res: 0 },
        { checked: false, val: "", res: 0 },
        { checked: false, val: "", res: 0 },
      ],
    },
  ]);
  const [selectedIdx, setSelectedIdx] = useState([0, 0]);
  const [showToast, setShowToast] = useState(false);
  const [showLoading, setShowLoading] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [toastTime, setToastTime] = useState(3000);
  const [disabled, setDisabled] = useState(false);

  function writeHandle(e) {
    e.preventDefault();
    const letter = e.target.innerText;
    const newData = [...masterdata];
    if (
      newData[selectedIdx[0]].data[selectedIdx[1]] &&
      newData[selectedIdx[0]].data[selectedIdx[1]].val === ""
    ) {
      newData[selectedIdx[0]].data[selectedIdx[1]].val = letter;
      if (selectedIdx[1] <= 4) {
        setSelectedIdx([selectedIdx[0], selectedIdx[1] + 1]);
      } else {
        if (newData[selectedIdx[0]].status != 0)
          setSelectedIdx([selectedIdx[0] + 1, 0]);
        else return;
      }
      setData(newData);
    }
  }

  async function enterHandle(e) {
    e.preventDefault();
    resetError();
    if (masterdata[selectedIdx[0]].data.every((item) => item.val !== "")) {
      try {
        // setShowLoading(true)
        let input = masterdata[selectedIdx[0]].data.map((item) => item.val);
        const valid = await checkKata(input.join("").toLowerCase());
        if (valid) {
          checkData(0);
          let counter = 1;
          const interval = setInterval(() => {
            checkData(counter);
            if (counter == 4) {
              setTimeout(() => {
                const newData = [...masterdata];
                if (
                  newData[selectedIdx[0]].data.every((item) => item.res == 1)
                ) {
                  newData[selectedIdx[0]].status = 1;
                  setData(newData);
                  setToastMsg("Wow, Congrats! You have finished the game!");
                  setToastTime(5000);
                  setShowToast(true);
                  setDisabled(true);
                }else{
                  if(selectedIdx[0]==5){
                    setToastMsg("Sorry, Kamu gagal!. Kata yang dimaksud adalah <a href='https://kbbi.kemdikbud.go.id/entri/"+word+"' target='_blank'>"+word.toUpperCase()+"</a>");
                    setToastTime(5000);
                    setShowToast(true);
                    setDisabled(true);
                  }
                }
              }, 1500);
              setSelectedIdx([selectedIdx[0] + 1, 0]);
              clearInterval(interval);
            } else {
              counter++;
            }
          }, 1000);
        }
      } catch (error) {}
    } else {
      setError("Kata tidak boleh kosong");
    }
  }

  function checkData(idx) {
    const arr = word.split("");
    const newData = [...masterdata];
    newData[selectedIdx[0]].data[idx].checked = true;
    setData(newData);
    setTimeout(() => {
      if (
        newData[selectedIdx[0]].data[idx].val.toLowerCase() ==
        word.toLowerCase().charAt(idx)
      ) {
        newData[selectedIdx[0]].data[idx].res = 1;
      } else if (
        arr.includes(newData[selectedIdx[0]].data[idx].val.toLowerCase())
      ) {
        if (
          newData[selectedIdx[0]].data.filter(
            (el) =>
              el.val.toLowerCase() ==
              newData[selectedIdx[0]].data[idx].val.toLowerCase()
          ).length <=
          arr.filter(
            (el) => el == newData[selectedIdx[0]].data[idx].val.toLowerCase()
          ).length
        )
          newData[selectedIdx[0]].data[idx].res = 2;
      }
      setData(newData);
    }, 1000);
    
  }

  function backHandle(e) {
    e.preventDefault();
    const newData = [...masterdata];
    if (newData[selectedIdx[0]].data[selectedIdx[1] - 1]) {
      newData[selectedIdx[0]].data[selectedIdx[1] - 1].val = "";
      setSelectedIdx([selectedIdx[0], selectedIdx[1] - 1]);
      setData(newData);
    }
  }

  function checkKata(word) {
    return new Promise((resolve, reject) => {
      const newData = [...masterdata];
      const result = words.includes(word);
      if (result) {
        resetError();
      } else {
        newData[selectedIdx[0]].status = -1;
        setToastMsg("Kata tidak ditemukan");
        setShowToast(true);
      }
      setData(newData);
      resolve(result);
    });
  }

  function checkKBBI(word) {
    return new Promise((resolve, reject) => {
      const newData = [...masterdata];
      fetch("https://new-kbbi-api.herokuapp.com/cari/" + word)
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.status) {
              resetError();
            } else {
              newData[selectedIdx[0]].status = -1;
              setToastMsg(result.message);
              setShowToast(true);
            }
            setData(newData);
            setShowLoading(false)
            resolve(result.status);
          },
          (error) => {
            setError(error.message);
            reject();
          }
        );
    });
  }

  function setError(msg) {
    const newData = [...masterdata];
    newData[selectedIdx[0]].status = -1;
    setToastMsg(msg);
    setShowToast(true);
    setData(newData);
  }

  function resetError() {
    const newData = [...masterdata];
    newData[selectedIdx[0]].status = 0;
    setToastMsg("");
    setShowToast(false);
    setData(newData);
  }

  function fetchWords() {
    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        let txt = text.replace(/\n/g, ",");
        const data = txt.split(",").map(el => el.replace(/\r/g, ""));
        const challenge = data.filter((item) =>item.length == 5);
        const random = Math.floor(Math.random() * challenge.length);
        setWord(challenge[random])
        setWords(data);
      });
  }

  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        resetError();
      }, toastTime);
    }
  }, [showToast]);

  useEffect(() => {
    if(words.length==0)fetchWords();
  },[words]);

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">
          <h1>KALTA(?)</h1>
        </div>
        <div className="grid">
          {masterdata.map((row, rowIndex) => {
            return (
              <div
                className={`row ${row.status == -1 ? "error" : ""}`}
                key={rowIndex}
              >
                {row.data.map((col, colIndex) => {
                  return (
                    <div
                      className={`col ${col.checked ? "checking" : ""} ${
                        col.res == 1 ? " green" : col.res == 2 ? " yellow" : ""
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
      <div className="keyboard">
        <div className="flex">
          <button disabled={disabled} onClick={writeHandle}>
            q
          </button>
          <button disabled={disabled} onClick={writeHandle}>
            w
          </button>
          <button disabled={disabled} onClick={writeHandle}>
            e
          </button>
          <button disabled={disabled} onClick={writeHandle}>
            r
          </button>
          <button disabled={disabled} onClick={writeHandle}>
            t
          </button>
          <button disabled={disabled} onClick={writeHandle}>
            y
          </button>
          <button disabled={disabled} onClick={writeHandle}>
            u
          </button>
          <button disabled={disabled} onClick={writeHandle}>
            i
          </button>
          <button disabled={disabled} onClick={writeHandle}>
            o
          </button>
          <button disabled={disabled} onClick={writeHandle}>
            p
          </button>
        </div>
        <div className="flex">
          <div className="space"></div>
          <button disabled={disabled} onClick={writeHandle}>
            a
          </button>
          <button disabled={disabled} onClick={writeHandle}>
            s
          </button>
          <button disabled={disabled} onClick={writeHandle}>
            d
          </button>
          <button disabled={disabled} onClick={writeHandle}>
            f
          </button>
          <button disabled={disabled} onClick={writeHandle}>
            g
          </button>
          <button disabled={disabled} onClick={writeHandle}>
            h
          </button>
          <button disabled={disabled} onClick={writeHandle}>
            j
          </button>
          <button disabled={disabled} onClick={writeHandle}>
            k
          </button>
          <button disabled={disabled} onClick={writeHandle}>
            l
          </button>
          <div className="space"></div>
        </div>
        <div className="flex">
          <button
            disabled={disabled}
            className="enter-back"
            onClick={enterHandle}
          >
            Enter
          </button>
          <button disabled={disabled} onClick={writeHandle}>
            z
          </button>
          <button disabled={disabled} onClick={writeHandle}>
            x
          </button>
          <button disabled={disabled} onClick={writeHandle}>
            c
          </button>
          <button disabled={disabled} onClick={writeHandle}>
            v
          </button>
          <button disabled={disabled} onClick={writeHandle}>
            b
          </button>
          <button disabled={disabled} onClick={writeHandle}>
            n
          </button>
          <button disabled={disabled} onClick={writeHandle}>
            m
          </button>
          <button
            disabled={disabled}
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
      <div className={`toast ${showToast ? " show" : ""}`} dangerouslySetInnerHTML={{__html: toastMsg}}></div>
      <div className={`loading ${showLoading ? " show" : ""}`} >
        <span>Cek Dulu Gan</span>
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default App;
