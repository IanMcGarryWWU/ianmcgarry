import './App.css';
import React, {useState, useEffect, useRef} from "react";
import useAnimationFrame from './useAnimationFrame'
import MyName from "./myname";
import HeightVary from "./HeightVary"
import MyParticles from "./MyParticles"
import useScrollPosition from '@react-hook/window-scroll'
import {Sankey} from 'react-vis';
import useDimensions from "react-cool-dimensions";
import * as Scroll from 'react-scroll';



const nodes = [
    {name: 'Python'},
    {name: 'T-SQL'},
    {name: 'VBA'},
    {name: 'Excel'},
    {name: 'ER - Tools'},
    {name: 'Application Development'},
    {name: 'Javascript'},
    {name: 'Management Information'},
    {name: 'Qlikview'},
    {name: 'QGIS / Arcmap'},
    {name: 'R'},
    {name: 'Data Analysis'},
    {name: 'Business Intelligence'},
    {name: 'SSIS'},
    {name: 'Business Analysis'},
    {name: 'Data Science'},
    {name: 'Web Development'}
];

const links = [
    {source: 0, target: 5, value: 5},
    {source: 1, target: 5, value: 6},
    {source: 2, target: 5, value: 6},
    {source: 3, target: 5, value: 5},
    {source: 6, target: 5, value: 1},
    {source: 3, target: 7, value: 5},
    {source: 8, target: 7, value: 2},
    {source: 9, target: 7, value: 3},
    {source: 6, target: 7, value: 1},
    {source: 10, target: 7, value: 1},
    {source: 0, target: 11, value: 5},
    {source: 10, target: 11, value: 1},
    {source: 13, target: 12, value: 4},
    {source: 0, target: 12, value: 4},
    {source: 0, target: 15, value: 4},
    {source: 10, target: 15, value: 1},
    {source: 6, target: 16, value: 1},
    {source: 4, target: 14, value: 4},
    {source: 8, target: 12, value: 1},
    {source: 1, target: 7, value: 3},
    {source: 2, target: 7, value: 3},
    {source: 1, target: 11, value: 2}
];

let arrow = "M 50.270833,47.624999 97.895832,2.6458333 50.270833,29.104166 2.6458333,2.6458333 Z"
let arrowspeed = 4
const fadeinspeed = 0.01

