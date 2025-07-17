new Vue({
  el: '#app',
  data: {
    users: [],
    username: '',
    password: '',
    loginMessage: '',
    loginSuccess: false
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
          this.fetchUsers();
        }
      } catch (error) {
        this.loginMessage = 'Login failed: ' + (error.response?.data?.message || 'Server error');
        this.loginSuccess = false;
      }
    },
    async fetchUsers() {
      try {
        const response = await axios.get('/api/users');
        this.users = response.data;
      } catch (error) {
        console.error('Failed to fetch users:', error);
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
    }
  },
  mounted() {
    this.fetchUsers();
  }
});