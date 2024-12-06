const convertToSlug = (Text) => {
    return Text.toLowerCase()
        .replace(/[^ñáéíóú\w ]+/g, '')
        .replace(/ +/g, '-');
}

module.exports = { convertToSlug }