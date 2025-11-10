import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Vehicle from "@/components/Vehicle";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <Gallery />
      <Vehicle />
      <Contact />
      
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2024 Горные туры Северной Осетии. Все права защищены.
          </p>
          <p className="text-sm mt-2 opacity-80">
            Туры, экскурсии и трансферы по горам Кавказа
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
