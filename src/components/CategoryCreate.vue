<template>
<div class="col s12 m6">
  <div>
    <div class="page-subtitle">
      <h4>Создать</h4>
    </div>

    <form @submit.prevent="submitForm">
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
        >
        <label for="name">Название</label>
        <span 
        		class="helper-text invalid"
        		v-if="$v.title.$dirty && !$v.title.required"
        		>
        		Укажите категорию
        </span>
      </div>

      <div class="input-field">
        <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.title.$dirty && !$v.limit.minValue}"
        >
        <label for="limit">Лимит</label>
        <span 
        		class="helper-text invalid"
        		v-if="$v.limit.$dirty && !$v.limit.minValue"
        		>
        		Минимально {{ $v.limit.$params.minValue.min }}
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</div>
</template>


<script>
import {required, minValue} from 'vuelidate/lib/validators'

export default {
	name: 'categorycreate',
	data:() => ({
		title: '',
		limit: 10,
	}),
	validations: {
		title: {required},
		//minimum u/e limit
		limit: {minValue: minValue(10)}
	},
	methods: {
		async submitForm() {
			if (this.$v.$invalid) {
				this.$v.$touch()
				return
			}

      try {
        const category = await this.$store.dispatch("createCategory", {
        title: this.title,
        limit: this.limit,
      })
        this.title = ''
        this.limit = 10
        this.$v.$reset()
        this.$pushmsg('Категория успешно создана')
        this.$emit("created", category)
      } catch(e) {console.log(e)}

		}
	},
  mounted() {
    //метод решает наложение при старте содержания и label'a
    M.updateTextFields()
  },

}
</script>