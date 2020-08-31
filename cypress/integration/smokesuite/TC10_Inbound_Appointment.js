
/// <reference types="Cypress" />

describe(" Verify Inbound Appointments",function()
{

  Cypress.on('fail', (error, runnable) => {
    
    throw error
  })

  const { softExpect } = chai;

   
    //const { softAssert, softExpect } = chai;

  
    it('Verify Inbound Appointments in 9083',function()

    {
      cy.writeFile('path/to/TS10.html',"<html><head><title>Test Report</title>"
  
  + "<style type=\"text/css\">"
        + "body {padding:20px; max-width: 100%; overflow:hidden }"
        +"body, table {border: 1px solid black; font-family: arial,sans-serif; font-size: 20px;}" + 
        "th {border: 0.5px solid black; background: #42f5ce; border: 1px solid black;color: #111212; text-align: center;}"
        + "td { border: 0.5px solid black; text-align: center; }" 
        +".success { background-color: green;}"
        +".datamismatch { background-color: red;}"
        + "</style></head>"
    + "<h2 style = \"text-align:center\">Comparision of inbound appointments in 9083 and 9228</h2>"
        + "<div style = \"max-width:100% ; margin: auto\">"
        + "<table style=\"max-width: 98%; width:98% ;overflow: scroll;margin:auto; \"><thead>"
        + "<tr> <th >S.No</th>"
        + "<th >INPUT </th>"
        + "<th >eUSCOLD (9080 Instance)</th> "
        + "<th >EWM (9227 Instance)</th>"
        + "<th >RESULTS</th>"
        + "</tr></thead><tbody>")
      cy.visit('http://ecpphxsit.uscold.com:9083/eUSCOLD/jsp/index.jsp')
      cy.fixture('Login 9083').then((user)=>{
        cy.get('#userId').type(user.userId,{log:false})
        cy.get('#password').type(user.password)
    
      cy.get('[type="image"]').click()
      cy.wait(3000)
      cy.visit('http://ecpphxsit.uscold.com:9083/eUSCOLD/scheduleInquirySelection.action')
      cy.get('#scheduleInquirySelection_customerNames').contains('Milford').click()
            cy.get('#inboundApptNumber').type('110418')
      cy.get('.btnGray > span').click()
      cy.get('#scheduleInquiryDetail_').click()
      cy.get('[align="left"] > table > tbody > :nth-child(2) > :nth-child(2)').each(($e1, index, $list) => // Appointment Number
      { 
  
        cy.wrap($e1)
        .invoke('text')
        .then(text => {
              cy.writeFile('path/to/TS10_data.json', '{"AppointmentNumber":' + '"' + text.trim() +'"' , { encoding: 'ascii'})  
        })
    })
  
  
  cy.get('[align="left"] > table > tbody > :nth-child(4) > :nth-child(2)').each(($e1, index, $list) => // Reference
      { 
  
        cy.wrap($e1)
        .invoke('text')
        .then(text => {
              cy.writeFile('path/to/TS10_data.json',  ' ,"Reference":' + '"' + text.trim() +'"' , { encoding: 'ascii',flag: 'a+'})  
        })
    })
  
  
  cy.get('[align="left"] > table > tbody > :nth-child(6) > :nth-child(2)').each(($e1, index, $list) => // Carrier
      { 
  
        cy.wrap($e1)
        .invoke('text')
        .then(text => {
              cy.writeFile('path/to/TS10_data.json', ', "Carrier":' + '"' + text.trim() +'"' , { encoding: 'ascii',flag: 'a+'})  
        })
    })

    cy.get('[align="left"] > table > tbody > :nth-child(10) > :nth-child(2)').each(($e1, index, $list) => // Status
      { 
  
        cy.wrap($e1)
        .invoke('text')
        .then(text => {
              cy.writeFile('path/to/TS10_data.json', ', "Status":' + '"' + text.trim() +'"' , { encoding: 'ascii',flag: 'a+'})  
        })
    })

  
  cy.get('tbody > :nth-child(12) > :nth-child(2)').each(($e1, index, $list) => // Appointment Date
      { 
  
        cy.wrap($e1)
        .invoke('text')
        .then(text => {
              cy.writeFile('path/to/TS10_data.json', ', "AppointmentDate":' + '"' + text.trim() +'"' , { encoding: 'ascii',flag: 'a+'})  
        })
    })
  
  
  
  cy.get(':nth-child(22) > :nth-child(2)').each(($e1, index, $list) => // Delay Description
      { 
  
        cy.wrap($e1)
        .invoke('text')
        .then(text => {
              cy.writeFile('path/to/TS10_data.json', ', "DelayDescription":' + '"' + text.trim() + '"' + "}", { encoding: 'ascii',flag: 'a+'})  
        })
    })
  
  
      
      
      //need to drill down further and compare the comments in both envs
    
    })
  })

    it('Verify inbound appointments in 9228',function()

    {
      
      cy.visit('http://10.242.0.195:9227/ewm/login.html')
      cy.fixture('Login 9228').then((user2)=>{
        cy.get('[type="text"]').type(user2.userId2)
        cy.get('[type="password"]').type(user2.password2,{log:false})
      cy.get('.loginButton').click()
      cy.get('#globalWarehouseSelect_chosen > .chosen-single > span').click()
      //cy.get('[data-option-array-index="2"]').click()
      cy.get(".chosen-results > li").contains("160").click()
      cy.get('#searchText').type('Appointments Maintenance')
      cy.contains('Appointments Maintenance').click({force: true}).wait(6000)
      //cy.wait(5000)
     // cy.get('[_ngcontent-opw-c107=""] > .formelements-grid-4 > :nth-child(1) > .formelements-row-2 > .formelement > formelement-text > .formelement-text > label > .input-group > .form-control').type('110418')
    cy.get('[placeholder="Appointment #"]').each(($e1, index, $list) =>
      {
        if(index==0)
        {
        cy.wrap($e1)
        .type("110418")
        }
        //cy.type
      }
    )
    cy.get('.formelements-container > .btn-primary').click()
    cy.get(':nth-child(3) > .gitem > uscs-fe-grid-view-link > .align-items-center > .grid-view-link').click()
   
      
    cy.wait(5000)
   cy.readFile('path/to/TS10_data.json').then((order) =>
   { 
    cy.get('[style="max-width: 1700px;"] > formelements > .formelements > .formelements-column-1 > .formelements-row-1 > .formelement > formelement-text > .formelement-text > .renderAsText > :nth-child(1) > span').each(($e1, index, $list) =>
    { 

       if(index==0)
       {
        if(order.AppointmentNumber == $e1.text().trim())
           softExpect(order.AppointmentNumber).to.equal($e1.text().trim(),"eUSCold :" + order.AppointmentNumber + " , Phenix : " + $e1.text().trim()) 
        else
      softExpect(order.AppointmentNumber).to.equal($e1.text().trim(),"eUSCold :" + order.AppointmentNumber + " , Phenix : " + $e1.text().trim())    
        cy.writeFile('path/to/TS10.html', "<tr><td>1</td><td>ApptNum</td><td>" + order.AppointmentNumber + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    


       }
  
          
   })
    
   cy.get('.formelements-row-6 > .formelement > formelement-text > .formelement-text > .renderAsText > :nth-child(1) > :nth-child(1) > :nth-child(1) > span').each(($e1, index, $list) =>
    { 
     
      if(index==0)
      {
        if(order.Reference == $e1.text().trim())
           softExpect(order.Reference).to.equal($e1.text().trim(),"eUSCold :" + order.Reference + " , Phenix : " + $e1.text().trim()) 
        else
      softExpect(order.Reference).to.equal($e1.text().trim(),"eUSCold :" + order.Reference + " , Phenix : " + $e1.text().trim())    
        cy.writeFile('path/to/TS10.html', "<tr><td>2</td><td>Reference</td><td>" + order.Reference + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    

      }
    })
     
     
   
   cy.get('.formelements-row-4 > .formelement > formelement-text > .formelement-text > .renderAsText > :nth-child(1) > :nth-child(1) > :nth-child(1) > span').each(($e1, index, $list) =>
    { 

      if(index==0)
      {
        if(order.Carrier == $e1.text().trim())
           softExpect(order.Carrier).to.equal($e1.text().trim(),"eUSCold :" + order.Carrier + " , Phenix : " + $e1.text().trim()) 
        else
      softExpect(order.Carrier).to.equal($e1.text().trim(),"eUSCold :" + order.Carrier + " , Phenix : " + $e1.text().trim())        
        cy.writeFile('path/to/TS10.html', "<tr><td>3</td><td>Carrier</td><td>" + order.Carrier + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='datamismatch'>" + "Data Mismatch" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    
      }
    
    
      
    })

   
   
   cy.get('.formelements-column-7 > .formelements-row > .formelement > formelement-text > .formelement-text > .renderAsText > :nth-child(1) > span').each(($e1, index, $list) =>
   { 
    
    if(index==0)

    {
      if(order.Status == $e1.text().trim())
         softExpect(order.Status).to.equal($e1.text().trim(),"eUSCold :" + order.Status + " , Phenix : " + $e1.text().trim()) 
      else
    softExpect(order.Status).to.equal($e1.text().trim(),"eUSCold :" + order.Status + " , Phenix : " + $e1.text().trim())      
      cy.writeFile('path/to/TS10.html', "<tr><td>4</td><td>Status</td><td>" + order.Status + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='datamismatch'>" + "Data Mismatch" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    

    }
    
    
      
    })
    
   
    cy.get('.formelement-date > .renderAsText > span').each(($e1, index, $list) =>
   { 
    if(index==0)
    {
      if(order.AppointmentDate == $e1.text().trim())
         softExpect(order.AppointmentDate).to.equal($e1.text().trim(),"eUSCold :" + order.AppointmentDate + " , Phenix : " + $e1.text().trim()) 
      else
    softExpect(order.AppointmentDate).to.equal($e1.text().trim(),"eUSCold :" + order.AppointmentDate + " , Phenix : " + $e1.text().trim())   
      
      cy.writeFile('path/to/TS10.html', "<tr><td>5</td><td>Appointment Date</td><td>" + order.AppointmentDate + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })  
      

    }
     
    
    
         
    
    })
    
    cy.get('.renderAsText > :nth-child(1) > :nth-child(2)').each(($e1, index, $list) =>
    { 
     if(index==0)
     {
      if(order.DelayDescription == $e1.text().trim())
         softExpect(order.DelayDescription).to.equal($e1.text().trim(),"eUSCold :" + order.DelayDescription + " , Phenix : " + $e1.text().trim()) 
      else
    softExpect(order.DelayDescription).to.equal($e1.text().trim(),"eUSCold :" + order.DelayDescription + " , Phenix : " + $e1.text().trim())    
       
       cy.writeFile('path/to/TS10.html', "<tr><td>6</td><td>Delay Description</td><td>" + order.DelayDescription + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='datamismatch'>" + "Data Mismatch" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })  
       
 
     }
      
     
     
          
     
     })

    
   })

   //cy.writeFile('path/to/TS04_data.json', {} , { encoding: 'ascii'}) 
   cy.writeFile('path/to/TS10.html',"</tbody></table></div></body></html>", { encoding: 'ascii' , flag: 'a+' })
 
 

 })
})

})



