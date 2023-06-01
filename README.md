# coinX Cryptocurrency App

A single-page React application that utilizes the CoinGecko API to display a list of crypto coins with pagination, search, sort, and currency change functionalities.

## Features

- Fetches crypto coin data from the CoinGecko API and displays it in a table format.
- Displays the following details for each coin:
  - Image
  - Name
  - Symbol
  - Current Price
  - Price Change 24 Hours (in percentage, up to 2 decimal points)
  - Market Cap
- Supports pagination, with 10 coins displayed per page.
- Allows sorting of coins based on market cap, from low to high and high to low.
- Provides the option to change the currency, with support for INR, USD, and EUR.
- Clicking on a coin opens a modal displaying detailed information for the selected coin, including:
  - Market Cap Rank
  - Image
  - Name
  - Symbol
  - Current Price
  - Price Change 24 Hours
  - Total Volume
  - Low 24 Hours
  - High 24 Hours
  - Total Supply
  - Max Supply
  - Circulating Supply
  - All-Time High (ATH)
  - Last Updated Date

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/alokrrbal/coinX

2. Navigate to the project directory:
    `cd coinx-by-alok`

3. Install the dependencies:
    `npm install`


## Usage

1. Start the development server:
    `npm start`

2. Open your web browser and visit http://localhost:3000 to view the CoinGecko app.

## Technologies Used

1. React: A JavaScript library for building user interfaces.
2. Axios: A promise-based HTTP client for making API requests.
3. Chakra UI: A simple, modular, and accessible component library for React.

## Credits

. CoinGecko API: https://www.coingecko.com/en/api/documentation


### Feel free to copy and paste the above content into your README.md file. You can customize it further as needed, adding any additional sections or information relevant to your project.

 