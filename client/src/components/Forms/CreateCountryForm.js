import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import useCreateCountry from '../../hooks/useCreateCountry';
import { GlobalContext } from '../../contexts/GlobalState';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateCountryForm = ({handleClose}) => {
    const { createCountry } = useCreateCountry();
    const [formError, setFormError] = useState({
        name: true,
        continent: true,
        image: true,
        rank: true,
    });
    const [fieldValue, setFieldValue] = useState({
        name: '',
        continent: '',
        image: null,
        rank: '',
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [errFlag, setErrFlag] = useState(false);
    
    const { addCountry } = useContext(GlobalContext);

    const handleFieldChange = (key, value) => {
        setFieldValue(prev => {
            const copyData = {...prev};
            copyData[key] = value;
            return copyData;
        })
    }
    const handleImgUpload = (e) => {
        const file = e.target.files[0];
        if (!file) {
            setFormError(prev=> {
                let old = {...prev};
                old.image = true;
                return old;
            });
            return;
        }
        const url = URL.createObjectURL(file);
        setSelectedFile(url);
        setFormError(prev=> {
            let old = {...prev};
            old.image = false
            return old;
        });

        setFieldValue(prev => {
            const copyData = {...prev};
            copyData.image = file;
            return copyData;
        })
    }
    const handleFormSubmit = async () => {
        let formData = new FormData();
        const {
            name,
            rank,
            continent,
            image,
        } = fieldValue;
        formData.append('name', name);
        formData.append('rank', rank);
        formData.append('continent', continent);
        formData.append('image', image);
        createCountry(formData, (flag, data) => {
            if (!flag) {
                setErrFlag(data); // paste the err message here
                setTimeout(() => setErrFlag(''), 2500); // remove err msg
            }
            if (flag) {
                addCountry(data);
                handleClose();
            }
        })
    }
    return (
        <Box
            component="form"
            sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" }
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    error={formError.name}
                    id="standard-error"
                    label="Country Name *"
                    variant="standard"
                    onChange={(e) => {
                        const val = e.target.value.trim();
                        if (!val) {
                            setFormError(prev=> {
                                let old = {...prev};
                                old.name = true
                                return old;
                            });
                        }
                        if (val) {
                            handleFieldChange('name', val);
                            setFormError(prev=> {
                                let old = {...prev};
                                old.name = false
                                return old;
                            });
                        }
                    }}
                />
            </div>
            <div>
                <TextField
                    error={formError.continent}
                    id="standard-error"
                    label="Continent *"
                    variant="standard"
                    onChange={(e) => {
                        const val = e.target.value.trim();
                        if (!val) {
                            setFormError(prev=> {
                                let old = {...prev};
                                old.continent = true
                                return old;
                            });
                        }
                        if (val) {
                            handleFieldChange('continent', val);
                            setFormError(prev=> {
                                let old = {...prev};
                                old.continent = false
                                return old;
                            });
                        }
                    }}
                />
            </div>
            <div>
                <TextField
                    error={formError.continent}
                    id="standard-error"
                    label="Rank *"
                    variant="standard"
                    onChange={(e) => {
                        const val = e.target.value;
                        if (!val) {
                            setFormError(prev=> {
                                let old = {...prev};
                                old.rank = true
                                return old;
                            });
                        }
                        if (val) {
                            handleFieldChange('rank', val);
                            setFormError(prev=> {
                                let old = {...prev};
                                old.rank = false
                                return old;
                            });
                        }
                    }}
                />
            </div>
            <Box>
                <input style={{width : 190}} type="file" name="countryImage" accept="image/png, image/gif, image/jpeg" onChange={handleImgUpload} />
                {!formError.image && <a href={selectedFile} target="_blank" rel="noopener noreferrer"><span>View</span></a>}
            </Box>
            {errFlag && <Alert severity="error">{errFlag}</Alert>}
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 5
            }}>
            <Button variant="outlined" onClick={handleFormSubmit} disabled={formError.image || formError.name || formError.continent}>
                Save
            </Button>
            </Box>
        </Box>
    )
}

export default CreateCountryForm;
