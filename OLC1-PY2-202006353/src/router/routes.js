
const routes = [
  {
    path: '/',
    component: () => import('components/MainLayout.vue'),
    children: [
      { path: '', component: () => import('components/Index.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('components/Error404.vue')
  }
]

export default routes
