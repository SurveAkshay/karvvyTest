function capitalizeFirstLetter(inpString) {
    return inpString.trim().charAt(0).toUpperCase() + inpString.slice(1);
}

module.exports = capitalizeFirstLetter;