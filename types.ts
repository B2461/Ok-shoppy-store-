
export interface Product {
  id: number;
  title: string;
  cat: string;
  price: number;
  img: string;
  desc?: string;
}

export interface ChatMessage {
  kind: 'user' | 'bot';
  text: string;
}