export default class LoginPage {
  openBackgroundPage() {
    cy.visit("http://uitestingplayground.com/sampleapp");
  }

  usernameField() {
    return cy.xpath('//input[@name="UserName"]');
  }

  passwordField() {
    return cy.get('input[name="Password"]')
  }

  loginAndLogoutButton() {
    return cy.get("#login");
  }

  loginSatusMessage() {
    return cy.get("#loginstatus");
  }

  fillField(field, value) {
    field.clear();
    if (typeof value === 'string' && value.trim() !== '') {
      field.type(value);
    }
  }
  
  login(username, password) {
    this.fillField(this.usernameField(), username);
    this.fillField(this.passwordField(), password);
    this.loginAndLogoutButton().click();
  }

}
