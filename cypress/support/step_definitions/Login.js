import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../pages/LoginPage";

const fromLoginPage = new LoginPage();

Given("the user open the testing background page", () => {
  fromLoginPage.openBackgroundPage();
});

When("the user login with {string} and {string}", (username, password) => {
  fromLoginPage.login(username, password);
});

Then("the user should see the {string} message", (message) => {
  fromLoginPage
    .loginSatusMessage()
    .should(
      "have.text",
      message,
      `Expected the login status message to be "${message}"`
    );
});

When("the user click on the logout button", () => {
  fromLoginPage.loginAndLogoutButton().click();
});
