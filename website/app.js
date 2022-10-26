/* Global Variables */
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";//base url of weatherMap
const apiKey = ",&appid=6bf622e0d3abb3b2a045c44671b70209&units=imperial";//my personal apikey
const generate = document.getElementById("generate");//the button to generate the data;
const theServer = "http://127.0.0.1:8080";//the url of our server 
// Create a new date instance dynamically with JS
let d = new Date();
//getMonth returns zero-based number between 0 and 11 so i add one to be (one-based value);
const newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();
// fetch data from api 
// create async function 
generate.addEventListener("click", () => {
    // get values from input and textarea when click;
    const zipCode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    // get the data from api by getWeatherData function. 
    // then we will send data to local server by post route. 
    // then we will retreive the data from the server by UpdataUI function and use it into our page.
    getWeatherData(baseUrl, zipCode, apiKey)
        .then(data => {
            // get data from object by destructuring expression to unpack data 
            const { main: { temp } } = data;
            return postData(theServer + "/sendWeatherData", { temp: temp, user: feelings, date: newDate });
        })
        // after send data to server we will get data from it and update our user interface
        .then(() => updateUI(theServer + "/all"));

});
// get the data from api 
const getWeatherData = async (baseUrl, zipCode, apiKey) => {
    const res = await fetch(baseUrl + zipCode + apiKey);
    try {
        // convert it to json or text file 
        const newData = await res.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    };
};
// postData to send data to server 
const postData = async (url = "", data = {}) => {
    const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)//a method to convert the object to a json file
    });
    try {
        const newData = res.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    };
};
// updateUI to retreive data from server.
// put the coming data from local server into our page. 
// make a function call updatUI which wait to fetch data from server and store it. 
// when data comes we wait until it converts to json and then use it to fill out our page.
const updateUI = async (url) => {
    const res = await fetch(url);
    try {
        const newData = await res.json();
        // get elements from the dom and put data in it .
        document.getElementById("date").innerHTML = `<span class="title">Data</span>: ${newData.date}`;
        document.getElementById("temp").innerHTML = `<span class="title">temprature</span>: ${newData.temprature} degrees`;
        document.getElementById("content").innerHTML = `<span class="title">userFeeling</span>: ${newData.userResponse}`;
    } catch (error) {
        console.log('error', error);
    };
};
//end coding