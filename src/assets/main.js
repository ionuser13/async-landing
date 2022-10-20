const playlistAPI = "https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=PLn5jU74I0Hxd1OdqbHO30SmYXphTYvy61&part=snippet&maxResults=10";
const twtAPI = "https://twitter154.p.rapidapi.com/user/tweets?username=ionuser03&limit=40"

const videosContainer = null || document.getElementById("videos");
const twitter = null || document.getElementById("twitter") 

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f795c979d9msh737fce69d2d0e2ap140ed4jsn705b07bcd026',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

const optionsTwt = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f795c979d9msh737fce69d2d0e2ap140ed4jsn705b07bcd026',
		'X-RapidAPI-Host': 'twitter154.p.rapidapi.com'
	}
};
async function fetchData(urlApi){//transforms data into an iterable object
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}
async function fetchData2(urlApi){//transforms data into an iterable object
    const response = await fetch(urlApi, optionsTwt);
    const data = await response.json();
    return data;
}

//recursive function
(async() => {
     try{
        const videos = await fetchData(playlistAPI);
        //generate a template to iterate through all the elements
        let view = `
        ${videos.items.map(video => `
        <a href="https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}&list=${video.snippet.playlistId}&index=${video.snippet.position + 1}" target="_blank">
            <div class="group relative">
                <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.snippet.title}
                    </h3>
                </div>
            </div>
            </a>
        `).slice(0, 8).join("")}
        `;
        videosContainer.innerHTML = view;
     }
     catch (error){
        console.error(error)
        videosContainer.innerHTML = `An error has ocurred: ${error}`
     }
})();
(async() => {
    try{
        const tweets = await fetchData2(twtAPI);
        let post = `
        ${tweets.results.map(tweet => `
        <div class="group relative">
            <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${tweet.user.profile_pic_url}" alt="${tweet.user.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${tweet.text}
                </h3>
            </div>
        </div>
        `).slice(0, 8).join("")}
        `;
        twitter.innerHTML = post;
    }
    catch(error){
        console.error(error)
        twitter.innerHTML = `An error has ocurred: ${error}`
    }
})();


// fetch(API, options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));