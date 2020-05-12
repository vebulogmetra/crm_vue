<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ date | datef('datetime') }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a class="dropdown-trigger black-text" href="#" data-target="dropdown" ref="ddwn">
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import M from "materialize-css/dist/js/materialize.min";
export default {
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null
  }),

  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login?message=logout");
    }
  },
  computed: {
    //получаем юзернейм
    name() {
      return this.$store.getters.info.name
    } 
  },
  //когда прогрузилось DOM
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
    this.dropdown = M.Dropdown.init(this.$refs.ddwn, { constrainWidth: true });
  },
  //освобождение памяти (удаление таймера, удаление дд) после закрытия navbar
  beforeDestroy() {
    clearInterval(this.interval);
    //защита от быстрого перехода
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  }
};
</script>