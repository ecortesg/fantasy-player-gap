export const ADP_TEXT = {
  std: "Standard",
  half_ppr: "Half PPR",
  ppr: "PPR",
  "2qb": "2-QB",
  dynasty_std: "Dynasty Standard",
  dynasty_half_ppr: "Dynasty Half PPR",
  dynasty_ppr: "Dynasty PPR",
  dynasty_2qb: "Dynasty 2-QB",
};

export const GENERAL = [
  {
    id: "adp",
    label: "ADP",
    options: [
      { id: "std", text: "Non PPR" },
      { id: "half_ppr", text: "Half PPR" },
      { id: "ppr", text: "Full PPR" },
      { id: "2qb", text: "2-QB" },
      { id: "dynasty_std", text: "Dynasty Non PPR" },
      { id: "dynasty_half_ppr", text: "Dynasty Half PPR" },
      { id: "dynasty_ppr", text: "Dynasty Full PPR" },
      { id: "dynasty_2qb", text: "Dynasty 2-QB" },
    ],
  },
  {
    id: "teams",
    label: "Teams",
    options: [
      { id: "4", text: "4" },
      { id: "6", text: "6" },
      { id: "8", text: "8" },
      { id: "10", text: "10" },
      { id: "12", text: "12" },
      { id: "14", text: "14" },
      { id: "16", text: "16" },
      { id: "18", text: "18" },
      { id: "20", text: "20" },
      { id: "22", text: "22" },
    ],
  },
  {
    id: "rounds",
    label: "Rounds",
    options: [
      { id: "13", text: "13" },
      { id: "14", text: "14" },
      { id: "15", text: "15" },
      { id: "16", text: "16" },
      { id: "17", text: "17" },
      { id: "18", text: "18" },
    ],
  },
];

export const PASSING = [
  {
    id: "pass_yd",
    label: "Points Per Passing Yard",
    step: "0.01",
  },
  {
    id: "pass_td",
    label: "Passing TD",
  },
  {
    id: "pass_fd",
    label: "Passing 1st Down",
  },
  {
    id: "pass_2pt",
    label: "2-Pt Conversion",
  },
  {
    id: "pass_int",
    label: "Pass Intercepted",
  },
  {
    id: "pass_int_td",
    label: "Pick 6 Thrown",
  },
  {
    id: "pass_cmp",
    label: "Pass Completed",
  },
  {
    id: "pass_att",
    label: "Pass Attempts",
  },
];

export const RUSHING = [
  {
    id: "rush_yd",
    label: "Points Per Rushing Yard",
  },
  {
    id: "rush_td",
    label: "Rushing TD",
  },
  {
    id: "rush_fd",
    label: "Rushing 1st Down",
  },
  {
    id: "rush_2pt",
    label: "2-Pt Conversion",
  },
  {
    id: "rush_att",
    label: "Rush Attempts",
  },
];

export const RECEIVING = [
  {
    id: "rec",
    label: "Reception",
  },
  {
    id: "rec_yd",
    label: "Points Per Receiving Yard",
  },
  {
    id: "rec_td",
    label: "Receiving TD",
  },
  {
    id: "rec_fd",
    label: "Receiving 1st Down",
  },
  {
    id: "rec_2pt",
    label: "2-Pt Conversion",
  },
  {
    id: "rec_0_4",
    label: "0-4 Yard Reception Bonus",
  },
  {
    id: "rec_5_9",
    label: "5-9 Yard Reception Bonus",
  },
  {
    id: "rec_10_19",
    label: "10-19 Yard Reception Bonus",
  },
  {
    id: "rec_20_29",
    label: "20-29 Yard Reception Bonus",
  },
  {
    id: "rec_30_39",
    label: "30-39 Yard Reception Bonus",
  },
  {
    id: "rec_40p",
    label: "40+ Yard Reception Bonus",
  },
  {
    id: "bonus_rec_rb",
    label: "Reception Bonus-RB",
  },
  {
    id: "bonus_rec_wr",
    label: "Reception Bonus-WR",
  },
  {
    id: "bonus_rec_te",
    label: "Reception Bonus-TE",
  },
];

export const DEFENSE = [
  {
    id: "pts_allow_0",
    label: "Points Allowed 0",
  },
  {
    id: "yds_allow_0_100",
    label: "Total Yards Allowed 0-99",
  },
  {
    id: "sack",
    label: "Sack",
  },
  {
    id: "int",
    label: "Interception",
  },
  {
    id: "fum_rec",
    label: "Fumble Recovery",
  },
  {
    id: "safe",
    label: "Safety",
  },
  {
    id: "blk_kick",
    label: "Blocked Kick",
  },
];

export const MISC = [
  {
    id: "fum_lost",
    label: "Fumble Lost",
  },
];

export const DEFAULT_SETTINGS = {
  adp: "half_ppr",
  teams: "12",
  rounds: "15",
  scoring: {
    pass_yd: "0.04",
    pass_td: "4",
    pass_fd: "0",
    pass_2pt: "2",
    pass_int: "-2",
    pass_int_td: "0",
    pass_cmp: "0",
    pass_att: "0",
    rush_yd: "0.1",
    rush_td: "6",
    rush_fd: "0",
    rush_2pt: "2",
    rush_att: "0",
    rec: "0.5",
    rec_yd: "0.1",
    rec_td: "6",
    rec_fd: "0",
    rec_2pt: "2",
    rec_0_4: "0",
    rec_5_9: "0",
    rec_10_19: "0",
    rec_20_29: "0",
    rec_30_39: "0",
    rec_40p: "0",
    bonus_rec_rb: "0",
    bonus_rec_wr: "0",
    bonus_rec_te: "0",
    pts_allow_0: "10",
    yds_allow_0_100: "0",
    sack: "1",
    int: "2",
    fum_rec: "2",
    safe: "2",
    blk_kick: "2",
    fum_lost: "-2",
  },
};

const PROJECTED_STATS = [
  /* Passing */
  "pass_yd",
  "pass_td",
  "pass_fd",
  "pass_2pt",
  "pass_int",
  "pass_cmp",
  "pass_att",
  "cmp_pct",
  "pass_int_td",
  /* Rushing */
  "rush_yd",
  "rush_td",
  "rush_fd",
  "rush_2pt",
  "rush_att",
  /* Receiving */
  "rec",
  "rec_yd",
  "rec_td",
  "rec_fd",
  "rec_2pt",
  "rec_0_4",
  "rec_5_9",
  "rec_10_19",
  "rec_20_29",
  "rec_30_39",
  "rec_40p",
  "bonus_rec_wr",
  "bonus_rec_rb",
  "bonus_rec_te",
  /* Defense */
  "pts_allow_0",
  "yds_allow_0_100",
  "sack",
  "int",
  "fum_rec",
  "safe",
  "blk_kick",
  /* Misc */
  "fum_lost",
  "gp",
  /* Special Teams Player */
  "pr_td",
  "def_kr_td",
  "def_fum_td", // ?
  /* Fantasy points */
  "pts_std",
  "pts_ppr",
  "pts_half_ppr",
  /* ADP */
  "adp_std",
  "adp_rookie",
  "adp_ppr",
  "adp_idp",
  "adp_half_ppr",
  "adp_dynasty_std",
  "adp_dynasty_ppr",
  "adp_dynasty_half_ppr",
  "adp_dynasty_2qb",
  "adp_dynasty",
  "adp_2qb",
];
