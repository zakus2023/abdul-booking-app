export interface UserType {
  _id: string;
  name: string;
  email:string;
  isAdmin: boolean;
  isActive:boolean;
  createdAt: string;
}

interface TicketType {
  name: string;
  price: number;
  limit: number;
  available: number;
}

export interface EventType {
  _id: string;
  name: string;
  description: string;
  organizer: string;
  guests: string[];
  address: string;
  city: string;
  postalcode: string;
  date: string;
  time: string;
  media: string[];
  ticketTypes: TicketType[];
}

export interface UserBookingType {
  _id: string;
  user: UserType;
  event: EventType;
  ticketType: string;
  ticketsCount: number;
  totalPrice: number;
  paymentId?: string;
  status?: string;
  createdAt: string;
}
