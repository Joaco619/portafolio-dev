import { LanguageProvider } from './i18n/LanguageContext';
import { UnderwaterBackground } from './components/UnderwaterBackground';
import Contacto from './components/Contacto';
import Experiencia from './components/Experiencia';
import Footer from './components/Footer';
import Habilidades from './components/Habilidades';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Proyectos from './components/Proyectos';
import SobreMi from './components/SobreMi';

function App() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen text-[var(--color-text-primary)]">
        <UnderwaterBackground />
        <Navbar />
        <main>
          <Hero />
          <SobreMi />
          <Proyectos />
          <Habilidades />
          <Experiencia />
          <Contacto />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;