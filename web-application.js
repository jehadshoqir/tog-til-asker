// ESM syntax is supported.
import express from 'express'
import fetch from 'node-fetch'

const app = express();


/*
  Endpoint: Next train to Asker (from Oslo S)
  Method: GET
  Path: /api/nextdeparture/asker
  Request params: N/a
  Response: a json resource {"scheduled": "08:21"}
 */
app.get('/api/nextdeparture/asker', function (req, res) {
    console.log('Entering the GET /api/nextdeparture/asker ressource');

    const userAction = async () => {
        //The endpoint 'neste-tog.herokuapp.com/avgang/asker' returns a json string like:
        // {"tidspunkt": "08:21"}
        let url = 'https://neste-tog.herokuapp.com/avgang/asker';
        const response = await fetch(url);
        const avgang = await response.json();

        console.log("[DEBUG] Received the following value for 'avgang.tidspunkt' from " +
            "neste-tog.herokuapp.com/avgang/asker: "
            + avgang.tidspunkt);
        return avgang;
    };

    let departureTime = "no_result";
    userAction().then(json => {
        departureTime = json.tidspunkt;

        console.log("[DEBUG] Returning the following value 'scheduled' to the client: "
            + departureTime);
        res.send(`{"scheduled": "${departureTime}"}`);
    });

});

// Serving static resources here (all the files under ./public)
app.use(express.static('public'));

// Starting the web server
app.listen(3000, () => console.log('Starting web application on port 3000...'));


// Required by ESM (ES6)
export {}