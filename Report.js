const report_form = document.querySelector('#input_elements');
report_form.addEventListener('submit', report_user);
function report_user(e) {
	e.preventDefault();
	
	const report_block = document.querySelector("#report_block");
	const reviewer_name = document.querySelector('#name').value;
	const anime_reviewed = document.querySelector('#anime').value;
	const reason = document.querySelector('#reason_box').value;
	const message = document.createElement('p');
	message.style.color = 'white';
	const messageText = document.createTextNode('The report has been submitted!');
	message.appendChild(messageText);
	report_block.appendChild(message);
}