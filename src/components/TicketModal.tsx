import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

interface Concert {
  id: number;
  date: string;
  venue: string;
  city: string;
  price: string;
  status: string;
  ticketsLeft: number;
  totalTickets: number;
  description: string;
}

interface TicketModalProps {
  concert: Concert;
  isOpen: boolean;
  onClose: () => void;
}

const TicketModal = ({ concert, isOpen, onClose }: TicketModalProps) => {
  const [ticketCount, setTicketCount] = useState(1);
  const [buyerInfo, setBuyerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    specialRequests: ""
  });
  const [step, setStep] = useState(1); // 1: выбор билетов, 2: данные покупателя, 3: оплата

  if (!isOpen) return null;

  const handleTicketCountChange = (value: string) => {
    const count = parseInt(value);
    if (count >= 1 && count <= Math.min(8, concert.ticketsLeft)) {
      setTicketCount(count);
    }
  };

  const totalPrice = parseInt(concert.price.replace('₽', '')) * ticketCount;

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePurchase = () => {
    // В реальном приложении здесь будет интеграция с платежной системой
    alert(`Спасибо за покупку! Вы купили ${ticketCount} билетов на сумму ${totalPrice}₽. Билеты отправлены на email: ${buyerInfo.email}`);
    onClose();
    setStep(1);
    setBuyerInfo({ name: "", email: "", phone: "", specialRequests: "" });
    setTicketCount(1);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-deep-black border-electric-red text-white">
        <CardHeader className="border-b border-electric-red/20">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-oswald text-electric-red">
                Покупка билетов
              </CardTitle>
              <CardDescription className="text-gray-300 mt-2">
                {concert.date} • {concert.venue}, {concert.city}
              </CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <Icon name="X" size={24} />
            </Button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center mt-6 space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold
                  ${step >= stepNumber ? 'bg-electric-red text-deep-black' : 'bg-rock-gray text-gray-400'}
                `}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-12 h-0.5 mx-2 ${step > stepNumber ? 'bg-electric-red' : 'bg-rock-gray'}`} />
                )}
              </div>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Шаг 1: Выбор билетов */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-rock-gray/30 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{concert.description}</h3>
                <div className="flex justify-between items-center">
                  <span>Цена за билет:</span>
                  <span className="text-electric-red font-bold text-xl">{concert.price}</span>
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="ticketCount" className="text-lg">Количество билетов:</Label>
                <Select value={ticketCount.toString()} onValueChange={handleTicketCountChange}>
                  <SelectTrigger className="bg-rock-gray border-electric-red/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-rock-gray border-electric-red/30">
                    {Array.from({ length: Math.min(8, concert.ticketsLeft) }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} билет{num > 1 ? (num > 4 ? 'ов' : 'а') : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="text-sm text-gray-400">
                  Максимум 8 билетов на одну покупку. Осталось: {concert.ticketsLeft} билетов
                </div>
              </div>

              <div className="bg-electric-red/10 border border-electric-red/20 p-4 rounded-lg">
                <div className="flex justify-between items-center text-lg">
                  <span>Итого к оплате:</span>
                  <span className="text-electric-red font-bold text-2xl">{totalPrice.toLocaleString()}₽</span>
                </div>
              </div>

              <Button 
                onClick={handleNextStep}
                className="w-full bg-electric-red hover:bg-electric-red/90 text-deep-black font-semibold py-3 text-lg"
              >
                Продолжить покупку
                <Icon name="ChevronRight" size={20} className="ml-2" />
              </Button>
            </div>
          )}

          {/* Шаг 2: Данные покупателя */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-electric-red mb-4">Данные покупателя</h3>
              
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="name">Полное имя *</Label>
                  <Input
                    id="name"
                    value={buyerInfo.name}
                    onChange={(e) => setBuyerInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-rock-gray border-electric-red/30 mt-1"
                    placeholder="Иван Иванов"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={buyerInfo.email}
                    onChange={(e) => setBuyerInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-rock-gray border-electric-red/30 mt-1"
                    placeholder="ivan@example.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    value={buyerInfo.phone}
                    onChange={(e) => setBuyerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="bg-rock-gray border-electric-red/30 mt-1"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
                
                <div>
                  <Label htmlFor="requests">Особые пожелания</Label>
                  <Textarea
                    id="requests"
                    value={buyerInfo.specialRequests}
                    onChange={(e) => setBuyerInfo(prev => ({ ...prev, specialRequests: e.target.value }))}
                    className="bg-rock-gray border-electric-red/30 mt-1 min-h-[80px]"
                    placeholder="Места для инвалидов, аллергии и т.д."
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={handlePrevStep}
                  variant="outline"
                  className="flex-1 border-electric-red text-electric-red hover:bg-electric-red hover:text-deep-black"
                >
                  <Icon name="ChevronLeft" size={20} className="mr-2" />
                  Назад
                </Button>
                <Button 
                  onClick={handleNextStep}
                  disabled={!buyerInfo.name || !buyerInfo.email || !buyerInfo.phone}
                  className="flex-1 bg-electric-red hover:bg-electric-red/90 text-deep-black font-semibold"
                >
                  К оплате
                  <Icon name="ChevronRight" size={20} className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Шаг 3: Оплата */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-electric-red mb-4">Подтверждение заказа</h3>
              
              <div className="bg-rock-gray/30 p-4 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span>Концерт:</span>
                  <span className="font-semibold">{concert.date}</span>
                </div>
                <div className="flex justify-between">
                  <span>Место:</span>
                  <span>{concert.venue}, {concert.city}</span>
                </div>
                <div className="flex justify-between">
                  <span>Билетов:</span>
                  <span>{ticketCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Покупатель:</span>
                  <span>{buyerInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="text-electric-red">{buyerInfo.email}</span>
                </div>
                <hr className="border-electric-red/20" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Итого:</span>
                  <span className="text-electric-red">{totalPrice.toLocaleString()}₽</span>
                </div>
              </div>

              <div className="bg-electric-red/10 border border-electric-red/20 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="CreditCard" size={24} className="text-electric-red" />
                  <span className="font-semibold">Способы оплаты</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="border-electric-red/30 hover:border-electric-red">
                    <Icon name="CreditCard" size={16} className="mr-2" />
                    Карта
                  </Button>
                  <Button variant="outline" className="border-electric-red/30 hover:border-electric-red">
                    <Icon name="Smartphone" size={16} className="mr-2" />
                    SBP
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={handlePrevStep}
                  variant="outline"
                  className="flex-1 border-electric-red text-electric-red hover:bg-electric-red hover:text-deep-black"
                >
                  <Icon name="ChevronLeft" size={20} className="mr-2" />
                  Назад
                </Button>
                <Button 
                  onClick={handlePurchase}
                  className="flex-1 bg-electric-red hover:bg-electric-red/90 text-deep-black font-semibold py-3 text-lg animate-pulse-glow"
                >
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  Оплатить {totalPrice.toLocaleString()}₽
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketModal;