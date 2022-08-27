import { Messenger } from 'components/Messenger';
import { AboutPage } from 'pages/AboutPage';


export const routes = [
  {
    path: '/',
    exist: true,
    component: Messenger
  },
  {
    path: '/about',
    exist: true,
    component: AboutPage
  },
  {
    path: '/chats/:id',
    exist: true,
    component: Messenger
  },
]