function calculateWaterAmount() {
    const hotTemp = parseFloat(document.getElementById('hot-water-temp').value);
    const coldTemp = parseFloat(document.getElementById('cold-water-temp').value);
    const targetTemp = parseFloat(document.getElementById('target-temp').value);
    const targetVolume = parseFloat(document.getElementById('target-volume').value);

    if (hotTemp <= targetTemp || coldTemp >= targetTemp) {
        document.getElementById('temperature-result').innerHTML = '<p class="text-danger">輸入錯誤. 需要溫度應介於涼水、熱水的溫度之間.</p>';
        return;
    }

    const hotAmount = (targetTemp - coldTemp) / (hotTemp - coldTemp) * targetVolume;
    const coldAmount = targetVolume - hotAmount;

    document.getElementById('temperature-result').innerHTML = `<p>用 <strong>${hotAmount.toFixed(2)} ml</strong> 的熱水及 <strong>${coldAmount.toFixed(2)} ml</strong> 的冷水</p>`;
}

function calculateMilk() {
    const water = parseFloat(document.getElementById('needed-water').value);
    const weight = parseFloat(document.getElementById('spoon-weight').value);
    const needed = parseFloat(document.getElementById('needed-amount').value);

    const portion = needed / water

    document.getElementById('milk-result').innerHTML = `<p>用 <strong>${portion.toFixed(2)} 匙</strong>的奶粉(<strong>${(weight*portion).toFixed(2)} g</strong>) 加入${needed.toFixed(2)} ml 的水中</p>`;
}

// Function to load and parse markdown content
async function loadTimelineContent() {
    try {
        const response = await fetch('https://kevinhsu95034.github.io/baby-tools/data/development.md');
        const markdown = await response.text();
        
        const timelineContainer = document.getElementById('timeline-content');
        const slider = document.getElementById('timeline-slider');

        // Parse markdown content by splitting on top-level headers (#)
        const sections = markdown.split(/^# /gm).filter(section => section.trim());
        slider.max = sections.length; // Adjust slider range based on number of sections

        // Clear any existing content
        timelineContainer.innerHTML = '';

        // Populate timeline content
        sections.forEach((section, index) => {
            const [title, ...contentLines] = section.split('\n');
            const contentHtml = `<h2>${title.trim()}</h2><p>${contentLines.join('<br>')}</p>`;
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.id = `timeline-${index + 1}`;
            timelineItem.style.display = index === 0 ? 'block' : 'none'; // Show first item by default
            timelineItem.innerHTML = contentHtml;
            timelineContainer.appendChild(timelineItem);
        });
    } catch (error) {
        console.error('Error loading timeline content:', error);
    }
}
// Update timeline visibility
function updateTimelineContent() {
    const sliderValue = document.getElementById('timeline-slider').value;
    const items = document.querySelectorAll('.timeline-item');

    items.forEach((item, index) => {
        item.style.display = index + 1 == sliderValue ? 'block' : 'none';
    });
}

async function loadTableContent() {
    try {
        // Fetch the CSV file
        const response = await fetch('https://kevinhsu95034.github.io/baby-tools/data/development.md'); // Adjust path to CSV file
        const csvText = await response.text();

        // Parse the CSV
        const rows = csvText.split('\n').map(row => row.split(','));

        // Get table element
        const tableBody = document.querySelector('#dynamic-table tbody');

        // Clear existing table rows
        tableBody.innerHTML = '';

        // Populate the table with rows from CSV
        rows.forEach((row, index) => {
            // Skip header row (index 0) if necessary
            if (index === 0) return;

            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell.trim();
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error loading table content:', error);
    }
}



// Data preservation
// Save data to localStorage on input change
document.getElementById('temperature-calculator').addEventListener('input', function () {
    const hotTemp = document.getElementById('hot-water-temp').value;
    const coldTemp = document.getElementById('cold-water-temp').value;
    const targetTemp = document.getElementById('target-temp').value;
    const targetVolume = document.getElementById('target-volume').value;

    localStorage.setItem('hotTemp', hotTemp);
    localStorage.setItem('coldTemp', coldTemp);
    localStorage.setItem('targetTemp', targetTemp);
    localStorage.setItem('targetVolume', targetVolume);
});
document.getElementById('milk-calculator').addEventListener('input', function () {
    const water = document.getElementById('needed-water').value;
    const weight = document.getElementById('spoon-weight').value;
    const needed = document.getElementById('needed-amount').value;

    localStorage.setItem('water', water);
    localStorage.setItem('weight', weight);
    localStorage.setItem('needed', needed);
});

// Save slider value to localStorage
document.getElementById('timeline-slider').addEventListener('input', function () {
    const sliderValue = document.getElementById('timeline-slider').value;
    localStorage.setItem('sliderValue', sliderValue);
    updateTimelineContent();
});

// Restore data from localStorage on page load
window.addEventListener('load', function () {
    const hotTemp = localStorage.getItem('hotTemp');
    const coldTemp = localStorage.getItem('coldTemp');
    const targetTemp = localStorage.getItem('targetTemp');
    const targetVolume = localStorage.getItem('targetVolume');

    if (hotTemp) document.getElementById('hot-water-temp').value = hotTemp;
    if (coldTemp) document.getElementById('cold-water-temp').value = coldTemp;
    if (targetTemp) document.getElementById('target-temp').value = targetTemp;
    if (targetVolume) document.getElementById('target-volume').value = targetVolume;

    const water = localStorage.getItem('water');
    const weight = localStorage.getItem('weight');
    const needed = localStorage.getItem('needed');

    if (water) document.getElementById('needed-water').value = water;
    if (weight) document.getElementById('spoon-weight').value = weight;
    if (needed) document.getElementById('needed-amount').value = needed;

    loadTimelineContent();
    const savedSliderValue = localStorage.getItem('sliderValue');
    if (savedSliderValue) {
        document.getElementById('timeline-slider').value = savedSliderValue;
        updateTimelineContent();
    }

    loadTableContent();
});