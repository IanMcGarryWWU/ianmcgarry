import './myname.css';
import React from "react";

let letterinfo = [
    {
        id: 1,
        letter: "I",
        x: Math.random(),
        y: Math.random(),
        z: Math.random(),
        r: Math.random()
    },
    {
        id: 2,
        letter: "a",
        x: Math.random(),
        y: Math.random(),
        z: Math.random(),
        r: Math.random()
    },
    {
        id: 3,
        letter: "n",
        x: Math.random(),
        y: Math.random(),
        z: Math.random(),
        r: Math.random()
    },
    {
        id: 4,
        letter: "z",
        x: Math.random(),
        y: Math.random(),
        z: Math.random(),
        r: Math.random()
    },
    {
        id: 5,
        letter: "M",
        x: Math.random(),
        y: Math.random(),
        z: Math.random(),
        r: Math.random()
    },
    {
        id: 6,
        letter: "c",
        x: Math.random(),
        y: Math.random(),
        z: Math.random(),
        r: Math.random()
    },
    {
        id: 7,
        letter: "G",
        x: Math.random(),
        y: Math.random(),
        z: Math.random(),
        r: Math.random()
    },
    {
        id: 8,
        letter: "a",
        x: Math.random(),
        y: Math.random(),
        z: Math.random(),
        r: Math.random()
    },
    {
        id: 9,
        letter: "r",
        x: Math.random(),
        y: Math.random(),
        z: Math.random(),
        r: Math.random()
    },
    {
        id: 10,
        letter: "r",
        x: Math.random(),
        y: Math.random(),
        z: Math.random(),
        r: Math.random()
    },
    {
        id: 11,
        letter: "y",
        x: Math.random(),
        y: Math.random(),
        z: Math.random(),
        r: Math.random()
    }
]

let fadedist = 5

const MyName = (props) => {
    let posinanim = props.count
    if (props.scroll > 0) {
        if (props.scroll > 300) {
            posinanim = 0
        } else {
            posinanim = (1 - (props.scroll / 300)) * 30
        }
    }
    letterinfo = letterinfo.map((obj, index) => {
        let start = 1 * index
        let end = 13 + (1.7 * index)
        let modifier = 1
        if (posinanim < start) {
            modifier = 0
        } else if ( posinanim > end) {
            modifier = 1.00
        } else {
            modifier = (posinanim - start) / (end - start)
        }
        let invmodifier = 1 - modifier
        if (obj.letter === 'z') {
            modifier = 0
        }

        let astyle = {textShadow: "-2px 2px 4px rgba(0,0,0," + (modifier * 0.5) + "), 2px -2px 4px rgba(255,255,255," + (modifier * 0.4) + ")",
            opacity: modifier,
            transform: "translate3d( " + (invmodifier * fadedist * ((obj.x * 2) - 1)) + "em, " + (invmodifier * fadedist * ((obj.y * 2) - 1)) + "em, "
                + (invmodifier * fadedist * ((obj.z * 2) - 1)) + "em ) rotate(" + (invmodifier * obj.r * 500) + "deg)"
        }
        return { ...obj, astyle: astyle }
    })

    return (<div className="MyNameContainer">
        {letterinfo.map((aletterinfo) => (
            <span key={aletterinfo.id} className="ACharacterInName" style={aletterinfo.astyle}>
                {aletterinfo.letter}
            </span>
        ))}
    </div>)
}

export default MyName