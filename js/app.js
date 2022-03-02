const main = document.getElementById('main-div');
const loadData = () => {
    const input = document.getElementById('input-field');
    const inputValue = input.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
    input.value = '';
    main.innerHTML = '';
    if (!isNaN(inputValue)) {
        document.getElementById('error-msg').style.display = 'block'
    }
    else {
        fetch(url)
            .then(res => res.json())
            .then(data => displayData(data.data.slice(0, 20)));
    }
};

const displayData = (phones) => {

    if (phones.length === 0) {
        document.getElementById('error').style.display = 'block';
    }
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = '';
    for (const phone of phones) {
        // console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col-lg-4');
        div.classList.add('col-sm-12');
        document.getElementById('error').style.dsiplay = 'none';
        div.innerHTML = `
        <div class="card my-3 mx-auto text-center" style="width: 18rem;">
        <img src="${phone.image}" class="w-100 p-5 card-img-top" alt="...">
        <div class="card-body">
            <h3 class="card-title">${phone.brand}</h3>
            <h5>${phone.phone_name}</h5>
            <button onclick="loadPhoneDetail('${phone.slug}')" class="btn buttons">More Details</button>
        </div>
        `
        main.appendChild(div);
        document.getElementById('error').style.display = 'none';
        document.getElementById('error-msg').style.display = 'none'

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

    // console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    const div = document.createElement('div')
    phoneDetails.innerHTML = '';
    div.innerHTML = `
    <div class="card my-5 mx-auto text-center" style="width: 18rem;">
    <img src="${phone.image}" class="card-img-top p-3" alt="...">
    <div class="card-body">
        <h2 class="card-title">${phone.brand}</h2>
        <h5>${phone.name}</h5>
        <p class="card-text"><span class = "info">Release Date:</span> <span class = "text">${phone.releaseDate ? phone.releaseDate : 'No release date found'}</span></p>
        <h2 class = "info">Main Features</h2>
        <p class="card-text">Chipset: <span class = "text">${phone.mainFeatures.chipSet}</span></p>
        <p class="card-text">Memory: <span class = "text">${phone.mainFeatures.memory}</span></p>
        <p class="card-text">Storage: <span class = "text">${phone.mainFeatures.storage}</span></p>
        <p class="card-text">Displaysize: <span class = "text">${phone.mainFeatures.displaySize}</span></p>
        <h2 class = "info">Others Information</h2>
        <p class="card-text">Bluetooth: <span class = "text">${phone.others?.Bluetooth ? phone.others.Bluetooth : 'No Result'}</span></p>
        <p class="card-text">GPS: <span class = "text">${phone.others?.GPS ? phone.others.GPS : 'No Result'}</span></p>
        <p class="card-text">NFC: <span class = "text">${phone.others?.NFC ? phone.others.NFC : 'No Result'}</span></p>
        <p class="card-text">Radio: <span class = "text">${phone.others?.Radio ? phone.others.Radio : 'No Result'}</span></p>
        <p class="card-text">USB: <span class = "text">${phone.others?.USB ? phone.others.USB : 'No Reuslt'}</span></p>
        <p class="card-text">WLAN: <span class = "text">${phone.others?.WLAN ? phone.others.WLAN : 'No Result'}</span></p>
        <p class="card-text"><span class = "info">Sensors:</span> <span class = "text">${phone.mainFeatures.sensors ? phone.mainFeatures.sensors : ''}<span></p>
    </div>
</div>
    `

    phoneDetails.appendChild(div)
}