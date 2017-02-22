This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

* To run the project, first install dependencies with `npm install`, then run with `npm start`. The browser will automatically open `http://localhost:3000`
* To run tests: `npm test`
* To run linting: `npm run lint`

Usage:

In the betting area place bets in the following format:
* `P:1:10` means horse 1 will be 1st, 2nd or 3rd. The bet amount is $10.
* `W:2:5` means horse 2 will win the race. The bet amount is $5
* `Q:3,2:15` means the horses 3 and 2 will be in the top 2 places, regardless of the exact order. The bet amount is $15.
* `E:4,7:7` means horse 4 will be 1st and horse 7 will be 2nd. The bet amount is $7.

The results come in the following format: `R:3:2:1` means horse 3 is 1st, horse 2 is 2nd and horse 1 is 3rd.

The amount displayed under each type of bet is the amount of money a better gets for every $1 they put it.
