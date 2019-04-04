//This will listen for when the submit button is pressed
const report_form = document.querySelector('#input_elements');
report_form.addEventListener('submit', report_user);

//When implemented, this will send the required data to the admin's report block for review
function report_user(e) {
	e.preventDefault();
	
	const report_block = document.querySelector("#report_block");
	const reviewer_name = document.querySelector('#name').value;
	const anime_reviewed = document.querySelector('#anime').value;
	const reason = document.querySelector('#reason_box').value;
	const message = document.createElement('p');
	message.style.color = 'white';
	let messageText = null;
	
	//Phase 2
	
	//Checks if reportee is valid
	let user_found = false;
	fetch('/users')
	.then((res) => {
		if (res.status === 200) {
			return res.json();
		} else {
			alert('Users were unattainable from the database.')
		}
	})
	.then((json_a) => {
		json_a.map((user) => {
			if (user.userName === reviewer_name) {
				user_found = true;
			}
		})
		if (user_found === false) {
			console.log("in here for some reason")
			messageText = document.createTextNode('No user with this name exists!');
			message.style.color = 'red';
			message.appendChild(messageText);
			report_block.appendChild(message);
			return;
		};
		//Checks if anime field is valid
		let anime_found = false;
		fetch('/animeinfo')
		.then((res) => {
			if (res.status === 200) {
				return res.json();
			} else {
				alert('Reports were unattainable from the database.')
			}
		})
		.then((json_b) => {
			json_b.map((anime) => {
				if (anime_reviewed === anime.name) {
					console.log("found");
					anime_found = true;
				}
			});
			if (anime_found === false) {
				console.log("in here for some reason")
				messageText = document.createTextNode('No anime with this name exists!');
				message.style.color = 'red';
				message.appendChild(messageText);
				report_block.appendChild(message);
				return;
			};
			
			const url = '/report';
			let data = {
				reporter: "Placeholder_reporter",
				reportee: reviewer_name,
				anime: anime_reviewed,
				reason: reason
			};
			
			const report = new Request(url, {
				method: 'post', 
				body: JSON.stringify(data),
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json'
				},
			});
			
			fetch(report)
			.then(function(res) {
				if (res.status === 200) {
					messageText = document.createTextNode('The report has been submitted!');
					message.style.color = 'white';
					message.appendChild(messageText);
				} else {
					messageText = document.createTextNode('The report has failed to send.');
					message.style.color = 'red';
					message.appendChild(messageText);
				}
				report_block.appendChild(message)
			}).catch((error) => {
				console.log(error);
			});
			console.log("at end");
		}).catch((error) => {
			console.log(error);
		});
	}).catch((error) => {
		console.log(error);
	});
}