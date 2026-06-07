export type MenuItem = {
  name: string;
  description: string;
  price: string;
  image: string;
  tag?: string;
};

export type MenuCategory = {
  id: string;
  label: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "croissants",
    label: "Croissants",
    items: [
      {
        name: "Plain Butter Croissant",
        description: "Classic laminated dough, golden and flaky with a buttery airy interior.",
        price: "₱120",
        image: "/images/menu/croissants/croissants-1.jpg",
      },
      {
        name: "Almond Pain au Chocolat",
        description: "Double-baked with luxury dark chocolate and toasted almond flakes.",
        price: "₱185",
        image: "/images/menu/croissants/croissants-2.jpg",
        tag: "Bestseller",
      },
      {
        name: "Strawberry Cream Croissant",
        description: "Crispy buttery layers filled with fresh strawberries and light chantilly cream.",
        price: "₱240",
        image: "/images/menu/croissants/croissants-3.jpg",
        tag: "Featured",
      },
      {
        name: "Biscoff Signature Roll",
        description: "A decadent swirl of spiced cookie butter and velvety cheesecake filling.",
        price: "₱230",
        image: "/images/menu/croissants/croissants-4.jpg",
        tag: "Featured",
      },
      {
        name: "Raspberry Velvet Swirl",
        description: "Our iconic bi-color croissant featuring house-made raspberry reduction.",
        price: "₱160",
        image: "/images/menu/croissants/croissants-5.jpg",
        tag: "Signature",
      },
      {
        name: "Dubai Chocolate Puff",
        description: "Our viral signature featuring kataifi and pistachio cream filling.",
        price: "₱155",
        image: "/images/menu/croissants/croissants-6.jpg",
        tag: "New",
      },
      {
        name: "Matcha White Chocolate",
        description: "Japanese ceremonial matcha swirled into buttery dough with white chocolate drizzle.",
        price: "₱195",
        image: "/images/menu/croissants/croissants-7.jpg",
      },
      {
        name: "Ham & Cheese Croissant",
        description: "Savory black forest ham and aged gruyère baked inside a flaky butter croissant.",
        price: "₱165",
        image: "/images/menu/croissants/croissants-8.jpg",
      },
    ],
  },
  {
    id: "pastries_breads",
    label: "Pastries & Breads",
    items: [
      {
        name: "Korean Garlic Bread",
        description: "Soft brioche soaked in sweet garlic butter and herb cream cheese.",
        price: "₱135",
        image: "/images/menu/pastries_breads/pastries_breads-1.jpg",
        tag: "Bestseller",
      },
      {
        name: "Cinnamon Morning Bun",
        description: "Hand-rolled with house-made cinnamon sugar and a cream cheese glaze.",
        price: "₱115",
        image: "/images/menu/pastries_breads/pastries_breads-2.jpg",
      },
      {
        name: "Cheese Danish",
        description: "Flaky puff pastry filled with lightly sweetened cream cheese and lemon zest.",
        price: "₱130",
        image: "/images/menu/pastries_breads/pastries_breads-3.jpg",
      },
      {
        name: "Blueberry Scone",
        description: "Classic English scone bursting with fresh blueberries and a hint of vanilla.",
        price: "₱110",
        image: "/images/menu/pastries_breads/pastries_breads-4.jpg",
      },
      {
        name: "Brioche Pull-Apart",
        description: "Pillowy soft brioche loaf with layers of caramel and toasted nuts.",
        price: "₱145",
        image: "/images/menu/pastries_breads/pastries_breads-5.jpg",
      },
      {
        name: "Classic Sourdough Slice",
        description: "Open-crumb sourdough, long-fermented with a crispy caramelized crust.",
        price: "₱60",
        image: "/images/menu/pastries_breads/pastries_breads-6.jpg",
      },
      {
        name: "Ube Ensaymada",
        description: "Filipino-style soft brioche topped with ube buttercream and cheddar.",
        price: "₱125",
        image: "/images/menu/pastries_breads/pastries_breads-7.jpg",
        tag: "Local Fave",
      },
      {
        name: "Honey Walnut Loaf",
        description: "Dense, slightly sweet whole wheat loaf with walnuts and wildflower honey.",
        price: "₱140",
        image: "/images/menu/pastries_breads/pastries_breads-8.jpg",
      },
    ],
  },
  {
    id: "coffee_drinks",
    label: "Coffee & Drinks",
    items: [
      {
        name: "Espresso",
        description: "A single origin double shot, extracted with precision.",
        price: "₱90",
        image: "/images/menu/coffee_drinks/coffee_drinks-1.jpg",
      },
      {
        name: "Flat White",
        description: "Velvety microfoam on a double ristretto. Silky and intense.",
        price: "₱140",
        image: "/images/menu/coffee_drinks/coffee_drinks-2.jpg",
        tag: "Bestseller",
      },
      {
        name: "Americano",
        description: "Espresso lengthened with hot water. Clean, bold, and simple.",
        price: "₱100",
        image: "/images/gallery/gallery-2.jpg",
      },
      {
        name: "Café Latte",
        description: "Espresso and steamed milk in perfect harmony with latte art.",
        price: "₱150",
        image: "/images/gallery/gallery-10.jpg",
      },
      {
        name: "Matcha Latte",
        description: "Japanese ceremonial grade matcha whisked with oat milk.",
        price: "₱165",
        image: "/images/cafe/cafe_experience-6.jpg",
        tag: "Favorite",
      },
      {
        name: "Cold Brew",
        description: "Slow-steeped 20 hours for a smooth, naturally sweet concentrate.",
        price: "₱155",
        image: "/images/cafe/cafe_experience-8.jpg",
      },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      {
        name: "Basque Burnt Cheesecake",
        description: "Deeply caramelized exterior, custardy center. Served with berry compote.",
        price: "₱175",
        image: "/images/menu/desserts/desserts-1.jpg",
        tag: "Signature",
      },
      {
        name: "Classic Tart",
        description: "Buttery shortcrust shell with vanilla pastry cream and seasonal fruit.",
        price: "₱145",
        image: "/images/menu/desserts/desserts-2.jpg",
      },
      {
        name: "Affogato",
        description: "A double shot of espresso poured over house-made vanilla bean gelato.",
        price: "₱155",
        image: "/images/menu/desserts/desserts-3.jpg",
      },
      {
        name: "Tiramisu Cup",
        description: "Classic Italian layers of espresso-soaked savoiardi and mascarpone.",
        price: "₱165",
        image: "/images/menu/desserts/desserts-4.jpg",
      },
      {
        name: "Chocolate Fondant",
        description: "Warm single-serve dark chocolate lava cake with vanilla ice cream.",
        price: "₱185",
        image: "/images/menu/desserts/desserts-5.jpg",
        tag: "New",
      },
      {
        name: "Crème Brûlée",
        description: "Vanilla custard with a caramelized sugar crust, torched tableside.",
        price: "₱160",
        image: "/images/menu/desserts/desserts-6.jpg",
      },
      {
        name: "Strawberry Pavlova",
        description: "Crisp meringue topped with whipped cream and fresh local strawberries.",
        price: "₱170",
        image: "/images/menu/desserts/desserts-7.jpg",
      },
      {
        name: "Mango Panna Cotta",
        description: "Silky Italian cream dessert with Philippine carabao mango coulis.",
        price: "₱150",
        image: "/images/menu/desserts/desserts-8.jpg",
        tag: "Local",
      },
    ],
  },
];

