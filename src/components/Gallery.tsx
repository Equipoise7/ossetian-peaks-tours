import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import route1 from "@/assets/route-1.jpg";
import route2 from "@/assets/route-2.jpg";
import route3 from "@/assets/route-3.jpg";

const Gallery = () => {
  const images = [
    { src: route1, title: "Горное ущелье с панорамной дорогой", alt: "Живописная горная дорога в ущелье" },
    { src: route2, title: "Альпийский водопад", alt: "Водопад в горах Кавказа" },
    { src: route3, title: "Снежные вершины на закате", alt: "Панорама заснеженных вершин" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
          Популярные маршруты
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Откройте для себя самые красивые места Северной Осетии
        </p>

        <div className="relative max-w-5xl mx-auto">
          {/* Main Image */}
          <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-strong">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-overlay p-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {image.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-medium"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-medium"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary w-8' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
