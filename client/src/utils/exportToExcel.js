import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const exportToExcel = (data, fileName, columnHeaders) => {
    // Create a new worksheet
    const worksheet = XLSX.utils.json_to_sheet(data, { header: columnHeaders } )

    // Create a new workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    // Generate the Excel file as a buffer
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

    // Create a Blob from the buffer
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' })

    // Save the file using file-saver
    saveAs(dataBlob, `${fileName}.xlsx`)
};

export default exportToExcel;
