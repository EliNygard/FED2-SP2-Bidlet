export interface RegisterUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface Profile {
  name: string
  email: string
  bio?: string;
  avatar?: Media;
  banner?: Media;
  credits: number
  listings?: Listing[]
  wins?: Listing[]
  _count: {
    listings: number
    wins: number
  }
}

export interface UpdateProfile {
  bio?: string
  avatar?: Media
  banner?: Media
}


export interface Media {
  url: string;
  alt: string;
}

export interface Seller {
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
  bidder: Seller;
  created: string;
  listing?: Listing[]
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
  seller: Seller;
  bids?: Bid[];
  _count?: {
    bids: number;
  };
}

export interface CreateListing {
  title: string;
  description?: string;
  endsAt: string;
  tags?: string[];
  media?: Media[];
}

export interface Meta {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  pageCount: number;
  totalCount: number;
}
