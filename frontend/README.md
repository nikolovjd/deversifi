# TradeApp frontend
## Usage
1. ``npm install``
2. ``npm start``

## Notes
3. The frontend runs fixed in localhost:3000 (due to time limitations I didn't extract it to a config file)
4. Due to time constraints, there's no flash alerts. For example trying to place a SELL order without suficient funds of the token, the API will return 406 Insuficient Funds, but the UI will not display it.
5. No pagination
6. No use of state management libraries (Redux, Mobx etc)
7. Over use of ts-ignore etc due to lack fo time for proper typing
