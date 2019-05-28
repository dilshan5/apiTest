Feature: Marvel API - Authorization
  In order to sure everything is up-to-date and working
  As a tester
  I want to check the API Authorization

  Scenario Outline: Verify Authorization Error Codes for Query Params
    Given I am Server Side Application with "<Error_Reason>" in QueryParams
    When I send a GET request to "/v1/public/series"
    And Response status code should be "<Error_Code>"
    Then Response status message should be "<Error_Message>"
    Examples:
      | Error_Reason    | Error_Code | Error_Message     |
      | No API Key      | 409        | Missing API Key   |
      | No Hash         | 409        | Missing Hash      |
      | No Timestamp    | 409        | Missing Timestamp |
      | Invalid Hash    | 401        | Invalid Hash      |
      | Invalid Referer | 401        | Invalid Referer   |

  Scenario: Verify Authorization Error Code when User access an endpoint to which they do not have access.
    Given I am Server Side Application with "Valid" in QueryParams
    When I send a GET request to "/v1/private/series"
    And Response status code should be "403"
    Then Response status message should be "Forbidden"

  Scenario: Verify Authorization Error Code when User accessed using an HTTP
    Given I am Server Side Application with "Valid" in QueryParams
    When I send a GET request to "/v1/public/series"
    And Response status code should be "405"
    Then Response status message should be "Method Not Allowed"