/* eslint-disable no-console */

import { register } from 'register-service-worker';
import store from '@/store/index';
import { SET_UPDATE_APP_SNACKBAR } from '@/store/mutations.type';
import sendMessage from '@/helper/sendSwMessage';

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log('App is being served from cache by a service worker');
    },
    registered() {
      console.log('Service worker has been registered.');
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updatefound() {
      console.log('New content is downloading.');
    },
    updated() {
      store.commit(SET_UPDATE_APP_SNACKBAR);
      sendMessage({
        type: 'SKIP_WAITING',
      });
      console.log('New content is available; please refresh.');
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });
}
