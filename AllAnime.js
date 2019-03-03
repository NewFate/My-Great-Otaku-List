//here are the functions that will be called on page load of the all anime page
//we would make a call tothe server to get the data 

//HTML elements to be edited
const all_anime_table = document.querySelector('.all_anime');

//global variables for updating
let all_anime_list = {
	"Mob Psycho 100 II": ["mob.gif", "Mob Psycho 100 II", "A cool anime", "10/10"],
	"Anime2": ["mob.gif", "Mob Psycho 100 II", "A cool anime", "10/10"],
	"Anime3": ["mob.gif", "Mob Psycho 100 II", "A cool anime", "10/10"],
	"Anime4": ["mob.gif", "Mob Psycho 100 II", "A cool anime", "10/10"],
	"Anime5": ["mob.gif", "Mob Psycho 100 II", "A cool anime", "10/10"]
};

//updates the top ten anime list
function update_all_anime_list() {

	const animeTable = all_anime_table.getElementsByTagName("table")[0];

	for (let key in all_anime_list)
	{
		const tr = document.createElement('tr');

		const tdImg = document.createElement('td');
		const tdTitle = document.createElement('td');
		const tdDesc = document.createElement('td');
		const tdScore = document.createElement('td');

		const animeImg = document.createElement('img');

		//temp link
		tdTitle.textContent = all_anime_list[key][1];
		tdDesc.textContent = all_anime_list[key][2];
		tdScore.textContent = all_anime_list[key][3];
	
		animeImg.className = "anime_tile";
		animeImg.src = all_anime_list[key][0];

		//construct the element
		tdImg.appendChild(animeImg);

		tr.appendChild(tdImg);
		tr.appendChild(tdTitle);
		tr.appendChild(tdDesc);
		tr.appendChild(tdScore);

		animeTable.appendChild(tr);
			
	}
	
}

//helper function that updates the whole page
function update_all_anime_page() {

	update_all_anime_list();
}

/*//adding the event listeners for the anime
trending_3_anime.addEventListener('click', go_to_anime_page);
top_10_anime.addEventListener('click', go_to_anime_page);

function go_to_anime_page(e) {
	e.preventDefault();

	if(event.target.tagName.toLowerCase() === 'a')
	{
		
		let animeTitle = e.target.textContent;
		console.log("clicked anime " + animeTitle);
		window.location.href = "Anime.html";
		//here we would send the anime title to the next page to load it
		load(animeTitle);
	}

}*/