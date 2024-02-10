function BoardCard({ pick }) {
  const colors = {
    QB: "bg-qb",
    RB: "bg-rb",
    WR: "bg-wr",
    TE: "bg-te",
    K: "bg-k",
    DEF: "bg-def",
  };

  return (
    <div
      className={`px-2 w-36 h-16 text-sm ${
        colors[pick.player.position] || "bg-slate-300"
      } ${
        pick.player.isProjection ? "bg-opacity-40 opacity-50" : "bg-opacity-50"
      } rounded-lg relative text-sm`}
    >
      <p className="absolute top-0 right-2">
        {pick.round}.{pick.number}
      </p>
      <p>{pick.player.first_name}</p>
      <p>{pick.player.last_name}</p>
      <p>{pick.player.position}</p>
    </div>
  );
}

export default BoardCard;
