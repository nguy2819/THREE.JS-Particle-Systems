import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'


// Texture Loader
const loader = new THREE.TextureLoader()
const height = loader.load('heightmap.png')
// const texture = loader.load('utahheightmap.jpg')
// const alpha = loader.load('alpha.gif')
const circle = loader.load('ODC4U.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry(.7, .2, 16, 100);

const particleGeometry = new THREE.BufferGeometry;
const particleCnt = 5000;

const posArray = new Float32Array(particleCnt * 3);

for(let i=0; i < particleCnt * 3; i++){
    // posArray[i] = Math.random()
    // posArray[i] = Math.random() - 0.5 * 5
    posArray[i] = (Math.random() - 0.5) * (Math.random() * 6)

}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

// Materials

const material = new THREE.PointsMaterial({
    size: 0.005
})

const particleMaterial = new THREE.PointsMaterial({
    size: 0.005,
    map: circle,
    transparent: true,
    color: '#6CF8FB'
})

// Mesh
const sphere = new THREE.Points(geometry,material)
const particleMesh = new THREE.Points(particleGeometry, particleMaterial)
scene.add(sphere, particleMesh)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth 
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas, 
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

//  document.addEventListener('mousemove', animateTerrain)

//  let mouseY = 0

//  function animateTerrain(event) {
//      mouseY = event.clientY
//  }

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // plane.rotation.z = .5 * elapsedTime
    
    // plane.material.displacementScale = .4 + mouseY * 0.00098

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()