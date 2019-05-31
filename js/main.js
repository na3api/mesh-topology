var makeRequest = function (url, method) {

    // Create the XHR request
    var request = new XMLHttpRequest();

    // Return it as a Promise
    return new Promise(function (resolve, reject) {

        // Setup our listener to process compeleted requests
        request.onreadystatechange = function () {

            // Only run if the request is complete
            if (request.readyState !== 4) return;

            // Process the response
            if (request.status >= 200 && request.status < 300) {
                // If successful
                resolve(JSON.parse(request.response));
            } else {
                // If failed
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }

        };

        // Setup our HTTP request
        request.open(method || 'GET', url, true);
        request.setRequestHeader("Content-type", 'application/json');
        request.setRequestHeader("Origin", 'https://beta.console.plasma-cloud.com');
        request.setRequestHeader("Authorization", 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJSUE9lVTFUTEJFRkhXVllUZWdVclNXZHRvb3hLTGRQX1dtZEhncGZ0TndRIn0.eyJqdGkiOiJmOTY4ZjEyOS1hMGZhLTQ4NTMtOGJiYi0xMzg1NDJmZmRiMDgiLCJleHAiOjE1NTkwOTgyNzAsIm5iZiI6MCwiaWF0IjoxNTU5MDYyMjcwLCJpc3MiOiJodHRwczovL29hdXRoLWRldi5wbGFzbWEtY2xvdWQuY29tL2F1dGgvcmVhbG1zL3BsYXNtYWNsb3VkIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6Ijk5M2Q5MjViLWM4MzYtNDc5My05NmEyLTMyOGQ1ZjE5ZjIwYSIsInR5cCI6IkJlYXJlciIsImF6cCI6InBsYXNtYWNsb3VkX2NvbnNvbGUiLCJub25jZSI6Ijg5Njg1YjkwLWJiMGUtNDY0My04OWI0LWMyMTQzNWE2YmRmNyIsImF1dGhfdGltZSI6MTU1OTA2MjI3MCwic2Vzc2lvbl9zdGF0ZSI6IjM4ZjAzYTBlLWQyZGMtNDZjNC1iYjRhLTk0NzM5YjJjYzAyMyIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9tYXJlay5jb25zb2xlLnBsYXNtYS1jbG91ZC5jb20iLCJodHRwOi8vbG9jYWxob3N0Ojg4ODgiLCJodHRwczovL2JldGEuY29uc29sZS5wbGFzbWEtY2xvdWQuY29tIiwiaHR0cHM6Ly9zdGFnaW5nLmNvbnNvbGUucGxhc21hLWNsb3VkLmNvbSIsImh0dHBzOi8vYW50b25pby5jb25zb2xlLnBsYXNtYS1jbG91ZC5jb20iXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJTbm93IE1hbiIsInByZWZlcnJlZF91c2VybmFtZSI6InNub3cubWFuMjE5QG91dGxvb2suY29tIiwiZ2l2ZW5fbmFtZSI6IlNub3ciLCJmYW1pbHlfbmFtZSI6Ik1hbiIsImVtYWlsIjoic25vdy5tYW4yMTlAb3V0bG9vay5jb20ifQ.aquEhtvoUq98J8LxpfFvlw1nlm_smp3QMMZgsek8tf1EBR_CrwRtmE58EiEFtMACDYqLMzSjMIKqqhQ1bj6BNRkrVkAmWOMVTqfZyQwG4aoTY-Kh-hjVw9DWi20TIwLJ6GBDQ4Y_mSCrTD4azXesoyNTcJ4uK0aZZvyLCWkJA_o2dN72lm9fwKqTbl90NLGYqVGnkfrVH_OswkeisSEy9Tv7ZCs1aMVTGrUk1UoPrPQp6qt9GmSr_wBgSibTVZQm105HOfnDws8ayZqvQYKF7txF2z2JyhF3tlhlganqNIWjIgGKgwJtSf40faSJT02VQAKbFSUgaK7N1ClzkqYSWw');

        // Send the request
        request.send();

    });
};

class Network{
    marker;
    constructor(config){
        this.name = config.name;
        this.model = config.model;
        this.location = new google.maps.LatLng(config.location.lat, config.location.long);
        this.id = config.location;
        this.network_id = config.network_id;
    }
}

class Node extends Network{
    icon = 'pc.png';

    constructor(config){
        super(config);
    }
}

class Gateway extends Network{
    icon = 'switch.png';

    constructor(config){
        super(config);
    }
}