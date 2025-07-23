import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import TicketModal from "@/components/TicketModal";

const Index = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedConcert, setSelectedConcert] = useState(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  const concerts = [
    {
      id: 1,
      date: "15 августа 2025",
      venue: "Aurora Concert Hall",
      city: "Москва",
      price: "3500₽",
      status: "available",
      ticketsLeft: 45,
      totalTickets: 1200,
      description: "Презентация нового альбома 'Neon Dreams'"
    },
    {
      id: 2,
      date: "28 августа 2025", 
      venue: "A2 Green Concert",
      city: "Санкт-Петербург",
      price: "3200₽",
      status: "available",
      ticketsLeft: 156,
      totalTickets: 2000,
      description: "Акустический сет + полный электрический концерт"
    },
    {
      id: 3,
      date: "12 сентября 2025",
      venue: "Red Club",
      city: "Екатеринбург",
      price: "2800₽",
      status: "available",
      ticketsLeft: 89,
      totalTickets: 800,
      description: "Тур 'Новая Волна' - эксклюзивные треки"
    },
    {
      id: 4,
      date: "25 сентября 2025",
      venue: "Stadium Live",
      city: "Казань",
      price: "3000₽",
      status: "available",
      ticketsLeft: 234,
      totalTickets: 1500,
      description: "Специальные гости + световое шоу"
    },
    {
      id: 5,
      date: "8 октября 2025",
      venue: "Известия Hall",
      city: "Москва",
      price: "4500₽",
      status: "hot",
      ticketsLeft: 12,
      totalTickets: 2500,
      description: "Большой концерт в столице - последние билеты!"
    },
    {
      id: 6,
      date: "22 октября 2025",
      venue: "Crocus City Hall",
      city: "Москва",
      price: "5000₽",
      status: "sold-out",
      ticketsLeft: 0,
      totalTickets: 6000,
      description: "Финальный концерт тура - РАСПРОДАНО!"
    }
  ];

  const tracks = [
    { 
      id: 1, 
      title: "Heavy Thunder", 
      duration: "4:32",
      yandexUrl: "https://music.yandex.ru/artist/2184411"
    },
    { 
      id: 2, 
      title: "Electric Storm", 
      duration: "3:48",
      yandexUrl: "https://music.yandex.ru/artist/2184411"
    },
    { 
      id: 3, 
      title: "Metal Heart", 
      duration: "5:12",
      yandexUrl: "https://music.yandex.ru/artist/2184411"
    },
    { 
      id: 4, 
      title: "Neon Nights", 
      duration: "4:05",
      yandexUrl: "https://music.yandex.ru/artist/2184411"
    }
  ];

  const gallery = [
    "/img/9cfc3da3-fb48-4fb1-9792-27dcb4bfbd03.jpg",
    "/img/12188bd8-a06e-4b32-a7d2-bf05b5a188cb.jpg"
  ];

  const playTrack = (track: any) => {
    // Открываем Яндекс.Музыку в новой вкладке
    window.open(track.yandexUrl, '_blank');
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const openTicketModal = (concert: any) => {
    setSelectedConcert(concert);
    setIsTicketModalOpen(true);
  };

  const closeTicketModal = () => {
    setIsTicketModalOpen(false);
    setSelectedConcert(null);
  };

  return (
    <div className="min-h-screen bg-deep-black text-white font-open-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-deep-black/90 backdrop-blur-sm z-50 border-b border-electric-red/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-3xl font-oswald font-bold text-electric-red">
              TONY TYLER
            </div>
            <div className="hidden md:flex space-x-8">
              {["Главная", "О группе", "Концерты", "Музыка", "Фото", "Контакты"].map((item) => (
                <a key={item} href="#" className="hover:text-electric-red transition-colors duration-300">
                  {item}
                </a>
              ))}
            </div>
            <Button 
              onClick={() => document.getElementById('concerts-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-electric-red hover:bg-electric-red/90 text-deep-black font-semibold"
            >
              Купить билеты
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('/img/9cfc3da3-fb48-4fb1-9792-27dcb4bfbd03.jpg')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-black/60 via-transparent to-deep-black" />
        
        <div className="relative text-center z-10 animate-fade-in">
          <h1 className="text-7xl md:text-9xl font-oswald font-bold mb-6 text-white">
            TONY TYLER
          </h1>
          <p className="text-2xl md:text-3xl mb-8 text-electric-red font-oswald">
            НОВАЯ ВОЛНА АЛЬТЕРНАТИВНОГО РОКА
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-electric-red hover:bg-electric-red/90 text-deep-black font-semibold text-lg px-8 py-4 animate-pulse-glow">
              <Icon name="Play" size={20} className="mr-2" />
              Послушать музыку
            </Button>
            <Button 
              onClick={() => document.getElementById('concerts-section')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg" 
              variant="outline" 
              className="border-electric-red text-electric-red hover:bg-electric-red hover:text-deep-black text-lg px-8 py-4"
            >
              <Icon name="Calendar" size={20} className="mr-2" />
              Концерты
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-oswald font-bold mb-6 text-electric-red">
                О группе
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                TONY TYLER — это взрывоопасная смесь классического хэви-метала и современного звучания. 
                Группа была основана в 2018 году и за короткое время завоевала сердца тысяч поклонников 
                тяжелой музыки по всей стране.
              </p>
              <p className="text-lg leading-relaxed mb-8">
                Наша музыка — это мощные риффы, проникновенные тексты и энергия, которая заставляет 
                стадионы содрогаться от аплодисментов.
              </p>
              <div className="flex gap-4">
                <Badge variant="secondary" className="bg-rock-gray text-white text-sm px-3 py-1">
                  Heavy Metal
                </Badge>
                <Badge variant="secondary" className="bg-rock-gray text-white text-sm px-3 py-1">
                  Hard Rock
                </Badge>
                <Badge variant="secondary" className="bg-rock-gray text-white text-sm px-3 py-1">
                  Alternative
                </Badge>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/img/12188bd8-a06e-4b32-a7d2-bf05b5a188cb.jpg"
                alt="TONY TYLER band"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section id="concerts-section" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="concerts" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-rock-gray/50 mb-12">
              <TabsTrigger value="concerts" className="data-[state=active]:bg-electric-red data-[state=active]:text-deep-black">
                <Icon name="Calendar" size={20} className="mr-2" />
                Концерты
              </TabsTrigger>
              <TabsTrigger value="music" className="data-[state=active]:bg-electric-red data-[state=active]:text-deep-black">
                <Icon name="Music" size={20} className="mr-2" />
                Музыка
              </TabsTrigger>
              <TabsTrigger value="gallery" className="data-[state=active]:bg-electric-red data-[state=active]:text-deep-black">
                <Icon name="Camera" size={20} className="mr-2" />
                Фото
              </TabsTrigger>
            </TabsList>

            {/* Concerts Tab */}
            <TabsContent value="concerts" className="space-y-6">
              <h2 className="text-4xl font-oswald font-bold text-electric-red mb-8">
                Предстоящие концерты
              </h2>
              <div className="grid gap-6">
                {concerts.map((concert) => (
                  <Card key={concert.id} className="bg-rock-gray/30 border-rock-gray hover:bg-rock-gray/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <Icon name="Calendar" size={24} className="text-electric-red" />
                            <h3 className="text-2xl font-oswald font-semibold">{concert.date}</h3>
                          </div>
                          <div className="flex items-center gap-4 mb-2">
                            <Icon name="MapPin" size={20} className="text-electric-red" />
                            <span className="text-lg">{concert.venue}, {concert.city}</span>
                          </div>
                          <div className="flex items-center gap-4 mb-3">
                            <Icon name="DollarSign" size={20} className="text-electric-red" />
                            <span className="text-lg font-semibold">{concert.price}</span>
                          </div>
                          <p className="text-gray-400 text-sm pl-6">{concert.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="mb-3 text-sm">
                            {concert.status === 'available' && (
                              <p className="text-gray-300">
                                Осталось: <span className="text-electric-red font-semibold">{concert.ticketsLeft}</span> из {concert.totalTickets}
                              </p>
                            )}
                            {concert.status === 'hot' && (
                              <p className="text-orange-400 font-semibold animate-pulse">
                                🔥 Горячая продажа! Осталось: {concert.ticketsLeft}
                              </p>
                            )}
                            {concert.status === 'sold-out' && (
                              <p className="text-gray-500">Все {concert.totalTickets} билетов распроданы</p>
                            )}
                          </div>
                          
                          {concert.status === 'available' ? (
                            <Button 
                              onClick={() => openTicketModal(concert)}
                              className="bg-electric-red hover:bg-electric-red/90 text-deep-black font-semibold"
                            >
                              <Icon name="Ticket" size={16} className="mr-2" />
                              Купить билет
                            </Button>
                          ) : concert.status === 'hot' ? (
                            <Button 
                              onClick={() => openTicketModal(concert)}
                              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold animate-pulse"
                            >
                              <Icon name="Flame" size={16} className="mr-2" />
                              Последние билеты!
                            </Button>
                          ) : (
                            <Button variant="secondary" disabled className="bg-rock-gray text-gray-400">
                              <Icon name="X" size={16} className="mr-2" />
                              Распродано
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Music Tab */}
            <TabsContent value="music" className="space-y-6">
              <h2 className="text-4xl font-oswald font-bold text-electric-red mb-8">
                Наша музыка
              </h2>
              <div className="grid gap-4">
                {tracks.map((track) => (
                  <Card key={track.id} className="bg-rock-gray/30 border-rock-gray hover:bg-rock-gray/50 transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-electric-red text-electric-red hover:bg-electric-red hover:text-deep-black"
                            onClick={() => playTrack(track)}
                          >
                            <Icon name={currentTrack?.id === track.id && isPlaying ? "Pause" : "Play"} size={16} />
                          </Button>
                          <div>
                            <h4 className="font-semibold text-lg">{track.title}</h4>
                            <p className="text-gray-400 flex items-center gap-2">
                              {track.duration}
                              <span className="text-xs bg-electric-red text-deep-black px-2 py-0.5 rounded-full font-medium">
                                Слушать на Яндекс.Музыке
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-electric-red text-electric-red hover:bg-electric-red hover:text-deep-black"
                            onClick={() => window.open(track.yandexUrl, '_blank')}
                          >
                            <Icon name="ExternalLink" size={14} className="mr-1" />
                            Открыть
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Яндекс.Музыка Integration Section */}
              <Card className="bg-gradient-to-r from-electric-red/20 to-orange-500/20 border-electric-red mt-8">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-oswald font-bold text-electric-red mb-2">
                        🎵 Слушайте TONY TYLER на Яндекс.Музыке
                      </h3>
                      <p className="text-gray-300 mb-4">
                        Полный каталог наших треков, альбомы и эксклюзивные записи
                      </p>
                      <div className="flex items-center gap-4">
                        <Button 
                          size="lg"
                          className="bg-electric-red hover:bg-electric-red/90 text-deep-black font-semibold"
                          onClick={() => window.open('https://music.yandex.ru/artist/2184411', '_blank')}
                        >
                          <Icon name="Music" size={20} className="mr-2" />
                          Перейти к исполнителю
                        </Button>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Icon name="Users" size={16} className="text-electric-red" />
                          <span>2.1K подписчиков</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-6xl">🎧</div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Audio Player */}
              {currentTrack && (
                <Card className="bg-electric-red/10 border-electric-red">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-electric-red text-electric-red">
                            <Icon name="SkipBack" size={16} />
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-electric-red text-deep-black"
                            onClick={() => setIsPlaying(!isPlaying)}
                          >
                            <Icon name={isPlaying ? "Pause" : "Play"} size={16} />
                          </Button>
                          <Button size="sm" variant="outline" className="border-electric-red text-electric-red">
                            <Icon name="SkipForward" size={16} />
                          </Button>
                        </div>
                        <div>
                          <h4 className="font-semibold">{currentTrack.title}</h4>
                          <p className="text-sm text-gray-400">Сейчас играет</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Icon name="Volume2" size={20} className="text-electric-red" />
                        <div className="w-24 h-2 bg-rock-gray rounded-full">
                          <div className="w-3/4 h-full bg-electric-red rounded-full" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery" className="space-y-6">
              <h2 className="text-4xl font-oswald font-bold text-electric-red mb-8">
                Фотографии
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.map((image, index) => (
                  <div key={index} className="relative group overflow-hidden rounded-lg">
                    <img 
                      src={image}
                      alt={`TONY TYLER photo ${index + 1}`}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-electric-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button size="sm" className="bg-electric-red text-deep-black">
                        <Icon name="Expand" size={16} className="mr-2" />
                        Увеличить
                      </Button>
                    </div>
                  </div>
                ))}
                
                {/* Add more placeholder images */}
                {[1,2,3,4].map((index) => (
                  <div key={`placeholder-${index}`} className="relative group overflow-hidden rounded-lg bg-rock-gray/30">
                    <div className="w-full h-64 flex items-center justify-center">
                      <Icon name="Camera" size={48} className="text-electric-red opacity-50" />
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <p className="text-sm text-gray-400">Скоро новые фото</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 bg-rock-gray/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-oswald font-bold text-electric-red mb-8">
            Связаться с нами
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Icon name="Mail" size={32} className="text-electric-red mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Email</h4>
              <p className="text-gray-400">booking@tonytyler.ru</p>
            </div>
            <div className="text-center">
              <Icon name="Phone" size={32} className="text-electric-red mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Телефон</h4>
              <p className="text-gray-400">+7 (495) 123-45-67</p>
            </div>
            <div className="text-center">
              <Icon name="Instagram" size={32} className="text-electric-red mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Instagram</h4>
              <p className="text-gray-400">@tonytylerband</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-deep-black border-t border-electric-red/20">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <p className="text-gray-400">© 2024 TONY TYLER. Все права защищены.</p>
          <div className="flex space-x-6">
            {['Facebook', 'Instagram', 'Youtube'].map((social) => (
              <a key={social} href="#" className="text-gray-400 hover:text-electric-red transition-colors">
                <Icon name={social as any} size={20} />
              </a>
            ))}
          </div>
        </div>
      </footer>
      
      {/* Ticket Modal */}
      {selectedConcert && (
        <TicketModal 
          concert={selectedConcert}
          isOpen={isTicketModalOpen}
          onClose={closeTicketModal}
        />
      )}
    </div>
  );
};

export default Index;