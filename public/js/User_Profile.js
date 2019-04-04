
// Update User profile	
function updateReviews(name){
	const doc = document.getElementById("reviewlist");
	const url = '/review/' + name;

	//Get the reviews for the particular user
	fetch(url).then((res) => {
		if(res.status == 200){
			return res.json();
		}else {
			alert('Could not get Anime');
		}
	}).then((json) => {
		//User the JSON of the review object to update the review list
		for(let i=json.length - 1; i>=Math.max(json.length-5, 0); i--){
			const elm = document.createElement("li");
			const h2 = document.createElement("h2")
			h2.innerText = "Anime: " + json[i].animeName + ". Grade " + json[i].grade + "/10"
			h2.style.color = 'chocolate'
			const p = document.createElement("p");
			p.innerText = json[i].review;
			//h2.appendChild(p)
			elm.appendChild(h2);
			elm.append(p)
			doc.appendChild(elm);
		}
	});
	//This function will update the user review list by checking the reviews in the backend
}


