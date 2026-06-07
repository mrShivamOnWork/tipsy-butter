export type GalleryImage = {
  src: string;
  alt: string;
  aspect: "portrait" | "square" | "wide";
};

export const galleryImages: GalleryImage[] = [
  { src: "/images/gallery/gallery-1.jpg",  alt: "Fresh pastries display at The Tipsy Butter",           aspect: "portrait" },
  { src: "/images/gallery/gallery-2.jpg",  alt: "Artisan coffee being brewed",                          aspect: "square" },
  { src: "/images/gallery/gallery-3.jpg",  alt: "Golden croissants fresh from the oven",                aspect: "portrait" },
  { src: "/images/gallery/gallery-4.jpg",  alt: "Cozy cafe interior seating area",                      aspect: "square" },
  { src: "/images/gallery/gallery-5.jpg",  alt: "Signature Raspberry Velvet Swirl croissant",           aspect: "portrait" },
  { src: "/images/gallery/gallery-6.jpg",  alt: "Barista crafting a latte",                             aspect: "square" },
  { src: "/images/gallery/gallery-7.jpg",  alt: "Warm light inside The Tipsy Butter cafe",              aspect: "portrait" },
  { src: "/images/gallery/gallery-8.jpg",  alt: "Biscoff rolls cooling on a rack",                      aspect: "square" },
  { src: "/images/gallery/gallery-9.jpg",  alt: "Basque burnt cheesecake slice",                        aspect: "portrait" },
  { src: "/images/gallery/gallery-10.jpg", alt: "Coffee and croissant morning pairing",                 aspect: "square" },
  { src: "/images/gallery/gallery-11.jpg", alt: "Strawberry cream croissant close-up",                  aspect: "portrait" },
  { src: "/images/gallery/gallery-12.jpg", alt: "Artisan breads on the display shelf",                  aspect: "square" },
  { src: "/images/gallery/gallery-13.jpg", alt: "Outdoor seating area at the cafe",                     aspect: "portrait" },
  { src: "/images/gallery/gallery-14.jpg", alt: "Matcha latte with latte art",                          aspect: "square" },
  { src: "/images/gallery/gallery-15.jpg", alt: "Korean garlic bread fresh from the oven",              aspect: "portrait" },
  { src: "/images/gallery/gallery-16.jpg", alt: "Dessert selection at The Tipsy Butter",                aspect: "square" },
  { src: "/images/gallery/gallery-17.jpg", alt: "Dubai chocolate puff pastry detail",                   aspect: "portrait" },
  { src: "/images/gallery/gallery-18.jpg", alt: "The Tipsy Butter cafe storefront in Digos City",       aspect: "square" },
];

// Curated for diversity: coffee, interior, barista/people, outdoor
export const miniGalleryImages = [
  galleryImages[1],  // Artisan coffee being brewed
  galleryImages[3],  // Cozy cafe interior
  galleryImages[5],  // Barista crafting a latte
  galleryImages[12], // Outdoor seating area
];
