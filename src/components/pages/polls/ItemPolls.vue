<template>
  <div class="item-polls">
    <div class="head">
      <div class="head-container">
        <img :src="poll.icon" :alt="poll.name" :title="poll.name" class="logo-polls" />
        <p class="logo-title">{{ poll.name }}</p>
      </div>
      <div class="head-container">
        <p class="pool-date-light">End of voting:</p>
        <p :class="`status-${timeColor}`" class="polls-date">{{ formattedTime }}</p>
      </div>
    </div>
    <p class="poll-text poll-title">{{ poll.description }}</p>
    <p v-for="item in poll.answers" :key="item.id" class="poll-text poll-questions">
      {{ item.title }}
      <span class="opacity">{{ item.percent }}%</span>
    </p>
  </div>
</template>

<script>
import declOfNum from '@/helpers/numerals'
import { POLLS } from '@/store/types'

import dayjs from 'dayjs'

export default {
  name: 'ItemPolls',
  props: {
    poll: {
      type: Object,
      required: true
    }
  },
  computed: {
    currentTime() {
      return this.$store.getters[POLLS.GETTER.GET_CURRENT_TIME]
    },
    formattedTime() {
      const { end } = this.poll
      const diffInDays = end.diff(this.currentTime, 'day')

      if (diffInDays >= 1) return `${diffInDays} ${declOfNum(diffInDays, ['day', 'days', 'days'])}`

      const difference = dayjs(end.diff(this.currentTime, 'ms'))

      return difference.format('HH:mm:ss')
    },
    timeColor() {
      const { end } = this.poll
      const diffInDays = end.diff(this.currentTime, 'day')
      const diffInHours = end.diff(this.currentTime, 'hour', true)

      if (diffInDays >= 1) return 'normal'
      else if (diffInHours > 11) return 'warning'
      return 'error'
    }
  }
}
</script>

<style lang="scss" scoped>
.item-polls {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  border-bottom: 1px solid #f6f5fa;
}

.status {
  &-normal {
    color: #40356c;
  }
  &-warning {
    color: #c8c824;
  }
  &-error {
    color: #f27676;
  }
}

.head-container {
  display: flex;
  align-items: center;
  margin: 21px 0;
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-polls {
  width: 100%;
  max-width: 40px;
}

.logo-title {
  font-size: 18px;
  font-weight: bold;
  line-height: 0.78;
  color: #40356c;
  margin-left: 20px;
}

// стили для текста
.text {
  font-weight: 300;
  color: #000000;
}

.poll-text {
  font-size: 14px;
  line-height: 1.71;
  letter-spacing: 0.7px;
  display: flex;
  align-items: flex-end;
  word-break: break-all;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
}

.poll-title {
  font-size: 18px;
  line-height: 1.33;
  letter-spacing: 0.9px;
  margin-bottom: 19px !important;
  width: 100%;
}

.poll-questions {
  max-width: 50%;
}

.opacity {
  flex-shrink: 0;
  font-size: 18px;
  font-weight: 300;
  line-height: 1.11;
  letter-spacing: 0.9px;
  color: #bdbdbd;
  margin-left: 10px;
  word-break: break-all;
}

// стили для даты
.polls-date {
  font-size: 14px;
  line-height: 1;
  margin-left: 10px;
  transition: 0.3s ease-in-out;
}

.pool-date-red {
  color: #f27676;
}

.pool-date-light {
  font-size: 14px;
  font-weight: 300;
  line-height: 1;
  color: #656565;
}
</style>
