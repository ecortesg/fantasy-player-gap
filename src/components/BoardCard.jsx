function BoardCard({ pick }) {
  const colors = {
    QB: "bg-red-300",
    RB: "bg-green-300",
    WR: "bg-blue-300",
    TE: "bg-orange-300",
    K: "bg-purple-300",
    DEF: "bg-yellow-300",
  };

  return (
    <div
      className={`px-2 w-36 h-16 text-sm ${
        colors[pick.player.position] || "bg-slate-300"
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
