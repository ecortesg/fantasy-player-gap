function RankingsPositionFilter({ onChange }) {
  const positions = ["QB", "RB", "WR", "TE", "K", "DEF"];

  return (
    <div
      className="flex gap-2 sm:text-sm"
      onChange={(e) => onChange(e.target.value)}
    >
      <div key="ALL">
        <input
          type="radio"
          id="ALL"
          name="position"
          value=""
          defaultChecked={true}
          className="mx-1"
        ></input>
        <label htmlFor="ALL">ALL</label>
      </div>
      {positions.map((pos) => {
        return (
          <div key={pos}>
            <input
              type="radio"
              id={pos}
              name="position"
              value={pos}
              className="mx-1"
            ></input>
            <label htmlFor={pos}>{pos}</label>
          </div>
        );
      })}
    </div>
  );
}

export default RankingsPositionFilter;
