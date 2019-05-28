Feature: Marvel API - Character
  In order to sure everything is up-to-date and working
  As a tester
  I want to check all the Character related endpoints

  Scenario: Single character by id - Verify the response body
    Given I am Server Side Application with "Valid" QueryParams
    When I send a "GET" request to "/v1/public/characters/1011010"
    And Response status code should be "200"
    Then the response body should include:
      | Response Key   | Response Value          |
      | character Name | Spider-Man (Ultimate)   |
      | Last Modified  | later than January 2014 |
      | Image URL      | Valid                   |

  Scenario: Single character by id - Verify the response for Invalid ID
    Given I am Server Side Application with "Valid" QueryParams
    When I send a "GET" request to "/v1/public/characters/1011010xxxxxx"
    And Response status code should be "404"
    Then Response status message should be "Not Found"