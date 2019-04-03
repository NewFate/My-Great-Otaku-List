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
           	message.appendChild(messageText);
        } else {
            messageText = document.createTextNode('The report has failed to send.');
            message.appendChild(messageText);
        }
        
    }).catch((error) => {
        messageText = document.createTextNode('The report has failed to send.');
        message.appendChild(messageText);
    });
	
	report_block.appendChild(message);
}