import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, Send } from "lucide-react";
import heroImage from "@/assets/hero-mountains.jpg";

const Hero = () => {
  const phoneNumber = "+79991234567"; // Replace with actual number

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-overlay" />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-hero opacity-30 mix-blend-multiply" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center text-white">
        <div className="mb-4 animate-fade-in">
          <Badge className="bg-accent/90 text-white text-sm px-4 py-2 mb-6 shadow-glow backdrop-blur-sm">
            ✨ Профессиональные туры по Кавказу
          </Badge>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in leading-tight" style={{ animationDelay: '0.1s' }}>
          Горные туры по
          <span className="block bg-gradient-accent bg-clip-text text-transparent">
            Северной Осетии
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in font-light leading-relaxed" style={{ animationDelay: '0.2s' }}>
          Незабываемые экскурсии по живописным ущельям Кавказа и комфортные трансферы на премиум автомобиле
        </p>
        
        {/* Contact Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button 
            variant="hero" 
            size="lg"
            className="gap-2"
            asChild
          >
            <a href={`tel:${phoneNumber}`}>
              <Phone className="w-5 h-5" />
              Позвонить
            </a>
          </Button>
          
          <Button 
            variant="hero" 
            size="lg"
            className="gap-2"
            asChild
          >
            <a href={`https://wa.me/${phoneNumber.replace(/\+/g, '')}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </Button>
          
          <Button 
            variant="hero" 
            size="lg"
            className="gap-2"
            asChild
          >
            <a href={`https://t.me/${phoneNumber.replace(/\+/g, '')}`} target="_blank" rel="noopener noreferrer">
              <Send className="w-5 h-5" />
              Telegram
            </a>
          </Button>
        </div>

        {/* Phone Number Display */}
        <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <a 
            href={`tel:${phoneNumber}`}
            className="text-2xl font-semibold hover:text-accent transition-colors"
          >
            {phoneNumber}
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float z-10">
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
