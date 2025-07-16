const app = new Vue({
  el: '#app',
  data: {
    users: [],
    items: [],
    userItems: [],
    newUser: { username: '', password: '', level: 1 },
    newItem: { name: '', description: '' },
    newUserItem: { userId: '', itemId: '' },
    login: { username: '', password: '' },
    loginMessage: ''
  },
  methods: {
    async fetchUsers() {
      const res = await fetch('/api/users');
      const data = await res.json();
      if (data.success) this.users = data.users;
    },
    async addUser() {
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.newUser)
      });
      this.newUser = { username: '', password: '', level: 1 };
      this.fetchUsers();
    },
    async updateUser(user) {
      await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      this.fetchUsers();
    },
    async deleteUser(id) {
      await fetch(`/api/users/${id}`, { method: 'DELETE' });
      this.fetchUsers();
    },
    async upgradeUser(id) {
      await fetch('/api/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: id })
      });
      this.fetchUsers();
    },
    async fetchItems() {
      const res = await fetch('/api/items');
      const data = await res.json();
      if (data.success) this.items = data.items;
    },
    async addItem() {
      await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.newItem)
      });
      this.newItem = { name: '', description: '' };
      this.fetchItems();
    },
    async updateItem(item) {
      await fetch(`/api/items/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      this.fetchItems();
    },
    async deleteItem(id) {
      await fetch(`/api/items/${id}`, { method: 'DELETE' });
      this.fetchItems();
    },
    async fetchUserItems() {
      const res = await fetch('/api/user-items');
      const data = await res.json();
      if (data.success) this.userItems = data.userItems;
    },
    async addUserItem() {
      await fetch('/api/get-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.newUserItem)
      });
      this.newUserItem = { userId: '', itemId: '' };
      this.fetchUserItems();
    },
    async deleteUserItem(id) {
      await fetch(`/api/user-items/${id}`, { method: 'DELETE' });
      this.fetchUserItems();
    },
    async testLogin() {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.login)
      });
      const data = await res.json();
      this.loginMessage = data.message;
    }
  },
  mounted() {
    this.fetchUsers();
    this.fetchItems();
    this.fetchUserItems();
  }
});