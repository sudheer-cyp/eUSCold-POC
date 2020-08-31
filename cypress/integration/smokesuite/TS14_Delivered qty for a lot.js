/// <reference types="Cypress" />

describe(" Product Recall Inquiry",function()
{

  Cypress.on('fail', (error, runnable) => {
   
    throw error 
  })

  const { softExpect } = chai;
   
  
  
it('Inquiry with a product',function()

{

  cy.writeFile('path/to/TS14.html',"<html><head><title>Test Report</title>"
  
  + "<style type=\"text/css\">"
        + "body {padding:20px; max-width: 100%; overflow:hidden }"
        +"body, table {border: 1px solid black; font-family: arial,sans-serif; font-size: 20px;}" + 
        "th {border: 0.5px solid black; background: #42f5ce; border: 1px solid black;color: #111212; text-align: center;}"
        + "td { border: 0.5px solid black; text-align: center; }" 
        +".success { background-color: green;}"
        +".datamismatch { background-color: red;}"
        + "</style></head>"
    + "<h2 style = \"text-align:center\">Delivered qty for a lot</h2>"
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
   
    cy.get(':nth-child(2) > :nth-child(14)') .each(($e1, index, $list) =>
    {

    cy.wrap($e1)
  .invoke('text')
  .then(text => {
        cy.writeFile('path/to/TS14_data.json', '{"shipto":' + '"' + text.trim() +'"' , { encoding: 'ascii'})  
      })
    })

    cy.get(':nth-child(2) > :nth-child(20)').each(($e1, index, $list) =>
    {

    cy.wrap($e1) .invoke('text').then(text => {
        cy.writeFile('path/to/TS14_data.json', ', "Oordernum":' + '"' + text.trim() +'"' , { encoding: 'ascii',flag: 'a+'})  
      })
    
})

    cy.get(':nth-child(2) > :nth-child(21)').each(($e1, index, $list) =>
    {

      cy.wrap($e1).invoke('text').then(text => {
      cy.writeFile('path/to/TS14_data.json', ', "Dtnum":' + '"' + text.trim() +'"' , { encoding: 'ascii',flag: 'a+'})  
      })

    })
    cy.get(':nth-child(2) > :nth-child(23)').each(($e1, index, $list) =>
    {

      cy.wrap($e1).invoke('text').then(text => {
      cy.writeFile('path/to/TS14_data.json', ', "shippedqty":' + '"' + text.trim() +'"' , { encoding: 'ascii',flag: 'a+'})  
   })

  })
    cy.get(':nth-child(2) > :nth-child(19)').each(($e1, index, $list) =>
    { 
    
      cy.wrap($e1).invoke('text').then(text => {
            cy.writeFile('path/to/TS14_data.json', ', "Shipdate":' + '"' + text.trim() + '"' + "}", { encoding: 'ascii',flag: 'a+'})  
          })
        
    })


  })//fixture
    

})

it('Verifying delivered qty details for a lot in 9228',function()

{
  
    cy.visit('http://10.242.0.195:9228/ewm/login.html')

    cy.get('[type="text"]').type('ssudhee')
    cy.get('[type="password"]').type('welcome1')
    cy.get('.loginButton').click()
    cy.get('#searchText').type('Order Maintenance')
    //cy.get(':nth-child(11) > ul > [style="display: list-item;"] > .icon-text').click()
    cy.wait(2000)
      cy.contains('Order Maintenance').click({force:true})
      cy.get('[name="customerSysId"] > .formelement > formelement-select > .formelement-select > label > .btn').click()
      cy.contains('PERDUE FARMS INC').click({force:true})
      cy.get('.formelements-column-3 > .formelements-row-1 > .formelement > formelement-text > .formelement-text > label > .input-group > .form-control').type('37714')
      cy.get('.basic-search-actions > .btn-primary').click()

cy.readFile('path/to/TS14_data.json').then((order) =>
    {
      
        cy.get(':nth-child(14) > .gitem > uscs-fe-grid-text > .align-items-center').each(($e1, index, $list) =>

      {

          if(index==0)
          {
            if(order.shipto == $e1.text().trim())
               softExpect(order.shipto).to.equal($e1.text().trim(),"eUSCold :" + order.shipto + " , Phenix : " + $e1.text().trim()) 
            else
          softExpect(order.shipto).to.equal($e1.text().trim(),"eUSCold :" + order.shipto + " , Phenix : " + $e1.text().trim())    
          cy.writeFile('path/to/TS14.html', "<tr><td>1</td><td>Ship To</td><td>" + order.shipto + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='datamismatch'>" + "Data Mismatch" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    
          }
      })
      cy.get(':nth-child(8) > .gitem > uscs-fe-grid-text > .align-items-center').each(($e1, index, $list) =>
      { 

          if(index==0)
          {
            if(order.Oordernum == $e1.text().trim())
               softExpect(order.Oordernum).to.equal($e1.text().trim(),"eUSCold :" + order.Oordernum + " , Phenix : " + $e1.text().trim()) 
            else
          softExpect(order.Oordernum).to.equal($e1.text().trim(),"eUSCold :" + order.Oordernum + " , Phenix : " + $e1.text().trim())        
              cy.writeFile('path/to/TS14.html', "<tr><td>2</td><td>Outbound Ordernum</td><td>" + order.Oordernum + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    
          }
      })

      cy.get(':nth-child(4) > .gitem > uscs-fe-grid-view-link > .align-items-center > .grid-view-link').each(($e1, index, $list) =>
      { 

          if(index==0)
          {
            if(order.Dtnum == $e1.text().trim())
               softExpect(order.Dtnum).to.equal($e1.text().trim(),"eUSCold :" + order.Dtnum + " , Phenix : " + $e1.text().trim()) 
            else
          softExpect(order.Dtnum).to.equal($e1.text().trim(),"eUSCold :" + order.Dtnum + " , Phenix : " + $e1.text().trim())        
              cy.writeFile('path/to/TS14.html', "<tr><td>3</td><td>DT Number</td><td>" + order.Dtnum + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    
            }    
    
          })
       
          cy.get(':nth-child(5) > .gitem > uscs-fe-grid-text > .align-items-center').each(($e1, index, $list) =>
          { 
    
              if(index==0)
              {
                if(order.Shipdate == $e1.text().trim())
                   softExpect(order.Shipdate).to.equal($e1.text().trim(),"eUSCold :" + order.Shipdate + " , Phenix : " + $e1.text().trim()) 
                else
              softExpect(order.Shipdate).to.equal($e1.text().trim(),"eUSCold :" + order.Shipdate + " , Phenix : " + $e1.text().trim())        
                  cy.writeFile('path/to/TS14.html', "<tr><td>4</td><td>Ship Date</td><td>" + order.Shipdate + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    
                }    
        
              })
              cy.get(':nth-child(21) > .gitem > uscs-fe-grid-text > .align-items-center').each(($e1, index, $list) =>
              { 
        
                  if(index==0)
                  {
                    if(order.shippedqty == $e1.text().trim())
                       softExpect(order.shippedqty).to.equal($e1.text().trim(),"eUSCold :" + order.shippedqty + " , Phenix : " + $e1.text().trim()) 
                    else
                  softExpect(order.shippedqty).to.equal($e1.text().trim(),"eUSCold :" + order.shippedqty + " , Phenix : " + $e1.text().trim())        
                      cy.writeFile('path/to/TS14.html', "<tr><td>5</td><td>Shipped Qty</td><td>" + order.shippedqty + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='datamismatch'>" + "Data Mismatch" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    
                    }    
            
                  })
        
         }) //read file  
         
         //cy.writeFile('path/to/TS09_data.json', {} , { encoding: 'ascii'}) 
         cy.writeFile('path/to/TS14.html',"</tbody></table></div></body></html>", { encoding: 'ascii' , flag: 'a+' })
        })//it2 ends here
  
  
      })//describe ends here
    
    
    

    
    