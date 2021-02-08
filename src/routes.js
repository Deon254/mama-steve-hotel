
import Fruits from "views/fruits.js";
import Vegetables from "views/vegetables.js";
import Meat from "views/meat.js";

const dashboardRoutes = [
  {
    path: "/fruits",
    name: "Fruits",
    component: Fruits,
    layout: "/admin",
  },
    {
    path: "/vegetables",
    name: "Vegetables",
    component: Vegetables,
    layout: "/admin",
  },
  {
    path: "/meat",
    name: "Meat",
    component: Meat,
    layout: "/admin",
  },
  
];

export default dashboardRoutes;
