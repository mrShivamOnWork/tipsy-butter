export const siteConfig = {
  name: "The Tipsy Butter",
  tagline: "Premium Cafe & Bakehouse in Digos City",
  established: "Est. 2024",
  address: "Doña Aurora 3rd Street, San Jose, Digos, Philippines, 8002",
  phone: "0932 733 7466",
  phoneHref: "tel:+639327337466",
  facebook: "https://www.facebook.com/Thetipsybutter/",
  googleMapsEmbed:
    "https://maps.google.com/maps?q=The+Tipsy+Butter,+Do%C3%B1a+Aurora+3rd+Street,+San+Jose,+Digos+City,+Davao+del+Sur,+Philippines+8002&z=17&output=embed",
  hours: {
    weekdays: "Tue — Sun",
    weekdayTime: "8:00 am — 7:00 pm",
    monday: "Monday",
    mondayNote: "Closed",
  },
  services: [
    "Curbside Pickup",
    "Outdoor Seating",
    "Online Booking",
    "Reservations",
    "Takeout",
    "In-store Pickup",
  ],
  nav: [
    { label: "Home",     href: "/" },
    { label: "Menu",     href: "/menu" },
    { label: "Our Cafe", href: "/our-cafe" },
    { label: "Gallery",  href: "/gallery" },
    { label: "Visit Us", href: "/visit" },
    { label: "Contact",  href: "/contact" },
  ],
} as const;
