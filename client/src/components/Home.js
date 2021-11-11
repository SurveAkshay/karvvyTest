import React, { Fragment, useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../contexts/GlobalState';
import NewCountry from './NewCountry';
import CountrySelector from './CountrySelector';
import ajax from '../utils/ajaxHelper';
import CreateCountryForm from './Forms/CreateCountryForm';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

export const Home = () => {
    const [isOpen, setOpen] = useState(false);
    const { setCountries, currentCountry } = useContext(GlobalContext);
    useEffect(() => {
        const getCountries = async () => {
            try {
                const response = await ajax.get(`/countries`);
                setCountries(response.data.data);
            } catch {
                console.log('Failed');
            }
        };

        getCountries();
    }, []);

    const handleModalClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <div className="App">
                <div className="container mx-auto">
                    <h1 className="text-center  text-3xl mt-20 text-base leading-8 text-black font-bold tracking-wide uppercase">MERN Test</h1>
                    <CountrySelector />
                    <Button className="addCountryBtn" variant="contained" onClick={() => setOpen(true)}>Add new country</Button>
                    {currentCountry?.name &&
                    <>
                    <h2>Selected Country</h2>
                    {/* <Paper elevation={3} > */}
                    <Paper  elevation={3} sx={{ display: 'flex', justifyContent: 'center' }} className="glassParent ">
                        <Box className="marginZero flagDiv">
                            <img src={currentCountry.image} alt={currentCountry.name} />
                        </Box>
                        <Box className="textLeft" sx={{ml:2}}>
                            <h4 style={{marginBottom: 10}}>{currentCountry.name} #{currentCountry.rank}</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </Box>
                        
                    </Paper>
                    {/* </Paper> */}
                    </>
                    }
                    {isOpen &&
                        <NewCountry isOpen={isOpen} handleClose={handleModalClose}>
                            <CreateCountryForm handleClose={handleModalClose}/>
                        </NewCountry>
                    }
                </div>
            </div>
        </Fragment>
    )
}