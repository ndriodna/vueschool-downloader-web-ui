import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Index",
      component: () => import("../views/HomeView.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("../views/HomeView.vue"),
        },
        {
          path: "/download",
          name: "download",
          component: () => import("../views/DownloadView.vue"),
        },
      ]
    },
    {
      path: "/login",
      name: 'login',
      component: () => import("@/views/LoginView.vue")
    },

  ],
});

export default router;
