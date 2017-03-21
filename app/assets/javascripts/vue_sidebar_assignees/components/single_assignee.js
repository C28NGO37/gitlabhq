export default {
  name: 'SingleAssignee',
  props: {
    user: { type: Object, required: true },
  },
  template: `
    <div class="value hide-collapsed">
      <a class="author_link bold" :href="'/' + user.username">
        <img width="32" class="avatar avatar-inline s32" alt="" :src="user.avatarUrl">
        <span class="author">{{user.name}}</span>
        <span class="username">@{{user.username}}</span>
      </a>
    </div>
  `,
};
