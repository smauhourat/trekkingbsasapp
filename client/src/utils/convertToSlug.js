function convertToSlug(Text) {
    return Text.toLowerCase()
               .replace(/[^ñáéíóú\w ]+/g, '')
               .replace(/ +/g, '-');
  }

  export default convertToSlug;