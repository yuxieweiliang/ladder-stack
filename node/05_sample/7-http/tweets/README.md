
# HTTP

## Tweets

This app covers the "client" side of the HTTP module.

In step 2, we use the client against our own server. So first, make sure
the server is running:

    node server

In another terminal, go to the same directory and run the client

    node client

You will see the HTML response from the server you just ran printed
to the console.

Step 3 is written in the same spirit, but we look at passing information
from the client terminal through a query string, which gets parsed by the
HTTP server. Repeat the procedure of step 2 to see it in action.

Step 4 shows how you can combine all this knowledge to make a little app
that queries the Twitter Web Service API. Run it with

    node tweets
