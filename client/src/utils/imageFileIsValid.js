const FILEUPLOAD_MAXWIDTH = process.env.REACT_APP_FILEUPLOAD_MAXWIDTH;
const FILEUPLOAD_MAXSIZE = process.env.REACT_APP_FILEUPLOAD_MAXSIZE;

const getImageFileWidth = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const image = new Image();
            image.src = event.target.result;
            image.onload = () => {
                resolve(image.width);
                return image.width;
            };
        };
        reader.onerror = (err) => reject(err);
    });
};

const imageFileIsValid = async (file) => {
    const width = await getImageFileWidth(file);
    if (width <= FILEUPLOAD_MAXWIDTH && file.size <= FILEUPLOAD_MAXSIZE) {
        return { status: true };
    } else {
        return { status: false, message: 'El archivo no es valido, ha superado el ancho (1920) o tamaño (1Mb) maximo' };
    }
}

export default imageFileIsValid;