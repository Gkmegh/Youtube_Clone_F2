const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyD_F9BhEA5T90ZtePyzQZuGAzexuskHRaQ";
// const API_KEY = "AIzaSyC8rFXqr-xP-Q6l_faaYkNnrEHYz7gcUdA";

const container = document.getElementById("videos-container");

// first we construct the url
// then we send the request
// then we convert it to json(format we want)
// get the data and modify it according to our needs
async function getVideos(q) {
  const url = `${BASE_URL}/search?key=${API_KEY}&q=${q}&type=videos&maxResults=20`;
  const response = await fetch(url, {
    method: "get",
  });
  const data = await response.json();

  const videos = data.items;
  getVideoData(videos);
}

async function getVideoData(videos) {
  let videoData = [];
  for (let i = 0; i < videos.length; i++) {
    const video = videos[i];
    const videoId = video.id.videoId;
    videoData.push(await getVideoDetails(videoId));
  }

  console.log(videoData);
  renderVideos(videoData);
}

async function getVideoDetails(videoId) {
  const url = `${BASE_URL}/videos?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${videoId}`;
  const response = await fetch(url, {
    method: "get",
  });
  const data = await response.json();
  return data.items[0];
}

function renderVideos(videos) {
  container.innerHTML = ``;
  for (let i = 0; i < videos.length; i++) {
    const video = videos[i];
    const thumbnailUrl = video.snippet.thumbnails.high.url;
    container.innerHTML += `
    <div class="video-info" onclick="openVideoDetails('${video.id}')" >
        <div class="video-image">
          <img src="${thumbnailUrl}" alt="video title" />
        </div>
        <div class="video-description">
          <div class="channel-avatar">
            <img src="https://yt3.googleusercontent.com/584JjRp5QMuKbyduM_2k5RlXFqHJtQ0qLIPZpwbUjMJmgzZngHcam5JMuZQxyzGMV5ljwJRl0Q=s176-c-k-c0x00ffffff-no-rj" alt="channel- aviator" />
          </div>

          <div class="video-title">
          ${video.snippet.localized.title}
            <div class="channel-description">
              <b class="channel-name"> ${video.snippet.channelTitle}</b>
              <div claas="channel-time">
                <p class="video-views">15K Views ${" "} . ${" "}</p>
                <p class="video-time">4 week ago</p>
              </div>
          </div>
          </div>
        </div>
      </div>
      `;
  }
}
  





function openVideoDetails(videoId) {
  localStorage.setItem("videoId", videoId);
  window.open("./Video/videoDetails.html");
}

getVideos("");



