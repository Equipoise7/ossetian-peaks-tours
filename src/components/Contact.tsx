import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MessageCircle, Send, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const phoneNumber = "+79991234567"; // Replace with actual number

  return (
    <section className="py-20 bg-gradient-hero text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Свяжитесь с нами
        </h2>
        <p className="text-center text-white/90 mb-12 max-w-2xl mx-auto">
          Готовы ответить на все ваши вопросы и помочь организовать незабываемое путешествие
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {/* Contact Cards */}
          <Card className="bg-white/10 backdrop-blur border-white/20 hover:bg-white/15 transition-all duration-300 animate-fade-in-scale">
            <CardContent className="p-6 text-center">
              <div className="mb-4 inline-block p-3 bg-white/20 rounded-full">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Телефон</h3>
              <a 
                href={`tel:${phoneNumber}`}
                className="text-lg hover:text-accent transition-colors"
              >
                {phoneNumber}
              </a>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur border-white/20 hover:bg-white/15 transition-all duration-300 animate-fade-in-scale" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6 text-center">
              <div className="mb-4 inline-block p-3 bg-white/20 rounded-full">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Регион</h3>
              <p className="text-white/90">
                Северная Осетия-Алания
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur border-white/20 hover:bg-white/15 transition-all duration-300 animate-fade-in-scale" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6 text-center">
              <div className="mb-4 inline-block p-3 bg-white/20 rounded-full">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Режим работы</h3>
              <p className="text-white/90">
                Ежедневно, 24/7
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button 
            variant="hero" 
            size="lg"
            className="gap-2"
            asChild
          >
            <a href={`tel:${phoneNumber}`}>
              <Phone className="w-5 h-5" />
              Позвонить сейчас
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
      </div>
    </section>
  );
};

export default Contact;
