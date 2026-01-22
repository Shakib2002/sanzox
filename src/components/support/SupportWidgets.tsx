import { ChatWidget } from './ChatWidget';
import { WhatsAppButton } from './WhatsAppButton';

interface SupportWidgetsProps {
  whatsappNumber?: string;
  whatsappMessage?: string;
}

export function SupportWidgets({ 
  whatsappNumber = "1234567890",
  whatsappMessage = "Hi! I'm interested in your services."
}: SupportWidgetsProps) {
  return (
    <>
      <WhatsAppButton 
        phoneNumber={whatsappNumber} 
        message={whatsappMessage} 
      />
      <ChatWidget />
    </>
  );
}
