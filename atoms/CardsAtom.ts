import { atom } from "recoil";

export const CurrentCard = atom({
  key: "CurrentCard",
  default: "New Cases",
});

export const CurrentCaseType = atom({
  key: "CurrentCaseType",
  default: "cases",
});
