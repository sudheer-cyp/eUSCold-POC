/// <reference types="Cypress" />

describe(" Product Recall Inquiry",function()
{

  Cypress.on('fail', (error, runnable) => {
   
    throw error 
  })

  const { softExpect } = chai;
   
 

  
it('Verifying recieved quantity details in 9083',function()

{

  cy.writeFile('path/to/TS13.html',"<html><head><title>Test Report</title>"
  
  + "<style type=\"text/css\">"
        + "body {padding:20px; max-width: 100%; overflow:hidden }"
        +"body, table {border: 1px solid black; font-family: arial,sans-serif; font-size: 20px;}" + 
        "th {border: 0.5px solid black; background: #42f5ce; border: 1px solid black;color: #111212; text-align: center;}"
        + "td { border: 0.5px solid black; text-align: center; }" 
        +".success { background-color: green;}"
        +".datamismatch { background-color: red;}"
        + "</style></head>"
    + "<h2 style = \"text-align:center\">Received Quantity for a lot</h2>"
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
    cy.wait(4000)
    //cy.get('#inv').click()
        
    //cy.contains('Product Recalll Inquiry').click({force: true})
    cy.visit('http://ecpphxsit.uscold.com:9083/eUSCOLD/productRecallSelection.action')
    
    cy.get('#customerNames').select('511600000100950', { force: true })
    cy.get('#productRecallSelection_productCode').type('1158')
    cy.get(':nth-child(1) > [cellpadding="0"] > :nth-child(1) > :nth-child(1) > [nowrap="nowrap"] > .bdyLink > img').click()
    cy.get('[colspan="5"] > table > tbody > :nth-child(1) > [valign="top"] > .bdyLink > img').click()
    cy.get('.btnGreen > span').click()
    cy.wait(6000)
      cy.get('#row > tbody > :nth-child(1) > :nth-child(5)').each(($e1, index, $list) =>
      { 
        cy.wrap($e1) .invoke('text').then(text => {
            cy.writeFile('path/to/TS13_data.json', '{"Shippedfrom":' + '"' + text.trim() +'"' , { encoding: 'ascii'})  
        })
      })

      cy.get('tbody > :nth-child(1) > :nth-child(10)').each(($e1, index, $list) =>
      { 

          cy.wrap($e1) .invoke('text').then(text => {
            cy.writeFile('path/to/TS13_data.json', ', "Receiveddate":' + '"' + text.trim() +'"' , { encoding: 'ascii',flag: 'a+'})  
          })
      })
  

    cy.get('tbody > :nth-child(1) > :nth-child(12)').each(($e1, index, $list) =>
    { 

        cy.wrap($e1).invoke('text').then(text => {
          cy.writeFile('path/to/TS13_data.json', ', "Iordernum":' + '"' + text.trim() +'"' , { encoding: 'ascii',flag: 'a+'})  

        })
    })


    cy.get('tbody > :nth-child(1) > :nth-child(11)').each(($e1, index, $list) =>
    {

    cy.wrap($e1) .invoke('text').then(text => {
        cy.writeFile('path/to/TS13_data.json', ', "Recqty":' + '"' + text.trim() +'"' , { encoding: 'ascii',flag: 'a+'})  
      })
    })


    cy.get('tbody > :nth-child(1) > :nth-child(13)').each(($e1, index, $list) =>
    {

    cy.wrap($e1).invoke('text').then(text => {
      cy.writeFile('path/to/TS13_data.json', ', "Recnum":' + '"' + text.trim() +'"' + "}", { encoding: 'ascii',flag: 'a+'})  
      })
    })

    

  })//fixture
    

}) 

it('Verifying received qty details and comparing with 9083',function()

{
  
  cy.visit('http://10.242.0.195:9228/ewm/login.html')

  cy.get('[type="text"]').type('ssudhee')
  cy.get('[type="password"]').type('welcome1')
  cy.get('.loginButton').click()
  cy.get('#searchText').type('Receipt Maintenance')
  cy.get(':nth-child(11) > ul > [style="display: list-item;"] > .icon-text').click()
  cy.wait(5000)
  cy.get('form.ng-untouched > .form-inline > formelements > .formelements > .formelements-column-1 > .formelements-row > .formelement > formelement-select > .formelement-select > label > .btn').click()
  cy.contains('PERDUE FARMS INC').click({force:true})
  cy.get('.form-inline > formelements > .formelements > .formelements-column-3 > .formelements-row > .formelement > formelement-text > .formelement-text > label > .input-group > .form-control').type('18284')
  cy.get('.form-inline > .btn-primary').click()
  cy.wait(5000)
  //cy.get('.grid-control-container > :nth-child(1) > .btn').click()
  //cy.wait(5000)
cy.readFile('path/to/TS13_data.json').then((order) =>
    {
      
      cy.get('text > .rm_customerName').each(($e1, index, $list) =>

      {

          if(index==0)
          {
            if(order.Shippedfrom == $e1.text().trim())
               softExpect(order.Shippedfrom).to.equal($e1.text().trim(),"eUSCold :" + order.Shippedfrom + " , Phenix : " + $e1.text().trim()) 
            else
          softExpect(order.Shippedfrom).to.equal($e1.text().trim(),"eUSCold :" + order.Shippedfrom + " , Phenix : " + $e1.text().trim())   
          cy.writeFile('path/to/TS13.html', "<tr><td>1</td><td>Shipped From</td><td>" + order.Shippedfrom + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='datamismatch'>" + "Data Mismatch" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    
          }
      })
      cy.get('text > .rm_receiptDate').each(($e1, index, $list) =>
      { 

          if(index==0)
          {
            if(order.Receiveddate == $e1.text().trim())
               softExpect(order.Receiveddate).to.equal($e1.text().trim(),"eUSCold :" + order.Receiveddate + " , Phenix : " + $e1.text().trim()) 
            else
          softExpect(order.Receiveddate).to.equal($e1.text().trim(),"eUSCold :" + order.Receiveddate + " , Phenix : " + $e1.text().trim())        
              cy.writeFile('path/to/TS13.html', "<tr><td>2</td><td>Received Date</td><td>" + order.Receiveddate + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    
          }
      })

      cy.get('text > .rm_custOrderNumber').each(($e1, index, $list) =>
      { 

          if(index==0)
          {
            if(order.Iordernum == $e1.text().trim())
               softExpect(order.Iordernum).to.equal($e1.text().trim(),"eUSCold :" + order.Iordernum + " , Phenix : " + $e1.text().trim()) 
            else
          softExpect(order.Iordernum).to.equal($e1.text().trim(),"eUSCold :" + order.Iordernum + " , Phenix : " + $e1.text().trim())        
              cy.writeFile('path/to/TS13.html', "<tr><td>3</td><td>Inbound Order Number</td><td>" + order.Iordernum + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    
            }    
    
          })
       
          cy.get('text > .rm_recQty').each(($e1, index, $list) =>
          { 
    
              if(index==0)
              {
                if(order.Recqty == $e1.text().trim())
                   softExpect(order.Recqty).to.equal($e1.text().trim(),"eUSCold :" + order.Recqty + " , Phenix : " + $e1.text().trim()) 
                else
              softExpect(order.Recqty).to.equal($e1.text().trim(),"eUSCold :" + order.Recqty + " , Phenix : " + $e1.text().trim())        
                  cy.writeFile('path/to/TS13.html', "<tr><td>4</td><td>Received Quantity</td><td>" + order.Recqty + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='datamismatch'>" + "Data Mismatch" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    
                }    
        
              })
              cy.get('.rm_receiptNumber > anchor > a').each(($e1, index, $list) =>
              { 
        
                  if(index==0)
                  {
                    if(order.Recnum == $e1.text().trim())
                       softExpect(order.Recnum).to.equal($e1.text().trim(),"eUSCold :" + order.Recnum + " , Phenix : " + $e1.text().trim()) 
                    else
                  softExpect(order.Recnum).to.equal($e1.text().trim(),"eUSCold :" + order.Recnum + " , Phenix : " + $e1.text().trim())       
                      cy.writeFile('path/to/TS13.html', "<tr><td>5</td><td>Receipt Number</td><td>" + order.Recnum + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    
                    }    
            
                  })
          
        
         }) //read file  
         
         //cy.writeFile('path/to/TS09_data.json', {} , { encoding: 'ascii'}) 
         cy.writeFile('path/to/TS13.html',"</tbody></table></div></body></html>", { encoding: 'ascii' , flag: 'a+' })
        })//it2 ends here
  
  
})//describe ends here
    
    
    
    
    
    
    
      //}) // Describe 
    
    
  