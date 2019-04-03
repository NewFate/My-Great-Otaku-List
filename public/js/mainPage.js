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



//updates the top three trending anime
function update_top_three() {

	const url = '/animeinfo';

	fetch(url).then((res) => {
		if(res.status == 200){
			return res.json();
		}else {
			alert('Could not get Anime');
		}
	}).then((json) => {
		log("here");
		log(json);

		const animeList = trending_3_anime.getElementsByTagName("ul")[0];

		for (let key in json)
		{
			const animeListElmt = document.createElement('li');

			const animeA = document.createElement('a');
			const animeImg = document.createElement('img');

			//fill with the dummy data from the global data structures (here is where the server data is used)
			//to construct the DOM elements
			let title_underscore = json[key].name;
			title_underscore = title_underscore.replace(/\s+/g, "_");
			animeA.href = "/anime/" + title_underscore;
			//log("/anime/" + title_underscore);
			animeA.textContent = json[key].name;
			animeImg.className = "anime_tile";
			animeImg.src = json[key].imageURL;

			//construct the element
			animeListElmt.appendChild(animeA);
			animeListElmt.appendChild(animeImg);
			animeList.appendChild(animeListElmt);
				

		}




	})

	
	
}

//updates the top 3 trending reviews
function update_trending_reviews() {

	const url = '/animeinfo';

	fetch(url).then((res) => {
		if(res.status == 200){
			return res.json();
		}else {
			alert('Could not get Anime');
		}
	}).then((json) => {
		log("here");
		log(json);
	
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
	})
	

}

//updates the top ten anime list
function update_top_ten() {

	const url = '/animeinfo';

	fetch(url).then((res) => {
		if(res.status == 200){
			return res.json();
		}else {
			alert('Could not get Anime');
		}
	}).then((json) => {
		log("here");
		log(json);

		const animeList = top_10_anime.getElementsByTagName("ol")[0];

		for (let key in json)
		{
			const animeListElmt = document.createElement('li');

			const animeA = document.createElement('a');
			const animeImg = document.createElement('img');

			//We will be using the server data here to construct the elements dynamically
			let title_underscore = json[key].name;
			title_underscore = title_underscore.replace(/\s+/g, "_");
			animeA.href = "/anime/"+ title_underscore;
			animeA.textContent = json[key].name;
			animeImg.className = "anime_tile_small";
			animeImg.src = json[key].imageURL;

			//construct the element and add it to the webpage
			animeListElmt.appendChild(animeImg);
			animeListElmt.appendChild(animeA);
			animeList.appendChild(animeListElmt);
				

		}
	})
	
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
		animeTitle = animeTitle.replace(/\s+/g, "_");
		
		window.location.href = "/anime/" + animeTitle ;
		//here we would send the anime title to the next page to load it
		
	}

}