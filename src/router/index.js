import { createRouter, createWebHistory } from "vue-router";
import { useAuth0 } from "@auth0/auth0-vue";
const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: "/",
         redirect: "dashboard",
      },
      {
         path: "/",
         component: () => import("@/layout/AppLayout.vue"),
         children: [
            {
               path: "home",
               name: "home",
               component: () => import("@/pages/Home/home.vue"),
               meta: { requiresAuth: true },
            },
            {
               path: "dashboard",
               name: "dashboard",
               component: () => import("@/pages/Dashboard/Dashboard.vue"),
               meta: { requiresAuth: true },
            },
            {
               path: "profile",
               name: "profile",
               component: () => import("@/pages/Profile/profile.vue"),
               meta: { requiresAuth: true },
            },
            {
               path: "log-in",
               name: "logIn",
               component: () => import("@/pages/logIn/LogIn.vue"),
            },
            {
               path: "/:catchAll(.*)",
               component: () => import("@/pages/NotFound.vue"),
            },
         ],
      },
   ],
});

router.beforeResolve(async (to, from, next) => {
   const { isAuthenticated } = useAuth0();

   if (to.meta.requiresAuth && !isAuthenticated.value) {
      console.log("User is not authenticated. Redirecting to login...");
      next({ name: "logIn" });
   } else {
      next();
   }
});

export default router;
