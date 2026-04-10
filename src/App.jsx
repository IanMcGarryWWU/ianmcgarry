import './App.css';
import { useRef, useCallback, useEffect } from 'react';
import useScrollPosition from './hooks/useScrollPosition';
import useDimensions from './hooks/useDimensions';
import MyName from './myname';
import HeightVary from './HeightVary';
import Particles from './components/Particles';
import SankeyChart from './components/SankeyChart';

const ARROW_PATH = 'M 50.270833,47.624999 97.895832,2.6458333 50.270833,29.104166 2.6458333,2.6458333 Z';
const ARROW_SPEED = 4;
const FADE_SPEED = 0.01;

const App = () => {
  const scrollY = useScrollPosition();
  const { observe, height, width } = useDimensions();

  // DOM refs for elements animated at 60fps (bypasses React re-renders)
  const heroRef = useRef(null);
  const overlay1Ref = useRef(null);
  const overlay2Ref = useRef(null);
  const arrowRef = useRef(null);

  // Fade-in section refs
  const about1Ref = useRef(null);
  const about2Ref = useRef(null);
  const about3Ref = useRef(null);
  const exp1Ref = useRef(null);
  const exp2Ref = useRef(null);

  // Animation state (mutated in rAF, never triggers renders)
  const animState = useRef({
    count: 0,
    arrowY: -200,
    fadeOpacities: [0, 0, 0, 0, 0],
  });

  // 60fps animation loop — direct DOM updates, zero React re-renders
  useEffect(() => {
    let rafId;

    const getxy = (period, count, radius, phase) => {
      const radialpos = ((count % period) * 2 * Math.PI) / period + 2 * Math.PI * phase;
      const x = Math.round(Math.cos(radialpos) * radius + 50) + '%';
      const y = Math.round(Math.sin(radialpos) * radius + 50) + '%';
      return x + ' ' + y;
    };

    const fadeTo = (index, visible) => {
      const o = animState.current.fadeOpacities;
      if (visible) {
        o[index] = Math.min(o[index] + FADE_SPEED, 0.999);
      } else {
        o[index] = Math.max(o[index] - FADE_SPEED, 0);
      }
      return o[index];
    };

    const tick = () => {
      const state = animState.current;
      state.count += 1 / 6;
      const count = state.count;
      const sy = scrollY;
      const h = height;

      // --- Gradient backgrounds ---
      if (heroRef.current) {
        heroRef.current.style.background = `radial-gradient(circle at ${getxy(712, count, 50, 0)}, rgba(2,0,36,1) 0%, rgba(40,40,131,1) 50%, rgba(0,212,255,1) 100%)`;
      }
      if (overlay1Ref.current) {
        overlay1Ref.current.style.background = `radial-gradient(circle at ${getxy(252, count, 25, 0.3)}, rgba(2,0,36,1) 0%, rgba(40,131,40,1) 50%, rgba(0,212,255,1) 100%)`;
      }
      if (overlay2Ref.current) {
        overlay2Ref.current.style.background = `radial-gradient(circle at ${getxy(480, count, 38, 0.8)}, rgba(2,0,36,1) 0%, rgba(131,78,78,1) 50%, rgba(0,212,255,1) 100%)`;
      }

      // --- Arrow ---
      if (arrowRef.current && h > 0) {
        // Ease toward scroll position
        if (sy <= 2.5 * h) {
          if (state.arrowY > sy) {
            state.arrowY -= ((state.arrowY - sy) * ARROW_SPEED) / 50;
          } else if (state.arrowY < sy) {
            state.arrowY += ((sy - state.arrowY) * ARROW_SPEED) / 50;
          }
        }

        let opacity = Math.min((50 / Math.max(Math.abs(sy - state.arrowY), 1)) ** 2, 1) * 0.34;
        let cycle = 0;
        if (opacity === 0.34) {
          cycle = Math.sin(((count % 356) / 18) * 2 * Math.PI) * 10;
        }

        arrowRef.current.style.top = (window.innerHeight * 0.93) + 'px';
        arrowRef.current.style.transform = `translate(0px, ${state.arrowY + cycle}px)`;
        arrowRef.current.style.opacity = opacity;
      }

      // --- Section fade-ins ---
      const isInRange = (start, end) => sy >= start * h && sy <= end * h;
      const fadeTargets = [
        { ref: about1Ref, visible: isInRange(0.2, 1.2) },
        { ref: about2Ref, visible: isInRange(0.4, 1.4) },
        { ref: about3Ref, visible: isInRange(0.6, 1.6) },
        { ref: exp1Ref,   visible: isInRange(1.2, 2.2) },
        { ref: exp2Ref,   visible: isInRange(1.4, 2.4) },
      ];

      fadeTargets.forEach(({ ref, visible }, i) => {
        if (ref.current) {
          ref.current.style.opacity = fadeTo(i, visible);
        }
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [scrollY, height]);

  const scrollTo = useCallback((sectionIndex) => {
    window.scrollTo({ top: height * sectionIndex, behavior: 'smooth' });
  }, [height]);

  const scrollToNext = useCallback(() => {
    if (height <= 0) return;
    const nextSection = Math.floor(scrollY / height) + 1;
    window.scrollTo({ top: nextSection * height, behavior: 'smooth' });
  }, [scrollY, height]);

  // Merge observe ref with heroRef
  const heroCallback = useCallback((node) => {
    heroRef.current = node;
    observe(node);
  }, [observe]);

  return (
    <>
      {/* Navigation */}
      <nav className="SuperHeader" aria-label="Main navigation">
        <div className="Header">
          <div className="HeaderItem">
            <HeightVary text="About" scrollY={scrollY} height={height} section={2} onClick={() => scrollTo(1)} />
          </div>
          <div className="HeaderItem">
            <HeightVary text="Experience" scrollY={scrollY} height={height} section={3} onClick={() => scrollTo(2)} />
          </div>
          <div className="HeaderItem">
            <HeightVary text="Skills" scrollY={scrollY} height={height} section={4} onClick={() => scrollTo(3)} />
          </div>
          <div className="HeaderItem">
            <HeightVary text="Contact" scrollY={scrollY} height={height} section={5} onClick={() => scrollTo(4)} />
          </div>
        </div>
      </nav>

      {/* Scroll arrow */}
      <div className="ArrowPlacer" ref={arrowRef}>
        <svg height={100} width={100} onClick={scrollToNext} className="Arrow" aria-label="Scroll down">
          <path d={ARROW_PATH} style={{ fill: '#FFFFFF', stroke: '#FFFFFF', strokeWidth: '0.264583px', strokeLinecap: 'butt', strokeLinejoin: 'miter' }} />
        </svg>
      </div>

      {/* Hero Section */}
      <section className="App" ref={heroCallback} aria-label="Hero">
        <div className="AppOverlay" ref={overlay1Ref} />
        <div className="AppOverlay" ref={overlay2Ref} />
        <div className="Middle">
          <div />
          <div>
            <MyName scrollY={scrollY} />
          </div>
          <div className="Subtitle">
            Senior Software Engineer &nbsp;|&nbsp; AI Researcher &nbsp;|&nbsp; LLM Orchestration Architect
          </div>
          <div />
        </div>
      </section>

      {/* About Section */}
      <section className="AboutMe" aria-label="About me">
        <div className="ParticlesContainer">
          <Particles />
        </div>
        <div className="AboutContent">
          <div className="AboutMeText GlassCard" ref={about1Ref} style={{ opacity: 0 }}>
            Software architect and AI researcher specializing in neuro-symbolic LLM orchestration
            and narrative AI. Combining decades of full-stack, enterprise-grade data engineering
            with cutting-edge academic research on mitigating LLM mode collapse.
          </div>
          <div className="GlassCardVert AboutMeText" ref={about2Ref} style={{ opacity: 0 }}>
            <div className="AboutMeList">
              <strong>MSc Artificial Intelligence</strong> &mdash; Liverpool University (Graduating June 2026)
            </div>
            <div className="AboutMeList">
              Designed a neuro-symbolic framework (The Narrative Motif Engine) to mitigate
              homogenization in LLM narrative generation using creativity bootstrapping.
            </div>
            <div className="AboutMeList">
              Engineered structured prompting pipelines to extract 9,700 narrative motifs,
              expanded to 106,700 high-dimensional embeddings via a novel Semiotic Deconvolution Network.
            </div>
          </div>
          <div className="AboutMeText GlassCard" ref={about3Ref} style={{ opacity: 0 }}>
            I specialize in the intersection of theory and production &mdash; designing novel semantic
            blurring algorithms and building the event-driven Python architectures, vector databases,
            and UI layers required to deploy them at scale.
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="Experience" aria-label="Professional experience">
        <div className="ExperienceContent">
          <div className="AboutMeText GlassCard" ref={exp1Ref} style={{ opacity: 0 }}>
            <h2 className="SectionTitle">Business Solutions Developer</h2>
            <p className="ExperienceSubtitle">Wales and West Utilities &mdash; 2010 to Present &mdash; Remote</p>
            <p>
              A role created specifically for me to bridge complex data integration challenges
              and enterprise-wide architectural solutions.
            </p>
          </div>
          <div className="GlassCardVert AboutMeText" ref={exp2Ref} style={{ opacity: 0 }}>
            <div className="AboutMeList">
              Architected a dynamic, event-driven orchestration layer in Python for Microsoft Fabric
              and SQL Server, automating workflows across the entire data estate.
            </div>
            <div className="AboutMeList">
              Developed a commercial optimization model identifying the best program of works
              for &pound;500 million of gas network investment.
            </div>
            <div className="AboutMeList">
              Created a custom JavaScript web application framework with integrated spatial/GIS mapping,
              powering enterprise management information delivery across the business.
            </div>
            <div className="AboutMeList">
              Instrumental in the transition from traditional SQL Server to Microsoft Fabric cloud,
              architecting the migration strategy and data pipelines.
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="Skills" aria-label="Technical skills">
        <SankeyChart
          width={Math.max(320, width * 0.7)}
          height={Math.min(600, height * 0.85)}
        />
      </section>

      {/* Contact Section */}
      <section className="Contact" aria-label="Contact">
        <div>
          <div>
            <a className="SvgAnchor" href="https://www.linkedin.com/in/ian-mcgarry-tech/" aria-label="LinkedIn profile">
              <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 24 24">
                <path className="ContactSVG" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
          <div>
            <a className="SvgAnchor" href="mailto:contact@ianmcgarry.tech" aria-label="Email contact">
              <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 24 24">
                <path className="ContactSVG" d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default App;
