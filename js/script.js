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

function updateTimelineContent() {
    const sliderValue = document.getElementById('timeline-slider').value;
    const items = document.querySelectorAll('.timeline-item');

    items.forEach((item, index) => {
        if (index + 1 == sliderValue) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
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
});