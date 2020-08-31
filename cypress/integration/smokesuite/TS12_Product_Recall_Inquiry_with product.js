/// <reference types="Cypress" />

describe(" Product Recall Inquiry",function()
{

  Cypress.on('fail', (error, runnable) => {
   
    throw error 
  })

  const { softExpect } = chai;
   
    //const { softAssert, softExpect } = chai;

  
it('Inquiry with a product',function()

{

  cy.writeFile('path/to/TS12.html',"<html><head><title>Test Report</title>"
  
  + "<style type=\"text/css\">"
        + "body {padding:20px; max-width: 100%; overflow:hidden }"
        +"body, table {border: 1px solid black; font-family: arial,sans-serif; font-size: 20px;}" + 
        "th {border: 0.5px solid black; background: #42f5ce; border: 1px solid black;color: #111212; text-align: center;}"
        + "td { border: 0.5px solid black; text-align: center; }" 
        +".success { background-color: green;}"
        +".datamismatch { background-color: red;}"
        + "</style></head>"
         + "<h2 style = \"text-align:center\">Product Recall inquiry by product </h2>"
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
      cy.get('#password').type(user.password)
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
    cy.get('#row > tbody > :nth-child(1) > :nth-child(3)').each(($e1, index, $list) =>
    { 

      cy.wrap($e1)
      .invoke('text')
      .then(text => {
            cy.writeFile('path/to/TS12_data.json', '{"Lotnumber":' + '"' + text.trim() +'"' , { encoding: 'ascii'})  
      })
    })

      cy.get('#row > tbody > :nth-child(1) > :nth-child(4)').each(($e1, index, $list) =>
    { 

      cy.wrap($e1)
      .invoke('text')
      .then(text => {
        
            cy.writeFile('path/to/TS12_data.json', ', "Codedate":' + '"' + text.trim() +'"' , { encoding: 'ascii',flag: 'a+'})  
      })

    })
      cy.get('tbody > :nth-child(1) > :nth-child(13)').each(($e1, index, $list) =>
      { 

          cy.wrap($e1)
          .invoke('text')
          .then(text => {
                cy.writeFile('path/to/TS12_data.json', ', "Receiptno":' + '"' + text.trim() + '"' + "}", { encoding: 'ascii',flag: 'a+'})  
          })
      })

      
    
    
        
    })  //fixture

  })// it 

it('Product recall inqiry by product in 9278',function()

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
  cy.wait(4000)
 // cy.get('.grid-control-container > :nth-child(1) > .btn').click()
 cy.get('.rm_receiptNumber > anchor > a').click()
 cy.wait(5000)
 cy.get('.grid-control-container > :nth-child(1) > .btn').click()

cy.readFile('path/to/TS12_data.json').then((order) =>
    {
      
      cy.get(':nth-child(4) > :nth-child(4) > text > .lot_uscsLotNumber').each(($e1, index, $list) =>
      {

          if(index==0)
          {
            if(order.Lotnumber == $e1.text().trim())
               softExpect(order.Lotnumber).to.equal($e1.text().trim(),"eUSCold :" + order.Lotnumber + " , Phenix : " + $e1.text().trim()) 
            else
          softExpect(order.Lotnumber).to.equal($e1.text().trim(),"eUSCold :" + order.Lotnumber + " , Phenix : " + $e1.text().trim())    
          cy.writeFile('path/to/TS12.html', "<tr><td>1</td><td>lot number</td><td>" + order.Lotnumber + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    
          }
      })
      cy.get(':nth-child(4) > :nth-child(9) > text > .lot_codeDate').each(($e1, index, $list) =>
      { 

          if(index==0)
          {
            if(order.Codedate == $e1.text().trim())
               softExpect(order.Codedate).to.equal($e1.text().trim(),"eUSCold :" + order.Codedate + " , Phenix : " + $e1.text().trim()) 
            else
          softExpect(order.Codedate).to.equal($e1.text().trim(),"eUSCold :" + order.Codedate + " , Phenix : " + $e1.text().trim())        
              cy.writeFile('path/to/TS12.html', "<tr><td>2</td><td>Code Date</td><td>" + order.Codedate + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    
          }
      })

      cy.get(':nth-child(2) > .receipt-info-value').each(($e1, index, $list) =>
      { 

          if(index==0)
          {
            if(order.Receiptno == $e1.text().trim())
               softExpect(order.Receiptno).to.equal($e1.text().trim(),"eUSCold :" + order.Receiptno + " , Phenix : " + $e1.text().trim()) 
            else
          softExpect(order.Receiptno).to.equal($e1.text().trim(),"eUSCold :" + order.Receiptno + " , Phenix : " + $e1.text().trim())        
              cy.writeFile('path/to/TS12.html', "<tr><td>3</td><td>Receipt Number</td><td>" + order.Receiptno + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    
            }    
    
      })
       
        
          
        
         }) //read file  
         
         //cy.writeFile('path/to/TS09_data.json', {} , { encoding: 'ascii'}) 
         cy.writeFile('path/to/TS12.html',"</tbody></table></div></body></html>", { encoding: 'ascii' , flag: 'a+' })
        
  
  
      })// it2
    
    
      //}) // Describe 
    
    
  })