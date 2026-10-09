import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { Team } from '../components/Team';
import { Footer } from '../components/Footer';

export function Entrada() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Team />
      </main>
      <Footer />
    </>
  );
}
