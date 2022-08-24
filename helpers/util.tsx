import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

const casesTypeColors: any = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204,16,52,0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125,215,29,0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67,0.5)",
    multiplier: 2000,
  },
};

export const showDataOnMap = (data: any, caseType = "cases") =>
  data.map((country: any) => (
    <Circle
      center={[country.lat, country.long]}
      fillOpacity={0.4}
      color={casesTypeColors[caseType].hex}
      fillColor={casesTypeColors[caseType].hex}
      radius={Math.sqrt(
        country[caseType] * casesTypeColors[caseType].multiplier
      )}
    >
      <Popup>
        <div className="h-full w-[150px]">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.flag})` }}
          ></div>
          <div className="mt-2 text-xl font-bold">{country.name}</div>
          <div>Cases: {numeral(country.cases).format("0,0")}</div>
          <div>Recovered: {numeral(country.recovered).format("0,0")}</div>
          <div>Deaths: {numeral(country.deaths).format("0,0")}</div>
        </div>
      </Popup>
    </Circle>
  ));
