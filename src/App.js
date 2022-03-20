import React, { useState, useEffect } from "react";
import raw from "./indonesian-words.txt";
import "./App.css";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";

function App() {
  const [words, setWords] = useState([]);
  const [word, setWord] = useState("");
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
  const [keyboard, setKeyboard] = useState([
    [
      { val: "q", status: 0 },
      { val: "w", status: 0 },
      { val: "e", status: 0 },
      { val: "r", status: 0 },
      { val: "t", status: 0 },
      { val: "y", status: 0 },
      { val: "u", status: 0 },
      { val: "i", status: 0 },
      { val: "o", status: 0 },
      { val: "p", status: 0 },
    ],
    [
      { val: "a", status: 0 },
      { val: "s", status: 0 },
      { val: "d", status: 0 },
      { val: "f", status: 0 },
      { val: "g", status: 0 },
      { val: "h", status: 0 },
      { val: "j", status: 0 },
      { val: "k", status: 0 },
      { val: "l", status: 0 },
    ],
    [
      { val: "z", status: 0 },
      { val: "x", status: 0 },
      { val: "c", status: 0 },
      { val: "v", status: 0 },
      { val: "b", status: 0 },
      { val: "n", status: 0 },
      { val: "m", status: 0 },
    ],
  ]);
  const [selectedIdx, setSelectedIdx] = useState([0, 0]);
  const [showToast, setShowToast] = useState(false);
  const [showLoading, setShowLoading] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [toastTime, setToastTime] = useState(3000);
  const [disabled, setDisabled] = useState(false);

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
                  setToastMsg(
                    "Wow, Kamu berhasil!. <a href='https://kbbi.kemdikbud.go.id/entri/" +
                      word +
                      "' target='_blank'>" +
                      word.toUpperCase() +
                      "</a>"
                  );
                  setToastTime(null);
                  setShowToast(true);
                  setDisabled(true);
                } else {
                  if (selectedIdx[0] == 5) {
                    setToastMsg(
                      "Sorry, Kamu gagal!. Kata yang dimaksud adalah <a href='https://kbbi.kemdikbud.go.id/entri/" +
                        word +
                        "' target='_blank'>" +
                        word.toUpperCase() +
                        "</a>"
                    );
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
    const newKeyboard = [...keyboard];
    newData[selectedIdx[0]].data[idx].checked = true;
    setData(newData);
    setTimeout(() => {
      if (
        newData[selectedIdx[0]].data[idx].val.toLowerCase() ==
        word.toLowerCase().charAt(idx)
      ) {
        newData[selectedIdx[0]].data[idx].res = 1;
        newKeyboard.map((item, i) => {
          item.map((item2, j) => {
            if (
              item2.val == newData[selectedIdx[0]].data[idx].val.toLowerCase()
            ) {
              item2.status = 1;
            }
          });
        });
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
        newKeyboard.map((item, i) => {
          item.map((item2, j) => {
            if (
              item2.val == newData[selectedIdx[0]].data[idx].val.toLowerCase()
            ) {
              item2.status = 2;
            }
          });
        });
      } else {
        newData[selectedIdx[0]].data[idx].res = -1;
        newKeyboard.map((item, i) => {
          item.map((item2, j) => {
            if (
              item2.val == newData[selectedIdx[0]].data[idx].val.toLowerCase()
            ) {
              item2.status = -1;
            }
          });
        });
      }
      setData(newData);
      setKeyboard(newKeyboard);
    }, 1000);
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
            setShowLoading(false);
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
        const data = txt.split(",").map((el) => el.replace(/\r/g, ""));
        const challenge = data.filter((item) => item.length == 5);
        const random = Math.floor(Math.random() * challenge.length);
        setWord(challenge[random]);
        setWords(data);
      });
  }

  function reloadPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    if (showToast && toastTime) {
      setTimeout(() => {
        resetError();
      }, toastTime);
    }
  }, [showToast]);

  useEffect(() => {
    if (words.length == 0) fetchWords();
  }, [words]);

  return (
    <div className="container">
      <Grid masterdata={masterdata} selectedIdx={selectedIdx} />
      <Keyboard
        selectedIdx={selectedIdx}
        setSelectedIdx={setSelectedIdx}
        setData={setData}
        masterdata={masterdata}
        disabled={disabled}
        enterHandle={enterHandle}
        keyboard={keyboard}
      />
      <div className={`toast ${showToast ? " show" : ""}`}>
        <div dangerouslySetInnerHTML={{ __html: toastMsg }}></div>
        <div hidden={showToast && !toastTime ? "" : "hidden"}>
          <button className="retry" onClick={reloadPage}>
            Main lagi??
          </button>
          <button className="close" onClick={resetError}>
            Close
          </button>
        </div>
      </div>
      <div className={`loading ${showLoading ? " show" : ""}`}>
        <span>Cek Dulu Gan</span>
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default App;
