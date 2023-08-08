// write your code here
document.addEventListener(`DOMContentLoaded`, init);

function addRamenToDiv() {
    fetch(`http://localhost:3000/ramens`)
    .then(r => r.json())
    .then(ramenList => {
        ramenList.forEach(ramenObj => addRamen(ramenObj))
    })
}

const newRamenForm = document.querySelector(`form#new-ramen`);
newRamenForm.addEventListener(`submit`, (e) => {
    e.preventDefault();
    const newRamenName = document.querySelector(`input#new-name`).value;
    const newRamenRestaurant = document.querySelector(`input#new-restaurant`).value;
    const newRamenImg = document.querySelector(`input#new-image`).value;
    const newRamenRating = parseInt(document.querySelector(`input#new-rating`).value);
    const newRamenComment = document.querySelector(`textarea#new-comment`).value;

    fetch(`http://localhost:3000/ramens`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            name: newRamenName,
            restaurant: newRamenRestaurant,
            image: newRamenImg,
            rating: newRamenRating,
            comment: newRamenComment,
        })
        })
        .then(r => r.json())
        .then(ramen => addRamen(ramen))

})

function addRamen(ramenObj){
    const img = document.createElement(`img`);
        img.src = ramenObj[`image`];
    const menu = document.querySelector(`div#ramen-menu`);
        menu.append(img);

    img.addEventListener(`click`, () => {
        const ramenImg = document.querySelector(`img.detail-image`);
            ramenImg.src = ramenObj[`image`];
            ramenImg.alt = ramenObj[`name`];
        const ramenName = document.querySelector(`h2.name`);
            ramenName.textContent = ramenObj[`name`];
        const restaurantName = document.querySelector(`h3.restaurant`);
            restaurantName.textContent = ramenObj[`restaurant`];
        const customerRating = document.querySelector(`span#rating-display`);
                customerRating.textContent = ramenObj[`rating`];
            const customerComment = document.querySelector(`p#comment-display`);
                customerComment.textContent = ramenObj[`comment`];
    })
}

function init () {
    addRamenToDiv();
}