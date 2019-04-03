//here are the functions that will be called on page load of the all anime page
//we would make a call to the server to get the data 

//HTML elements to be edited
const all_anime_table = document.querySelector('.all_anime');

//global variables for updating (we need to call the server to get the data for this)
let all_anime_list = {
	"Mob Psycho 100 II": ["mob.gif", "Mob Psycho 100 II", "A cool anime", "10/10"],
	"Anime2": ["mob.gif", "Mob Psycho 100 II", "A cool anime", "10/10"],
	"Anime3": ["mob.gif", "Mob Psycho 100 II", "A cool anime", "10/10"],
	"Anime4": ["mob.gif", "Mob Psycho 100 II", "A cool anime", "10/10"],
	"Anime5": ["mob.gif", "Mob Psycho 100 II", "A cool anime", "10/10"]
};

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

//updates the top ten anime list
function update_all_anime_list() {

	const animeTable = all_anime_table.getElementsByTagName("table")[0];
	//we would need to get the anime list from the server
	//a dummy object is used for now
	for (let key in all_anime_list)
	{
		const tr = document.createElement('tr');

		const tdImg = document.createElement('td');
		const tdTitle = document.createElement('td');
		const tdDesc = document.createElement('td');
		const tdScore = document.createElement('td');

		const animeImg = document.createElement('img');

		//get dummy data (we will be using the data structure fetched from the server here)
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

		//Add the element to the all anime table
		animeTable.appendChild(tr);
			
	}
	
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
		// we would need the title from the server data
		const animeTitle = e.target.parentNode.nextSibling.textContent;
		
	    //for now just go to a generic anime page, would need the data from the server 
		window.location.href = "/anime";
		//here we would send the anime title to the next page to load it
		load(animeTitle);
	}

}