describe('TS03_Comparision of order details for a given date range', function(){

Cypress.on('fail', (error, runnable) => {



throw error


})

  

      const { softExpect } = chai;

         it('Verify orders for a given date range in 9083', function(){

          cy.writeFile('path/to/TS03.html',"<html><head><title>Test Report</title>"
  
          + "<style type=\"text/css\">"
                + "body {padding:20px; max-width: 100%; overflow:hidden }"
                +"body, table {border: 1px solid black; font-family: arial,sans-serif; font-size: 20px;}" + 
                "th {border: 0.5px solid black; background: #42f5ce; border: 1px solid black;color: #111212; text-align: center;}"
                + "td { border: 0.5px solid black; text-align: center; }" 
                +".success { background-color: green;}"
                +".datamismatch { background-color: red;}"
                + "</style></head>"
            + "<h2 style = \"text-align:center\">Orders in a given range</h2>"
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
              cy.get('[value="511600000100950"]').click() ///cUSTOMER Drop down
              //cy.get('#custOrderNumber').type("0084638120")
              //cy.get('#orderInquiry_order_inq_viewallorder').click()
              
              cy.get('input#tempfromDate').clear({ force: true }).type('07/10/2020')
              cy.wait(1000)
              cy.get('input#temptoDate').clear({ force: true }).type('07/10/2020')
              
              cy.wait(3000)
              cy.get('#orderInquiry_order_inq_viewallorder').click({ force: true })      
              cy.wait(4000)
              cy.get('#row > tbody > tr')
  .find('td')
  .each(($el, $index) => {
     cy.wrap($el)
      .invoke('text')
      .then(text => {
        
        // if(text.trim() == "0084862616")
        // {
        //   debugger
          if($index==63  )
          {
            cy.writeFile('path/to/TS03_data.json', '{"ordernum":' + '"' + text.trim() +'"' , { encoding: 'ascii' }) 
          }
          if($index==64 )
          {
          cy.writeFile('path/to/TS03_data.json',  ' , "shipdate":' + '"' + text.trim() + '"'  , { encoding: 'ascii', flag: 'a+' })     
          }
          
          if($index==66  )
          {
            cy.writeFile('path/to/TS03_data.json', ' , "PO":' + '"' + text.trim() + '"' ,  { encoding: 'ascii', flag: 'a+' } )    
          }
          if($index==67 )
          {
            cy.writeFile('path/to/TS03_data.json',  ' , "LoadNum":' + '"' + text.trim()+ '"' , { encoding: 'ascii', flag: 'a+' })  
          }
          if($index==69 )
          {
            cy.writeFile('path/to/TS03_data.json', ' , "Consignee": ' + '"' + text.trim() + '"' + "}", { encoding: 'ascii', flag: 'a+' })
          }
          // if( $index==15)
          // {
          //   cy.writeFile('path/to/TS03_data.json', ' , "Consignee": ' + '"' + text.trim() + '"' + "}", { encoding: 'ascii', flag: 'a+' })
          // }
       // }
          })// then 
        
       }) // each

      }) // fixture 

    }) //IT1

 
       it('Verify orders details for a given date range in 9228',function()
       {
            
        cy.on('uncaught:exception', (err, runnable) => {
    
  
          // we now have access to the err instance
          // and the mocha runnable this failed on
         throw err
          //cy.writeFile('path/to/data.txt', error.message , { encoding: 'ascii'}) 
          //throw error // throw error to have test still fail
        })
          cy.visit('http://10.242.0.195:9228/ewm/login.html')
          cy.fixture('Login 9228').then((user2)=>{
          cy.get('[type="text"]').type(user2.userId2)
          cy.wait(1000)
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
          cy.get('.formelement-menu > .form-element-results > formelement-window > .dropdown-menu > .dropdown-item-list > :nth-child(4)').click() // Order#
  
cy.get('.formelements-row-2 > .pristine > formelement-date > .formelement-date > .dropdown > .input-group > .btn > .fa').click()
cy.get('.formelements-row-2 > :nth-child(1) > formelement-date > .formelement-date > .dropdown > .dropdown-menu > :nth-child(1) > formelement-calendar > .calendar-container > .calendar-head > .btn-prev > .fa').click()

 cy.get('.formelements-row-2 > :nth-child(1) > formelement-date > .formelement-date > .dropdown > .dropdown-menu > :nth-child(1) > formelement-calendar > .calendar-container > .calendar-body > .calendar-dates > :nth-child(13)').click()
 cy.get('.formelements-row-2 > :nth-child(1) > formelement-date > .formelement-date > .dropdown > .dropdown-menu > :nth-child(2) > formelement-calendar > .calendar-container > .calendar-head > .btn-prev > .fa').click()
 cy.get('.formelements-row-2 > :nth-child(1) > formelement-date > .formelement-date > .dropdown > .dropdown-menu > :nth-child(2) > formelement-calendar > .calendar-container > .calendar-body > .calendar-dates > :nth-child(13)').click()

        
          cy.get('.basic-search-actions > .btn-primary').click()
          

          cy.readFile('path/to/TS03_data.json').then((order) =>
          {
            cy.get(':nth-child(2) > :nth-child(2) > :nth-child(8) > .gitem > uscs-fe-grid-text > .align-items-center').each(($e1, index, $list) =>
              {                  
                  if(index ==0 )
                  {
                    if(order.ordernum == $e1.text().trim())
                       softExpect(order.ordernum).to.equal($e1.text().trim(),"eUSCold :" + order.ordernum + " , Phenix : " + $e1.text().trim()) 
                    else
                  softExpect(order.ordernum).to.equal($e1.text().trim(),"eUSCold :" + order.ordernum + " , Phenix : " + $e1.text().trim())   
                  
                  cy.writeFile('path/to/TS03.html', "<tr><td>1</td><td>OrderNum</td><td>" + order.ordernum + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })    
                }
              })
              cy.get(':nth-child(2) > :nth-child(2) > :nth-child(5) > .gitem > uscs-fe-grid-text > .align-items-center').each(($e1, index, $list) =>
              { 
                if(index ==0 )
                {
                  if(order.shipdate == $e1.text().trim())
                     softExpect(order.shipdate).to.equal($e1.text().trim(),"eUSCold :" + order.shipdate + " , Phenix : " + $e1.text().trim()) 
                  else
                softExpect(order.shipdate).to.equal($e1.text().trim(),"eUSCold :" + order.shipdate + " , Phenix : " + $e1.text().trim())   

                cy.writeFile('path/to/TS03.html', "<tr><td>2</td><td>ShipDate</td><td>" + order.shipdate + "</td>" + "<td>" + $e1.text().trim() + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })  

                }
              })

              cy.get(':nth-child(2) > :nth-child(2) > :nth-child(18) > .gitem > uscs-fe-grid-text > .align-items-center').each(($e1, index, $list) =>
              { 
                if(index ==0 )
                {
                  if(order.PO == $e1.text().trim())
                     softExpect(order.PO).to.equal($e1.text().trim(),"eUSCold :" + order.PO + " , Phenix : " + $e1.text().trim()) 
                  else
                softExpect(order.PO).to.equal($e1.text().trim(),"eUSCold :" + order.PO + " , Phenix : " + $e1.text().trim())   
                  

                  cy.writeFile('path/to/TS03.html', "<tr><td>3</td><td>PO</td><td>" + order.PO + "</td>" + "<td>" + $e1.text().trim()  + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })  

                }   

              })

              cy.get(':nth-child(2) > :nth-child(2) > :nth-child(11) > .gitem > uscs-fe-grid-text > .align-items-center').each(($e1, index, $list) =>
              { 
                if(index ==0 )
                {
                  if(order.LoadNum == $e1.text().trim())
                     softExpect(order.LoadNum).to.equal($e1.text().trim(),"eUSCold :" + order.LoadNum + " , Phenix : " + $e1.text().trim()) 
                  else
                softExpect(order.LoadNum).to.equal($e1.text().trim(),"eUSCold :" + order.LoadNum + " , Phenix : " + $e1.text().trim())       
              

              cy.writeFile('path/to/TS03.html', "<tr><td>4</td><td>LoadNum</td><td>" + order.LoadNum + "</td>" + "<td>" + $e1.text().trim()  + "</td><td class='success'>" + "As Expected" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })  

                }

                 

              })
              cy.get(':nth-child(2) > :nth-child(2) > :nth-child(14) > .gitem > uscs-fe-grid-text > .align-items-center').each(($e1, index, $list) =>
              { 

                if(index ==0 )
                {
                  if(order.Consignee == $e1.text().trim())
                     softExpect(order.Consignee).to.equal($e1.text().trim(),"eUSCold :" + order.Consignee + " , Phenix : " + $e1.text().trim()) 
                  else
                softExpect(order.Consignee).to.equal($e1.text().trim(),"eUSCold :" + order.Consignee + " , Phenix : " + $e1.text().trim())   
                
                cy.writeFile('path/to/TS03.html', "<tr><td>5</td><td>Consignee</td><td>" + order.Consignee + "</td>" + "<td>" + $e1.text().trim()  + "</td><td class='datamismatch'>" + "Data Mismatch" + "</td></tr>" , { encoding: 'ascii' , flag: 'a+' })  

                }
              })

        }) // read file 

         // cy.writeFile('path/to/TS03_data.json', {} , { encoding: 'ascii'}) 
         
      }) // fixture 

      cy.writeFile('path/to/TS03.html',"</tbody></table></div></body></html>", { encoding: 'ascii' , flag: 'a+' })
          }) //it2
}) //DESC

 




    

