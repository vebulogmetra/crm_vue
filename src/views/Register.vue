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
        />
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
        />
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
      <div class="input-field">
        <input
          id="name"
          type="text"
          class="validate"
          v-model.trim="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        />
        <label for="name">Имя</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >Введите ваше имя</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";

export default {
  name: "register",

  data: () => ({
    //создание моделей для привязки валидатора
    email: "",
    password: "",
    name: "",
    agree: false
  }),

  validations: {
    email: { email, required }, //required не пустой
    password: { required, minLength: minLength(5) }, //ограничитель по миним. длине пароля
    name: { required },
    agree: { mycheckedval: v => v }
  },

  methods: {
    async submitHnd() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      //формирование объекта который полетит на сервер
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch {}

    }
  }
};
</script>