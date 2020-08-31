
/// <reference types="Cypress" />

describe(" Comparing receipt details in a  given date range",function()
{

  Cypress.on('fail', (error, runnable) => {
    
    throw error 
  })

  const { softExpect } = chai;
   
    //const { softAssert, softExpect } = chai;

  
    it('Verify Receipts for a given date range in 9083',function()

    {
      cy.writeFile('path/to/TS08.html',"<html><head><title>Test Report</title>"
  
  + "<style type=\"text/css\">"
        + "body {padding:20px; max-width: 100%; overflow:hidden }"
        +"body, table {border: 1px solid black; font-family: arial,sans-serif; font-size: 20px;}" + 
        "th {border: 0.5px solid black; background: #42f5ce; border: 1px solid black;color: #111212; text-align: center;}"
        + "td { border: 0.5px solid black; text-align: center; }" 
        +".success { background-color: green;}"
        +".datamismatch { background-color: red;}"
        + "</style></head>"
    + "<h2 style = \"text-align:center\">Verify receipts for a given date range</h2>"
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
              cy.contains('Receipt Inquiry').click({force: true})
              cy.get('#receiptInquirySelection_customerNames').select('511600000100950', { force: true })
              cy.get('#tempReceiptStartDt').clear({ force: true }).type('07/01/2020');
              cy.get('#tempReceiptEndDt').clear({ force: true }).type('07/06/2020')
              cy.get('[height="100%"] > :nth-child(1) > :nth-child(1) > :nth-child(7) > td').click()
              cy.get('.btnGray > span').click()
            
              cy.get(':nth-child(4) > :nth-child(2) > #ReceiptInquiryDetail_').each(($e1, index, $list) =>
    { 

      cy.wrap($e1)
      .invoke('text')
      .then(text => {
            cy.writeFile('path/to/TS08_data.json', '{"ReceiptNumber":' + '"' + text.trim() +'"' , { encoding: 'ascii'})  
      })
  })
              
  cy.get('#row > tbody > :nth-child(4) > :nth-child(3)').each(($e1, index, $list) =>
  { 

    cy.wrap($e1)
    .invoke('text')
    .then(text => {
          cy.writeFile('path/to/TS08_data.json', ',"ReceiptDate":' + '"' + text.trim() +'"' , { encoding: 'ascii',flag: 'a+'})  
    })
})
cy.get('#row > tbody > :nth-child(4) > :nth-child(4)').each(($e1, index, $list) =>
  { 

    cy.wrap($e1)
    .invoke('text')
    .then(text => {
          cy.writeFile('path/to/TS08_data.json', ',"Carrier":' + '"' + text.trim() +'"' , { encoding: 'ascii',flag: 'a+'})  
    })
})
cy.get('#row > tbody > :nth-child(4) > :nth-child(1)').each(($e1, index, $list) =>
  { 

    cy.wrap($e1)
    .invoke('text')
    .then(text => {
          cy.writeFile('path/to/TS08_data.json', ',"ApptNumber":' + '"' + text.trim() +'"' , { encoding: 'ascii',flag: 'a+'})  
    })
})
cy.get(':nth-child(4) > :nth-child(8)').each(($e1, index, $list) =>
  { 

    cy.wrap($e1)
    .invoke('text')
    .then(text => {
          cy.writeFile('path/to/TS08_data.json', ',"Status":' + '"' + text.trim() + '"' + "}" , { encoding: 'ascii',flag: 'a+'})  
    })
})


              //cy.get('input#tempfromDate').clear({ force: true }).type('07/03/2020');
              //cy.wait(3000)
              //cy.get('input#temptoDate').clear({ force: true }).type('07/03/2020').type('{Enter}')
              
              //cy.wait(3000)
              //cy.get('#orderInquiry_order_inq_viewallorder').click()       
    }) // Then ends here 

}) // First test case 
    
  
  it('Verify receipts for a given date range in 9228',function()

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
      //cy.get('[data-option-array-index="48"]', {timeout: 4000}).click()
      //cy.wait(4000)
      cy.get('#searchText').type('Receipt Maintenance')
     cy.contains('Receipt Maintenance').click({timeout: 10000})
     cy.wait(4000)
     //cy.get('.form-inline > div[_ngcontent-vao-c147=""] > .btn').click()
     //cy.get('.formelements-grid-4 > :nth-child(1) > [name="customerId"] > .formelement > formelement-select > .formelement-select > label > .btn').click()
     //cy.contains('100950').click({force:true})
      
      cy.get('.btn-link').each(($e1, index, $list) =>
      {
        //debugger
        if(index==0)
        {
        cy.wrap($e1)
        .click()
        }
        //cy.type
      })
      
      cy.get('.formelements-grid-4 > :nth-child(1) > [name="customerId"] > .formelement > formelement-select > .formelement-select > label > .btn').click()
    cy.contains('100950').click({force:true})
     cy.get('.formelements-row-5 > .pristine > formelement-date > .formelement-date > .dropdown > .input-group > .btn > .fa').click()
     cy.get('.formelements-row-5 > .pristine > formelement-date > .formelement-date > .dropdown > .dropdown-menu > :nth-child(1) > formelement-calendar > .calendar-container > .calendar-head > .btn-prev > .fa').click()
     cy.get('.formelements-row-5 > .pristine > formelement-date > .formelement-date > .dropdown > .dropdown-menu > :nth-child(1) > formelement-calendar > .calendar-container > .calendar-body > .calendar-dates > :nth-child(4)').click()
     cy.wait(3000)
          
      cy.get('.formelements-row-5 > :nth-child(1) > formelement-date > .formelement-date > .dropdown > .dropdown-menu > :nth-child(2) > formelement-calendar > .calendar-container > .calendar-head > .btn-prev > .fa').click()
      cy.wait(3000)
     
    //  //cy.get('.formelements-row-5 > .pristine > formelement-date > .formelement-date > .dropdown > .dropdown-menu > :nth-child(2) > formelement-calendar > .calendar-container > .calendar-head > .btn-prev > .fa').click()
      //cy.get('.formelements-row-5 > .pristine > formelement-date > .formelement-date > .dropdown > .dropdown-menu > :nth-child(2) > formelement-calendar > .calendar-container > .calendar-body > .calendar-dates > :nth-child(12)').click()
     
     
     cy.get('.formelements-row-5 > :nth-child(1) > formelement-date > .formelement-date > .dropdown > .dropdown-menu > :nth-child(2) > formelement-calendar > .calendar-container > .calendar-body > .calendar-dates > :nth-child(9)').click()


     // cy.wait(2000)
       cy.get('.advanced-search-form > .col-12 > .btn-primary').click()
      
       cy.readFile('path/to/TS08_data.json').then((order) =>
    {
    
      cy.get(':nth-child(4) > .rm_receiptNumber > anchor > a').each(($e1, index, $list) =>

      {
          if(index==0)

          {
          softExpect(order.ReceiptNumber).to.equal($e1.text().trim()) 
          cy.writeFile('path/to/TS08.html', "<tr><td>1</td><td>Receipt Number</td><td>" + order.ReceiptNumber + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    

          }

      })
      cy.get(':nth-child(4) > td.rm_receiptDate > text > .rm_receiptDate').each(($e1, index, $list) =>

      {
          if(index==0)

          {
          softExpect(order.ReceiptDate).to.equal($e1.text().trim()) 
          cy.writeFile('path/to/TS08.html', "<tr><td>2</td><td>Product Code</td><td>" + order.ReceiptDate + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    

          }

      })
      cy.get(':nth-child(4) > td.rm_carrier > text > .rm_carrier').each(($e1, index, $list) =>

      {
          if(index==0)

          {
          softExpect(order.Carrier).to.equal($e1.text().trim()) 
          cy.writeFile('path/to/TS08.html', "<tr><td>3</td><td>Carrier</td><td>" + order.Carrier + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='datamismatch'>" + "Data Mismatch" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    

          }

      })
      cy.get(':nth-child(4) > .rm_apptNumber > anchor > a').each(($e1, index, $list) =>

      {
          if(index==0)

          {
          softExpect(order.ApptNumber).to.equal($e1.text().trim()) 
          cy.writeFile('path/to/TS08.html', "<tr><td>4</td><td>Appt Number</td><td>" + order.ApptNumber + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    

          }

      })
      cy.get(':nth-child(4) > .rm_status > anchor').each(($e1, index, $list) =>

      {
          if(index==0)

          {
          softExpect(order.Status).to.equal($e1.text().trim()) 
          cy.writeFile('path/to/TS08.html', "<tr><td>5</td><td>Status</td><td>" + order.Status + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='datamismatch'>" + "Data Mismatch" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    

          }

      })

    })

   // cy.writeFile('path/to/TS08_data.json', {} , { encoding: 'ascii'}) 
    cy.writeFile('path/to/TS08.html',"</tbody></table></div></body></html>", { encoding: 'ascii' , flag: 'a+' })
    }) // it ends here 
    
  })

})



