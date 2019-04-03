//here are the functions that will be called on page load of the main page
//we would make a call tothe server to get the data for the top three list, top ten, and the top trending review

//HTML elements to be edited
const top_10_anime = document.querySelector('.top_ten');
const trending_3_anime = document.querySelector('.trending_three');
const top_3_reviews = document.querySelector('.trending_reviews');

//global variables for updating (this is where we would call the server to dynamically create these data structures)
let top_ten_anime = {
	"Anime1": "/img/mob.gif", "Anime2": "/img/mob.gif", "Anime3": "/img/mob.gif",
	"Anime4": "/img/mob.gif", "Anime5": "/img/mob.gif", "Anime6": "/img/mob.gif",
	"Anime7": "/img/mob.gif", "Anime8": "/img/mob.gif", "Anime9": "/img/mob.gif",
	"Anime10": "/img/mob.gif"
};
let top_three_reviews = {"[Anime4Lyfe] : Mob Psycho 100 S2": ["It rarely happens that second season of any anime tops the first season season but its not the case with the Mob Psycho 100, because its clearly improves over 1st season artistically and story-wise too.", 10],
						"[coolAnime123] : Mob Psycho 100 S2": ["It rarely happens that second season of any anime tops the first season season but its not the case with the Mob Psycho 100, because its clearly improves over 1st season artistically and story-wise too.", 10],
						"[iLoveAnime] : Mob Psycho 100 S2": ["It rarely happens that second season of any anime tops the first season season but its not the case with the Mob Psycho 100, because its clearly improves over 1st season artistically and story-wise too.", 10],
};
let trending_three_anime = {"Mob Psycho 100 II": "/img/mob.gif", "JoJo no Kimyou na Bouken: Ougon no Kaze": "/img/mob.gif", "Yakusoku no Neverland": "/img/mob.gif"};

//Phase 2: get the anime list from the server
const url = '/anime';
// Create our request constructor with all the parameters we need
const request = new Request(url, {
        method: 'get', 
        headers: {
            'Accept': 'application/json, text/plain, */*', //GETTING SOME STRANGE HTTPS ERROR
            'Content-Type': 'application/json'
        },
    });
    fetch(request)
    .then(function(res) {
        // Handle response we get from the API
        // Usually check the error codes to see what happened
        if (res.status === 200) {
            console.log('Got the anime list')
            const animeList = JSON.parse(res.json())
           
        } else {
            
     		 console.log('Did not get anime list')
        }
        console.log(res)
        
    }).catch((error) => {
        console.log(error)
    })


//updates the top three trending anime
function update_top_three() {
	
	const animeList = trending_3_anime.getElementsByTagName("ul")[0];

	for (let key in trending_three_anime)
	{
		const animeListElmt = document.createElement('li');

		const animeA = document.createElement('a');
		const animeImg = document.createElement('img');

		//fill with the dummy data from the global data structures (here is where the server data is used)
		//to construct the DOM elements
		let title_underscore = key;
		title_underscore = title_underscore.replace(/\s+/g, "_");
		animeA.href = "/anime/" + title_underscore;
		//log("/anime/" + title_underscore);
		animeA.textContent = key;
		animeImg.className = "anime_tile";
		animeImg.src = trending_three_anime[key];

		//construct the element
		animeListElmt.appendChild(animeA);
		animeListElmt.appendChild(animeImg);
		animeList.appendChild(animeListElmt);
			

	}
}

//updates the top 3 trending reviews
function update_trending_reviews() {
	
	for (let key in top_three_reviews)
	{
		//We will be using the server data here to construct the elements dynamically
		const animeReviewElmt = document.createElement('p');

		const animeKey = document.createElement('strong');
		animeKey.className = "orange";
		animeKey.textContent = key;

		const txt = document.createTextNode( " - " + top_three_reviews[key][0] + " Rating " + top_three_reviews[key][1] + "/10 ");
		//construct the element
		
		animeReviewElmt.appendChild(animeKey);
		animeReviewElmt.appendChild(txt);
		
		//append to top 3 reviews 
		top_3_reviews.appendChild(animeReviewElmt);	

	}
	

}

//updates the top ten anime list
function update_top_ten() {

	const animeList = top_10_anime.getElementsByTagName("ol")[0];

	for (let key in top_ten_anime)
	{
		const animeListElmt = document.createElement('li');

		const animeA = document.createElement('a');
		const animeImg = document.createElement('img');

		//We will be using the server data here to construct the elements dynamically
		let title_underscore = key;
		title_underscore = title_underscore.replace(/\s+/g, "_");
		animeA.href = "/anime/"+ title_underscore;
		animeA.textContent = key;
		animeImg.className = "anime_tile_small";
		animeImg.src = top_ten_anime[key];

		//construct the element and add it to the webpage
		animeListElmt.appendChild(animeImg);
		animeListElmt.appendChild(animeA);
		animeList.appendChild(animeListElmt);
			

	}
	
}

//helper function that updates the whole page
function update_main_page() {

	update_top_three();
	update_trending_reviews();
	update_top_ten();
}

//adding the event listeners for the anime
trending_3_anime.addEventListener('click', go_to_anime_page);
top_10_anime.addEventListener('click', go_to_anime_page);

function go_to_anime_page(e) {
	e.preventDefault();

	if(event.target.tagName.toLowerCase() === 'a')
	{
		//get the anime title that was clicked to send to the Anime page
		let animeTitle = e.target.textContent;
		
		window.location.href = "/anime";
		//here we would send the anime title to the next page to load it
		load(animeTitle);
	}

}