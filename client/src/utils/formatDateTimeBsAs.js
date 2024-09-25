function formatDateTimeBsAs(date) {
    if (date === undefined || date === '') { return null }
    return new Intl.DateTimeFormat('es-ES', {
        dateStyle: "short",
        timeZone: "America/Buenos_Aires",
        timeStyle: "short"
     }).format(new Date(date))
}

export default formatDateTimeBsAs
