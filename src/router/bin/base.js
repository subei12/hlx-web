
import Messages from '../../views/base/messages.vue';

import SendMessage from '../../views/base/sendMessage.vue';

const route = [
  {
      path: '/messages',
      component: Messages,
      name: 'messages'
  },
  {
    path: '/sendMessage',
    component: SendMessage,
    name: 'sendMessage',
    props: function (route) {
      return {
        commentItem: route.params.commentItem
      }
    }
  }
]

export default route;