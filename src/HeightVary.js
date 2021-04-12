import React from "react";
import * as Scroll from 'react-scroll';

const HeightVary = (props) => {
    let y = props.scrollY
    let height = props.height
    let section = props.section
    let text = props.text
    let style = {}

    let scroll = Scroll.animateScroll;

    if (y > ((section - 1.5) * height) && y < ((section - 0.5) * height)) {
        style = {border: "3px solid rgba( 255, 255, 255, 0.18 )", cursor: "pointer", height: "48", background: "rgba( 255, 255, 255, 0.356 )"}
    } else {
        style = {cursor: "pointer", height: "48%"}
    }

    const scrollToNext = () => {
        scroll.scrollTo( height * (section - 1));
    }

    return (<div className="GlassCard" style = {style} onClick={scrollToNext}>
        {text}
    </div>)
}

export default HeightVary