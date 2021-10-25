import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Login from "./views/Login.vue";
import TruckManager from "./views/TruckManagers/TruckManager.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { layout: "empty" },
  },
  {
    path: "/truckmanager",
    name: "TruckManager",
    component: TruckManager,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
