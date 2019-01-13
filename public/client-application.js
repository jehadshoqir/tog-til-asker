
/*
  This file contains code running in the browser.
  The main function is called as the web page is loaded.
 */

function main() {
    console.log("[INFO] main() function in client application is starting!");

    document.getElementById("fetch-schedule-button").addEventListener("click", function() { userAction()}, false);


    const userAction = async () => {

        // TODO: try to use 'neste-tog.herokuapp.com' directly ... what is happening?
        //const response = await fetch('https://neste-tog.herokuapp.com/avgang/asker');

        const response = await fetch('http://localhost:3000/api/nextdeparture/asker');
        const departure = await response.json(); //extract JSON from the http response

        let departureTime = departure.scheduled;
        console.log("[DEBUG] Departure scheduled= " + departure.scheduled);

        document.getElementById('text-departure').innerHTML=departureTime;
    }

}

// Calling main on load
window.onload = main;
