const API = 'https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=PLn5jU74I0Hxd1OdqbHO30SmYXphTYvy61&part=snippet&maxResults=5';

const content = null || document.getElementById("content");

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f795c979d9msh737fce69d2d0e2ap140ed4jsn705b07bcd026',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi){//transforms data into an iterable object
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data
}

//recursive function
(async() => {
     try{
        const videos = await fetchData(API);
        //generate a template to iterate through all the elements
        let view = `
        ${videos.items.map(video => `
            <div class="group relative">
                <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnail.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.snippet.title}
                    </h3>
                </div>
            </div>
        `).slice(0, 4).join("")}
        `;
     }
     catch{

     }
})();



// fetch(API, options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));