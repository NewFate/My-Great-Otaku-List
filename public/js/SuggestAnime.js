let loadedImage = "";

// Action of submitting the anime
function submitAnime(){
	let title = document.getElementById("titleSuggested").value;
	let desc = document.getElementById("descriptionSuggested").value;
	let imgURL = document.querySelector('img');

	// If there is incomplete information
	if(title == "" || desc == "" || loadedImage == ""){
		alert("Please fill all required information, and upload a picture.");
		return
	}
	// Do a post request, with the information given.
	const url = '/suggestinfo';

	let data = {
		name: title,
   		description: desc,
    	imageURL: loadedImage,
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
			document.location.reload(true);
			return;
		}else{
			alert("Couldnt post suggestion! (Image probably too big)");
		}
	}).catch((error) => {
		log(error);
	})

	return;
	
}

// Preview image that the user uploaded.
function previewFile(){
	// This function was made available on stackoverflow
	// By user Max Wallace. (Only such function in our code).
   var preview = document.querySelector('img'); 
   var file    = document.querySelector('input[type=file]').files[0];
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

// Load the page
function loadSuggested(){
	loadedImage = "";

	// Create elements of the title.
	const title = document.createElement("textarea");
	const tt = document.createElement("H1");
	const titleText = document.createTextNode("Title: ");
	title.setAttribute("id", "titleSuggested");
	title.setAttribute("rows", 1);
	title.setAttribute("cols", 80);
	title.className = "titleTextBox";
	tt.className = "titleText";
	tt.appendChild(titleText);
	document.getElementById("Anime").appendChild(tt);
	document.getElementById("Anime").appendChild(title);
	
	// Create elements of the description part.
	const description = document.createElement("textarea");
	const descriptionText = document.createTextNode("Description: ");
	const dd = document.createElement("H1");
	dd.className = "descriptionText";
	dd.appendChild(descriptionText);
	description.setAttribute("id", "descriptionSuggested");
	description.setAttribute("rows", 10);
	description.setAttribute("cols", 80);
	description.className = "DescTextBox";
	document.getElementById("Anime").appendChild(dd);
	document.getElementById("Anime").appendChild(description);

	// Create elements of the image.
	const imgText = document.createElement("input");
	imgText.setAttribute("type", "file");
	imgText.setAttribute("onchange", "previewFile()");
	const imgView = document.createElement("img");
	imgView.setAttribute("src", "");
	imgView.setAttribute("height", "200");
	imgView.setAttribute("alt", "Image preview...");


	document.getElementById("Anime").appendChild(imgText);
	document.getElementById("Anime").appendChild(imgView);

	// Create elements of the button.
	const submitT = document.createElement("button");
	submitT.className = "submitSuggestionButton"
	submitT.setAttribute("onclick", "submitAnime()");
	const submitText = document.createTextNode("Submit this Anime");
	submitT.appendChild(submitText);
	document.getElementById("Anime").appendChild(submitT);
}

loadSuggested()