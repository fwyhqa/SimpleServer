new Vue({
  el: '#app',
  data: {
    isLoggedIn: false,
    username: '',
    password: '',
    loginMessage: '',
    loginSuccess: false,
    currentView: 'users',
    users: [],
    items: [],
    newUser: { username: '', password: '', role: 'user' },
    newItem: { name: '', description: '', quantity: 0 }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/api/login', {
          username: this.username,
          password: this.password
        });
        this.loginMessage = response.data.message;
        this.loginSuccess = response.data.success;
        if (response.data.success) {
          this.isLoggedIn = true;
          this.fetchUsers();
          this.fetchItems();
        }
      } catch (error) {
        this.loginMessage = 'Login failed: ' + (error.response?.data?.message || 'Server error');
        this.loginSuccess = false;
      }
    },
    logout() {
      this.isLoggedIn = false;
      this.username = '';
      this.password = '';
      this.loginMessage = '';
      this.users = [];
      this.items = [];
    },
    async fetchUsers() {
      try {
        const response = await axios.get('/api/users');
        this.users = response.data;
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    },
    async addUser() {
      try {
        await axios.post('/api/users', this.newUser);
        this.fetchUsers();
        this.newUser = { username: '', password: '', role: 'user' };
      } catch (error) {
        console.error('Failed to add user:', error);
      }
    },
    async deleteUser(id) {
      if (confirm('Are you sure you want to delete this user?')) {
        try {
          await axios.delete(`/api/users/${id}`);
          this.fetchUsers();
        } catch (error) {
          console.error('Failed to delete user:', error);
        }
      }
    },
    async fetchItems() {
      try {
        const response = await axios.get('/api/items');
        this.items = response.data;
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    },
    async addItem() {
      try {
        await axios.post('/api/items', this.newItem);
        this.fetchItems();
        this.newItem = { name: '', description: '', quantity: 0 };
      } catch (error) {
        console.error('Failed to add item:', error);
      }
    },
    async deleteItem(id) {
      if (confirm('Are you sure you want to delete this item?')) {
        try {
          await axios.delete(`/api/items/${id}`);
          this.fetchItems();
        } catch (error) {
          console.error('Failed to delete item:', error);
        }
      }
    }
  },
  mounted() {
    if (this.isLoggedIn) {
      this.fetchUsers();
      this.fetchItems();
    }
  }
});