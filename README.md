# Sold Price Map Web App

## Problem

You have been given a set of data points, with each item taking the following form:

```
X Y P
```

Where:

- `0 <= X < 100`
- `0 <= Y < 100`
- `10000 < P < 10000000`

`X` and `Y` represent the coordinates of a house which has been sold, and `P` is the price in which it was sold. For example, the point "`5 10 100000`" would be interpreted as a house sold for £100,000 at the point `(5, 10)`.

Using this data plot each point on a grid. The points should be filled with a colour representing how expensive a house was in relation to other houses. The choice of colour is up to you, however, you should use a different colour for each of the following groups:

- 0% - 5%
- 5% - 25%
- 25% - 75%
- 75% - 95%
- 95% - 100%

For back-end or terminal solutions, how you represent colour for each point is up to you.

## Solution

- Frontend:
    - Angular with chartJs for drawing a scatter plot of the X and Y coordinates.
- Backend:
    - NodeJs with express, calculating the groups and returning a JSON response.
    
## Server

- Run `npm run start` then navigate to `http://localhost:8080/`.  
- The API is located at `http://localhost:8080/api/sold-price`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Link To App
[https://still-garden-58523.herokuapp.com/](https://still-garden-58523.herokuapp.com/)

## Improvements 
- Due Keeping to the 2 hour time constraint, tests are missing. 
- End to end tests need to be written:
    - Unit tests
    - Behavioural Tests
