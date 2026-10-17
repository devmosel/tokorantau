export interface Step {
  image: string;
  title: string;
  description: string;
}

const LOREM =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis eveniet asperiores ullam perferendis molestias! Labore facilis rerum dolorum doloribus esse.";

export const STEPS: Step[] = [
  { image: "/img/food-service.png", title: "choose order", description: LOREM },
  { image: "/img/mobile-payment.png", title: "text and pay seller", description: LOREM },
  { image: "/img/delivery-truck.png", title: "on its way to your house", description: LOREM },
];