<template>
  <form class="card auth-card" @submit.prevent="submitHnd">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            class="validate"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
         class="helper-text invalid"
         v-if="$v.email.$dirty && !$v.email.required"
         >Введите Email</small>
        <small
         class="helper-text invalid"
         v-if="$v.email.$dirty && !$v.email.email"
         >Введите корректный Email</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            class="validate"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Пароль</label>
        <small 
        class="helper-text invalid"
        v-if="$v.password.$dirty && !$v.password.required"
        >Введите пароль</small>
        <small 
        class="helper-text invalid"
        v-if="$v.password.$dirty && !$v.password.minLength"
        >Пароль не должен быть короче {{ $v.password.$params.minLength.min }} символов. Сейчас {{ password.length }} символов</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import msgs from '@/utils/msgs'

export default {
  name: 'login',

  data: () => ({
    //создание моделей для привязки валидатора
    email: '',
    password: ''
  }),

  validations: {
    email: {email, required}, //required не пустой
    password: {required, minLength: minLength(8)} //ограничитель по миним. длине пароля
  },

  mounted() {
    if (msgs[this.$route.query.message]) {
      this.$pushmsg(msgs[this.$route.query.message])
    }
  },

  methods: {
    submitHnd() {
      //если при попытке отправки поле не валидно, тогда return чтоб не отправилась
      //инвалидная формма
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      //формирование объекта который полетит на сервер
      const formData = {
        email: this.email,
        password: this.password
      }

      this.$router.push('/')
    }
  }
}
</script>

