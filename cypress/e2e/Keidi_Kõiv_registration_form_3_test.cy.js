beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

//BONUS TASK: add visual tests for registration form 3

/*
Task list:
* Test suite for visual tests for registration form 3 is already created
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns
    * checkboxes, their content and links
    * email format
 */

describe('Section 1: visual tests', ()=> {
    it('This is a test to check content and link of checkboxes', () => {
    cy.get('[type="checkbox"]').should('have.class', 'ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required', 'Accept our privacy policy' )
    //Making sure there is a link in second checkbox
    cy.get('[type="checkbox"]').last().parent().find('a[href="cookiePolicy.html"]').should('exist');

    });
})

describe ('This is my test', ()=> {
    it('This is a test to check dropdowns', () => { 
    cy.get('#country').children().should('have.length', 4)
    cy.get('#country').find('option').eq(0).should('not.have.text')
    cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
    cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
    cy.get('#country').find('option').eq(3).should('have.text', 'Austria')

    //Selecting a country
    cy.get('#country').select('Estonia')
    //Making sure all the cities are present in Estonia
    cy.get('#city').children().should('have.length', 4)
    cy.get('#city').find('option').eq(0).should('not.have.text')
    cy.get('#city').find('option').eq(1).should('have.text', 'Tallinn')
    cy.get('#city').find('option').eq(2).should('have.text', 'Haapsalu')
    cy.get('#city').find('option').eq(3).should('have.text', 'Tartu')


    });
})


describe ('This is my test', ()=> {
it('This is a test to check email format', () => { 
    cy.get('[name="email"]').should('have.attr', 'type', 'email')
    cy.get('[name="email"]').type('koivkeidi')


    //Clicking somewhere on the page, for example "registration page"
    cy.get('h1').contains('Registration page').click()
    //Making sure lower submit button is disabled
    cy.get('[type="submit"]').last().should('be.disabled');
    //Making sure an error message is visible near the field
    cy.get('[ng-show="myForm.email.$error.email"]').should('be.visible')



});
})

describe ('This is my test', ()=> {
    it('This is a test to check that the user can only click on one radio button', () => { 
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')



    });
})





//BONUS TASK: add functional tests for registration form 3

/*
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + validation
    * only mandatory fields are filled in + validations
    * mandatory fields are absent + validations (try using function)
    * If city is already chosen and country is updated, then city choice should be removed
    * add file (google yourself for solution)
 */

describe ('This is my test', ()=> {
    it('This is a test to submit the form if only mandatory fields are present', () => { 
    cy.get('[name="email"]').type('koivkeidi@gmail.com')
    cy.get('#country').select('Spain')
    cy.get('#city').select('Malaga')
    cy.get('#birthday').type ('1994-02-01')
    cy.get('[type="checkbox"]').first().check();
    cy.get('h1').contains('Registration page').click()
    //Second submit button should be ensabled
    cy.get('[type="submit"]').last().should('be.enabled')
    cy.get('[type="submit"]').last().click()
    //submission received should be visible
    cy.contains('Submission received').should('be.visible')



    });
})

describe ('This is my test', ()=> {
it('This is a test to not submit the form if mandatory fields are absent', () => { 
//Not filling in the birthday field and not accepting privacy policy and cookies
cy.get('#name').clear().type('Keidi')
cy.get('[name="email"]').type('koivkeidi@gmail.com')
cy.get('#country').select('Spain')
cy.get('#city').select('Malaga')
cy.contains('Date of birth').next().type ('1994-02-01')
cy.get('[value="Daily"]').check();
//First submit button should be enabled
cy.get('[type="submit"]').first().should('be.enabled')
cy.get('h1').contains('Registration page').click()
//Second submit button should be disabled
cy.get('[type="submit"]').last().should('be.disabled')


    });
})

describe ('This is my test', ()=> {
    it('This is a test to submit a form with All fields', () => { 
cy.get('#name').clear().type('Keidi')
cy.get('[name="email"]').type('koivkeidi@gmail.com')
cy.get('#country').select('Spain')
cy.get('#city').select('Malaga')
cy.contains('Date of birth').next().type ('1994-02-01')
cy.get('[value="Daily"]').check();
cy.get('#birthday').type ('1994-02-01')
cy.get('[type="checkbox"]').first().check();
cy.get('[type="checkbox"]').last().check();
cy.get('[type="submit"]').should('be.enabled')
cy.get('[type="submit"]').last().click();
cy.contains('Submission received').should('be.visible')


});
})


describe ('This is my test', ()=> {
    it('This is a test to check that when the user changes the country, the selected city disappears', () => { 
        //Selecting country and the city
        cy.get('#country').select('Spain')
        cy.get('#city').select('Malaga')
        //Selecting new country
        cy.get('#country').select('Estonia')
        //Making sure "Malaga" disappears
        cy.get('[label="Malaga"]').should('not.exist')

    })

})


it('This is a test to upload a file', () => { 
    //Firstly, moving the file into fixtures, Found a code in docs.cypress.io 
    cy.get('#myFile').selectFile('cypress/fixtures/load_this_file_reg_form_3.txt')
        });
    
      

  