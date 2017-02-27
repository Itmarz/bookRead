import hot       from './components/hot.vue'
import fact      from './components/fact.vue'
import read      from './components/read.vue'
import index     from './components/index.vue'
import datails   from './components/datails.vue'
import feedback  from './components/feedback.vue'
import bookstore from './components/bookstore.vue'

module.exports = function (VueRouter) {
  const router = new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/',
        redirect: '/index/bookstore'
      },
      {
        name: 'index',
        path: '/index',
        component: index,
        children: [
          {
            name: 'bookstore',
            path: 'bookstore',
            component: bookstore
          },
          {
            name: 'hot',
            path: 'hot',
            component: hot
          },
          {
            name: 'fact',
            path: 'fact',
            component: fact
          },
          {
           name: 'feedback',
            path: 'feedback',
            component: feedback
          }
        ]
      },
      {
        name: 'read',
        path: '/read',
        component: read
      },
      {
        name: 'datails',
        path: '/datails',
        component: datails
      },
      {
        name: 'error',
        path: '*',
        redirect: '/'
      }
    ]
  })

  return router
}
