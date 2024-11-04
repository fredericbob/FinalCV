import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbars from '../components/Navbars';

const Home = () => {
  const titleRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
          titleRef.current,
          { opacity: 0, y: -50 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );

      // Animation pour les sections principales avec ScrollTrigger
      gsap.from(sectionsRef.current, {
        scrollTrigger: {
          trigger: sectionsRef.current,
          start: "top bottom",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3,
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
      <Container>
        <Navbars />
        <Banner>
          <h1 ref={titleRef}>Bienvenue sur notre site Gestion CV</h1>
          <p>Votre outil pour gérer vos CV efficacement</p>
        </Banner>
        <MainContent>
          {/* Section Services */}
          <Section className="animate-section" ref={el => sectionsRef.current[0] = el}>
            <h2>Nos Services</h2>
            <p>
              Loveni Consulting vous propose des solutions numériques sur-mesure pour automatiser et optimiser votre métier.
            </p>
            <h3>Pourquoi choisir Loveni Consulting ?</h3>
            <ul>
              <li><strong>Tarifs compétitifs :</strong> Grâce à notre pôle de production offshore à Madagascar, bénéficiez d'expertise à des prix attractifs.</li>
              <li><strong>Développeurs talentueux :</strong> Nos équipes maîtrisent les technologies web et mobiles.</li>
              <li><strong>Proximité géographique :</strong> Collaboration facilitée avec un faible décalage horaire entre la France et Madagascar.</li>
              <li><strong>Structure hybride :</strong> Expertise française avec production optimisée à Madagascar.</li>
            </ul>
          </Section>

          {/* Section À Propos */}
          <Section className="animate-section" ref={el => sectionsRef.current[1] = el}>
            <h2>À Propos de Loveni Consulting</h2>
            <p>
              Loveni Consulting est une ESN française avec un pôle de production à Madagascar. Nous sommes spécialisés dans le développement d'applications informatiques sur-mesure pour répondre parfaitement à vos besoins.
            </p>
            <h3>Nos engagements :</h3>
            <ul>
              <li><strong>Transparence et fiabilité :</strong> Communication claire et gestion de projet efficace.</li>
              <li><strong>Qualité des livrables :</strong> Nos applications sont développées selon les normes les plus élevées.</li>
              <li><strong>Respect des délais :</strong> Nous respectons les délais convenus ensemble.</li>
            </ul>
            <p>
              Contactez-nous :
              <ul>
                <li>Email : loveniconsulting@gmail.com</li>
                <li>Téléphone : +33 6 83 76 57 54</li>
              </ul>
            </p>
          </Section>
        </MainContent>
      </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Banner = styled.div`
  background-color: #333;
  color: #fff;
  padding: 60px 20px;
  text-align: center;

  h1 {
    font-size: 2.5em;
    margin: 0;
  }

  p {
    font-size: 1.2em;
    margin-top: 10px;
  }
`;

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

const Section = styled.div`
  flex: 1;
  margin-right: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 20px;
    color: #333;
    font-size: 1.8em;
  }

  h3 {
    margin-bottom: 10px;
    color: #555;
    font-size: 1.4em;
  }

  ul {
    list-style-type: disc;
    margin-left: 20px;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 20px;
    line-height: 1.6;
    color: #666;
  }

  strong {
    color: #000;
  }
`;

export default Home;
