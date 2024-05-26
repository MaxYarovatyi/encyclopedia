var searchField = document.getElementById('processor-name');
searchField.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("filter-button").click();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const processorsList = document.querySelector('.processors-list')
    const urlParams = new URLSearchParams(window.location.search);
    const processorId = urlParams.get('id');

    function displayProcessors(processors, filters) {
        processorsList.innerHTML = '';
        processors.forEach(processor => {
            const card = document.createElement('div');
            card.className = 'processor-card';
            card.innerHTML = `
                <img src="${processor.image}" alt="${processor.name}">
                <h3>${processor.name}</h3>
                <p>Набір команд: ${processor.instructionSet}</p>
                <p>Кількість ядер: ${processor.cores}</p>
                <p>Виробник: ${processor.manufacturer}</p>
                <p>Тактова частота: ${processor.frequency} ГГц</p>
                <a href="processor.html?id=${processor.id}&name=${filters.name}&instructionSet=${filters.instructionSet}&cores=${filters.cores}&manufacturer=${filters.manufacturer}&frequency=${filters.frequency}">Детальніше</a>
            `;
            processorsList.appendChild(card);
        });

        if (processorsList.innerHTML == '') {
            processorsList.innerHTML = `
                <b class="no-results">ПО ВАШОМУ ЗАПИТУ НЕ ЗНАЙДЕНО ЖОДНОГО МІКРОПРОЦЕСОРА</b>
            `;
        }
    }

    function filterProcessors() {
        const name = document.getElementById('processor-name').value;
        const instructionSet = document.getElementById('instruction-set').value;
        const cores = document.getElementById('cores').value;
        const manufacturer = document.getElementById('manufacturer').value;
        const frequency = document.getElementById('frequency').value;

        const filters = { name, instructionSet, cores, manufacturer, frequency };

        const filteredProcessors = processors.filter(processor => {
            return (name === 'all' || processor.name.includes(name)) &&
                   (instructionSet === 'all' || processor.instructionSet === instructionSet) &&
                   (cores === 'all' || processor.cores > cores) &&
                   (manufacturer === 'all' || processor.manufacturer === manufacturer) &&
                   (frequency === 'all' || processor.frequency < frequency);
        });

        displayProcessors(filteredProcessors, filters);
    }

    function displayProcessorDetails(processor) {
        document.getElementById('processor-name').textContent = processor.name;
        document.getElementById('processor-image').src = processor.image;
        document.getElementById('processor-image').alt = processor.name;
        document.getElementById('processor-instruction-set').textContent = processor.instructionSet;
        document.getElementById('processor-cores').textContent = processor.cores;
        document.getElementById('processor-manufacturer').textContent = processor.manufacturer;
        document.getElementById('processor-frequency').textContent = processor.frequency;
        document.getElementById('processor-description').textContent = processor.description;
        document.getElementById('processor-iframe').src = processor.video;

        const name = urlParams.get('name') || 'all';
        const instructionSet = urlParams.get('instructionSet') || 'all';
        const cores = urlParams.get('cores') || 'all';
        const manufacturer = urlParams.get('manufacturer') || 'all';
        const frequency = urlParams.get('frequency') || 'all';

        const backLink = document.getElementById('back-to-list');
        backLink.href = `main.html?name=${name}&instructionSet=${instructionSet}&cores=${cores}&manufacturer=${manufacturer}&frequency=${frequency}`;
    }

    function restoreFilters() {
        const name = urlParams.get('name') || 'all';
        const instructionSet = urlParams.get('instructionSet') || 'all';
        const cores = urlParams.get('cores') || 'all';
        const manufacturer = urlParams.get('manufacturer') || 'all';
        const frequency = urlParams.get('frequency') || 'all';

        document.getElementById('processor-name').value = name == 'all' ? '' : name;
        document.getElementById('instruction-set').value = instructionSet;
        document.getElementById('cores').value = cores;
        document.getElementById('manufacturer').value = manufacturer;
        document.getElementById('frequency').value = frequency;

        filterProcessors();
    }

    if (processorsList) {
        restoreFilters();
        document.getElementById('filter-button').addEventListener('click', function() {
            const name = document.getElementById('processor-name').value
            const instructionSet = document.getElementById('instruction-set').value;
            const cores = document.getElementById('cores').value;
            const manufacturer = document.getElementById('manufacturer').value;
            const frequency = document.getElementById('frequency').value;

            window.history.pushState({}, '', `main.html?name=${name}&instructionSet=${instructionSet}&cores=${cores}&manufacturer=${manufacturer}&frequency=${frequency}`);
            filterProcessors();
        });
    } else if (processorId) {
        const processor = processors.find(p => p.id == processorId);
        if (processor) {
            displayProcessorDetails(processor);
        }
    }
});
