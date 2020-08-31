
  /// <reference types="Cypress" />

  describe(" Comparison of receipt details  for a specific receipt number",function()
  {

  Cypress.on('fail', (error, runnable) => {
  
  throw error
  })

//   var softAssert = chai.assert
//   var softExpect = chai.expect

const { softExpect } = chai;

  //const { softAssert, softExpect } = chai;


  it('Verify Receipt details by giving specific receipt number in 9083',function()

  {
    cy.writeFile('path/to/TS09.html',"<html><head><title>Test Report</title>"
  
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
      cy.contains('Receipt Inquiry').click({force: true})
      cy.get('#receiptInquirySelection_customerNames').select('511600000100950', { force: true })
      cy.get('input#receiptInquirySelection_receiptNumber').type('21081')
      
      cy.get('.btnGray > span').click()

      cy.wait(4000)
      
          cy.get(':nth-child(1) > #ReceiptInquiryDetail_').each(($e1, index, $list) =>
          { 

              if (index==0) 

              {

                  cy.wrap($e1)
                  .invoke('text')
                  .then(text => {
                       cy.writeFile('path/to/TS09_data.json', '{"ApptNumber":' + '"' + text.trim() +'"' , { encoding: 'ascii'})  
                  })
              }
          })
      
          cy.get(':nth-child(2) > #ReceiptInquiryDetail_').each(($e1, index, $list) =>
          { 
      
              if (index==0)

              {

                  cy.wrap($e1)
                  .invoke('text')
                  .then(text => {
                      cy.writeFile('path/to/TS09_data.json', ', "ReceiptNumber":' + '"' + text.trim() +'"' , { encoding: 'ascii', flag: 'a+' })  
                  })
              }
           })
          cy.get('#row > tbody > tr.odd > :nth-child(3)').each(($e1, index, $list) =>
          { 
      
              if (index==0)

              {

                  cy.wrap($e1)
                  .invoke('text')
                  .then(text => {
                    cy.writeFile('path/to/TS09_data.json', ', "ReceiptDate":' + '"' + text.trim() +'"' , { encoding: 'ascii', flag: 'a+' })  
                  })
              }
          })

          cy.get('#row > tbody > tr.odd > :nth-child(4)').each(($e1, index, $list) =>
          { 

              if (index==0)

              {

                  cy.wrap($e1)
                  .invoke('text')
                  .then(text => {
                       cy.writeFile('path/to/TS09_data.json', ', "Carrier":' + '"' + text.trim() +'"' , { encoding: 'ascii', flag: 'a+'})  
                   })
              }
          })
          
          cy.get('tr.odd > :nth-child(8)').each(($e1, index, $list) =>
          { 
      
              if (index==0)

              {

                  cy.wrap($e1)
                  .invoke('text')
                  .then(text => {
                      cy.writeFile('path/to/TS09_data.json', ', "Status":' + '"' + text.trim()+ '"' + "}", { encoding: 'ascii', flag: 'a+' })
                      
                    })


              }
      
          })
        }) // Login Details Fixture
       
  }) 




  it('Verify Receipt details by giving specific receipt number in 9228',function()

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
cy.get('form.ng-untouched > .form-inline > formelements > .formelements > .formelements-column-1 > .formelements-row > .formelement > formelement-select > .formelement-select > label > .btn').click()
cy.contains('100950').click({force:true})
        cy.wait(5000)
        cy.get('.form-inline > formelements > .formelements > .formelements-column-3 > .formelements-row > .formelement > formelement-text > .formelement-text > label > .input-group > .form-control').type('21081')
        cy.get('.form-inline > .btn-primary').click()
      
      cy.readFile('path/to/TS09_data.json').then((order) =>
      {
        cy.get('.rm_apptNumber > anchor > a').each(($e1, index, $list) =>

        {

            if(index==0)
            {
                if(order.ApptNumber == $e1.text().trim())
                   softExpect(order.ApptNumber).to.equal($e1.text().trim(),"eUSCold :" + order.ApptNumber + " , Phenix : " + $e1.text().trim()) 
                else
              softExpect(order.ApptNumber).to.equal($e1.text().trim(),"eUSCold :" + order.ApptNumber + " , Phenix : " + $e1.text().trim())    
            cy.writeFile('path/to/TS09.html', "<tr><td>1</td><td>Appt Number</td><td>" + order.ApptNumber + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    
            }
        })
        cy.get('.rm_receiptNumber > anchor > a').each(($e1, index, $list) =>
        { 

            if(index==0)
            {
                if(order.ReceiptNumber == $e1.text().trim())
                   softExpect(order.ReceiptNumber).to.equal($e1.text().trim(),"eUSCold :" + order.ReceiptNumber + " , Phenix : " + $e1.text().trim()) 
                else
              softExpect(order.ReceiptNumber).to.equal($e1.text().trim(),"eUSCold :" + order.ReceiptNumber + " , Phenix : " + $e1.text().trim())        
                cy.writeFile('path/to/TS09.html', "<tr><td>2</td><td>Receipt Number</td><td>" + order.ReceiptNumber + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    
            }
        })
  
     
     
        cy.get('text > .rm_receiptDate').each(($e1, index, $list) =>
        { 

            if(index==0)

            {
                if(order.ReceiptDate == $e1.text().trim())
                   softExpect(order.ReceiptDate).to.equal($e1.text().trim(),"eUSCold :" + order.ReceiptDate + " , Phenix : " + $e1.text().trim()) 
                else
              softExpect(order.ReceiptDate).to.equal($e1.text().trim(),"eUSCold :" + order.ReceiptDate + " , Phenix : " + $e1.text().trim())     
                cy.writeFile('path/to/TS09.html', "<tr><td>3</td><td>Receipt Date</td><td>" + order.ReceiptDate + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    
            } 
       })
     
     cy.get('td.rm_carrier').each(($e1, index, $list) =>
     { 
      
        if(index==0)
        {
            if(order.Carrier == $e1.text().trim())
               softExpect(order.Carrier).to.equal($e1.text().trim(),"eUSCold :" + order.Carrier + " , Phenix : " + $e1.text().trim()) 
            else
          softExpect(order.Carrier).to.equal($e1.text().trim(),"eUSCold :" + order.Carrier + " , Phenix : " + $e1.text().trim())     
            cy.writeFile('path/to/TS09.html', "<tr><td>4</td><td>Carrier</td><td>" + order.Carrier + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='datamismatch'>" + "Data Mismatch" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    

        }   
      
     })
     cy.get('.rm_status > anchor').each(($e1, index, $list) =>
     {          
        if (index==0)
        
        {
            if(order.Status == $e1.text().trim())
               softExpect(order.Status).to.equal($e1.text().trim(),"eUSCold :" + order.Status + " , Phenix : " + $e1.text().trim()) 
            else
          softExpect(order.Status).to.equal($e1.text().trim(),"eUSCold :" + order.Status + " , Phenix : " + $e1.text().trim())        
            cy.writeFile('path/to/TS09.html', "<tr><td>5</td><td>Status</td><td>" + order.Status + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='datamismatch'>" + "Data Mismatch" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    

        }    
    
     })
  
   
     
   
    }) //read file  
    
    //cy.writeFile('path/to/TS09_data.json', {} , { encoding: 'ascii'}) 
    cy.writeFile('path/to/TS09.html',"</tbody></table></div></body></html>", { encoding: 'ascii' , flag: 'a+' })
  })//it2 ends here
  
  
  })//describe ends here




}) 


  //}) // Describe 


        
      
