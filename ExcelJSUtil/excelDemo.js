const ExcelJS = require('exceljs');

//https://rahulshettyacademy.com/upload-download-test/index.html


async function readExcel(searchText,worksheet){
    let object = {row:-1,column:-1};
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if(cell.value === searchText){
                object.row = rowNumber;
                object.column = colNumber;
            }
        });
    });
    return object;
}

async function writeExcel(searchText,replaceText,change,filePath){
    
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const object = await readExcel(searchText,worksheet);
    const cell = worksheet.getCell(object.row+change.rowChange, object.column+change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}
// writeExcel("Pine",450,{rowChange:0,colChange:2},"./testData/download.xlsx")