import { createRouter, createWebHistory } from 'vue-router';

import HomeView from './views/Home.vue';
import SignInView from './views/SignIn.vue';
import FeedView from './views/Feed.vue';
import RegisterView from './views/Register.vue';

import { auth } from './auth';
import { onAuthStateChanged } from 'firebase/auth';

const routes = [
  { path: '/', component: HomeView },
  { path: '/sign-in', component: SignInView },
  {
    path: '/feed',
    component: FeedView,
    meta: {
      requiresAuth: true,
    },
  },
  { path: '/register', component: RegisterView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      auth,
      user => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, _, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      next('');
    }
  } else {
    next();
  }
});

export default router;
