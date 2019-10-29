
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Welcome.vue') },
      { path: '/partner', component: () => import('pages/Partner.vue') },
      { path: '/import', component: () => import('pages/Import.vue') },
      { path: '/orderPreview', component: () => import('pages/Order preview.vue') },
      { path: '/orderReport', component: () => import('pages/Order report.vue') },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
