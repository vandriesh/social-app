Feature: SignIn

  Scenario: Show signin form

    Given an user is on app landing page
    When user clicks on signin button
    Then user is redirected to signin page
    When user type 'qwe' into email input
    And submit the form
    Then email error should appear
    When user type '@qwe.com' into email input
    And submit the form
    Then email error should disappear
    When user submits signin form
    Then a password error should be shown telling 'Must not be empty'
    When user type 'qwe' into password input
    And submit the form
    Then a password error should be shown telling 'Wrong credentials, please try again'
