

const apiKey = "AIzaSyD_F9BhEA5T90ZtePyzQZuGAzexuskHRaQ" ;
const baseUrl = `https://www.googleapis.com/youtube/v3`;
/**
 * 
 * searchString is the value typed by the user in the input box.
 * @param {String} searchString 
 */

const searchButton = document.getElementById("search") ;
const searchInput = document.getElementById("search-input");
const containerdata = document.getElementById("videos-container");

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
        <div class="video-info" onclick="openVideoDetails('${video.id}')" >
        <div class="video-image">
          <img src="${snippet.thumbnails.high.url}" alt="video title" />
        </div>

        <div class="video-description">
          <div class="channel-avatar">
            <img src="https://yt3.googleusercontent.com/584JjRp5QMuKbyduM_2k5RlXFqHJtQ0qLIPZpwbUjMJmgzZngHcam5JMuZQxyzGMV5ljwJRl0Q=s176-c-k-c0x00ffffff-no-rj" alt="channel- aviator" />
          </div>


          <div class="video-title">${snippet.title}
           
          <div class="channel-description">

            <b class="channel-name"> ${snippet.channelTitle}</b>

            <div class="channel-time">
            <p class="video-views">15K Views  ${" "} . ${" "}</p>
            <p class="video-time">4 week ago</p>
            </div>
            </div>

          </div>
        </div>
      </div>
        `;
        containerdata.insertBefore(videoElement, containerdata.firstChild);
   })
}

