#author: Miguel Angel Gutierrez Echeverri

Feature: Login functionality

    Technical test for QA Leader – Technical Test: UI Test Automation Challenge

    Background: Open the browser and navigate to the login page
        Given the user open the testing background page

    Scenario Outline: Login Scenarios, this scenario contains success and failure cases
        When the user login with "<username>" and "<password>"
        Then the user should see the "<message>" message

        Examples:
            | username | password | message                   |
            | TestUser | pwd      | Welcome, TestUser         |
            | TestUser | wrongpwd | Invalid username/password |
            |          |          | Invalid username/password |
            | TestUser |          | Invalid username/password |
            |          | pwd      | Invalid username/password |


    Scenario: Logout After Successful Login
        When the user login with "TestUser" and "pwd"
        Then the user should see the "Welcome, TestUser!" message
        And the user click on the logout button
        Then the user should see the "User logged out." message