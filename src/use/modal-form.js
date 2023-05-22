import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
export function useModalForm (fn) {
  const { handleSubmit, isSubmitting } = useForm({ initialValues: { status: 'active' } })
  const { value: fio, errorMessage: fioError, handleBlur: fioBlur } = useField(
    'fio',
    yup
      .string()
      .trim()
      .required('ФИО небходимо для заполнения')
  )
  const { value: phone, errorMessage: pError, handleBlur: pBlur } = useField(
    'phone',
    yup
      .string()
      .trim()
      .required('Необходимо заполнить поле')
  )
  const { value: sum, errorMessage: sumError, handleBlur: sumBlur } = useField(
    'sum',
    yup
      .number()
      .min(0, 'Сумма не  может быть меньше 0')
      .required('Необходимо заполнить поле')
  )
  const { value: status, errorMessage: statusError, handleBlur: statusBlur } = useField(
    'status'
  )
  const onSubmit = handleSubmit(fn)
  return {
    fio,
    phone,
    sum,
    status,
    fioError,
    pError,
    sumError,
    statusError,
    fioBlur,
    pBlur,
    sumBlur,
    statusBlur,
    isSubmitting,
    onSubmit
  }
}
