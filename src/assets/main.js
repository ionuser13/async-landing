const playlistAPI = "https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=PLn5jU74I0Hxd1OdqbHO30SmYXphTYvy61&part=snippet&maxResults=10";
const twtAPI = "https://twitter154.p.rapidapi.com/user/details?username=ionuser03"

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
        <div class="group relative">
            <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${tweets.profile_pic_url}" alt="${tweets.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${tweets.name}
                </h3>
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${tweets.description}
                </h3>
            </div>
        </div>
        `;
        twitter.innerHTML = post;
    }
    catch(error){
        console.error(error)
        twitter.innerHTML = `An error has ocurred: ${error}`
    }
})();