import './App.css';

import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import { useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import Map from './Map';

function App() {

  const [country, setCountry] = useState("Worldwide");
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({})

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


  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then(response => response.json)
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data)
      })

  }




  return (
    <div className="app">
      <div className="app__left">
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

        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={1234} total={2000} />

          <InfoBox title="Recovered" cases={1234} total={3000} />

          <InfoBox title="Deaths" cases={1234} total={4000} />
        </div>

        <Map />
        {/**Map */}
      </div>

      <Card className="app__right">

        <CardContent>
          <h3>Live cases by Country</h3>
          {/**Table */}
          <h3>Worldwide new Cases</h3>
          {/**Graph */}

        </CardContent>

      </Card>

    </div>
  );
}

export default App;
