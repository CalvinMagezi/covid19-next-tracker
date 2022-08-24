import { atom } from "recoil";

export const CurrentCountries = atom({
  key: "CurrentCountries",
  default: [] as any,
});

export const CurrentCountry = atom({
  key: "CurrentCountry",
  default: "worldwide",
});

export const CurrentCountryInfo = atom({
  key: "CurrentCountryInfo",
  default: [] as any,
});
