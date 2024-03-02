const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  // console.log(phones);
  const phoneContainer = document.getElementById("phone-container");

  phoneContainer.textContent = "";

  const showAllContainer = document.getElementById("show-all-container");

  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone);

    const phoneCard = document.createElement("div");
    phoneCard.classList = `card w-96 shadow-xl`;
    phoneCard.innerHTML = `
        <figure class="px-10 pt-10 bg-teal-50">
                        <img src="${phone.image}" alt="phone"
                            class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>There are many variations of passages of available, but the majority have suffered</p>
                        <h5 class= "font-bold">$999</h5>
                        <div class="card-actions">
                            <button  onclick = "handleShowDetails('${phone.slug}')" id="show-details" class="btn btn-primary">Show Details</button>
                        </div>
                    </div>

                    `;
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false);
};

const handleShowDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  // console.log(data);
  // const slug = data.slug;
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  const phoneName = document.getElementById("phone-name");
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById("show-detail-container");

  console.log(showDetailContainer);
  showDetailContainer.innerHTML = `
    <img class="mx-auto" src="${phone.image}" alt="" />
    <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
    <p><span>GPS:</span>${phone.others?.GPS || "No GPS available"}</p>
    <p><span>GPS:</span>${
      phone.others?.GPS ? phone.others.GPS : "No GPS available in this device"
    }</p>
`;
  my_modal_5.showModal();
};

// handle search button

const searchHandler = (isShowAll) => {
  toggleLoadingSpinner(true);
  // console.log('search handle');
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  // console.log(searchText);
  loadPhone(searchText);

  document.getElementById("search-field").value = "";
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
  const handleShowAll = () => {
    searchHandler(true);
  };
};

loadPhone("01");
