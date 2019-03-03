//here are the functions that will be called on page load of the main page
//we would make a call tothe server to get the data for the top three list, top ten, and the top trending review

//HTML elements to be edited
const top_10_anime = document.querySelector('.top_ten');
const trending_3_anime = document.querySelector('.trending_three');
const top_3_reviews = document.querySelector('.trending_reviews');

//global variables for updating
let top_ten_anime = {
	"Anime1": "mob.gif", "Anime2": "mob.gif", "Anime3": "mob.gif",
	"Anime4": "mob.gif", "Anime5": "mob.gif", "Anime6": "mob.gif",
	"Anime7": "mob.gif", "Anime8": "mob.gif", "Anime9": "mob.gif",
	"Anime10": "mob.gif"
};
let top_three_reviews = {"[Anime4Lyfe] : Mob Psycho 100 S2": ["It rarely happens that second season of any anime tops the first season season but its not the case with the Mob Psycho 100, because its clearly improves over 1st season artistically and story-wise too.", 10],
						"[coolAnime123] : Mob Psycho 100 S2": ["It rarely happens that second season of any anime tops the first season season but its not the case with the Mob Psycho 100, because its clearly improves over 1st season artistically and story-wise too.", 10],
						"[iLoveAnime] : Mob Psycho 100 S2": ["It rarely happens that second season of any anime tops the first season season but its not the case with the Mob Psycho 100, because its clearly improves over 1st season artistically and story-wise too.", 10],
};
let trending_three_anime = {"Mob Psycho 100 II": "mob.gif", "JoJo no Kimyou na Bouken: Ougon no Kaze": "mob.gif", "Yakusoku no Neverland": "mob.gif"};

//updates the top three trending anime
function update_top_three() {
	
	const animeList = trending_3_anime.getElementsByTagName("ul")[0];

	for (let key in trending_three_anime)
	{
		const animeListElmt = document.createElement('li');

		const animeA = document.createElement('a');
		const animeImg = document.createElement('img');

		//temp link
		animeA.href = "#anime";
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
		const animeReviewElmt = document.createElement('p');

		const animeKey = document.createElement('strong');
		animeKey.className = "orange";
		animeKey.textContent = key;

		const txt = document.createTextNode( " - " + top_three_reviews[key][0] + " Rating " + top_three_reviews[key][1] + "/10 ");
		//construct the element
		
		animeReviewElmt.appendChild(animeKey);
		animeReviewElmt.appendChild(txt);
		

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

		//temp link
		animeA.href = "#anime";
		animeA.textContent = key;
		animeImg.className = "anime_tile_small";
		animeImg.src = top_ten_anime[key];

		//construct the element
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