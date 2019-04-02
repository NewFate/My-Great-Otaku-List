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

let loadedImage = "";

function submitAnime(){
	let title = document.getElementById("titleSuggested").value;
	let desc = document.getElementById("descriptionSuggested").value;
	let imgURL = document.querySelector('img');

	//log("URL");
	//log(imgURL.src);
	//log("URL");
	if(title == "" || desc == "" || loadedImage == ""){
		alert("Please fill all required information, and upload a picture.");
		return
	}
	//log(imgURL.src);
	// Check if logged in. Must be logged in to suggest.
		// To be done with backend.
	const url = '/suggestinfo';


	let data = {
		name: title,
   		description: desc,
    	imageURL: loadedImage,										///////////for NOW
    	averageScore: 0,
    	nReviews: 0
	}

	const request = new Request(url, {
		method: 'post',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		}
	});
	fetch(request).then(function (res){
		if(res.status == 200){
			alert("Posted suggestion!");
			log("POSTED");
		}else{
			log("DIDDINT");	
			alert("Couldnt post :(");
		}
	}).catch((error) => {
		log(error);
	})

	//suggestedAnimeList.push(new suggestedAnime(title, desc, null)); // Add image here

	// Admin would see this list and select to accept or deny this anime.
	// To be done wiht backend.

	document.location.reload(true);
	return;
	/*
	document.getElementById("titleSuggested").value = "";
	document.getElementById("descriptionSuggested").value = "";
	document.querySelector('img').src = "";
	log(document.querySelector('input[type=file]'));

	alert("Thank you for your suggestion.")*/
}

function previewFile(){
       var preview = document.querySelector('img'); //selects the query named img
       var file    = document.querySelector('input[type=file]').files[0]; //sames as here
       var reader  = new FileReader();

       reader.onloadend = function () {
           preview.src = reader.result;
           loadedImage = reader.result;
       }

       if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
       } else {
           preview.src = "";
       }
  }


function loadSuggested(){
	loadedImage = "";
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

	//const imgText = document.createTextNode("Image upload will be added later.");
	const imgText = document.createElement("input");
	imgText.setAttribute("type", "file");
	imgText.setAttribute("onchange", "previewFile()");
	const imgView = document.createElement("img");
	imgView.setAttribute("src", "");
	imgView.setAttribute("height", "200");
	imgView.setAttribute("alt", "Image preview...");

	//<input type="file" onchange="previewFile()"><br>
	//<img src="" height="200" alt="Image preview...">

	document.getElementById("Anime").appendChild(imgText);
	document.getElementById("Anime").appendChild(imgView);

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