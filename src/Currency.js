function Currency(props) {
  return (
    <>
      <select className="select" onChange={(e) => props.change(e.target.value)}>
        {props.currency.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
}

export default Currency;
