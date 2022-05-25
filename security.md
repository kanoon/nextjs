# Security measures.

## SQL Injection

Example

```
txtUserId = getRequestString("UserId"); //User input = `105 OR 1=1`
txtSQL = "SELECT * FROM Users WHERE UserId = " + txtUserId;
```

The only sure way to prevent SQL Injection attacks is input validation and parametrized queries including prepared statements.
The application code should never use the input directly.
The developer must sanitize all input, not only web form inputs such as login forms.

**Primary Defenses:**

- **Defense Option 1**: Prepared Statements (with Parameterized Queries)
  Safe Statement Example:
  ```
    String query = "SELECT account_balance FROM user_data WHERE user_name = ?";
    try {
      OleDbCommand command = new OleDbCommand(query, connection);
      command.Parameters.Add(new OleDbParameter("customerName", CustomerName Name.Text));
      OleDbDataReader reader = command.ExecuteReader();
      // …
    } catch (OleDbException se) {
      // error handling
    }
  ```
- **Defense Option 2**: Stored Procedures
  Safe Statement Example:
  ```
     Try
       Dim command As SqlCommand = new SqlCommand("sp_getAccountBalance", connection)
       command.CommandType = CommandType.StoredProcedure
       command.Parameters.Add(new SqlParameter("@CustomerName", CustomerName.Text))
       Dim reader As SqlDataReader = command.ExecuteReader()
       '...
     Catch se As SqlException
       'error handling
     End Try
  ```
- **Defense Option 3**: Allow-list Input Validation
  Example
  ```
    String tableName;
    switch(PARAM):
      case "Value1": tableName = "fooTable";
                     break;
      case "Value2": tableName = "barTable";
                     break;
      ...
     default      : throw new InputValidationException("unexpected value provided"
                                                    + " for table name");
  ```
- **Defense Option 4**: Escaping All User-Supplied Input

Ref.

- https://www.w3schools.com/sql/sql_injection.asp
- https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html

## Cross-Site Request Forgery

- npm package to handle CSRF: https://dev.to/adelhamad/csrf-protection-in-nextjs-1g1m

Ref.

- https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
- https://dev.to/adelhamad/csrf-protection-in-nextjs-1g1m
- https://stackoverflow.com/questions/60799741/next-js-authentication-strategies
- ...

## Cross-Site Scripting

This header stops pages from loading when they detect reflected cross-site scripting (XSS) attacks.
Although this protection is not necessary when sites implement a strong Content-Security-Policy disabling the use of inline JavaScript ('unsafe-inline'), it can still provide protection for older web browsers that don't support CSP.

```
    {
        key: 'X-XSS-Protection',
        value: '1; mode=block'
    }
```

- https://nextjs.org/docs/advanced-features/security-headers

## Cognito Authentication

- https://frontend-digest.com/authentication-in-next-js-using-amazon-cognito-f30efed6a24f
- https://darrenwhite.dev/blog/nextjs-authentication-with-next-auth-and-aws-cognito
- https://stackoverflow.com/questions/47159568/how-to-redirect-after-confirm-amazon-cognito-using-confirmation-url
- https://medium.com/@jacobjoy/redirect-user-using-amazon-cognito-confirmation-url-d8ccb11bac75
