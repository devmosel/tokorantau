export interface Review {
  id: number;
  image: string;
  name: string;
  text: string;
  /** Rating out of 5; halves are rendered as a half star. */
  rating: number;
}

const LOREM =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis iste, error commodi, exercitationem asperiores quas illum rerum reprehenderit, excepturi incidunt tempora totam odit amet eius.";

export const REVIEWS: Review[] = [
  { id: 1, image: "/img/aiony.jpg", name: "John doe", text: LOREM, rating: 4.5 },
  { id: 2, image: "/img/oliver.jpg", name: "John doe", text: LOREM, rating: 4.5 },
  { id: 3, image: "/img/arjunsyah.jpg", name: "John doe", text: LOREM, rating: 4.5 },
  { id: 4, image: "/img/kevin.jpg", name: "John doe", text: LOREM, rating: 4.5 },
];