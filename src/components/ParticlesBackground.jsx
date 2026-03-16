import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function ParticlesBackground() {

const particlesInit = async (main) => {
await loadFull(main);
};

return (

<Particles
id="tsparticles"
init={particlesInit}
options={{
background: {
color: {
value: "transparent"
}
},
fpsLimit: 60,
particles: {
number: {
value: 70
},
color: {
value: "#ffffff"
},
links: {
enable: true,
distance: 150,
color: "#ffffff",
opacity: 0.3,
width: 1
},
move: {
enable: true,
speed: 2
},
size: {
value: 3
},
opacity: {
value: 0.5
}
}
}}
/>

);

}

export default ParticlesBackground;