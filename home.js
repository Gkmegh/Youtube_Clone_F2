

const apiKey = "AIzaSyD_F9BhEA5T90ZtePyzQZuGAzexuskHRaQ" ;
const baseUrl = `https://www.googleapis.com/youtube/v3`;
/**
 * 
 * searchString is the value typed by the user in the input box.
 * @param {String} searchString 
 */

const searchButton = document.getElementById("search") ;
const searchInput = document.getElementById("search-input");
const containerdata = document.getElementById("container");

searchButton.addEventListener("click", () => {
    let searchString = searchInput.value.trim();
    if(searchString === ""){
        return ;
    }
    getSearchResults(searchString);
})

async function getSearchResults(searchString) {
    // make a call to the search API and return the results from here.
    // data need to be sent: apiKey , searchString
    let url = `${baseUrl}/search?key=${apiKey}&q=${searchString}&part=snippet&maxResults=20`
    const response = await fetch(url, { method: "GET" });
    const result = await response.json();
    console.log(result)
    addDataOntoUI(result.items);
}

function addDataOntoUI(videosList) {
   videosList.forEach((video) => {
        const {snippet} = video ;
        // const snippet = video.snippet

        const videoElement = document.createElement("div");
        videoElement.className = "video";
        videoElement.innerHTML = `
                    <img src="${snippet.thumbnails.high.url}" >
                    <p>${snippet.title}</p>
                    <b>${snippet.channelTitle}</b>
        `;
        containerdata.appendChild(videoElement)
   })
}

function additem(){
    
}
