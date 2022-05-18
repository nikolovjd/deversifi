# TradeApp backend
## Usage
1. ``npm install``
2. ``npm start``

## Notes
1. Runs at port 3005, no config file due to time constraints, needs to be edited in code if necessary (src/main.ts)
2. Does not use proper Finance Math for operations. Uses floating point operations (which wouldn't be appropriate for a prod ready app)
3. DataService works as a singleton memory storage for all transactions
4. As per the test requirements' specification it does not have a persistence layer
5. Authentication method is insecure (if someone's signature gets stolen there's no way to invalidate it, it never expires, etc)
6. Since it uses a Map to store account data it performs considerably well, but the DataService does not have strong enough guarantees for atomicity. It returns a deep copy for every value in public methods to avoid mutating them outside of the service
7. For performance improvements indexing orders by id, placed_at (currently doesn't exist), amount, price, etc either via a custom DS or using a specialized data store would be ideal
