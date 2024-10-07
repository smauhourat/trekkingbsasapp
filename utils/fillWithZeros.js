
module.exports = (number, quantity) => {
    // Convertir el número a cadena
    let numberStr = number.toString();

    // Calcular cuántos ceros se necesitan para alcanzar la cantidad deseada
    let zerosNeeded = quantity - numberStr.length;

    // Si se necesitan ceros, agregarlos a la izquierda
    if (zerosNeeded > 0) {
        numberStr = '0'.repeat(zerosNeeded) + numberStr;
    }

    return numberStr;
}
