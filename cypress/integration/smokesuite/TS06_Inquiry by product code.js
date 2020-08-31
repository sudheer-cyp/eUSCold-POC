 
describe("Comparision of inventory inquiry with all products",function()
{
   
     
       Cypress.on('fail', (error, runnable) => {
 throw error

       })
      
    
       const { softExpect } = chai;
         
       
it('To verify inventory inquiry by a product code in 9083',function()

{
     
  cy.writeFile('path/to/TS06.html',"<html><head><title>Test Report</title>"
  
  + "<style type=\"text/css\">"
        + "body {padding:20px; max-width: 100%; overflow:hidden }"
        +"body, table {border: 1px solid black; font-family: arial,sans-serif; font-size: 20px;}" + 
        "th {border: 0.5px solid black; background: #42f5ce; border: 1px solid black;color: #111212; text-align: center;}"
        + "td { border: 0.5px solid black; text-align: center; }" 
        +".success { background-color: green;}"
        +".datamismatch { background-color: red;}"
        + "</style></head>"
    + "<h2 style = \"text-align:center\">Fetch order details by PO Number</h2>"
        + "<div style = \"max-width:100% ; margin: auto\">"
        + "<table style=\"max-width: 98%; width:98% ;overflow: scroll;margin:auto; \"><thead>"
        + "<tr> <th >S.No</th>"
        + "<th >INPUT </th>"
        + "<th >eUSCOLD (9083 Instance)</th> "
        + "<th >EWM (9228 Instance)</th>"
        + "<th >RESULTS</th>"
        + "</tr></thead><tbody>")
 

  cy.visit('http://ecpphxsit.uscold.com:9083/eUSCOLD/jsp/index.jsp')
  cy.fixture('Login 9083').then((user)=>{
    cy.get('#userId').type(user.userId)
    cy.get('#password').type(user.password,{log:false})
  cy.get('[type="image"]').click()
  cy.get('#inv').click()
  cy.contains('Inventory Inquiry').click({force: true})

  //cy.get('[value="511600000100950"]').click({force: true})
  cy.get('#customerNames').select('511600000100950', { force: true })
      cy.wait(4000)
 cy.get('#productCode').invoke('val', '1158')
  

  cy.get('[name="AddProduct"] > img').click()
  cy.get('.btnGray > span').click()
  cy.wait(4000)
  cy.get('[style="width:20%; height:25; text-align:center;"] > #inventoryInquiry_').each(($e1, index, $list) =>
    { 

      cy.wrap($e1)
      .invoke('text')
      .then(text => {
            cy.writeFile('path/to/TS06_data.json', '{"ProductCode":' + '"' + text.trim() +'"' , { encoding: 'ascii'})  
      })
  })
  cy.get('[style="width:20%; height:25 ;text-align:center"]').each(($e1, index, $list) =>
    { 

      cy.wrap($e1)
      .invoke('text')
      .then(text => {
        
            cy.writeFile('path/to/TS06_data.json', ', "ProductDescription":' + '"' + text.trim() +'"' , { encoding: 'ascii',flag: 'a+'})  
      })
  })
  cy.get(':nth-child(5) > #inventoryInquiry_').each(($e1, index, $list) =>
  { 

    cy.wrap($e1)
    .invoke('text')
    .then(text => {
          cy.writeFile('path/to/TS06_data.json', ', "availqty":' + '"' + text.trim() +'"' , { encoding: 'ascii',flag: 'a+'})  
    })
})
cy.get(':nth-child(6) > #inventoryInquiry_').each(($e1, index, $list) =>
{ 

  cy.wrap($e1)
  .invoke('text')
  .then(text => {
        cy.writeFile('path/to/TS06_data.json', ', "holdqty":' + '"' + text.trim() +'"' , { encoding: 'ascii',flag: 'a+'})  
  })
})
cy.get(':nth-child(7) > #inventoryInquiry_').each(($e1, index, $list) =>
{ 

  cy.wrap($e1)
  .invoke('text')
  .then(text => {
        cy.writeFile('path/to/TS06_data.json', ', "totalqtyordered":' + '"' + text.trim() + '"' + "}", { encoding: 'ascii',flag: 'a+'})  
  })
})

  })


})

it('Verifying inventory details by product code in 9228',function()

{
 
  cy.visit('http://10.242.0.195:9228/ewm/login.html')
  cy.fixture('Login 9228').then((user2)=>{
    cy.get('[type="text"]').type(user2.userId2)
    cy.get('[type="password"]').type(user2.password2,{log:false})
  cy.get('.loginButton').click()
  cy.get('#globalWarehouseSelect_chosen > .chosen-single > span').click()
  //cy.get('[data-option-array-index="2"]').click()
  cy.get(".chosen-results > li").contains("160").click()
  cy.wait(2000)
  //cy.get('#globalCustomerSelect_chosen > .chosen-single > span').click()
  //cy.contains('100950').click({force:true})
  //cy.get('[data-option-array-index="48"]', {timeout: 4000}).click()
  //cy.wait(4000)
  cy.get('#searchText').type('Inventory Maintenance').click()
  cy.contains('Inventory Maintenance').click({force:true})
  cy.get('#pem_cust_chosen > .chosen-single > div > b').click()
  cy.contains('100950').click({force:true})
  cy.get('#txt_SubProduct').type('1158')
  cy.get('#basicSrch').click()  
  // cy.get('#usrProfileImg').click()
  //   cy.get('span:nth-of-type(3) > .formblue_link.hand').click()
  cy.wait(4000)
  cy.readFile('path/to/TS06_data.json').then((order) =>
  {
  
    cy.get('#productGrid > tbody > tr  > [title="1158"] > #productCodeGrid_2').each(($e1, index, $list) =>

    {
        if(index==0)

        {
          if(order.ProductCode == $e1.text().trim())
             softExpect(order.ProductCode).to.equal($e1.text().trim(),"eUSCold :" + order.ProductCode + " , Phenix : " + $e1.text().trim()) 
          else
        softExpect(order.ProductCode).to.equal($e1.text().trim(),"eUSCold :" + order.ProductCode + " , Phenix : " + $e1.text().trim())   
        cy.writeFile('path/to/TS06.html', "<tr><td>1</td><td>Product Code</td><td>" + order.ProductCode + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    

        }

    })
    
    cy.get('[title="CAR FARE JMB TENDERLOINS, FRZ"]').each(($e1, index, $list) =>

{
  if(index==0)

  {
    if(order.ProductDescription == $e1.text().trim())
       softExpect(order.ProductDescription).to.equal($e1.text().trim(),"eUSCold :" + order.ProductDescription + " , Phenix : " + $e1.text().trim()) 
    else
  softExpect(order.ProductDescription).to.equal($e1.text().trim(),"eUSCold :" + order.ProductDescription + " , Phenix : " + $e1.text().trim())   
  cy.writeFile('path/to/TS06.html', "<tr><td>2</td><td>Product Description</td><td>" + order.ProductDescription + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    

}

})
cy.get('#productGrid > tbody > tr  > [style="text-align:center;"] > [name="expandedQty"] > .float_R').each(($e1, index, $list) =>

{
  if(index==1)

  {
    if(order.availqty == $e1.text().trim())
       softExpect(order.availqty).to.equal($e1.text().trim(),"eUSCold :" + order.availqty + " , Phenix : " + $e1.text().trim()) 
    else
  softExpect(order.availqty).to.equal($e1.text().trim(),"eUSCold :" + order.availqty + " , Phenix : " + $e1.text().trim())   
  cy.writeFile('path/to/TS06.html', "<tr><td>3</td><td>Available Quantity</td><td>" + order.availqty + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='datamismatch'>" + "Data Mismatch" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    

}

})
cy.get('[title="242242"] > [name="expandedQty"] > .float_R').each(($e1, index, $list) =>

{
  if(index==0)

  {
    if(order.orderedqty == $e1.text().trim())
       softExpect(order.holdqty).to.equal($e1.text().trim(),"eUSCold :" + order.holdqty + " , Phenix : " + $e1.text().trim()) 
    else
  softExpect(order.holdqty).to.equal($e1.text().trim(),"eUSCold :" + order.holdqty + " , Phenix : " + $e1.text().trim())   
  cy.writeFile('path/to/TS06.html', "<tr><td>4</td><td>Hold Quantity</td><td>" + order.holdqty + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='datamismatch'>" + "Data Mismatch" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    

}

})

cy.get('[title="18151815"] > [name="expandedQty"] > .float_R').each(($e1, index, $list) =>

{
  if(index==0)

  {
    if(order.totalqtyordered == $e1.text().trim())
       softExpect(order.totalqtyordered).to.equal($e1.text().trim(),"eUSCold :" + order.totalqtyordered + " , Phenix : " + $e1.text().trim()) 
    else
  softExpect(order.totalqtyordered).to.equal($e1.text().trim(),"eUSCold :" + order.totalqtyordered + " , Phenix : " + $e1.text().trim())   
  cy.writeFile('path/to/TS06.html', "<tr><td>5</td><td>Total Quantity Ordered</td><td>" + order.totalqtyordered + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    

}

})
    })

//cy.writeFile('path/to/TS06_data.json', {} , { encoding: 'ascii'}) 
cy.writeFile('path/to/TS06.html',"</tbody></table></div></body></html>", { encoding: 'ascii' , flag: 'a+' })
})


})
})