const App = () => {
    let scroll = Scroll.animateScroll;

    const [count, setCount] = useState(0)
    const scrollY = useScrollPosition(90 /*fps*/)
    const [arrowY, setArrowY] = useState(-200)
    const aboutFirstCurrentOpacity = useRef(0);
    const aboutSecondCurrentOpacity = useRef(0);
    const aboutThirdCurrentOpacity = useRef(0);


    const { observe,  height, width } = useDimensions();

    useAnimationFrame(deltaTime => {
        // Pass on a function to the setter of the state
        // to make sure we always have the latest state

        setCount(prevCount => (prevCount + deltaTime * 0.01))
    })

    useEffect(() => {
        if (arrowY > scrollY) {
            setArrowY(arrowY - (((arrowY - scrollY) * arrowspeed) / 50))
        } else if (arrowY < scrollY) {
            let moveamount = (((scrollY - arrowY) * arrowspeed) / 50)
            if (scrollY > (3.5 * height)) {
                moveamount = 0
            }
            setArrowY( arrowY + moveamount )
        }

    },  [count])  // eslint-disable-line react-hooks/exhaustive-deps

    const getxy = (period, count, radius, phase) => {
        let posinperiod = count % period
        let radialpos = ((posinperiod * 2 * Math.PI) / period) + (2 * Math.PI * phase)
        let x = Math.cos(radialpos)
        let y = Math.sin(radialpos)
        let xperc = String(Math.round((x * radius) + 50)) + "%"
        let yperc = String(Math.round((y * radius) + 50)) + "%"
        return xperc + " " + yperc
    }

    let testxy1 = getxy(178 * 4, count, 50, 0)
    let testxy2 = getxy(63 * 4, count, 25, 0.3)
    let testxy3 = getxy(120 * 4, count, 38, 0.8)

    let backgroundstyle1 = {background: "radial-gradient(circle at " + testxy1 + ", rgba(2,0,36,1) 0%, rgba(40,40,131,1) 50%, rgba(0,212,255,1) 100%)"}
    let backgroundstyle2 = {background: "radial-gradient(circle at " + testxy2 + ", rgba(2,0,36,1) 0%, rgba(40,131,40,1) 50%, rgba(0,212,255,1) 100%)"}
    let backgroundstyle3 ={background: "radial-gradient(circle at " + testxy3 + ", rgba(2,0,36,1) 0%, rgba(131,78,78,1) 50%, rgba(0,212,255,1) 100%)"}

    let arrowopacity = Math.min((50 / Math.abs(scrollY - arrowY)) ** 2, 1) * 0.34
    let arrowperiod = 178 * 2
    let arrowrange = 17 / 2
    let arrowcycle = 0
    if (arrowopacity === 0.34) {
        arrowcycle = Math.sin(((count % arrowperiod) / 18 ) * 2 * Math.PI) * arrowrange
    }
    let arrowstyle = {top:  "93vh",  transform: "translate(0px, " + (arrowY + arrowcycle) + "px)", opacity: (arrowopacity * 100) + "%"}

    const iswithinrange = (start, end) => {
        return scrollY >= (start * height) && scrollY <= (end * height);
    }

    const aboutFirstVisible = iswithinrange(0.2, 1.2)
    const aboutSecondVisible = iswithinrange(0.4, 1.4)
    const aboutThirdVisible = iswithinrange(0.6, 1.6)

    
    let aboutFirstStyle
    if (aboutFirstVisible) {
        if (aboutFirstCurrentOpacity.current < 1) {
            aboutFirstCurrentOpacity.current += fadeinspeed
            aboutFirstStyle = {opacity: aboutFirstCurrentOpacity.current}
        } else {
            aboutFirstStyle = {opacity: 1}
        }
    } else {
        if (aboutFirstCurrentOpacity.current > 0) {
            aboutFirstCurrentOpacity.current -= fadeinspeed
            aboutFirstStyle = {opacity: aboutFirstCurrentOpacity.current}
        } else {
            aboutFirstStyle = {opacity: 0}
        }
    }
    
    let aboutSecondStyle
    if (aboutSecondVisible) {
        if (aboutSecondCurrentOpacity.current < 1) {
            aboutSecondCurrentOpacity.current += fadeinspeed
            aboutSecondStyle = {opacity: aboutSecondCurrentOpacity.current}
        } else {
            aboutSecondStyle = {opacity: 1}
        }
    } else {
        if (aboutSecondCurrentOpacity.current > 0) {
            aboutSecondCurrentOpacity.current -= fadeinspeed
            aboutSecondStyle = {opacity: aboutSecondCurrentOpacity.current}
        } else {
            aboutSecondStyle = {opacity: 0}
        }
    }

    let aboutThirdStyle
    if (aboutThirdVisible) {
        if (aboutThirdCurrentOpacity.current < 1) {
            aboutThirdCurrentOpacity.current += fadeinspeed
            aboutThirdStyle = {opacity: aboutThirdCurrentOpacity.current}
        } else {
            aboutThirdStyle = {opacity: 1}
        }
    } else {
        if (aboutThirdCurrentOpacity.current > 0) {
            aboutThirdCurrentOpacity.current -= fadeinspeed
            aboutThirdStyle = {opacity: aboutThirdCurrentOpacity.current}
        } else {
            aboutThirdStyle = {opacity: 0}
        }
    }
    
    const scrollToNext = () => {
        scroll.scrollTo((Math.floor(scrollY / height) + 1) * height);
    }

    return (
      <React.Fragment>
          <div className="SuperHeader">
              <div className="Header">
                      <div className="HeaderItem">
                        <HeightVary className="GlassCard" text="About Me" scrollY={scrollY} height={height} section={2}/>
                      </div>
                      <div className="HeaderItem">
                          <HeightVary className="GlassCard" text="Skills" scrollY={scrollY} height={height} section={3}/>
                      </div>
                      <div className="HeaderItem">
                          <HeightVary className="GlassCard" text="Writing" scrollY={scrollY} height={height} section={4}/>
                      </div>
                      <div className="HeaderItem">
                          <HeightVary className="GlassCard" text="Contact Me" scrollY={scrollY} height={height} section={5}/>
                      </div>
              </div>
          </div>
          <div className="ArrowPlacer" style={arrowstyle}>
              <svg height={100} width={100} onClick={scrollToNext} className="Arrow">
                  <path d={arrow} style={{fill: "#FFFFFF",stroke: "#FFFFFF" , strokeWidth: "0.264583px", strokeLinecap: "butt", strokelinejoin: "miter", strokeOpacity:"1"}}/>
              </svg>
          </div>
        <div className="App" style={backgroundstyle1} ref={observe}>
            <div className="AppOverlay" style={backgroundstyle2}/>
            <div className="AppOverlay" style={backgroundstyle3}/>

          <div className="Middle">
              <div/>
              <div>
                <MyName count={count} scroll={scrollY}/>
              </div>
              <div className="Horizontal-Placer">
              </div>

          </div>

        </div>
        <div className="AboutMe" >
            <div style={{ position: 'absolute', height:"100%",  width:"100%"}} >
                <MyParticles height={"100%"}/>
            </div>  
            <div>
                <div className="AboutMeText GlassCard" style={aboutFirstStyle}>
                    I am a business solutions developer with over ten years experience. This is a varied role that encompasses..
                </div>
                <div className="GlassCardVert AboutMeText" style={aboutSecondStyle}>
                    <div className="AboutMeList">
                        The identification of business difficulties and opportunities.
                    </div>
                    <div className="AboutMeList">
                        Researching, documenting and designing potential solutions.
                    </div>
                    <div className="AboutMeList">
                        Developing the processes, applications, databases and reports required.
                    </div>
                    <div className="AboutMeList">
                        Maintaining the data models and flows that underpin them.
                    </div>
                </div>
                <div className={"AboutMeText GlassCard"} style={aboutThirdStyle}>
                    I have been programming for over 30 years and am also a painter, photographer and musician. I apply a logical and creative approach to problem solving and design.
                </div>
            </div>

        </div>
        <div className={"Skills"}>
            <Sankey
                nodes={nodes}
                links={links}
                width={Math.max(320, width * 0.6)}
                height={Math.min(600, height * 0.9)}
                style={{
                    labels: {color: "#FFFFFF", fontSize: "smaller"},
                    links: {},
                    rects: {}
                }}
            />
        </div>
          <div style={{ position: 'absolute', height:"100%",  width:"100%"}} >
              <MyParticles height={"100%"}/>
          </div>
          <div className={"Writing"}>
              Writing
          </div>
          <div className={"Contact"}>
              Contact
          </div>
      </React.Fragment>
  );
}

export default App;
