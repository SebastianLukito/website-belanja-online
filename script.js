let cart = [];
let total = 0;
const serviceFee = 2000;
let deliveryFee = 0;
let tax = 0;
const deliveryRatePerKm = 500;

function addToCart(itemName, itemPrice) {
    const existingItemIndex = cart.findIndex(item => item.name === itemName);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        const cartItem = { name: itemName, price: itemPrice, quantity: 1 };
        cart.push(cartItem);
    }
    
    renderCart();
    updateTotal();
    showPopup();
}

function renderCart() {
    const cartList = document.getElementById('cart');
    cartList.innerHTML = '';
    cart.forEach((item, index) => {
        const cartElement = document.createElement('li');
        
        const itemText = document.createElement('span');
        itemText.textContent = `${item.name} - Rp ${item.price.toLocaleString('id-ID')} x ${item.quantity}`;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remove';
        deleteButton.onclick = () => removeFromCart(index);
        
        cartElement.appendChild(itemText);
        cartElement.appendChild(deleteButton);
        
        cartList.appendChild(cartElement);
    });
}

function removeFromCart(index) {
    const item = cart[index];
    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart.splice(index, 1);
    }

    renderCart();
    updateTotal();
}

function updateTotal() {
    total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    tax = total * 0.1;
    const grandTotal = total + tax + deliveryFee + serviceFee;
    
    document.getElementById('total').textContent = total.toLocaleString('id-ID');
    document.getElementById('tax').textContent = tax.toLocaleString('id-ID');
    document.getElementById('delivery').textContent = deliveryFee.toLocaleString('id-ID');
    document.getElementById('grand-total').textContent = grandTotal.toLocaleString('id-ID');
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert(`Pesananmu Dengan Total Harga Rp ${total.toLocaleString('id-ID')} sedang diproses. Terima kasih!`);
    cart = [];
    renderCart();
    updateTotal();
}

function getDistance() {
    const deliveryAddress = document.getElementById('delivery-address').value;
    if (deliveryAddress.trim() === '') {
        alert('Please select a delivery address.');
        return;
    }

    const distanceInKm = parseInt(deliveryAddress, 10);
    deliveryFee = distanceInKm * deliveryRatePerKm;
    updateTotal();
}

function showPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';
    popup.style.opacity = '1';
    setTimeout(() => {
        popup.style.opacity = '0';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 1000);
    }, 1000);
}

const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const loopBtn = document.getElementById('loop');
const timeSlider = document.getElementById('time-slider');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const songTitle = document.getElementById('song-title');

audioPlayer.addEventListener('loadedmetadata', () => {
    timeSlider.max = Math.floor(audioPlayer.duration);
    durationDisplay.textContent = formatTime(audioPlayer.duration);
});

audioPlayer.addEventListener('timeupdate', () => {
    timeSlider.value = Math.floor(audioPlayer.currentTime);
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
});

function togglePlayPause() {
    if (audioPlayer.paused) {
        playAudio();
    } else {
        pauseAudio();
    }
}

function playAudio() {
    audioPlayer.play();
    playPauseBtn.textContent = 'Pause';
}

function pauseAudio() {
    audioPlayer.pause();
    playPauseBtn.textContent = 'Play';
}

function toggleLoop() {
    audioPlayer.loop = !audioPlayer.loop;
    loopBtn.style.backgroundColor = audioPlayer.loop ? '#0056b3' : '#007bff';
}

function seekAudio() {
    audioPlayer.currentTime = timeSlider.value;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = Math.floor(seconds % 60);
    return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
}

// Auto play on load
window.onload = () => {
    songTitle.textContent = "Umi No Mieru Machi";  // Replace with actual song title
    playAudio();
};