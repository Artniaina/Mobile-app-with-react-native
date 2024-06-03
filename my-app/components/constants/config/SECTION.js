import DOGS from "./DOGS";
import CATS from "./CATS";
import OTHERS  from "./OTHERS"
export default [
  {
    id: 1, 
    title: "Dogs",
    pets: [...DOGS],
  },
  {
    id: 2,
    title: "Cats",
    pets: [...CATS],
  },
  {
    id: 3,
    title: "Others",
    pets: [...OTHERS],
  },
];
