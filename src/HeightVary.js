import React from "react";


const HeightVary = (props) => {
    let y = props.scrollY
    let height = props.height
    let section = props.section
    let text = props.text
    let style = {}

    let Scroll = require('react-scroll');
    let scroll = Scroll.animateScroll;

    if (y > ((section - 1.5) * height) && y < ((section - 0.5) * height)) {
        style = {border: "3px solid rgba( 255, 255, 255, 0.18 )", cursor: "pointer"}
    } else {
        style = {cursor: "pointer"}
    }

    const scrollToNext = () => {
        scroll.scrollTo( height * (section - 1));
    }

    return (<div className="GlassCard" style = {style} onClick={scrollToNext}>
        {text}
    </div>)
}

export default HeightVary