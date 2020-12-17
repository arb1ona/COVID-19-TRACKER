import React, { useState, useEffect } from "react";
import "./App.css";
import InfoBox from "./InfoBox";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import Map from "./Map";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
    //async->send a request
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode); //update the input
        setCountryInfo(data); //All the data form the country response/store the response
      });
  };

  console.log("hey its Arbiona", countryInfo);

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              {/* Loop through alll the countries
            and show a drop down list of option */}
              <MenuItem value="worldwide">Worldwide</MenuItem>

              {countries.map((country) => (
                <MenuItem>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Coronavirus cases" cases={200} total={200} />
          <InfoBox title="Recovered" cases={200} total={200} />
          <InfoBox title="Deaths" cases={200} total={200} />
        </div>
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>live cases by country</h3>
          {/* Table */}
          <h3>worldwide new cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
