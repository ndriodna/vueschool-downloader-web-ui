import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Index",
      component: () => import("../components/layout/Index.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("../views/HomeView.vue"),
          meta: { isAuth: true }
        },
        {
          path: "/download",
          name: "download",
          component: () => import("../views/DownloadView.vue"),
          meta: { isAuth: true }
        },
      ]
    },
    {
      path: "/login",
      name: 'login',
      component: () => import("../views/LoginView.vue"),
      meta: { isGuest: true }
    },

  ],
});

router.beforeEach((to, from) => {
  const isAuth = $cookies.get('token_client')
  if (to.meta.isAuth && !isAuth) return { name: "login" }
  if (to.meta.isGuest && isAuth) return { name: 'home' }
})
export default router;
