const { test,expect } = require("@playwright/test");
const ExcelJS = require('exceljs');

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
const textSearch = "Banana";
const updateValue = "450";
test("validate download, update and upload file", async ({ page }) => {
  await page.goto(
    "https://rahulshettyacademy.com/upload-download-test/index.html"
  );
  const downloadPromise = page.waitForEvent("download");
  await page.locator("#downloadButton").click();
  const download = await downloadPromise;
  await download.saveAs("./testData/" + download.suggestedFilename());
  await writeExcel("Banana",updateValue,{rowChange:0,colChange:2},"./testData/" + download.suggestedFilename());
  await page.locator("#fileinput").click();
  await page.locator("#fileinput").setInputFiles("./testData/" + download.suggestedFilename());
  const textLocator = page.getByText(textSearch);
  const desiredRow = await page.getByRole('row').filter({ has: textLocator });
  await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);

//   const textlocator = page.getByText(textSearch);
//   const desiredRow = await page.getByRole('row').filter({has :textlocator });
//   console.log(await desiredRow.locator("#cell-4-undefined div[data-tag='allowRowEvents']").allTextContents());
//   console.log(await desiredRow.locator("#cell-4-undefined div[data-tag='allowRowEvents']").allInnerTexts());
//   await expect(desiredRow.locator("#cell-4-undefined div[data-tag='allowRowEvents']")).toContainText(updateValue);
//   await expect(desiredRow.locator("#cell-4-undefined div[data-tag='allowRowEvents']").allTextContents()).toContain(updateValue);

});
