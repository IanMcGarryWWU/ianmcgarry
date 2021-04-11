import ParticlesBg from "react-tsparticles";
import {Component} from "react";


class MyParticles extends Component {
    constructor(props) {
        super(props);

        this.particlesInit = this.particlesInit.bind(this);
        this.particlesLoaded = this.particlesLoaded.bind(this);
    }

    particlesInit(main) {

    }

    particlesLoaded(container) {
    }

    render() {
        return (
            <ParticlesBg
                id="tsparticles"
                init={this.particlesInit}
                loaded={this.particlesLoaded}
                options={{"autoPlay":true,
                    "background":{"color":{"value":"#000000"},"image":"","position":"50% 50%","repeat":"no-repeat","size":"cover","opacity":1},
                    "backgroundMask":{"composite":"destination-out","cover":{"color":{"value":"#00D7FF"},"opacity":1},"enable":false},"fullScreen":{"enable":false,"zIndex":1},"detectRetina":true,"fpsLimit":60,
                    "infection":{"cure":false,"delay":0,"enable":false,"infections":0,"stages":[]},"interactivity":{"detectsOn":"canvas","events":{"onClick":{"enable":true,"mode":"push"},
                            "onDiv":{"selectors":[],"enable":false,"mode":[],"type":"circle"},"onHover":{"enable":true,"mode":"repulse","parallax":{"enable":false,"force":2,"smooth":10}},"resize":true},
                        "modes":{"attract":{"distance":200,"duration":0.4,"speed":1},"bounce":{"distance":200},"bubble":{"distance":400,"duration":2,"opacity":0.8,"size":40},
                            "connect":{"distance":80,"links":{"opacity":0.5},"radius":60},"grab":{"distance":400,"links":{"blink":false,"consent":false,"opacity":1}},
                            "light":{"area":{"gradient":{"start":{"value":"#00D7FF"},"stop":{"value":"#000000"}},"radius":1000},"shadow":{"color":{"value":"#000000"},"length":2000}},
                            "push":{"quantity":4},"remove":{"quantity":2},"repulse":{"distance":200,"duration":0.4,"speed":1},"slow":{"factor":3,"radius":200},
                            "trail":{"delay":1,"quantity":1}}},"manualParticles":[],"motion":{"disable":false,"reduce":{"factor":4,"value":true}},
                    "particles":
                        {"bounce":{"horizontal":{"random":{"enable":false,"minimumValue":0.1},"value":1},
                                "vertical":{"random":{"enable":false,"minimumValue":0.1},"value":1}},
                        "collisions":{"bounce":{"horizontal":{"random":{"enable":false,"minimumValue":0.1},"value":1},
                                "vertical":{"random":{"enable":false,"minimumValue":0.1},"value":1}},
                            "enable":false,"mode":"bounce","overlap":{"enable":true,"retries":0}},
                            "color":{"value":"#00D7FF"},
                        "life":{"count":0,"delay":{"random":{"enable":false,"minimumValue":0},"value":0,"sync":false},
                            "duration":{"random":{"enable":false,"minimumValue":0.0001},"value":0,"sync":false}},
                        "links":{"blink":false,"color":{"value":"#00D7FF"},"consent":false,"distance":100,"enable":true,"frequency":1,"opacity":0.4,"shadow":{"blur":5,"color":{"value":"#00ff00"},"enable":false},
                            "triangles":{"enable":false,"frequency":1},"width":1,"warp":false},"move":{"angle":{"offset":45,"value":90},
                            "attract":{"enable":false,"rotate":{"x":600,"y":1200}},"decay":0,"distance":0,"direction":"none","drift":0,"enable":true,
                            "gravity":{"acceleration":9.81,"enable":false,"maxSpeed":50},"path":{"clamp":true,"delay":{"random":{"enable":false,"minimumValue":0},"value":0},"enable":false},
                            "outModes":{"default":"out","bottom":"out","left":"out","right":"out","top":"out"},"random":false,"size":false,"speed":6,"straight":false,
                            "trail":{"enable":false,"length":10,"fillColor":{"value":"#000000"}},"vibrate":false,"warp":false},"number":{"density":{"enable":true,"area":800,"factor":1000},"limit":0,"value":80},
                        "opacity":{"random":{"enable":false,"minimumValue":0.1},"value":0.5,"animation":{"count":0,"enable":false,"speed":3,"sync":false,"destroy":"none",
                                "minimumValue":0.1,"startValue":"random"}},"reduceDuplicates":false,"rotate":{"random":{"enable":false,"minimumValue":0},"value":{"min":0,"max":360},
                            "animation":{"enable":false,"speed":0,"sync":false},"direction":"clockwise","path":false},"shadow":{"blur":0,"color":{"value":"#000000"},"enable":false,"offset":{"x":0,"y":0}},
                        "shape":{"options":{"polygon":{"nb_sides":5},"star":{"nb_sides":5},
                                "image":{"src":"https://particles.js.org/images/github.svg","width":100,"height":100},"images":{"src":"https://particles.js.org/images/github.svg","width":100,"height":100}},
                            "type":"circle"},"size":{"random":{"enable":true,"minimumValue":1},"value":{"min":1,"max":3},
                            "animation":{"count":0,"enable":false,"speed":20,"sync":false,"destroy":"none","minimumValue":0.1,"startValue":"random"}},
                        "stroke":{"width":0},"twinkle":{"lines":{"enable":false,"frequency":0.05,"opacity":1},"particles":{"enable":false,"frequency":0.05,"opacity":1}}},
                    "pauseOnBlur":true,"pauseOnOutsideViewport":true,"responsive":[],"themes":[]}}
            />
        );
    }
}

export default MyParticles