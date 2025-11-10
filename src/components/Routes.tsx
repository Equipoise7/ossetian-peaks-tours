import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, TrendingUp, Phone } from "lucide-react";
import tseyGorge from "@/assets/tsey-gorge.jpg";
import fiagdonGorge from "@/assets/fiagdon-gorge.jpg";
import karmadonGorge from "@/assets/karmadon-gorge.jpg";
import dargavsGorge from "@/assets/dargavs-gorge.jpg";

const Routes = () => {
  const phoneNumber = "+79991234567";
  
  const routes = [
    {
      id: 1,
      name: "Цейское ущелье",
      nameEn: "Tsey Gorge",
      image: tseyGorge,
      description: "Жемчужина Северной Осетии с живописными альпийскими лугами, ледниками и горными вершинами. Идеально для любителей природы и горных походов.",
      duration: "Полный день (8-10 часов)",
      difficulty: "Средняя",
      highlights: ["Ледник Сказский", "Святилище Реком", "Альпийские луга", "Канатная дорога"],
      difficultyColor: "bg-accent"
    },
    {
      id: 2,
      name: "Фиагдонское ущелье",
      nameEn: "Fiagdon Gorge",
      image: fiagdonGorge,
      description: "Историческое ущелье с древними осетинскими башнями и средневековыми крепостями. Погружение в историю и культуру горного народа.",
      duration: "4-6 часов",
      difficulty: "Легкая",
      highlights: ["Аланский монастырь", "Древние башни", "Смотровые площадки", "Горная дорога"],
      difficultyColor: "bg-success"
    },
    {
      id: 3,
      name: "Кармадонское ущелье",
      nameEn: "Karmadon Gorge",
      image: karmadonGorge,
      description: "Дикое и величественное ущелье с бирюзовой рекой, ледниками и отвесными скалами. Для тех, кто ищет нетронутую природу и захватывающие виды.",
      duration: "6-8 часов",
      difficulty: "Средняя",
      highlights: ["Ледник Колка", "Термальные источники", "Горная река", "Девственная природа"],
      difficultyColor: "bg-accent"
    },
    {
      id: 4,
      name: "Даргавс - Город мёртвых",
      nameEn: "Dargavs - City of the Dead",
      image: dargavsGorge,
      description: "Мистическое место с древними склепами на склоне горы. Уникальный памятник культуры и истории, окутанный легендами и преданиями.",
      duration: "3-5 часов",
      difficulty: "Легкая",
      highlights: ["Древние склепы", "Историческое место", "Панорамные виды", "Культурное наследие"],
      difficultyColor: "bg-success"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Популярные маршруты
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Откройте для себя самые захватывающие ущелья Северной Осетии с профессиональным гидом
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {routes.map((route, index) => (
            <Card 
              key={route.id}
              className="group overflow-hidden border-none shadow-medium hover:shadow-strong transition-all duration-500 hover:scale-[1.02] animate-fade-in-scale bg-card"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={route.image}
                  alt={`${route.name} - ${route.nameEn}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-overlay opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                
                {/* Difficulty Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className={`${route.difficultyColor} text-white font-semibold px-4 py-2`}>
                    {route.difficulty}
                  </Badge>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-3xl font-bold text-white mb-1">
                    {route.name}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {route.nameEn}
                  </p>
                </div>
              </div>

              <CardContent className="p-6">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {route.description}
                </p>

                {/* Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <Clock className="w-5 h-5 text-primary mr-3" />
                    <span className="font-medium text-foreground">{route.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <TrendingUp className="w-5 h-5 text-primary mr-3" />
                    <span className="font-medium text-foreground">Сложность: {route.difficulty}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    Основные достопримечательности:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {route.highlights.map((highlight, idx) => (
                      <Badge 
                        key={idx} 
                        variant="secondary"
                        className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Button 
                  variant="hero" 
                  className="w-full gap-2 shadow-glow"
                  asChild
                >
                  <a href={`tel:${phoneNumber}`}>
                    <Phone className="w-4 h-4" />
                    Забронировать тур
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Не нашли подходящий маршрут? Мы создадим индивидуальную программу специально для вас!
          </p>
          <Button 
            variant="contact" 
            size="lg"
            className="shadow-medium hover:shadow-glow"
            asChild
          >
            <a href={`tel:${phoneNumber}`}>
              <Phone className="w-5 h-5" />
              Связаться с нами
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Routes;
