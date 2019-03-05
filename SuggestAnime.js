let numberOfSuggestedAnimes = 0;	// Total number of suggested animes

const suggestedAnimeList = [];	// List of animes

class suggestedAnime{
	constructor(title, description, image){
		this.title = title;
		this.description = description;
		this.image = image;
		this.reviews = new Reviews();
		this.averageScore = this.reviews.calculateAverageScore();
		numberOfSuggestedAnimes++;
	}
}

function submitAnime(){
	let title = document.getElementById("titleSuggested").value;
	let desc = document.getElementById("descriptionSuggested").value;
	if(title == "" || desc == ""){
		alert("Please fill all required information.");
		return
	}
	// Check if logged in. Must be logged in to suggest.
		// To be done with backend.

	suggestedAnimeList.push(new suggestedAnime(title, desc, null)); // Add image here

	// Admin would see this list and select to accept or deny this anime.
	// To be done wiht backend.

	
	document.getElementById("titleSuggested").value = "";
	document.getElementById("descriptionSuggested").value = "";

	alert("Thank you for your suggestion.")
}

function loadSuggested(){
	const title = document.createElement("textarea");
	const tt = document.createElement("H1");
	const titleText = document.createTextNode("Title: ");
	title.setAttribute("id", "titleSuggested");
	title.setAttribute("rows", 1);
	title.setAttribute("cols", 80);
	tt.className = "titleText";
	tt.appendChild(titleText);
	document.getElementById("Anime").appendChild(tt);
	document.getElementById("Anime").appendChild(title);
	
	const description = document.createElement("textarea");
	const descriptionText = document.createTextNode("Description: ");
	const dd = document.createElement("H1");
	dd.className = "descriptionText";
	dd.appendChild(descriptionText);
	description.setAttribute("id", "descriptionSuggested");
	description.setAttribute("rows", 10);
	description.setAttribute("cols", 80);
	document.getElementById("Anime").appendChild(dd);
	document.getElementById("Anime").appendChild(description);

	const imgText = document.createTextNode("Image upload will be added later.");
	document.getElementById("Anime").appendChild(imgText);

	// Need to use backend to allow user to upload an image.
	// IMG TO BE ADDED:
	/*
	const image = document.createElement("img");
	image.setAttribute("src", animeList[i].image);
	image.className = "animeImage";
	document.getElementById("Anime").appendChild(image);
	*/

	const submitT = document.createElement("button");
	submitT.className = "submitSuggestionButton"
	submitT.setAttribute("onclick", "submitAnime()");
	const submitText = document.createTextNode("Submit this Anime");
	submitT.appendChild(submitText);
	document.getElementById("Anime").appendChild(submitT);

}

loadSuggested()