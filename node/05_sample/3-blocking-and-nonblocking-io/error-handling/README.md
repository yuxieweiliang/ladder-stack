
# Error handling

To run the first example:

    node http.js

Then point your browser to `http://127.0.0.1:3000`.

Note: an error is expected, as this script is written to demonstrate
stack traces.

The second example is run with

    node http-uncaught.js

The third example is run with

    node fs.js

The `fs` example should demonstrate getting a callback with an `Error`
object, as the file that's being read does not exist.
