const log = console.log

let guy = "";

let currentAnime = "";

// When someone clicks on submit review, grab the information,
// check if its valid and put in the right place.
function submitReview(){

	// If you're not logged in.
	if(guy.length == 0){	
		window.location.href = "/login"
		return;
	}
	
	// Get information from the page.
	let review = document.getElementById("newReviewR").value;
	let grade = document.getElementById("newGradeR").value;

	// Check if they are valid
	if( review == "" || grade == ""){
		alert("Please fill all required information.");
		return;
	}
	for(let i=0; i<grade.length; i++){
		if(grade[i]>'9' || grade[i]<'0'){
			alert("Invalid grade. Grade is a number between 0 and 10.")
			return;
		}
	}
	if(parseInt(grade)<0 || parseInt(grade)>10){
		alert("Invalid grade. Grade is a number between 0 and 10.")
		return;
	}
	
	// Send the data of this review to the server.
	let data = {
		animeName: currentAnime.toLowerCase(),
		reviewer: "",
		review: review,
		grade: grade
	}
	
	const url = "/animeinfo/" + currentAnime +"/review";

	// Send the request
	const request = new Request(url, {
		method: 'post',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		}
	});
	fetch(request).then(function(res){
		if(res.status == 200){
			alert("Your review has been submitted!");
		}else{
			alert("There has been an error!");
		}
		document.location.reload(true);
		return;
	}).catch((error) => {
		log(error);
	})

	// Clean the fields.
	document.getElementById("newReviewR").value = "";
	document.getElementById("newGradeR").value = "";

	
	return;
}

function reportReview(reviewer, animeReviewed){	// Go to the report page.
	// Make it have underscores in th name of the anime and call for that page.
	animeReviewed=animeReviewed.replace(/ /g, "_");

	window.location.href = "/report/" + reviewer + "/" + animeReviewed;
}



// Load selected anime to the page.
function load(title){
	currentAnime = title;

	// Remove the anime that was there before.
	var elem = document.getElementById("Anime");
	elem.parentNode.removeChild(elem);
	const anime = document.createElement("div");
	anime.setAttribute("id", "Anime");
	document.body.appendChild(anime);

	// Send a request to get this anime
	const url = '/animeinfo/' + title;

	fetch(url).then((res) => {
		if(res.status == 200){
			return res.json();
		}else {
			alert('Could not get Anime');
		}
	}).then((json) => {
		// Create the new anime element.

		const image = document.createElement("img");
		image.setAttribute("src", json.imageURL);
		image.className = "animeImage";
		image.width = "200";
		document.getElementById("Anime").appendChild(image);

		const title = document.createElement("div");
		const titleText = document.createTextNode(json.name);
		title.className = "animeTitle";
		title.appendChild(titleText);
		document.getElementById("Anime").appendChild(title);
		
		const description = document.createElement("div");
		const descriptionText = document.createTextNode(json.description);
		description.appendChild(descriptionText);
		description.className = "animeDescription";
		document.getElementById("Anime").appendChild(description);

		const grade = document.createElement("div");
		const gradeText = document.createTextNode("Anime rating: " + (json.averageScore/Math.max(1, json.nReviews)).toFixed(2) + "/10");
		grade.className = "animeGrade";
		grade.appendChild(gradeText);
		document.getElementById("Anime").appendChild(grade);
		
		const newReport = document.createElement("table");
		newReport.className = "newReport";
		let newRow = newReport.insertRow(0);
		
		let newReview = newRow.insertCell(0);
		let newGrade = newRow.insertCell(1);
		let submit = newRow.insertCell(2);

		

		const newReviewT = document.createElement("textarea");
		newReviewT.setAttribute("id", "newReviewR");
		newReviewT.setAttribute("rows", 4);
		newReviewT.setAttribute("cols", 80);
		const newReviewText = document.createTextNode("Review: ");
		newReview.appendChild(newReviewText);
		newReview.appendChild(newReviewT);

		const newGradeT = document.createElement("textarea");
		newGradeT.setAttribute("id", "newGradeR");
		newGradeT.setAttribute("rows", 1);
		newGradeT.setAttribute("cols", 2);
		const newGradeText1 = document.createTextNode("Grade: ");
		newGradeT.setAttribute("placeholder", '/10');
		newGrade.appendChild(newGradeText1);
		newGrade.appendChild(newGradeT);

		const submitT = document.createElement("button");
		submitT.className = "submitButton"
		submitT.setAttribute("onclick", "submitReview()");
		const submitText = document.createTextNode("Submit this review");
		submitT.appendChild(submitText);
		submit.appendChild(submitT);

		document.getElementById("Anime").appendChild(newReport);

		// Get all reviews for this anime.
		const urlGetReview = url + '/review';

		fetch(urlGetReview).then((res) => {
			if(res.status == 200){
				return res.json();
			} else {
				// If there are no reviews, just show nothing.
				return [];
			}
		}).then((reviews) => {
			const table = document.createElement("table");
			table.className = "animeReviews";
			for(let j=0; j<reviews.length; j++){
				let row = table.insertRow(0);
				let reviewerName = row.insertCell(0);
				let review = row.insertCell(1);
				let reviewGrade = row.insertCell(2);
				let report = row.insertCell(3);
				reviewerName.innerHTML = "Username: " + reviews[j].reviewer;
				review.innerHTML = "Review: " + reviews[j].review;
				reviewGrade.innerHTML = "Grade: " + reviews[j].grade + "/10";
				const reportButton = document.createElement("button");
				const reportText = document.createTextNode("Report this review");
				reportButton.appendChild(reportText);
				reportButton.className = "reviewReport";
				const func = "reportReview('" + reviews[j].reviewer + "','" + json.name + "')"; 
				reportButton.setAttribute("onclick", func);
				reportButton.setAttribute("href", "/report");
				report.appendChild(reportButton);
			}
			document.getElementById("Anime").appendChild(table);
		})
	})

}




