

/// <reference types="Cypress" />

describe("TS05_Comparision of  order details using PO number",function()
{

  Cypress.on('fail', (error, runnable) => {
    
       throw error 
  })

  const { softExpect } = chai;
   
    //const { softAssert, softExpect } = chai;

  
it('Verify fetching order details using PO number in 9083',function()

{

  cy.writeFile('path/to/TS05.html',"<html><head><title>Test Report</title>"
  
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
    cy.contains('Order Inquiry').click({force: true})
    cy.get('[value="511600000100950"]').click()
    cy.get('#plus1').click()
    cy.get('#purchOrdNumber').type('18880')
    cy.get('#orderInquiry_order_inq_viewallorder').click()

    cy.wait(4000)
    cy.get('[style="width:10%; height:25;text-align:center;"] > #orderInquiryViewAllOrders_').each(($e1, index, $list) =>
    { 

      cy.wrap($e1)
      .invoke('text')
      .then(text => {
            cy.writeFile('path/to/TS05_data.json', '{"ordernum":' + '"' + text.trim() +'"' , { encoding: 'ascii'})  
      })
  })


  cy.get('#row > tbody > .odd > :nth-child(2)').each(($e1, index, $list) =>
  { 
    cy.wrap($e1)
    .invoke('text')
    .then(text => {
      cy.writeFile('path/to/TS05_data.json',  ' , "shipdate":' + '"' + text.trim() + '"'  , { encoding: 'ascii', flag: 'a+' })  
    })
  })

  cy.get('#row > tbody > .odd > :nth-child(4)').each(($e1, index, $list) =>
  { 
        cy.wrap($e1)
        .invoke('text')
        .then(text => {

        cy.writeFile('path/to/TS05_data.json', ' , "PO":' + '"' + text.trim() + '"' ,  { encoding: 'ascii', flag: 'a+' } )  

        })
  })

  cy.get('.odd > :nth-child(5)').each(($e1, index, $list) =>
  { 
    cy.wrap($e1)
    .invoke('text')
      .then(text => {
      cy.writeFile('path/to/TS05_data.json',  ' , "LoadNum":' + '"' + text.trim() + '"' , { encoding: 'ascii', flag: 'a+' })  

      })
  })
  cy.get('.odd > :nth-child(7)').each(($e1, index, $list) =>
  { 
    cy.wrap($e1)
    .invoke('text')
      .then(text => {
      cy.writeFile('path/to/TS05_data.json', ' , "Consignee": ' + '"' + text.trim() + '"' + "}", { encoding: 'ascii', flag: 'a+' })

})
 
})
    })
})//it 1 ends here

it('Verify fetching order details using PO number in 9228',function()
{

    cy.visit('http://10.242.0.195:9228/ewm/login.html')
    cy.fixture('Login 9228').then((user2)=>{
      cy.get('[type="text"]').type(user2.userId2)
      cy.get('[type="password"]').type(user2.password2,{log:false})
    cy.get('.loginButton').click()
    cy.get('#globalWarehouseSelect_chosen > .chosen-single > span').click()
    cy.get(".chosen-results > li").contains("160").click()
    
    cy.get('#searchText').type('Order Maintenance').click()
    cy.wait(2000)
    cy.contains('Order Maintenance').click({force:true})
    cy.wait(6000)
          cy.get('[name="customerSysId"] > .formelement > formelement-select > .formelement-select > label > .btn').click()
          
          cy.contains('PERDUE FARMS').click({force:true})
          cy.get('.formelements-grid-4 > :nth-child(2) > .formelements-row-1 > .formelement > formelement-select > .formelement-select > label > .btn').click()
          
          cy.wait(2000)
          cy.get('.formelement-menu > .form-element-results > formelement-window > .dropdown-menu > .dropdown-item-list > :nth-child(5)').click() // Order#
    
    cy.get('.formelements-column-3 > .formelements-row-1 > .formelement > formelement-text > .formelement-text > label > .input-group > .form-control').type('18880')
    cy.get('.basic-search-actions > .btn-primary').click()
    cy.wait(4000)
    cy.readFile('path/to/TS05_data.json').then((order) =>
    {
    
      cy.get(':nth-child(8) > .gitem > uscs-fe-grid-text > .align-items-center').each(($e1, index, $list) =>

      {
        if(index==0)

        {
          if(order.ordernum == $e1.text().trim())
             softExpect(order.ordernum).to.equal($e1.text().trim(),"eUSCold :" + order.ordernum + " , Phenix : " + $e1.text().trim()) 
          else
        softExpect(order.ordernum).to.equal($e1.text().trim(),"eUSCold :" + order.ordernum + " , Phenix : " + $e1.text().trim())   
        cy.writeFile('path/to/TS05.html', "<tr><td>1</td><td>OrderNum</td><td>" + order.ordernum + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    

      }
    
     
         
    })
   cy.get(':nth-child(5) > .gitem > uscs-fe-grid-text > .align-items-center').each(($e1, index, $list) =>
    { 
     
     if(index==0)
     {
      if(order.shipdate == $e1.text().trim())
         softExpect(order.shipdate).to.equal($e1.text().trim(),"eUSCold :" + order.shipdate + " , Phenix : " + $e1.text().trim()) 
      else
    softExpect(order.shipdate).to.equal($e1.text().trim(),"eUSCold :" + order.shipdate + " , Phenix : " + $e1.text().trim())       
     cy.writeFile('path/to/TS05.html', "<tr><td>2</td><td>Shipdate</td><td>" + order.shipdate + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    
    }
       
     })

   
   
   cy.get(':nth-child(18) > .gitem > uscs-fe-grid-text > .align-items-center').each(($e1, index, $list) =>
    { 

    if(index==0)
    {
      if(order.PO == $e1.text().trim())
         softExpect(order.PO).to.equal($e1.text().trim(),"eUSCold :" + order.PO + " , Phenix : " + $e1.text().trim()) 
      else
    softExpect(order.PO).to.equal($e1.text().trim(),"eUSCold :" + order.PO + " , Phenix : " + $e1.text().trim())        
      cy.writeFile('path/to/TS05.html', "<tr><td>3</td><td>PO</td><td>" + order.PO + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    
    }
    
      
    
   })
   
   cy.get(':nth-child(11) > .gitem > uscs-fe-grid-text > .align-items-center').each(($e1, index, $list) =>
   { 
    
    if(index==0)
    {
      if(order.LoadNum == $e1.text().trim())
         softExpect(order.LoadNum).to.equal($e1.text().trim(),"eUSCold :" + order.LoadNum + " , Phenix : " + $e1.text().trim()) 
      else
    softExpect(order.LoadNum).to.equal($e1.text().trim(),"eUSCold :" + order.LoadNum + " , Phenix : " + $e1.text().trim())    
     cy.writeFile('path/to/TS05.html', "<tr><td>4</td><td>LoadNum</td><td>" + order.LoadNum + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })       
    } 

  
    
   })

   cy.get(':nth-child(14) > .gitem > uscs-fe-grid-text > .align-items-center').each(($e1, index, $list) =>
   { 
    
    if(index==0) 
    
    {
      if(order.Consignee == $e1.text().trim())
         softExpect(order.Consignee).to.equal($e1.text().trim(),"eUSCold :" + order.Consignee + " , Phenix : " + $e1.text().trim()) 
      else
    softExpect(order.Consignee).to.equal($e1.text().trim(),"eUSCold :" + order.Consignee + " , Phenix : " + $e1.text().trim())   
    cy.writeFile('path/to/TS05.html', "<tr><td>5</td><td>Consignee</td><td>" + order.Consignee + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='datamismatch'>" + "Data Mismatch" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })       
    }


        
   })
  })

  // cy.writeFile('path/to/TS05_data.json', {} , { encoding: 'ascii'}) 
   cy.writeFile('path/to/TS05.html',"</tbody></table></div></body></html>", { encoding: 'ascii' , flag: 'a+' })
 
 

})


})

})

