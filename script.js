// Globe
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('globeCanvas') });
renderer.setSize(80, 80);

const geometry = new THREE.IcosahedronGeometry(1, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x4169E1, wireframe: true });
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

camera.position.z = 2.5;

function animateGlobe() {
    requestAnimationFrame(animateGlobe);
    globe.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animateGlobe();

// Content
const content = document.getElementById('content');
const homeTitle = document.getElementById('homeTitle');
let currentView = 'home';

const posters = [
    { src: '/media/nexus-neon.png', name: 'Nexus Neon', aspectRatio: 1 },
    { src: '/media/baw.jpeg', name: 'Black and White', aspectRatio: 4/3 },
    { src: '/media/NoiZu.png', name: 'NoiZu', aspectRatio: 16/9 },
    { src: '/media/Artboard4x.png', name: 'Artboard 4X', aspectRatio: 1 },
];

function renderHome() {
    content.innerHTML = `
        <nav class="mb-8">
            <ul class="flex flex-wrap justify-center gap-4">
                <li><a href="#home" class="hover:text-blue-500">[Home]</a></li>
                <li><a href="#about" class="hover:text-blue-500">[About]</a></li>
                <li><a href="#personal" class="hover:text-blue-500">[Personal]</a></li>
                <li><a href="#links" class="hover:text-blue-500">[Links]</a></li>
                <li><button class="hover:text-blue-500" id="postersButton">[Posters]</button></li>
            </ul>
        </nav>
        <main class="flex-grow max-w-2xl mx-auto w-full">
            <section id="home" class="mb-8">
                <h2 class="text-2xl font-bold mb-4">> Welcome to A-Z.fi</h2>
                <p>Disclaimer: This is a website that is a work in progress. I'm adding more and more as I go along.</p>
            </section>
            <section id="about" class="mb-8">
                <h2 class="text-2xl font-bold mb-4">> About This Site</h2>
                <p>OS: Web 1.0</p>
                <p>Resolution: ${window.innerWidth}x${window.innerHeight}</p>
                <p>Colors: ${screen.colorDepth}-bit</p>
            </section>
            <section id="personal" class="mb-8">
                <h2 class="text-2xl font-bold mb-4">> Personal Info</h2>
                <div class="flex flex-col sm:flex-row items-start gap-4">
                    <img src="/media/IMG_1428.jpg" alt="Sam Headshot" width="150" height="150" class="object-cover border-4 border-[#F0EAD6]">
                    <div>
                        <p>Name: [Sam Z.]</p>
                        <p>Title: Master_Hacker</p>
                        <p>Fun Facts:</p>
                        <ul class="list-disc list-inside pl-4">
                            <li>I have no idea how reverse engineering works!</li>
                            <li>I have completed LEGO Batman (the first one) 100% without dying once</li>
                            <li>I have a collection of floppy disks</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section id="links" class="mb-8">
                <h2 class="text-2xl font-bold mb-4">> Cool Links</h2>
                <ul class="list-disc list-inside">
                    <li><a href="https://www.yyyyyyy.info" class="hover:text-blue-500">www.yyyyyyy.info</a></li>
                    <li><a href="http://www.playlikeye.com" class="hover:text-blue-500">PMC2000XL</a></li>
                    <li><a href="https://clickclickclick.click/#8d9a179492fc7890de72e5d9a0330111" class="hover:text-blue-500">CLICK!CLICK!CLICK!</a></li>
                </ul>
            </section>
        </main>
    `;
    document.getElementById('postersButton').addEventListener('click', () => renderPosters());
}

function renderPosters() {
    content.innerHTML = `
        <div class="flex-grow flex flex-col">
            <h2 class="text-2xl font-bold mb-4">> Posters</h2>
            <div class="flex-grow flex flex-col gap-8 mb-8 overflow-y-auto">
                ${posters.map((poster, index) => `
                    <div class="border-4 border-blue-700 p-4 rounded-lg flex flex-col items-center relative max-w-md mx-auto w-full">
                        <div class="poster-container mb-4" style="aspect-ratio: ${poster.aspectRatio}">
                            <img src="${poster.src}" alt="Poster ${index + 1}" class="poster-image">
                        </div>
                        <div class="w-full flex flex-col items-start">
                            <p class="font-bold text-lg mb-2">${poster.name}</p>
                            <a href="${poster.src}" download class="bg-blue-700 text-[#F0EAD6] px-3 py-2 rounded-md font-bold hover:bg-blue-600 transition-colors duration-200">
                                Download Poster
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button id="backButton" class="fixed bottom-4 right-4 bg-blue-700 text-[#F0EAD6] px-4 py-2 rounded-md font-bold hover:bg-blue-600 transition-colors duration-200 shadow-lg">
                TAKE ME BACK!
            </button>
        </div>
    `;
    document.getElementById('backButton').addEventListener('click', () => renderHome());
}

// Initialize
homeTitle.addEventListener('click', () => renderHome());
renderHome();

// Update visitor count
fetch('/api/visitorCount', { method: 'POST' })
    .then(response => response.json())
    .then(data => document.getElementById('visitorCount').textContent = data.count)
    .catch(error => console.error('Error fetching visitor count:', error));

// Set current year
document.getElementById('currentYear').textContent = new Date().getFullYear();
