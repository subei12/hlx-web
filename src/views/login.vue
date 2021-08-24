<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/login/ic_login_tool.png" alt="">
      <span>葫芦侠</span>
    </div>
    <form class="login-form" @submit.prevent>
      <div class="login-form-row">
        <input type="text" v-model.trim="post.account" placeholder="手机号/邮箱" maxlength="20" autocomplete="off">
      </div>
      <div class="login-form-row">
        <input type="password" v-model.trim="post.password" placeholder="密码" maxlength="30">
      </div>
      <div class="login-form-row">
        <gourd-button type="success" @click="login" size="medium" :disabled="loginDisabled" round block>登录</gourd-button>
      </div>
    </form>

    <gourd-dialog v-model="show">
      <span slot="title">提示</span>
      <template slot="footer">
        <gourd-button @click="show = false">确定</gourd-button>
      </template>
      <span>{{msg}}</span>
    </gourd-dialog>
  </div>
</template>

<script>
export default {
	data() {
		return {
			post: {
				account: '',
				password: ''
			},
			show: false,
			msg: '',
			disabled: false
		};
	},
	methods: {
		async login() {
			const { account, password } = this.post;

			const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}|(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

			if (!reg.test(account)) {
				this.msg = '输入账号不合法';
				this.show = true;
				return;
			} else if (password.length < 4) {
				this.msg = '输入密码不合法';
				this.show = true;
				return;
			}

			this.disabled = true;

			const { code, msg, status, user, _key } = await this.http.post('/account/login', `account=${account}&password=${password}`);

			if (msg === '' && status === 1) {
                this.$store.commit('setUser', { user, _key });
				localStorage.setItem('user', JSON.stringify({ user, _key }));
				this.$store.dispatch('getUserStatus');
				this.$router.push('/space');
				return;
			}

			this.msg = msg;
			this.show = true;

			this.disabled = false;
		}
	},
	computed: {
		loginDisabled: {
			get() {
				if (this.post.account.length === 0 || this.post.password.length === 0 || this.disabled) {
					return true;
				}
			}
		}
	}
};
</script>

<style scoped>
.login {
	margin: 10vh 8vw;
}

.logo {
	display: flex;
	align-items: center;
}

.logo > img {
	width: 40px;
	height: 40px;
	border-radius: 50%;
}

.logo > span {
	color: #000;
	margin-left: 2vw;
}

.login-form {
	margin-top: 6vh;
}

.login-form-row {
	margin-bottom: 16px;
}

input {
	width: 100%;
	padding-bottom: 1vh;
	line-height: 1.5;
	color: #000;
	caret-color: #19d469;
	font-size: 14px;
	outline: none;
	border: none;
	border-bottom: 1px solid #e0e0e0;
}

input:focus {
	border-bottom: 1px solid #19d469;
}

input::placeholder {
	color: #dcdcdc;
}
</style>