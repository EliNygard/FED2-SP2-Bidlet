export interface RegisterUser {
  name: string
  email: string
  password: string
  avatar?: string
}

export interface LoginUser {
  email: string
  password: string
}

export interface Media {
    url: string;
    alt: string;
  }
  
  export interface User {
    name: string;
    email: string;
    bio?: string;
    avatar?: Media;
    banner?: Media;
    wins?: string[];
  }
  
  export interface Bid {
    id: string;
    amount: number;
    bidder: User;
    created: string;
  }
  
  export interface Listing {
    id: string;
    title: string;
    description?: string;
    tags?: string[];
    media?: Media[];
    created: string;
    updated: string;
    endsAt: string;
    seller: User;
    bids?: Bid[];
    _count?: {
      bids: number;
    };
  }
