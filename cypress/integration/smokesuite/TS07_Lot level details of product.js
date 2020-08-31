
/// <reference types="Cypress" />

describe("Comparision of lot level details ",function()
{

  Cypress.on('fail', (error, runnable) => {
   
    throw error 
  })

  const { softExpect } = chai;
   
    //const { softAssert, softExpect } = chai;

    it('Verify the lot level details of the product by drilling down in 9083',function()

    {
      cy.writeFile('path/to/TS07.html',"<html><head><title>Test Report</title>"
  
      + "<style type=\"text/css\">"
            + "body {padding:20px; max-width: 100%; overflow:hidden }"
            +"body, table {border: 1px solid black; font-family: arial,sans-serif; font-size: 20px;}" + 
            "th {border: 0.5px solid black; background: #42f5ce; border: 1px solid black;color: #111212; text-align: center;}"
            + "td { border: 0.5px solid black; text-align: center; }" 
            +".success { background-color: green;}"
            +".datamismatch { background-color: red;}"
            + "</style></head>"
        + "<h2 style = \"text-align:center\">Lot level details of the product</h2>"
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
          cy.get('[style="width:20%; height:25; text-align:center;"] > #inventoryInquiry_').click()
          cy.get(':nth-child(1) > :nth-child(2) > #InvInqProdCodeLink_').click()
    
          cy.get(':nth-child(4) > :nth-child(1) > table > tbody > tr > [align="left"]').each(($e1, index, $list) =>
   
          { 

            cy.wrap($e1)
            .invoke('text')
            .then(text => {
                  cy.writeFile('path/to/TS07_data.json', '{"Lotnumber":' + '"' + text.trim() +'"' , { encoding: 'ascii'})  
            })
        })
      
      
        cy.get('#InvInqLotNumberLink_codeDate').each(($e1, index, $list) =>
   
        { 

          cy.wrap($e1)
          .invoke('text')
          .then(text => {
                cy.writeFile('path/to/TS07_data.json', ', "Codedate":' + '"' + text.trim() +'"' , { encoding: 'ascii',flag: 'a+'})  
          })
      })
    
      cy.get(':nth-child(2) > table > tbody > tr > [align="left"] > a').each(($e1, index, $list) =>
   
      { 

        cy.wrap($e1)
        .invoke('text')
        .then(text => {
              cy.writeFile('path/to/TS07_data.json', ', "Receiptnumber":' + '"' + text.trim() +'"' , { encoding: 'ascii',flag: 'a+'})  
        })
    })

    cy.get('#InvInqLotNumberLink_holdQty').each(($e1, index, $list) =>
 
    { 

      cy.wrap($e1)
      .invoke('text')
      .then(text => {
            cy.writeFile('path/to/TS07_data.json', ', "Holdqty":' + '"' + text.trim() +'"' , { encoding: 'ascii',flag: 'a+'})  
      })
  })
  cy.get('#InvInqLotNumberLink_availableQty').each(($e1, index, $list) =>
 
  { 

    cy.wrap($e1)
    .invoke('text')
    .then(text => {
          cy.writeFile('path/to/TS07_data.json', ', "Availableqty":' + '"' + text.trim() +'"' , { encoding: 'ascii',flag: 'a+'})  
    })
})



      cy.get('#InvInqLotNumberLink_holdDesc').each(($e1, index, $list) =>
   
      { 

        cy.wrap($e1)
        .invoke('text')
        .then(text => {
              cy.writeFile('path/to/TS07_data.json', ', "holdcode":' + '"' + text.trim()+ '"' + "}" , { encoding: 'ascii',flag: 'a+'})  
              
        })
    })

    

 

})//fixture

    
    
})  //it1

it('Verifying  lot level details of the product by drilling down in 9228',function()

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
  cy.get('#searchText').type('Inventory Maintenance').click()
  cy.contains('Inventory Maintenance').click({force:true})
  cy.get('#pem_cust_chosen > .chosen-single > span').click()
      cy.contains('100950').click({force:true})
      //cy.get('#txt_SubProduct').type('1158')
      cy.get('#uscsLot').type('649866972')
      cy.get('#basicSrch').click()   
      cy.wait(3000)

      cy.readFile('path/to/TS07_data.json').then((order) =>
      {
        
        cy.get('#uscsLotGrid_1').each(($e1, index, $list) =>

        {

            if(index==0)
            {
              if(order.Lotnumber == $e1.text().trim())
                 softExpect(order.Lotnumber).to.equal($e1.text().trim(),"eUSCold :" + order.Lotnumber + " , Phenix : " + $e1.text().trim()) 
              else
            softExpect(order.Lotnumber).to.equal($e1.text().trim(),"eUSCold :" + order.Lotnumber + " , Phenix : " + $e1.text().trim())   
            cy.writeFile('path/to/TS07.html', "<tr><td>1</td><td>lot number</td><td>" + order.Lotnumber + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    
            }
        })
        cy.get('[title="9295"]').each(($e1, index, $list) =>
        { 

            if(index==0)
            {
              if(order.Codedate == $e1.text().trim())
                 softExpect(order.Codedate).to.equal($e1.text().trim(),"eUSCold :" + order.Codedate + " , Phenix : " + $e1.text().trim()) 
              else
            softExpect(order.Codedate).to.equal($e1.text().trim(),"eUSCold :" + order.Codedate + " , Phenix : " + $e1.text().trim())       
                cy.writeFile('path/to/TS07.html', "<tr><td>2</td><td>Code Date</td><td>" + order.Codedate + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    
            }
        })
  
        cy.get('[title="17533"]').each(($e1, index, $list) =>
        { 

            if(index==0)
            {
              if(order.Receiptnumber == $e1.text().trim())
                 softExpect(order.Receiptnumber).to.equal($e1.text().trim(),"eUSCold :" + order.Receiptnumber + " , Phenix : " + $e1.text().trim()) 
              else
            softExpect(order.Receiptnumber).to.equal($e1.text().trim(),"eUSCold :" + order.Receiptnumber + " , Phenix : " + $e1.text().trim())       
                cy.writeFile('path/to/TS07.html', "<tr><td>3</td><td>Receipt Number</td><td>" + order.Receiptnumber + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    
            }
        })
  
        cy.get('[title="18 - MANAGEMENT REQUEST"]').each(($e1, index, $list) =>
        { 

            if(index==0)
            {
              if(order.holdcode == $e1.text().trim())
                 softExpect(order.holdcode).to.equal($e1.text().trim(),"eUSCold :" + order.holdcode + " , Phenix : " + $e1.text().trim()) 
              else
            softExpect(order.holdcode).to.equal($e1.text().trim(),"eUSCold :" + order.holdcode + " , Phenix : " + $e1.text().trim())       
                cy.writeFile('path/to/TS07.html', "<tr><td>4</td><td>Hold Code</td><td>" + order.holdcode + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='datamismatch'>" + "Data Mismatch" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    
            }
        })
      
  
        cy.get('[aria-describedby="lotGrid_qtyOnHold"] > [name="expandedQty"] > .float_R').each(($e1, index, $list) =>
        { 

            if(index==0)
            {
              if(order.Holdqty == $e1.text().trim())
                 softExpect(order.Holdqty).to.equal($e1.text().trim(),"eUSCold :" + order.Holdqty + " , Phenix : " + $e1.text().trim()) 
              else
            softExpect(order.Holdqty).to.equal($e1.text().trim(),"eUSCold :" + order.Holdqty + " , Phenix : " + $e1.text().trim())        
                cy.writeFile('path/to/TS07.html', "<tr><td>5</td><td>Hold Qty</td><td>" + order.Holdqty + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    
            }
        })
    
        cy.get('[aria-describedby="lotGrid_qtyAvailable"] > [name="expandedQty"] > .float_R').each(($e1, index, $list) =>
        { 

            if(index==0)
            {
              if(order.Availableqty == $e1.text().trim())
                 softExpect(order.Availableqty).to.equal($e1.text().trim(),"eUSCold :" + order.Availableqty + " , Phenix : " + $e1.text().trim()) 
              else
            softExpect(order.Availableqty).to.equal($e1.text().trim(),"eUSCold :" + order.Availableqty + " , Phenix : " + $e1.text().trim())      
                cy.writeFile('path/to/TS07.html', "<tr><td>6</td><td>Available Qty</td><td>" + order.Availableqty + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='datamismatch'>" + "Data Mismatch" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    
              }    
    
            })
         
          
            
          
           }) //read file  
           
           
           cy.writeFile('path/to/TS07.html',"</tbody></table></div></body></html>", { encoding: 'ascii' , flag: 'a+' })
         })//it2 ends here
         
         
         })//it2
       
       
       
       
       
       
       
         //}) // Describe 
       
       })
               
             
    