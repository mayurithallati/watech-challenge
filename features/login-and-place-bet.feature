Feature: Place a bet on a sports event

  @desktop
  Scenario: Place a bet on a football match before login
    Given I navigate to the home page
    And I accept all cookies
    Then I should see the featured side menu
    When I navigate to the football section
    And I select first friendly-international match
    And I should select Both teams to score Yes
    And I enter the bet amount "50"
    And I verify the bet amount
    And I click the place bet button
    And I log in with my credentials
    When I navigate to the profile page
    Then I should see logout button
    When I log out
    Then I should be logged out

  @desktop
  Scenario: Place a bet on a football match after login
    Given I navigate to the home page
    And I accept all cookies
    When I click the login button
    And I log in with my credentials
    Then I should see the featured side menu
    When I navigate to the football section
    And I select first friendly-international match
    And I should select Both teams to score Yes
    And I enter the bet amount "50"
    And I verify the bet amount
    Then I should see insufficient funds text
    When I navigate to the profile page
    Then I should see logout button
    When I log out
    Then I should be logged out
