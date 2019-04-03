//here are the functions that will be called on page load of the all anime page
//we would make a call to the server to get the data 

//HTML elements to be edited
const all_anime_table = document.querySelector('.all_anime');

//updates the top ten anime list
function update_all_anime_list() {

	const url = '/animeinfo';

	fetch(url).then((res) => {
		if(res.status == 200){
			return res.json();
		}else {
			alert('Could not get Anime');
		}
	}).then((json) => {
		

		const animeTable = all_anime_table.getElementsByTagName("table")[0];
		//we would need to get the anime list from the server
		//a dummy object is used for now
		for (let key in json)
		{
			const tr = document.createElement('tr');

			const tdImg = document.createElement('td');
			const tdTitle = document.createElement('td');
			const tdDesc = document.createElement('td');
			const tdScore = document.createElement('td');

			const animeImg = document.createElement('img');

			//get dummy data (we will be using the data structure fetched from the server here)
			tdTitle.textContent = json[key].name;
			tdDesc.textContent = json[key].description;
			tdScore.textContent = (json[key].averageScore / Math.max(json[key].nReviews, 1)).toFixed(2); // divide by number of reviews?
		
			animeImg.className = "anime_tile";
			animeImg.src = json[key].imageURL;

			//construct the element
			tdImg.appendChild(animeImg);

			tr.appendChild(tdImg);
			tr.appendChild(tdTitle);
			tr.appendChild(tdDesc);
			tr.appendChild(tdScore);

			//Add the element to the all anime table
			animeTable.appendChild(tr);
				
		}
	})
	
}

//helper function that updates the whole page
function update_all_anime_page() {

	update_all_anime_list();
}

//adding the event listeners for the anime
all_anime_table.addEventListener('click', go_to_anime_page);

function go_to_anime_page(e) {
	e.preventDefault();

	if(e.target.tagName.toLowerCase() === 'img')
	{
		
	    //for now just go to a generic anime page, would need the data from the server 
		let animeTitle = e.target.parentNode.nextSibling.textContent;
		animeTitle = animeTitle.replace(/\s+/g, "_");
		
		window.location.href = "/anime/" + animeTitle ;
		//here we would send the anime title to the next page to load it
		
	}

}