import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer'

const initialState = {
    countries: [],
    currentCountry: localStorage.getItem('selectedCountryLocal') ? JSON.parse(localStorage.getItem('selectedCountryLocal')) : {},
}

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function addCountry(country) {
        dispatch({
            type: 'ADD_COUNTRY',
            payload: country
        });
    };

    function selectCountry(country) {
        dispatch({
            type: 'SELECT_COUNTRY',
            payload: country
        });
    };

    function setCountries(data) {
        dispatch({
            type: 'SET_COUNTRY',
            payload: data
        });
    };

    return (<GlobalContext.Provider value={{
        countries: state.countries,
        currentCountry: state.currentCountry,
        selectCountry,
        addCountry,
        setCountries,
    }}>
        {children}
    </GlobalContext.Provider>);
}