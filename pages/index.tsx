import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Stats from "../components/Stats";
import { GetStaticProps } from "next";
import { Box, Heading, Select } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import {
  CurrentCountries,
  CurrentCountry,
  CurrentCountryInfo,
} from "../atoms/CountriesAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import TopLayout from "../components/layouts/TopLayout";
import MapComponent from "../components/map";
import ContinentStats from "../components/Stats/ContinentStats";
import toast from "react-hot-toast";
import LineGraph from "../components/graphs/LineGraph";
import { CurrentCaseType } from "../atoms/CardsAtom";
import dynamic from "next/dynamic";

const NoSSRMap = dynamic(() => import("../components/map"), {
  ssr: false,
});

const Home = ({
  stats,
  countries,
  continents,
}: {
  stats: any;
  countries: any;
  continents: any;
}) => {
  const [allCountries, setAllCountries] = useRecoilState(CurrentCountries);
  const [currentCountry, setCurrentCountry] = useRecoilState(CurrentCountry);
  const [countryInfo, setCountryInfo] = useRecoilState(CurrentCountryInfo);
  const currentCaseType = useRecoilValue(CurrentCaseType);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [zoom, setZoom] = useState(3);

  const onCountryChange = async (countryCode: string) => {
    console.log(countryCode);
    setCurrentCountry(countryCode);
    toast.loading("Fetching Country Info", { duration: 4000 });

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        toast.dismiss();
        setCountryInfo(data);
        console.log(data);
        if (countryCode === "worldwide") {
          setMapCenter({
            lat: 34.80746,
            lng: -40.4796,
          });
        } else {
          // setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapCenter({
            lat: data.countryInfo.lat ? data.countryInfo.lat : 34.80746,
            lng: data.countryInfo.long ? data.countryInfo.long : -40.4796,
          });
        }
        setZoom(4);
        toast.success(`Successfully fetched country data`, { duration: 4000 });
      })
      .catch((error) => {
        console.log(error);
        toast.dismiss();
        toast.error("Failed to fetch Country Info", { duration: 4000 });
      });
  };

  useEffect(() => {
    if (!countries) return;
    setAllCountries(countries);
  }, []);

  useEffect(() => {
    setCountryInfo(stats);
  }, []);

  return (
    <TopLayout>
      <main className="grid grid-cols-1 gap-12 p-3 my-5` lg:grid-cols-3">
        <div className="p-5 lg:col-span-2">
          <div className="flex justify-between w-full">
            <Heading
              size="md"
              letterSpacing={3}
              className="font-bold text-red-600"
            >
              COVID-19 Tracker
            </Heading>
            <div>
              <Select
                defaultValue={"worldwide"}
                onChange={(e) => onCountryChange(e.currentTarget.value)}
              >
                <option value="worldwide">Worldwide</option>
                {allCountries?.map((country: any, index: number) => (
                  <option key={index} value={country.value}>
                    {country.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {countryInfo && <Stats stats={countryInfo} />}
        </div>
        <Box className="h-full p-5 rounded-sm shadow-lg border-opacity-40 lg:row-span-2">
          <Heading className="text-center " size="md" letterSpacing={3}>
            Live Cases By Continent
          </Heading>
          <hr className="my-2" />
          <ContinentStats continents={continents} />
          <Heading className="my-5 text-center" size="md" letterSpacing={3}>
            Worldwide New Cases
          </Heading>
          <LineGraph caseType={currentCaseType} />
        </Box>

        <div className="p-3 lg:col-span-2">
          <NoSSRMap
            countries={allCountries}
            center={mapCenter}
            zoom={zoom}
            caseType={currentCaseType}
          />
        </div>
      </main>
    </TopLayout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const countries = await fetch("https://disease.sh/v3/covid-19/countries")
    .then((response) => response.json())
    .then((data) => {
      const all = data.map((country: any) => ({
        name: country.country,
        value: country.countryInfo.iso2,
        lat: country.countryInfo.lat,
        long: country.countryInfo.long,
        cases: country.cases,
        deaths: country.deaths,
        recovered: country.recovered,
        flag: country.countryInfo.flag,
      }));
      return all;
    });

  const stats = await fetch("https://disease.sh/v3/covid-19/all").then(
    (response) => {
      return response.json();
    }
  );

  const continents = await fetch(
    "https://disease.sh/v3/covid-19/continents"
  ).then((response) => {
    return response.json();
  });

  return {
    props: {
      countries,
      stats,
      continents,
    },
  };
};
