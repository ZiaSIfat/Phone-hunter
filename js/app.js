const main = document.getElementById('main-div');
const loadData = () => {
    const input = document.getElementById('input-field');
    const inputValue = input.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
    input.value = '';
    main.innerHTML = '';
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data.slice(0, 20)));

};

const displayData = (phones) => {

    if (phones.length === 0) {
        const error = document.getElementById('error');
        error.innerText = 'NO RESULT FOUND'
    }
    for (const phone of phones) {
        // console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col-lg-4');
        div.classList.add('col-sm-12');
        document.getElementById('error').style.dsiplay = 'none';
        div.innerHTML = `
        <div class="card my-3  text-center" style="width: 18rem;">
        <img src="${phone.image}" class="w-100 p-5 card-img-top" alt="...">
        <div class="card-body">
            <h3 class="card-title">${phone.brand}</h3>
            <h5>${phone.phone_name}</h5>
            <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary">More Details</button>
        </div>
        `
        main.appendChild(div);
        error.innerText = '';
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
    phoneDetails.innerHTML = '';
    div.innerHTML = `
    <div class="card my-5 mx-auto text-center" style="width: 18rem;">
    <img src="${phone.image}" class="card-img-top p-3" alt="...">
    <div class="card-body">
        <h2 class="card-title">${phone.brand}</h2>
        <h5>${phone.name}</h5>
        <p class="card-text">Release Date: ${phone.releaseDate ? phone.releaseDate : 'Not Found'}</p>
        <h2 >Main Features</h2>
        <p class="card-text">Chipset: ${phone.mainFeatures.chipSet}</p>
        <p class="card-text">Memory: ${phone.mainFeatures.memory}</p>
        <p class="card-text">Storage: ${phone.mainFeatures.storage}</p>
        <p class="card-text">Displaysize: ${phone.mainFeatures.displaySize}</p>
        <h2>Others Information</h2>
        <p class="card-text">Bluetooth: ${phone.others.Bluetooth ? phone.others.Bluetooth : ''}</p>
        <p class="card-text">GPS: ${phone.others.GPS ? phone.others.GPS : ''}</p>
        <p class="card-text">NFC: ${phone.others.NFC ? phone.others.NFC : ''}</p>
        <p class="card-text">Radio: ${phone.others.Radio ? phone.others.Radio : ''}</p>
        <p class="card-text">USB: ${phone.others.USB ? phone.others.USB : ''}</p>
        <p class="card-text">WLAN: ${phone.others.WLAN ? phone.others.WLAN : ''}</p>
        <p class="card-text">Sensors: ${phone.mainFeatures.sensors}</p>
    </div>
</div>
    `
    phoneDetails.appendChild(div)
}