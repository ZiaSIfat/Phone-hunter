const main = document.getElementById('main-div');
const loadData = () => {
    const inputValue = document.getElementById('input-field').value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
    main.innerHTML = '';
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data.slice(0, 20)))
};

const displayData = (phones) => {

    for (const phone of phones) {
        // console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col-lg-4');
        div.innerHTML = `
        <div class="card style="width: 18rem;"">
        <img src="${phone.image}" class="w-50 p-5 card-img-top" alt="...">
        <div class="card-body">
            <h3 class="card-title">${phone.brand}</h3>
            <h5>${phone.phone_name}</h5>
            <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary">More Details</button>
        </div>
        `
        main.appendChild(div);
    }
}

const loadPhoneDetail = phoneId => {
    const url = `
     https://openapi.programming-hero.com/api/phone/${phoneId}
    `
    fetch(url)
        .then(res => res.json())
        .then(data => dislayPhoneDetail(data.data))
}

const dislayPhoneDetail = phone => {
    console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    const div = document.createElement('div')
    div.innerHTML = `
    <div class="card my-5 mx-auto text-center" style="width: 18rem;">
    <img src="${phone.image}" class="card-img-top p-3" alt="...">
    <div class="card-body">
        <h2 class="card-title">${phone.brand}</h2>
        <h5>${phone.name}</h5>
        <p class="card-text">${phone.releaseDate}</p>
        <p class="card-text">Storage: ${phone.mainFeatures.storage}</p>
        <p class="card-text">Displaysize: ${phone.mainFeatures.displaySize}</p>
        <p class="card-text">Sensors: ${phone.mainFeatures.sensors}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
</div>
    `
    phoneDetails.appendChild(div)
}