<template>
  <header :class="$style.header" class="bg-blue-500">
    <div class="_container py-5 flex align-items-center">
      <router-link :to="{ name: 'dashboard' }" class="text-white text-4xl uppercase">Admin-panel</router-link>
      <router-link :to="{ name: 'dashboard' }" class="text-lg ml-4" :class="$style.link">Dashboard</router-link>
      <router-link :to="{ name: 'operations' }" class="text-lg ml-4" :class="$style.link">Operations</router-link>
      <Button label="Add operation" @click="isShow = !isShow" class="ml-auto" />
    </div>
  </header>
  <router-view/>
  {{data}}

  <Sidebar v-model:visible="isShow" position="right">
    <form @submit.prevent="handleSubmit(v$.$invalid)">
      <div class="p-float-label mt-1 mb-3">
        <Calendar
          id="date"
          class="w-full"
          :class="{'p-invalid': v$.$invalid && v$.date.$dirty}"
          v-model="v$.date.$model"
          @blur="v$.date.$touch()"
        />
        <label for="date">Operation Date</label>
      </div>
      <div class="p-float-label mt-1 mb-3">
        <InputText
            id="place"
            class="w-full"
            :class="{'p-invalid': v$.$invalid && v$.place.$dirty}"
            v-model="v$.place.$model"
            @blur="v$.place.$touch()"
        />
        <label for="place">place</label>
      </div>
      <div class="p-float-label mt-1 mb-3">
        <InputText
            id="category"
            class="w-full"
            :class="{'p-invalid': v$.$invalid && v$.category.$dirty}"
            v-model="v$.category.$model"
            @blur="v$.category.$touch()"
        />
        <label for="category">category</label>
      </div>
      <div class="p-float-label mt-1 mb-3">
        <InputNumber
            id="amount"
            class="w-full"
            :class="{'p-invalid': v$.$invalid && v$.amount.$dirty}"
            v-model="v$.amount.$model"
            @blur="v$.amount.$touch()"
            mode="decimal"
            locale="ru-RU"
            :minFractionDigits="2"
        />
        <label for="amount">amount</label>
      </div>
      <div class="p-float-label mt-1 mb-3">
        <Dropdown
            id="card"
            class="w-full"
            :class="{'p-invalid': v$.$invalid && v$.card.$dirty}"
            :options="cards"
            optionLabel="label"
            optionValue="value"
            v-model="v$.card.$model"
            @blur="v$.card.$touch()"
        />
        <label for="card">Card</label>
      </div>
      <div class="p-float-label mt-1 mb-3">
        <Textarea
            id="description"
            class="w-full"
            :class="{'p-invalid': v$.$invalid && v$.description.$dirty}"
            v-model="v$.description.$model"
            @blur="v$.description.$touch()"
            :autoResize="true"
            rows="2"
            cols="30"
        />
        <label for="description">description</label>
      </div>
      <Button class="w-full" label="submit" type="submit"/>
    </form>
  </Sidebar>
</template>

<script>
import { ref, reactive } from '@vue/reactivity'
import { useVuelidate } from '@vuelidate/core'
import  { required } from '@vuelidate/validators'

import Button from 'primevue/button'
import Sidebar from 'primevue/sidebar'
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';



export default {
  components: {
    Button,
    Sidebar,
    Calendar,
    InputText,
    InputNumber,
    Dropdown,
    Textarea
  },

  setup() {

    const defaultModel = {
      date: null,
      place: null,
      category: null,
      amount: null,
      card: null,
      description: null
    }

    const data = reactive(JSON.parse(localStorage.getItem('operations') || '[]'))
    const isShow = ref(false)
    const model = ref({...defaultModel}) // снимаем ссылку на модель, убираем реактивность

    const rule = {
      date: [required],
      place: [required],
      category: [required],
      amount: [required],
      card: [required],
      description: [required]
    }

    const cards = [
      { value: '*5979', label: 'Alpha' },
      { value: '*9874', label: 'Sber' }
    ]

    const v$ = useVuelidate(rule, model)

    function handleSubmit (invalid) {
      v$.value.$touch()
      if (invalid) {
        console.log('invalid')
        return
      }
      v$.value.$reset()
      data.push(model.value)
      model.value = {...defaultModel}
      localStorage.setItem('operations', JSON.stringify(data))
    }

    return {
      v$,
      isShow,
      handleSubmit,
      cards,
      data
    }
  }
}
</script>

<style lang="scss" module>
.header {
  position: relative;
}

.link {
  color: #fff;

  &:hover {
    color: #ddd;
  }
}
</style>
