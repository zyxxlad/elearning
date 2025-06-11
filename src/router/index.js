import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CoursesView from '@/views/CoursesView.vue';
import CourseView from '@/views/CourseView.vue';
import AddCourseView from '@/views/AddCourseView.vue';
import EditCourseView from '@/views/EditCourseView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

//настроить адреса и соответсвующие возвращаемые страницы (компоненты)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {//главная страницы
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {//все курсы
      path: '/courses',
      name: 'courses',
      component: CoursesView,
    },
    {//конкретный курс
      path: '/courses/:id',
      name: 'course',
      component: CourseView,
    },
    {//добавление курса
      path: '/courses/add',
      name: 'add-course',
      component: AddCourseView,
    },
    {//редактирование курса
      path: '/courses/edit/:id',
      name: 'edit-course',
      component: EditCourseView,
    },
    {//все другие адреса, возвращать страницу "не найдено"
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});

export default router;
