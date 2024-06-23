var searchField = document.getElementById("storageDevice-name");
searchField.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("filter-button").click();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const storageDevicesList = document.querySelector(".storageDevices-list");
  const urlParams = new URLSearchParams(window.location.search);
  const storageDeviceId = urlParams.get("id");
  addImage();

  function displayStorageDevices(storageDevices, filters) {
    storageDevicesList.innerHTML = "";
    console.log(storageDevices, storageDevicesList);
    storageDevices.forEach((storageDevice) => {
      const name = storageDevice.name;
      const card = document.createElement("div");
      card.className = "storageDevice-card";
      card.innerHTML = `
            <img src="${storageDevice.image}" alt="${storageDevice.name}">
            <h3>${storageDevice.name}</h3>
            <p>Ємність: ${storageDevice.capacity}</p>
            <p>Інтерфейс: ${storageDevice.interface}</p>
            <p>Виробник: ${storageDevice.manufacturer}</p>
            <p>Швидкість передачі даних: ${storageDevice.transferRate}</p>
            <a href="storageDevice.html?id=${storageDevice.id}&name=${storageDevice.name}&capacity=${storageDevice.capacity}&interface=${storageDevice.interface}&manufacturer=${storageDevice.manufacturer}&transferRate=${storageDevice.transferRate}">Детальніше</a>
          `;
      storageDevicesList.appendChild(card);
    });

    if (storageDevicesList.innerHTML == "") {
      storageDevicesList.innerHTML = `
            <b class="no-results">ПО ВАШОМУ ЗАПИТУ НІЧОГО НЕ ЗНАЙДЕНО</b>
          `;
    }
  }
  function filterStorageDevices() {
    const name = document.getElementById("storageDevice-name").value;
    const capacity = document.getElementById("storageDevice-capacity").value;
    const interface = document.getElementById("storageDevice-interface").value;
    const manufacturer = document.getElementById(
      "storageDevice-manufacturer"
    ).value;

    const filters = { name, capacity, interface, manufacturer };
    console.log(filters);
    const filteredStorageDevices = storageDevices.filter((storageDevice) => {
      return (
        (name === "all" || storageDevice.name.includes(name)) &&
        (capacity === "all" || storageDevice.capacity == capacity) &&
        (interface === "all" || storageDevice.interface === interface) &&
        (manufacturer === "all" || storageDevice.manufacturer === manufacturer)
      );
    });

    displayStorageDevices(filteredStorageDevices, filters);
  }

  function displayStorageDeviceDetails(storageDevice) {
    console.log(
      storageDevice,
      document.getElementById("storageDevice-capacity")
    );
    document.getElementById("storageDevice-name").textContent =
      storageDevice.name;
    document.getElementById("storageDevice-image").src = storageDevice.image;
    document.getElementById("storageDevice-image").alt = storageDevice.name;
    document.getElementById("storageDevice-capacity").textContent =
      storageDevice.capacity;
    document.getElementById("storageDevice-interface").textContent =
      storageDevice.interface;
    document.getElementById("storageDevice-manufacturer").textContent =
      storageDevice.manufacturer;
    document.getElementById("storageDevice-transferRate").textContent =
      storageDevice.transferRate;
    document.getElementById("storageDevice-description").innerHTML =
      storageDevice.description;

    const name = urlParams.get("name") || "all";
    const capacity = urlParams.get("capacity") || "all";
    const interface = urlParams.get("interface") || "all";
    const manufacturer = urlParams.get("manufacturer") || "all";
    const transferRate = urlParams.get("transferRate") || "all";

    const backLink = document.getElementById("back-to-list");
    backLink.href = `main1.html?name=${name}&capacity=${capacity}&interface=${interface}&manufacturer=${manufacturer}&transferRate=${transferRate}`;
  }

  function restoreFilters() {
    const name = urlParams.get("name") || "all";
    const capacity = urlParams.get("capacity") || "all";
    const interface = urlParams.get("interface") || "all";
    const manufacturer = urlParams.get("manufacturer") || "all";
    const transferRate = urlParams.get("transferRate") || "all";

    document.getElementById("storageDevice-name").value =
      name == "all" ? "" : name;
    document.getElementById("storageDevice-capacity").value = capacity;
    document.getElementById("storageDevice-interface").value = interface;
    document.getElementById("storageDevice-manufacturer").value = manufacturer;
    //document.getElementById("storageDevice-transferRate").value = transferRate;

    filterStorageDevices();
  }

  if (storageDevicesList) {
    restoreFilters();
    document
      .getElementById("filter-button")
      .addEventListener("click", function () {
        const name = document.getElementById("storageDevice-name").value;
        const capacity = document.getElementById(
          "storageDevice-capacity"
        ).value;
        const interface = document.getElementById(
          "storageDevice-interface"
        ).value;
        const manufacturer = document.getElementById(
          "storageDevice-manufacturer"
        ).value;

        window.history.pushState(
          {},
          "",
          `main1.html?name=${name}&capacity=${capacity}&interface=${interface}&manufacturer=${manufacturer}`
        );
        filterStorageDevices();
      });
  } else if (storageDeviceId) {
    const storageDevice = storageDevices.find((sd) => sd.id == storageDeviceId);
    if (storageDevice) {
      displayStorageDeviceDetails(storageDevice);
    }
  }
});
