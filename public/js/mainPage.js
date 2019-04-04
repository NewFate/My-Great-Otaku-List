//functions  will be called on page load of the main page
//we  make a calls to the server to get the data for the top three list, top ten, and the top trending review

//HTML elements to be edited
const top_10_anime = document.querySelector('.top_ten');
const trending_3_anime = document.querySelector('.trending_three');
const top_3_reviews = document.querySelector('.trending_reviews');



//updates the top three new anime
function update_top_three() {

	const url = '/animeinfo';
	//request the data from the server (anime list)
	fetch(url).then((res) => {
		if(res.status == 200){
			return res.json();
		}else {
			alert('Could not get Anime');
		}
	}).then((json) => {

		const animeList = trending_3_anime.getElementsByTagName("ul")[0];

		//display only four animes
		for(let key = json.length-1; key>=Math.max(json.length-4, 0); key--){

			const animeListElmt = document.createElement('li');

			const animeA = document.createElement('a');
			const animeImg = document.createElement('img');

			//fill with the data from the data (here is where the server data is used)
			//to construct the DOM elements
			let title_underscore = json[key].name;
			title_underscore = title_underscore.replace(/\s+/g, "_");
			animeA.href = "/anime/" + title_underscore;
		
			
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

	const url = '/animereviews';

	//request the data from the server (anime list)
	fetch(url).then((res) => {
		if(res.status == 200){
			return res.json();
		}else {
			alert('Could not get Anime');
		}
	}).then((json) => {
	

	
		// display only 3 reviews
		for(let key = json.length-1; key>=Math.max(json.length-3, 0); key--){
			//We will be using the server data here to construct the elements dynamically
			const animeReviewElmt = document.createElement('p');

			const animeKey = document.createElement('strong');
			animeKey.className = "orange";
			animeKey.textContent = "[" + json[key].reviewer + "]" + ": " + json[key].animeName ;

			const txt = document.createTextNode( " - " + json[key].review + ": Rating " + json[key].grade + "/10 ");
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
	//get the anime list
	fetch(url).then((res) => {
		if(res.status == 200){
			return res.json();
		}else {
			alert('Could not get Anime');
		}
	}).then((json) => {
	

		
		//sort them by avg score
		for(let i=0; i<json.length; i++){
			for(let j=i+1; j<json.length; j++){
				if(json[i].averageScore/Math.max(json[i].nReviews, 1) < json[j].averageScore/Math.max(json[j].nReviews, 1)){
					let aux = json[i];
					json[i] = json[j];
					json[j] = aux;
				}
			}
		}

		
		//create the dom elements
		const animeList = top_10_anime.getElementsByTagName("ol")[0];
		const tbl = document.createElement('table');
		animeList.appendChild(tbl);

		for(let key = 0; key<=Math.min(10, json.length-1); key++){

			const animeListElmt = document.createElement('li');

			const animeA = document.createElement('a');
			const animeImg = document.createElement('img');
			const tr = document.createElement('tr');

			//We will be using the server data here to construct the elements dynamically
			let title_underscore = json[key].name;
			title_underscore = title_underscore.replace(/\s+/g, "_");
			animeA.href = "/anime/"+ title_underscore;
			animeA.textContent = json[key].name;
			animeImg.className = "anime_tile_small";
			animeImg.src = json[key].imageURL;
			
			//construct the element and add it to the webpage
			tr.appendChild(animeImg);
			tr.appendChild(animeA);
			animeListElmt.appendChild(tr);
			tbl.appendChild(animeListElmt);
				

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