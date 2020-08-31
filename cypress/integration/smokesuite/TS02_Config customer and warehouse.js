 describe('TS02_Change Customer and warehouse Criteria', function(){

   Cypress.on('fail', (error, runnable) => {
        //debugger
      
        // we now have access to the err instance
        // and the mocha runnable this failed on
        //cy.writeFile('path/to/data.txt', error.message , { encoding: 'ascii'}) 
        //throw error // throw error to have test still fail
      })
      const { softExpect } = chai;

         it('To verify that user is able to change customer and warehouse from "Change Criteria"', function(){

          cy.visit('http://ecpphxsit.uscold.com:9083/eUSCOLD/jsp/index.jsp')
          cy.fixture('Login 9083').then((user)=>{
              
              cy.get('#userId').type(user.userId)
              cy.get('#password').type(user.password,{log:false})
              cy.get('[type="image"]').click()
              cy.get('.hdrCriteria >a').click()
              cy.wait(4000)
              
              // cy.get("#selcriteriaCustomerCompanyId").select('00001138', {timeout: 9000}).then(element => 
              // {
              //   //element.click()
              //   cy.wait('6000') 
                
              // })
                //cy.get("#selcriteriaCustomerCompanyId").select('00001138')
                cy.wait(5000) 
                
              cy.get(':nth-child(5) > :nth-child(1)> #warehouseIds').check()
                                                                                        
              cy.get(':nth-child(4) > :nth-child(1) > #warehouseIds').uncheck()
            
                          
              cy.get(':nth-child(10) > td > .btn').click()

              //cy.get('#changeCarr').includes('Smyrna')
              cy.get('#changeCarr').invoke('text')
              .then(text => {
                softExpect('Smyrna').to.equal(text.trim())
                cy.get('[href="logout.action"]').click()
              })

                        //cy.get('#selAll').click()
          
          
          })
      
        })
    })
