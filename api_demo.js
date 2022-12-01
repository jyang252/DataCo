
    
class Block {
    constructor(x, y, width, height, speedX, speedY, clr) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speedX = speedX;
      this.speedY = speedY;
      this.clr = clr;
    }
  
    display() {
      rect(this.x, this.y, this.width, this.height);
    }
  
    move() {
      this.x = this.x + this.speedX;
      if (this.x > windowWidth - this.width || this.x < 0) {
        this.speedX = this.speedX * -1;
      }
      this.y = this.y + this.speedY;
      if (this.y > windowHeight - this.height || this.y < 0) {
        this.speedY = this.speedY * -1;
      }
    }
  }
  
  let blocks = [];
  let numLock = 1;
  let cnv;
  i = 0;
  b = 0;
  for (i; i < numLock; i++) {
    blocks[i] = new Block(i * 2, i * 4, 50, 50, i * 0.1 + 10, 0, i * 1.5);
  }
  
  function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.mousePressed(showBlock);
  }
  
  function draw() {
    // background(0);
    for (i = 0; i < numLock; i++) {
      blocks[i].display();
      blocks[i].move();
    }
  }
  
  function showBlock() {
    blocks[b].display();
    blocks[b].move();
  }
  

    function initializeLonLat(){
        startLongitude = -87.6298;
        startLattitude = 41.8781;
        sessionStorage.setItem("lon", startLongitude); 
        sessionStorage.setItem("lat", startLattitude); 
    }

    function addLongitude(number){
        previousLon = parseFloat(sessionStorage.getItem("lon"))
        newLon = previousLon + number;
        sessionStorage.setItem("lon", newLon);
        console.log(`new lon = ${sessionStorage.getItem("lon")}`)   
    }

    function subLongitude(number){
        previousLon = parseFloat(sessionStorage.getItem("lon"))
        newLon = previousLon - number;
        sessionStorage.setItem("lon", newLon);
        console.log(`new lon = ${sessionStorage.getItem("lon")}`)   
    }

    function addLat(number){
        previousLon = parseFloat(sessionStorage.getItem("lat"))
        newLat = previousLon + number;
        sessionStorage.setItem("lat", newLat);
        console.log(`new lat = ${sessionStorage.getItem("lat")}`)   
    }

    function subLat(number){
        previousLon = parseFloat(sessionStorage.getItem("lat"))
        newLat = previousLon - number;
        sessionStorage.setItem("lat", newLat);
        console.log(`new lat = ${sessionStorage.getItem("lat")}`)   
    }





    function parseWeather(resp){
        temp = resp["main"]["temp"]
        windSpeed = resp["wind"]["speed"]
        console.log(`temp in farinheight = ${temp}\n wind speed in mph = ${windSpeed}`)
        return [temp, windSpeed];
    }

    function scaleProperly(number, inMin, inMax, outMin, outMax) {
        return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

    function changeDisplay(resp){
        let [temp, windSpeed] = parseWeather(resp);

        // windSpeed will be related to the height of a rectangle
        // temp will be the color of that rectangle
        // to do this we will make a grid element and set the size
        let newOBJ = document.createElement("div");
        
        // Call the scaeProperly function to map the range of inputs to the coresponding out put range. 0-255 for color and 0-100 for height. the height was arbitrarly chosen
        properTemp = scaleProperly(temp, 0, 120, 0, 255); 
        properWindspeed = scaleProperly(windSpeed,0,8,0,100);

        b = b + 1;
        blocks[b] = new Block(50,50,30,30,properTemp,properWindspeed);

        // newOBJ.style.backgroundColor = `rgb(${properTemp},50,50)`;
        // newOBJ.style.height = `${properWindspeed}px`
        // newOBJ.style.width = '100px'
      
        // const drawingArea = document.getElementById('drawingArea');
        // drawingArea.appendChild(newOBJ);

    }


    function makeApiCall(){
        url = "https://api.openweathermap.org/data/2.5/weather?"
        weatherKey = "5bbed862a377453b564e9defbd3ba725"
        lat = sessionStorage.getItem("lat") 
        lon = sessionStorage.getItem("lon") 
        weatherParams = {"lat": lat,
                            "lon": lon,
                            "units": "imperial",
                            "appid": weatherKey
                            }
        console.log(weatherParams)

        $.ajax({
            url: url,
            type: "GET",
            data: weatherParams,
            success: function(resp){
                changeDisplay(resp);
            },
            error: function(error){
                console.log(error)
            }
        });
    }