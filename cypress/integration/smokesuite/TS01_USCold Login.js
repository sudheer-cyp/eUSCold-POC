describe('TS01_eUSCold User Login', function(){
  Cypress.on('fail', (error, runnable) => {
    
  
    // we now have access to the err instance
    // and the mocha runnable this failed on
    throw error
    //cy.writeFile('path/to/data.txt', error.message , { encoding: 'ascii'}) 
    //throw error // throw error to have test still fail
  })

  cy.on('uncaught:exception', (err, runnable) => {
    
  
    // we now have access to the err instance
    // and the mocha runnable this failed on
   throw err
    //cy.writeFile('path/to/data.txt', error.message , { encoding: 'ascii'}) 
    //throw error // throw error to have test still fail
  })

  


    it('Verify that user is able to login successfully with valid credentials', function(){
    
             cy.visit('http://ecpphxsit.uscold.com:9083/eUSCOLD/jsp/index.jsp')
             cy.fixture('Login 9083').then((user)=>{
                 
                      cy.get('#userId').type(user.userId)
                      cy.get('#password').type(user.password,{log:false})
                      
                  })
                  //cy.get('.btn').contains('Sign in').should('be.visible').click()
                  cy.get('[type="image"]').click()
                  cy.get('[href="logout.action"]').click()
                  cy.wait(5000)
              })

                 })

