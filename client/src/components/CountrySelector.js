import React, { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalState';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const CountrySelector = () => {
    const { countries, selectCountry, currentCountry } = useContext(GlobalContext);

  return (
    <Box sx={{ justifyContent: 'center' }}>
      <Autocomplete
        id="country-select-demo"
        sx={{ width: 400 , m: 'auto' }}
        options={countries}
        autoHighlight
        defaultValue={currentCountry?.id ? currentCountry : ''}
        disableClearable
        getOptionLabel={(option) => option.name ? option.name : ''}
        renderOption={(props, option) => (
          <Box className="renderCountries" component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <img
              loading="lazy"
              width="20"
              src={option.image}
              alt={option.name}
            />
            {option.name}
          </Box>
        )}
        onChange={(e, value) => {
          if (value != '' || value != null || value.length) {
            localStorage.setItem('selectedCountryLocal', JSON.stringify(value))
            selectCountry(value);
          }}
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a country"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />
    </Box>
  );
}

export default CountrySelector;