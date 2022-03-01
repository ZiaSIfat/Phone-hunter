const loadData = () => {
    const inputValue = document.getElementById('input-field').value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data.slice(0, 20)))
};

const displayData = (phones) => {
    const main = document.getElementById('main-div');
    for (const phone of phones) {
        console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col-lg-4');
        div.innerHTML = `
        <div class="card style="width: 18rem;"">
        <img src="${phone.image}" class="w-50 p-5 card-img-top" alt="...">
        <div class="card-body">
            <h3 class="card-title">${phone.brand}</h3>
            <h5>${phone.phone_name}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                card's content.</p>
            <a href="#" class="btn btn-primary">More Details</a>
        </div>
        `
        main.appendChild(div);
    }
}

