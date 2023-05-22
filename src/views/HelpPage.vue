<template>
    <app-page title="Ответы на вопросы">
        <question-item
          v-for="question in questions"
          :key="question.title"
          :question="question"
        ></question-item>
    </app-page>
</template>

<script>
import AppPage from '@/components/ui/AppPage.vue'
import QuestionItem from '@/components/question/QuestionItem.vue'
export default {
  components: { AppPage, QuestionItem },
  setup () {
    const questions = [
      { title: 'Что есть в данной системе?', text: 'В данной системе есть возможность просмотра и редактирования приходящих заявок' },
      { title: 'Как реализована авторизация', text: 'Авторизация реализована через Firebase' }
    ]

    return {
      questions
    }
  }
}
</script>
