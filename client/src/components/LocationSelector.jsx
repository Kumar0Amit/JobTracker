import { useState, useEffect } from 'react';
import axios from 'axios';

function LocationSelector({ user }) {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [country, setCountry] = useState(user.country || '');
  const [state, setState] = useState(user.state || '');
  const [city, setCity] = useState(user.city || '');

  // Fetch countries on mount
  useEffect(() => {
    axios.get('https://countriesnow.space/api/v0.1/countries/positions')
      .then(res => setCountries(res.data.data.map(c => c.name)))
      .catch(err => console.error('Error fetching countries:', err));
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    if (!country) return setStates([]);
    axios.post('https://countriesnow.space/api/v0.1/countries/states', { country })
      .then(res => setStates(res.data.data.states.map(s => s.name)))
      .catch(err => console.error('Error fetching states:', err));
  }, [country]);

  // Fetch cities when state changes
  useEffect(() => {
    if (!country || !state) return setCities([]);
    axios.post('https://countriesnow.space/api/v0.1/countries/state/cities', { country, state })
      .then(res => setCities(res.data.data))
      .catch(err => console.error('Error fetching cities:', err));
  }, [state]);

  return (
    <>
      {/* Country Dropdown */}
      <div className="form-row">
        <label htmlFor="country" className="form-label">Country</label>
        <select
          name="country"
          className="form-input"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setState('');
            setCity('');
          }}
          required
        >
          <option value="">Select Country</option>
          {countries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* State Dropdown */}
      <div className="form-row">
        <label htmlFor="state" className="form-label">State</label>
        <select
          name="state"
          className="form-input"
          value={state}
          onChange={(e) => {
            setState(e.target.value);
            setCity('');
          }}
          disabled={!country}
          required
        >
          <option value="">Select State</option>
          {states.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* City Dropdown */}
      <div className="form-row">
        <label htmlFor="city" className="form-label">City</label>
        <select
          name="city"
          className="form-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={!state}
          required
        >
          <option value="">Select City</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
    </>
  );
}

export default LocationSelector;