export const allCategories = [{ id: "all", label: "All" }, ...menuCategories.map(c => ({ id: c.id, label: c.label }))];

export const featuredItems = [
  {
    name: "Strawberry Cream Croissant",
    description: "Crispy buttery layers filled with fresh strawberries and light chantilly cream.",
    price: "₱240",
    image: "/images/menu/croissants/croissants-3.jpg",
  },
  {
    name: "Flat White",
    description: "Velvety microfoam on a double ristretto — silky, intense, and perfectly balanced.",
    price: "₱140",
    image: "/images/menu/coffee_drinks/coffee_drinks-1.jpg",
  },
  {
    name: "Basque Burnt Cheesecake",
    description: "Deeply caramelized exterior, custardy center. Served with berry compote.",
    price: "₱175",
    image: "/images/menu/desserts/desserts-1.jpg",
  },
];

export const chalkboardItems = [
  {
    name: "Almond Pain au Chocolat",
    description: "Double-baked with luxury dark chocolate and toasted almond flakes.",
    price: "₱185",
  },
  {
    name: "Korean Garlic Bread",
    description: "Soft brioche soaked in sweet garlic butter and herb cream cheese.",
    price: "₱135",
  },
  {
    name: "Dubai Chocolate Puff",
    description: "Our viral signature featuring kataifi and pistachio cream filling.",
    price: "₱155",
  },
  {
    name: "Flat White",
    description: "Velvety microfoam on a double ristretto. Silky and intense.",
    price: "₱140",
  },
  {
    name: "Basque Burnt Cheesecake",
    description: "Deeply caramelized exterior, custardy center. Served with berry compote.",
    price: "₱175",
  },
];
