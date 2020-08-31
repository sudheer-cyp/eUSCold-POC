
/// <reference types="Cypress" />

describe(" Verify Outbound Appointments",function()
{

  Cypress.on('fail', (error, runnable) => {
    
    throw error 
  })

  var softAssert = chai.assert
  var softExpect = chai.expect
   
    //const { softAssert, softExpect } = chai;

  
    it('Verify Outbound Appointments',function()

    {
      cy.visit('http://ecpphxsit.uscold.com:9083/eUSCOLD/jsp/index.jsp')
      cy.fixture('Login 9083').then((user)=>{
        cy.get('#userId').type(user.userId)
        cy.get('#password').type(user.password,{log:false})
      cy.get('[type="image"]').click()
      cy.wait(3000)
      cy.visit('http://ecpphxsit.uscold.com:9083/eUSCOLD/scheduleInquirySelection.action')
      cy.get('#scheduleInquirySelection_customerNames').contains('Milford').click()
            cy.get('#outboundApptNumber').type('108389')
      
      cy.get('.btnGray > span').click()
      cy.wait(6000)
          
      
      
      
    
    })
  })
    it('Verify Outbound appointments in 9228',function()

{
  
  cy.visit('http://10.242.0.195:9228/ewm/login.html')
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
    .type("108389")
    }
    //cy.type
  }
)
cy.get('.formelements-container > .btn-primary').click()
//cy.wait(5000)
//cy.get('#usrProfileImg').click()
    //cy.get('span:nth-of-type(3) > .formblue_link.hand').click()
  
})
})


})

//need to drill down further and compare the comments in both env