## **Requirements**

The three base routes are ***/mean***, ***/median***, ***/mode***. All accept GET requests

Each route takes a query key of ***nums*** which is a comma-separated list of numbers. For example, if I want to get the mean of 1, 3, 5, and 7, that would look like be a GET request to ***/mean?nums=1,3,5,7***.

The response of each operation should be JSON which looks like this:
response: {
  operation: "mean",
  value: 4
}

The app should “gracefully” handle the following errors:

- Passing in an invalid number (NaN errors). For instance, ***/mean?nums=foo,2,3*** should respond with a ***400 Bad Request*** status code and a response that saying something like: ***foo is not a number.***
- Empty input: ***/mean*** without passing any nums should respond with a ***400 Bad Request*** status code saying something like ***nums are required.***
