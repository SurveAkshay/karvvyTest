const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const router = new express.Router();

const singleImageUploadMiddleware = require('../middleware/singleImageUpload'); // middleware to upload images
const capitalizeFirstLetter = require('../utils/capitalizeFirstLetter');

// route for creating new country
router.post('/country', singleImageUploadMiddleware.single("image"), async (req, res) => {
    const url = req.protocol + '://' + req.get('host');    
    try {
        const { name, rank, continent } = req.body;
        if (!rank || !name || !continent) {
            return res.status(400).send({success: false, message: 'All fields are required'});
        }
        fs.readFile("./data/data.json", "utf8", (err, jsonString) => {

            let data = {
                id: uuidv4(),
                rank,
                name: capitalizeFirstLetter(name),
                image: `${url}/static/${req.file.originalname}`,
                continent,
            };
            if (err) {
                if(err.code == 'ENOENT') {
                    fs.writeFile('./data/data.json',JSON.stringify([data], null, 2), 'utf8', () => {
                        return;
                    });
                    return res.status(201).send({success: true, message: "Created Successfully", data});
                }
            }
            const jsonData = JSON.parse(jsonString);
            const alreadyExisted = jsonData.find(item => capitalizeFirstLetter(item.name) == data.name || item.rank == data.rank);
            if (alreadyExisted) {
                const message = capitalizeFirstLetter(alreadyExisted.name) == data.name ? 'Country already exist': 'Rank should be unique'
                return res.status(400).send({success: false, message});
            }
            let newDataToSave = [...jsonData, data];
            fs.writeFile('./data/data.json',JSON.stringify(newDataToSave, null, 2), 'utf8', () => {
                return;
            });
            return res.status(201).send({success: true, message: "Created Successfully", data});
        });
    } 
    catch (e) {
        res.status(400).send(e);
    }
})

// route for getting list of countries
router.get('/countries', async (req, res) => {
    try {
        fs.readFile("./data/data.json", "utf8", (err, jsonString) => {
            if (err) {
                if(err.code == 'ENOENT') {
                    return res.status(200).send({success: true, data: []});
                }
            }
            const jsonData = JSON.parse(jsonString);
            return res.status(200).send({success: true, data: jsonData});
        });
    } catch (e) {
        res.status(500).send(e)
    }
})

// route for getting country data by id
router.get('/country/:id', async (req,res) => {
    try {
        const _id = req.params.id
        fs.readFile("./data/data.json", "utf8", (err, jsonString) => {
            if (err) {
                if(err.code == 'ENOENT') {
                    return res.status(200).send({success: true, data: [], message: 'No data to show'});
                }
            }
            const jsonData = JSON.parse(jsonString);
            const response = jsonData.find(item => item.id == _id);
            return res.status(200).send({success: true, data: response});
        });
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router;