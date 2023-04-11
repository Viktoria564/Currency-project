import { useEffect, useState } from "react";
import Currency from "./Currency";

function App() {
  let [currency, setCurrency] = useState([]);
  let [firstCurrency, setFirstCurrency] = useState("AED");
  let [secondCurrency, setSecondCurrency] = useState("AED");
  let [number, setNumber] = useState(0);
  let [result, setResult] = useState(0);

  useEffect(() => {
    fetch("https://api.exchangerate.host/latest")
      .then((response) => response.json())
      .then((obj) => setCurrency(Object.keys(obj.rates)));
  }, []);

  useEffect(() => {
    number !== undefined &&
      fetch(
        `https://api.exchangerate.host/convert?from=${firstCurrency}&to=${secondCurrency}&&amount=${number}`
      )
        .then((response) => response.json())
        .then((obj) => setResult(obj.result));
  }, [firstCurrency, secondCurrency, number]);

  function checkNumber(val) {
    if (Number.isInteger(+val) || Number.isFinite(+val)) {
      setNumber(val);
    }
  }

  return (
    <>
      <h1 className="title">конвертер валют</h1>
      <div className="box">
        <p className="text">Оберіть валюти:</p>
        <div className="box-select">
          <Currency currency={currency} change={setFirstCurrency} />
          <p className="text-select">-</p>
          <Currency currency={currency} change={setSecondCurrency} />
        </div>
        <div className="input-box">
          <div className="boxes">
            <p className="input-text">Ваша сума:</p>
            <input
              onChange={(e) => checkNumber(e.target.value)}
              type="text"
              placeholder="Введіть суму"
              className="input"
            ></input>
          </div>
          <div className="boxes">
            <p className="input-text">Конвертована сума:</p>
            <input
              className="input"
              type="text"
              placeholder="Ваша сума"
              value={result}
            ></input>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
