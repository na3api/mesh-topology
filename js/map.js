class GMap{
    map;
    points = [];
    bounds;

    constructor(){
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 1
        });

        this.bounds  = new google.maps.LatLngBounds();

        makeRequest('https://api-beta.kaiwoo.ai/v2/organisations/0/devices?network_id=1027')
            .then((response) => this.initPoints(response))
            .then(() => this.setMarkers())
            .catch((error) => {
                console.log('Static data');

                this.initPoints(window.cache);
                this.setMarkers();
            });
    }

    initPoints(response){
        response.devices.forEach((point) => {
            switch (point.type) {
                case 'ap':
                    this.points.push(new Node(point));

                    break;
                case 'switch':
                    this.points.push(new Gateway(point));

                    break;
            }
        });
    }

    setMarkers(){
        this.points.forEach((point) => {
            point.marker = new google.maps.Marker({
                position: point.location,
                map: this.map,
                icon: 'img/' + point.icon,
                title: point.name
            });

            this.bounds.extend(point.location);
        });

        this.map.fitBounds(this.bounds);
        this.map.panToBounds(this.bounds);
    }
}

function initMap() {
    window.map = new GMap();
}

const html = '<html><head></head><body><h1></h1><p><b></b></p></body></html>';

const parced = html.split(/(<[\/a-z0-9]+>)/i).filter((tag) => {return tag});

validator(parced);

async function validator(array) {
    const stack = [];

    array.forEach((tag, index) => {
        if(/<[a-z0-9]+>/g.test(tag)){
            stack.push(tag);
        }else if(/<\/[a-z0-9]+>/g.test(tag)){
            if(stack[stack.length - 1].replace(/[^\w\d]/g, '') === tag.replace(/[^\w\d]/g, '')){
                stack.pop();
            }else{
                console.error('Expected tag: </' + tag.replace(/[^\w\d]/g, '') + '>');
            }
        }
        console.log(stack);
    });

    if(stack.length){
        console.error('Validation error');
    }

    return true;
}