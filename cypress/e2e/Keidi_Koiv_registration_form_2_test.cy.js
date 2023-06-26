beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same passwords', ()=>{
        // Add test steps for filling in only mandatory fields - not mandatory fields are only favourite Web language and transport
        // Type confirmation password which is different from first password
        // Assert that submit button is not enabled
        // Assert that successful message is not visible
        // Assert that error message is visible

        cy.get('#username').type('KeidiKoiv')
        cy.get('[data-testid="phoneNumberTestId"]').type('5151515151')
        cy.get('[data-cy="name"]').type('Keidi')
        cy.get('#lastName').type('Koiv')
        cy.get('#email').type('koivkeidi@gmail.com')
        cy.get('#cars').select('saab')
        cy.get('#animal').select('Hippo')
        cy.get('input[name="password"]').type('KEIDI')
        cy.get('input[name="confirm"]').type('KEIDI1234')
        // Clicking somewhere on page to activate submit button, for example, "Confirm"
        cy.get('[name="confirm"]').type('{enter}')

        // Asserting that password error message is visible, and message contains 'Passwords do not match!
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
        // Asserting that success message is not visible
        cy.get('#success_message').should('not.be.visible')
        // Asserting that Submit button is disabled
        cy.get('.submit_button').should('be.disabled')

    })
    
    it('User can submit form with all fields added', ()=>{
        // Add test steps for filling in ALL fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system show successful message

        cy.get('#username').type('KeidiKoiv')
        cy.get('[data-testid="phoneNumberTestId"]').type('5151515151')
        cy.get('[data-cy="name"]').type('Keidi')
        cy.get('#lastName').type('Koiv')
        cy.get('#email').type('koivkeidi@gmail.com')
        cy.get('input[id="cssFavLanguage"').type('CSS')
        cy.get('input[id="vehicle1"]').type('Bike')
        cy.get('#cars').select('saab')
        cy.get('#animal').select('Hippo')
        cy.get('input[name="password"]').type('KEIDI')
        cy.get('input[name="confirm"]').type('KEIDI')
        // Clicking somewhere on page to activate submit button, for example, "Confirm"
        cy.get('[name="confirm"]').type('{enter}')


        // Asserting that success message is visible
        cy.get('#success_message').should('be.visible')
        // Asserting that Submit button is enabled
        cy.get('.submit_button').should('not.be.disabled')


    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        // Add test steps for filling in ONLY mandatory fields - not mandatory are favourite language and transport
        // Assert that submit button is enabled
        // Assert that after submitting the form system shows successful message

        cy.get('#username').type('KeidiKoiv')
        cy.get('[data-testid="phoneNumberTestId"]').type('5151515151')
        cy.get('[data-cy="name"]').type('Keidi')
        cy.get('#lastName').type('Koiv')
        cy.get('#email').type('koivkeidi@gmail.com')
        cy.get('#cars').select('saab')
        cy.get('#animal').select('Hippo')
        cy.get('input[name="password"]').type('KEIDI')
        cy.get('input[name="confirm"]').type('KEIDI')
        // Clicking somewhere on page to activate submit button, for example, "Confirm"
        cy.get('[name="confirm"]').type('{enter}')


        // Asserting that success message is visible
        cy.get('#success_message').should('be.visible')
        // Asserting that Submit button is enabled
        cy.get('.submit_button').should('not.be.disabled')


    })

    it('User cannot submit form if last name is not added', ()=>{
        inputValidData()
        cy.get('#lastName').clear()
        //in order to activate errors, user has to click somewhere outside the input field
        cy.get('h2').contains('Password').click()

        // Asserting that input error message is visible when last name is empty
        cy.get('#input_error_message').should('be.visible')
        // Asserting that submit button is disabled when last name is empty
        cy.get('.submit_button').should('be.disabled')
    

    })


    it('User cannot submit form if first name is not added', ()=>{
        inputValidData()
        cy.get('[data-cy="name"]').clear()
        //in order to activate errors, user has to click somewhere outside the input field
        cy.get('h2').contains('Password').click()

        // Asserting that input error message is visible when first name is empty
        cy.get('#input_error_message').should('be.visible')
        // Asserting that submit button is disabled when first name is empty
        cy.get('.submit_button').should('be.disabled')
    
        

    })
 


    it('User cannot submit data if email is not in email format', () => {

            //Allowed email pattern="[a-z0-9]+@[a-z0-9]+\.[a-z]{2,4}$"
            
            cy.get('#username').type('KeidiKoiv')
            cy.get('[data-testid="phoneNumberTestId"]').type('5151515151')
            cy.get('[data-cy="name"]').type('Keidi')
            cy.get('#lastName').type('Koiv')
            cy.get('#email').should('have.attr', 'type', 'email')
            cy.get('#email').type('koivkeidi') 
            cy.get('#cars').select('saab')
            cy.get('#animal').select('Hippo')
            cy.get('input[name="password"]').type('KEIDI')
            cy.get('input[name="confirm"]').type('KEIDI')
            // Clicking somewhere on page, for example, "Confirm"
            cy.get('[name="confirm"]').type('{enter}')
            
            //There is a bug with submit button and invalid data in this case; will only check if tooltip error message is visible. If data is filled incorrectly, submit button won't disappear

            // Asserting that email has a tooltip with error message
            cy.get('input[name="email"]').should('have.attr', 'title').should('contain', 'Input field contains not supported character')


              
              
    })

    

    it('User cannot submit form if username consists of not allowed symbols', ()=>{
        
        //Allowed username pattern[a-zA-Z0-9_]+
        
        cy.get('#username').should('have.attr', 'pattern', '[a-zA-Z0-9_]+')
        cy.get('#username').clear().type('#Keidi')
        cy.get('[data-cy="name"]').type('Keidi')
        cy.get('#lastName').type('Koiv')
        cy.get('[data-testid="phoneNumberTestId"]').type('5151515151')
        cy.get('#email').type('koivkeidi@gmail.com')
        cy.get('#cars').select('saab')
        cy.get('#animal').select('Hippo')
        cy.get('input[name="password"]').type('KEIDI')
        cy.get('input[name="confirm"]').type('KEIDI')
        // Clicking somewhere on page, for example, "Confirm"
        cy.get('[name="confirm"]').type('{enter}')
        
        // There is a bug with submit button and invalid data in this case; will only check if tooltip error message is visible. If data is filled incorrectly, submit button won't disappear

        // Asserting that username has a tooltip with error message
        cy.get('#username').should('have.attr', 'title').should('contain', 'Please add username')
        
        


    })



})


