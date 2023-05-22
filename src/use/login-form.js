import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default function useLoginForm () {
  const store = useStore()
  const route = useRouter()
  const MIN_LENGTH = 6
  const { handleSubmit, isSubmitting } = useForm()
  const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
    'email',
    yup
      .string()
      .trim()
      .required('Поле должно быть заполнено')
      .email('Необходмо ввести корректный email')
  )
  const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
    'password',
    yup
      .string()
      .trim()
      .required('Поле должно быть заполнено')
      .min(MIN_LENGTH, `Минимальная длина - ${MIN_LENGTH} символов`)
  )
  const onSubmit = handleSubmit(async values => {
    try {
      await store.dispatch('authModule/login', values)
      route.push('/')
    } catch (e) {
      console.log(e)
    }
  })
  return {
    email,
    password,
    eError,
    pError,
    eBlur,
    pBlur,
    onSubmit,
    isSubmitting
  }
}
