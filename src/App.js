import './App.css';

import { MenuItem, FormControl, Select } from "@material-ui/core";
import { useEffect, useState } from 'react';

function App() {

  const [country, setCountry] = useState("Worldwide");
  const [countries, setCountries] = useState([]);

  useEffect(() => {

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          //map is a loop to go through each item individually in an array
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }));
          setCountries(countries);
        })
    };

    getCountriesData();
  }, []);


  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    console.log("yoo guys>>>>", countryCode)

    setCountry(countryCode);

  }




  return (
    <div className="app">

      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown" >
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {
              countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>

      {/**Header */}
      {/** Title + select input dropdown*/}

      {/** infoBoxes */}
      {/** infoBoxes */}
      {/** infoBoxes */}

      {/**Table */}
      {/**Graph */}

      {/**Map */}
    </div>
  );
}

export default App;
