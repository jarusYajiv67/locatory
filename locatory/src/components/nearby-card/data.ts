export interface NearbyPlace {
  location: string;
  name: string;
  open_now: boolean;
  photo_url: string;
  place_id: string;
  rating: number;
  total_ratings: number;
  address: string;
}

export const nearbyPlaces: Array<NearbyPlace> = [
  {
    location: "13.0827368,80.21092639999999",
    name: "Subway",
    open_now: true,
    photo_url: "https://lh3.googleusercontent.com/places/AM5lPC_K5rQfWOaNwtWq2whiy4P6e-kZg6MEPs6C9CUKoXsimYHuSdsru5mmQbBUfbEBzctLgHmCSNBw_2Oy06UV-2yLLeppElicK1c=s1600-w400",
    place_id: "ChIJAQAA4SBkUjoRLEliHRhKW28",
    rating: 4.3,
    total_ratings: 2122,
    address: "AC 112, 4th Avenue, Shanthi Colony, Anna Nagar, Chennai"
  }
];