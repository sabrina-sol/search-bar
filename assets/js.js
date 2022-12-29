/* -------------------------------------------------------------------------- */
/*                                  VARIABLES                                 */
/* -------------------------------------------------------------------------- */

let objects_container = document.getElementById("objects-container");
let search_bar = document.getElementById("search-bar");
let search_button = document.getElementById("search-button");
let h2_messages = document.getElementById("h2-message");

/* -------------------------------------------------------------------------- */
/*                                 FETCH DATA                                 */
/* -------------------------------------------------------------------------- */
let objects_data = [];

fetch ("../data/contacts.json")
    .then (res => res.json())
    .then (data => {
        for (let object of data) {
            objects_data.push(object)
        }
    })

let search_results = [];

search_button.addEventListener("click", (e) => {
    search_results = [];
    h2_messages.innerText = "";
    objects_container.innerHTML = "";
    search (e);
})

/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */

//Calculate age with birthday from object
function calculate_age(birthday) {
    let now = new Date();
    let birthday_date = new Date(birthday);
    let age = now.getFullYear() - birthday_date.getFullYear();
    return age.toString();
}

//Search match between the input value and the data
function search (e) {
    //Input value
    let search_value = e.target.parentNode.children[0].value.toString().toLowerCase();
    let search_value_array = search_value.split(' ');
    //Search by object properties
    let search_name_result = objects_data.filter( element => search_value_array.some( e => element.name.toString().toLowerCase().includes(e) ) );
    let search_phone_result = objects_data.filter( element => search_value_array.some( e => element.phone_number.toString().toLowerCase().includes(e) ) );
    let search_address_result = objects_data.filter( element => search_value_array.some( e => element.address.toString().toLowerCase().includes(e) ) );
    let search_age_result = objects_data.filter( element => search_value_array.some( 
        function (e) {
        return e === calculate_age( element.birthday.split(' ')[0] );
        })
    );
    //Render in HTML
    if (search_name_result.length + search_address_result.length + search_phone_result.length + search_age_result.length === 0) {
        h2_messages.innerText = "Sorry, we haven't found any results. Please try again";
    } else if (search_value == "") {
        h2_messages.innerText = "You didn't write anything! Please try again"
    } else {
        for (let result of search_name_result) {
            search_results.push(result)
        }
        for (let result of search_phone_result) {
            search_results.push(result)
        }
        for (let result of search_address_result) {
            search_results.push(result)
        }
        for (let result of search_age_result) {
            search_results.push(result)
        }
        //Erase duplicates
        search_results = objects_data.filter(element => search_results.some(e => element._id === e._id))
        //Show results
        search_results.forEach((object) => {
            const div_container = document.createElement("div");
            div_container.classList.add("container");
            let age = calculate_age( object.birthday.split(' ')[0] );
            div_container.innerHTML = `
            <img class="user-avatar" src="./images/${object.picture}">
            <div class="sub-container">
                <div class="label">
                    ${object.name}, ${age}, ${object.phone_number}
                </div>
                <p class="description">
                ${object.address}
                </p>
            </div>`;
            objects_container.appendChild(div_container);
        })
    }
};
