import { Card, CardContent } from "@/components/ui/card";
import { Mountain, Car } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Mountain,
      title: "Горные туры и экскурсии",
      description: "Откройте для себя красоту Кавказских гор. Индивидуальные и групповые туры по живописным ущельям, к древним башням и горным водопадам.",
      features: [
        "Профессиональные гиды",
        "Безопасные маршруты",
        "Фотосессии в горах",
        "Гибкий график"
      ]
    },
    {
      icon: Car,
      title: "Трансфер и перевозки",
      description: "Комфортабельные пассажирские перевозки между городами на премиум автомобиле Toyota Alphard. Надежно, удобно, вовремя.",
      features: [
        "Toyota Alphard премиум-класса",
        "Межгород и аэропорт",
        "Опытный водитель",
        "Чистота и комфорт"
      ]
    }
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
          Наши услуги
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Профессиональный подход к каждому клиенту
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="border-none shadow-soft hover:shadow-strong transition-all duration-300 hover:scale-105 animate-fade-in-scale"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8">
                <div className="mb-6 inline-block p-4 bg-primary/10 rounded-lg">
                  <service.icon className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-foreground">
                      <span className="w-2 h-2 bg-accent rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
