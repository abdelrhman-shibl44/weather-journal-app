/* Global Variables */
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",&appid=6bf622e0d3abb3b2a045c44671b70209&units=imperial";
const generate = document.getElementById("generate")
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
console.log(newDate);
// fetch data from api 
// create async function 
generate.addEventListener("click", () => {
    const zipCode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    getWeatherData(baseUrl, zipCode, apiKey)
        .then(data => {
            const { main: { temp } } = data;
            postData("/sendWeatherData", { temp: Math.round(temp), user: feelings, date: newDate });
            updateUI("/all")
        });
});
const getWeatherData = async (baseUrl, zipCode, apiKey) => {
    const res = await fetch(baseUrl + zipCode + apiKey);
    try {
        const newData = await res.json();
        console.log(newData);
        return newData
    } catch (error) {
        console.log("error", error)
    };
};
// postData to send data to localStorage
const postData = async (url = "", data = {}) => {
    const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = res.json();
        console.log(newData)
        return newData
    } catch (error) {
        console.log("error", error);
    }
};
// put the coming data from server into our page 
const updateUI = async (url) => {
    const res = await fetch(url);
    try {
        const newData = await res.json();
        document.getElementById("date").innerHTML = newData.date
        document.getElementById("temp").innerHTML = newData.temprature + " " + 'degrees'
        document.getElementById("content").innerHTML = newData.userResponse
    } catch (error) {
        console.log('error', error)
    }
}