/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to be equal to 166
        cy.get('img').invoke('height').should('be.lessThan', 170)
            .and('be.greaterThan', 160)
    })


        it('Check that logo is correct and has correct size', () => {
            cy.log('Will check logo source and size')
            cy.get('img[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo.png')
            // get element and check its parameter height, to be equal to 88
            cy.get('img[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 90)
                .and('be.greaterThan', 85)
        })

        it('Check that logo is correct and has correct size', () => {
            cy.log('Will check logo source and size')
            cy.get('img[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo.png')
            // get element and check its parameter width, to be equal to 116
            cy.get('img[data-cy="cypress_logo"]').invoke('width').should('be.lessThan', 170)
                .and('be.greaterThan', 110)
        })


    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    // Create similar test for checking second link to Cerebrum Hub homepage
    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')

        // Check that URL to Cerebrum Hub page is correct and clickable
        
        // Get navigation element, find its second child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'https://cerebrumhub.com/')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', 'https://cerebrumhub.com/')
        // giving the page enough time to load
        cy.wait(8000)
        
        // Go back to previous page
        // giving the page enough time to load
        cy.wait(8000)
        cy.go('back')
        cy.log('Back again in registration form 2')
    })


    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')

    })

    

    it('Check that checkbox list is correct', () => {
        // Array of found elements with given selector has 3 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)
        // Making sure there are 3 values that contain correct text
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat').and('not.be.checked')

        // Asserting that user can check all checkboxes
        cy.get('input[type="checkbox"]').eq(0).click().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).click().should('be.checked')
        cy.get('input[type="checkbox"]').eq(2).click().should('be.checked')
    
    })



    it.only('Car dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.viewport(1280, 720)
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        //Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })




    
    it('Animal dropdown is correct', () => {

        // Selecting animals and creating screenshot for this area
        cy.get('#animal').select(1).screenshot('animal drop-down')
    
        // Getting the length of array of elements in Animals dropdown
     
        cy.get('#animal').children().should('have.length', 6)

        
        //Check that the elements have the correct text
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')
        
        // Advanced level how to check the content of the Animals dropdown
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'spider', 'mouse'])
        })
    })

})

function inputValidData() {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('Something')
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}