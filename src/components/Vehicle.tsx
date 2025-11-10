import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import alphard from "@/assets/toyota-alphard.jpg";

const Vehicle = () => {
  const features = [
    "Премиум комфорт для 6-7 пассажиров",
    "Кожаный салон и климат-контроль",
    "Просторный багажник",
    "Система безопасности",
    "Регулярное техобслуживание",
    "Идеальная чистота"
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
          Наш автомобиль
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Toyota Alphard - эталон комфорта для ваших путешествий
        </p>

        <div className="max-w-6xl mx-auto">
          <Card className="border-none shadow-strong overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-[400px] md:h-auto">
                <img
                  src={alphard}
                  alt="Toyota Alphard - премиум минивэн для трансферов"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-3xl font-bold mb-4 text-foreground">
                  Toyota Alphard
                </h3>
                <p className="text-muted-foreground mb-8">
                  Путешествуйте с максимальным комфортом на одном из лучших минивэнов премиум-класса. Идеален для семейных поездок, деловых встреч и трансферов в аэропорт.
                </p>

                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li 
                      key={index} 
                      className="flex items-center text-foreground animate-slide-in-right"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="mr-3 p-1 bg-primary/10 rounded-full">
                        <Check className="w-5 h-5 text-primary" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Vehicle;
