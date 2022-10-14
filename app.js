let candy_container = document.getElementById('candy_container');


function handle_submit(details) {
    axios.request({
        url: "http://127.0.0.1:5000/api/candy",
        method: "POST",
        data: {
            candy_name: document.getElementById("candy_name").value,
            candy_description: document.getElementById("candy_desc").value,
            candy_image: document.getElementById("candy_url").value,
        }
    }).then((response) => {
 submit_button.insertAdjacentHTML('afterend', '<p>candy created</p>')
    }).catch((error) => {
submit_button.insertAdjacentHTML('afterend', '<p>Error</p>')
    });
}

let submit_button = document.getElementById('submit_button');
submit_button.addEventListener('click', handle_submit)






axios.request({
    url: "http://127.0.0.1:5000/api/candy",
}).then((response) => {
    for (let i = 0; i < response['data'].length; i++) {
candy_container.insertAdjacentElement('afterbegin',
`<h1>${response['data'][i][1]}</h1>`
)
response
}
}).catch((error) => {
error
})