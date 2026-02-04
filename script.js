const emojis = [
    ['😊', 'Happy'], ['😎', 'Cool'], ['🥳', 'Party'], ['😍', 'Love'],
    ['🦄', 'Unicorn'], ['🐱', 'Cat'], ['🐶', 'Dog'], ['🦋', 'Butterfly'],
    ['🍕', 'Pizza'], ['🍩', 'Donut'], ['🎂', 'Cake'], ['☕', 'Coffee'],
    ['🚀', 'Rocket'], ['💎', 'Diamond'], ['🌈', 'Rainbow'], ['⭐', 'Star'],
    ['🎮', 'Gaming'], ['🎸', 'Guitar'], ['🌸', 'Blossom'], ['🔥', 'Fire']
];

const audio = new (window.AudioContext || window.webkitAudioContext)();
const box = document.getElementById('emojiBox');
const name = document.getElementById('name');
const btn = document.getElementById('btn');

function playSound() {
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.connect(gain);
    gain.connect(audio.destination);
    osc.frequency.setValueAtTime(500, audio.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, audio.currentTime + 0.1);
    gain.gain.setValueAtTime(0.2, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audio.currentTime + 0.2);
    osc.start();
    osc.stop(audio.currentTime + 0.2);
}

function generate() {
    const [emoji, label] = emojis[Math.floor(Math.random() * emojis.length)];
    box.textContent = emoji;
    name.textContent = label;
    box.classList.remove('pop');
    void box.offsetWidth;
    box.classList.add('pop');
    playSound();
}

btn.addEventListener('click', generate);
box.addEventListener('click', generate);
document.addEventListener('keydown', e => {
    if (e.code === 'Space') generate();
});
