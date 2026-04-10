import './myname.css';
import { useRef, useEffect } from 'react';

const LETTERS = [
  { id: 1, letter: 'I' },
  { id: 2, letter: 'a' },
  { id: 3, letter: 'n' },
  { id: 4, letter: '\u00A0' },
  { id: 5, letter: 'M' },
  { id: 6, letter: 'c' },
  { id: 7, letter: 'G' },
  { id: 8, letter: 'a' },
  { id: 9, letter: 'r' },
  { id: 10, letter: 'r' },
  { id: 11, letter: 'y' },
];

const RANDOMS = LETTERS.map(() => ({
  x: Math.random(),
  y: Math.random(),
  z: Math.random(),
  r: Math.random(),
}));

const FADE_DIST = 5;

const MyName = ({ scrollY }) => {
  const spanRefs = useRef([]);
  const countRef = useRef(0);
  const rafRef = useRef();

  useEffect(() => {
    const animate = (time) => {
      countRef.current += 1 / 6; // ~same rate as old deltaTime * 0.01 at 60fps

      const scroll = scrollY;
      let posinanim = countRef.current;
      if (scroll > 0) {
        posinanim = scroll > 300 ? 0 : (1 - scroll / 300) * 30;
      }

      for (let i = 0; i < LETTERS.length; i++) {
        const span = spanRefs.current[i];
        if (!span) continue;

        const start = i;
        const end = 13 + 1.7 * i;
        let modifier;

        if (posinanim < start) modifier = 0;
        else if (posinanim > end) modifier = 1;
        else modifier = (posinanim - start) / (end - start);

        const inv = 1 - modifier;
        const r = RANDOMS[i];

        span.style.opacity = modifier;
        span.style.textShadow = `-2px 2px 4px rgba(0,0,0,${modifier * 0.5}), 2px -2px 4px rgba(255,255,255,${modifier * 0.4})`;
        span.style.transform = `translate3d(${inv * FADE_DIST * (r.x * 2 - 1)}em, ${inv * FADE_DIST * (r.y * 2 - 1)}em, ${inv * FADE_DIST * (r.z * 2 - 1)}em) rotate(${inv * r.r * 500}deg)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [scrollY]);

  return (
    <div className="MyNameContainer">
      {LETTERS.map((letter, i) => (
        <span
          key={letter.id}
          className="ACharacterInName"
          ref={(el) => { spanRefs.current[i] = el; }}
          style={{ opacity: 0 }}
        >
          {letter.letter}
        </span>
      ))}
    </div>
  );
};

export default MyName;
