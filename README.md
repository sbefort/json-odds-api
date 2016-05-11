# json-odds-api

This module is for retrieving odds data from the JSON Odds API.  See https://jsonodds.com for more information.

Please note that you must have a paid subscription or request a test token from JsonOdds.com for this module to work.

The API supports odds data for MLB, NBA, NCAA Basketball, NCAA Football, NFL, NHL, MMA, soccer, and tennis,

## Installation
`npm install json-odds-api --save`

## Examples

#### Require and Initialize the Module
```
var JsonOddsAPI = require('json-odds-api');
var jsonOdds = new JsonOddsAPI('<your-token>');
```

#### Get Sources
````
// As of now the API supports five sources: Pinnacle(1), Bookmaker(2), BetOnline(3), Bovada(4), and GTBets(5)
jsonOdds.getSources(function(err, response, body) {
  if (err) throw new Error(err);
  console.log(body);
});
````

#### Get Odd Type
````
// As of now the API will return ["None", "Game", "FirstHalf", "SecondHalf", "FirstQuarter", "SecondQuarter", "ThirdQuarter", "FourthQuarter", "FirstPeriod", "SecondPeriod", "ThirdPeriod", "FirstFiveInnings", "FirstInning"]
jsonOdds.getOddType(function(err, response, body) {
  if (err) throw new Error(err);
  console.log(body);
});
````

#### Get Regions
````
jsonOdds.getRegions(function(err, response, body) {
  if (err) throw new Error(err);
  console.log(body);
});
````

#### Get Sports
````
// AS of now the API will return {"0":"mlb","1":"nba","2":"ncaab","3":"ncaaf","4":"nfl","5":"nhl","7":"soccer","11":"mma","9":"tennis","12":"None"}
jsonOdds.getSports(function(err, response, body) {
  if (err) throw new Error(err);
  console.log(body);
});
````

#### Get Leagues
````
jsonOdds.getLeagues(function(err, response, body) {
  if (err) throw new Error(err);
  console.log(body);
});
````

#### Get Leagues by Region
````
var options = {regionName: 'SWE'};
jsonOdds.getLeagues(options, function(err, response, body) {
  if (err) throw new Error(err);
  console.log(body);
});
````

#### Get Odds
````
jsonOdds.getOdds(function(err, response, body) {
  if (err) throw new Error(err);
  console.log(body);
});
````

#### Get Odds by Sport
````
var options = {sport: 'MLB'};
jsonOdds.getOdds(options, function(err, response, body) {
  if (err) throw new Error(err);
  console.log(body);
});
````

#### Get Odds by Odd Type
````
var options = {oddType: 'FirstHalf'};
jsonOdds.getOdds(options, function(err, response, body) {
  if (err) throw new Error(err);
  console.log(body);
});
````

#### Get Odds by Source
````
var options = {source: 1}; // ID of Pinnacle Sports
jsonOdds.getOdds(options, function(err, response, body) {
  if (err) throw new Error(err);
  console.log(body);
});
````

#### Get Odds by Source
````
var options = {source: 1}; // ID of Pinnacle Sports
jsonOdds.getOdds(options, function(err, response, body) {
  if (err) throw new Error(err);
  console.log(body);
});
````

#### Get Odds by League (Soccer only)
````
var options = {leagueName: 'Allsvenskan', source: 1, sport: 'soccer'};
jsonOdds.getOdds(options, function(err, response, body) {
  if (err) throw new Error(err);
  console.log(body);
});
````

#### Get Odds by Region (Soccer only)
````
var options = {regionName: 'SWE', source: 1, sport: 'soccer'};
jsonOdds.getOdds(options, function(err, response, body) {
  if (err) throw new Error(err);
  console.log(body);
});
````

#### Get Results
````
jsonOdds.getResults(function(err, response, body) {
  if (err) throw new Error(err);
  console.log(body);
});

#### Get Results by Sport
````
var options = {sport: 'mlb'};
jsonOdds.getResults(options, function(err, response, body) {
  if (err) throw new Error(err);
  console.log(body);
});

#### Get Final Results for a Sport
````
var options = {sport: 'mlb', final: true};
jsonOdds.getResults(options, function(err, response, body) {
  if (err) throw new Error(err);
  console.log(body);
});

#### Get Results with a Specific OddType
````
var options = {sport: 'nba', oddType: 'FirstHalf'};
jsonOdds.getResults(options, function(err, response, body) {
  if (err) throw new Error(err);
  console.log(body);
});

#### Get Results for a Specific Game
````
var options = {eventId: '06c98b03-becb-4d04-a095-8ba717d32b1f'};
jsonOdds.getResults(options, function(err, response, body) {
  if (err) throw new Error(err);
  console.log(body);
});
