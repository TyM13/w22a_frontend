let candy_container = document.getElementById('candy_container');


function handle_submit(details) {
    // sends a api post request that requires the data, candy name, description and candy image then if successful it will create the candy otherwise it will send an error back
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
        submit_button.insertAdjacentHTML('afterend', '<p>Error inserting new candy</p>')
    });
}
// gets the submit button from the html's id and sets it as the variable submit_button
// when the submit_button is clicked it will call the function handle submit
let submit_button = document.getElementById('submit_button');
submit_button.addEventListener('click', handle_submit)


// sends a api get request that if successful it will display the candy, put a delete button for the candy and get the delete button and set it as the variable delete_button 
//when the delete_button is clicked it will call the function handle_delete otherwise it will send an error back to the user (put in so it so the info can be attained in the delete function)
axios.request({
    url: "http://127.0.0.1:5000/api/candy",
}).then((response) => {
    for (let i = 0; i < response['data'].length; i++) {
        candy_container.insertAdjacentHTML('afterbegin',
            `<h1>${response['data'][i][1]}</h1>
            <img src=${response['data'][i][2]} />
            <p>${response['data'][i][3]}</p>
            <button candy_id="${response['data'][i][0]}" id="delete_button">Delete</button>`
        )
        let delete_button = document.getElementById('delete_button');
        delete_button.addEventListener('click', handle_delete)
    }
}).catch((error) => {
    document.getElementById('candy_container').insertAdjacentHTML('afterend',
        `<h1>error getting candy, please contant us</h1>`)
})

// sends a api get request that if successful it will delete the candy.
function handle_delete(details) {
    axios.request({
        url: "http://127.0.0.1:5000/api/candy",
        method: "DELETE",
        // gets the candy_id from details target and gets the attribute candy_id which is passed along from the get request.
        data: {
            candy_id: details['target'].getAttribute('candy_id'),
        }
        // if it's sucessfully deleted it will display a sucess message otherwise it will send an error that it couldn't delete the candy
    }).then((response) => {
        document.getElementById('candy_container').insertAdjacentHTML('afterend',
            `<h1>sucessfully deleted</h1>`)
    }).catch((error) => {
        document.getElementById('candy_container').insertAdjacentHTML('afterend',
            `<h1>error deleting candy, please contant us</h1>`)
    });

}

