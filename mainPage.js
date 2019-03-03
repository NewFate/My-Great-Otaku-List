//here are the functions that will be called on page load of the main page
//we would make a call tothe server to get the data for the top three list, top ten, and the top trending review

//window.onload = update_top_ten; 

//updates the top three trending anime
function update_top_three() {
	
	console.log("Updated top 3");

}

//updates the top trending reviews
function update_trending_reviews() {
	
	console.log("Updated Reviews");
	

}

//updates the top ten anime list
function update_top_ten() {

	console.log("Updated top ten");
	
}

//helper function that updates the whole page
function update_top_ten() {

	console.log("Updated main page!");
	update_top_three();
	update_trending_reviews();
	update_top_ten();
}