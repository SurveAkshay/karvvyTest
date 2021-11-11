/* eslint-disable import/no-anonymous-default-export */
export default (state, action) => {
    switch (action.type) {
        case 'ADD_COUNTRY':
            return {
                ...state,
                countries: [...state.countries, action.payload]
            };
        case 'SELECT_COUNTRY':
            const selectedCountry = action.payload;
            const currentCountry = state.countries.find(country =>  country.id === selectedCountry.id);
            return {
                ...state,
                currentCountry
            };
        case 'SET_COUNTRY':
            return {
                ...state,
                countries: [...action.payload]
            };
        default: return state;
    }
}