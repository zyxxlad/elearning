import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CoursesView from '@/views/CoursesView.vue';
import CourseView from '@/views/CourseView.vue';
import AddCourseView from '@/views/AddCourseView.vue';
import EditCourseView from '@/views/EditCourseView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/courses',
      name: 'courses',
      component: CoursesView,
    },
    {
      path: '/courses/:id',
      name: 'course',
      component: CourseView,
    },
    {
      path: '/courses/add',
      name: 'add-course',
      component: AddCourseView,
    },
    {
      path: '/courses/edit/:id',
      name: 'edit-course',
      component: EditCourseView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});

export default router;
