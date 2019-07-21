<template>
  <Table :columns="columns" :data-source="dataset">
    <template slot="body-row" slot-scope="{ row, rowIndex, columns }">
      <tr :key="row.key" class="row" :class="{ secondary: rowIndex % 2 === 1 }" @click="currentOpenId = row.id">
        <td v-for="column in columns" :key="column.key" class="cell" :class="{ [column.key]: true }">
          {{ row[column.dataSourceKey] }}
        </td>
        <td class="cell status">
          <div class="tooltip-container">
            <img :src="getIconByStatus(row.status)" />
            <div class="tooltip">
              {{ getTooltipTextByStatus(row.status) }}
              <div class="arrow" />
            </div>
          </div>
        </td>
      </tr>
      <tr v-if="row.id === currentOpenId && row.comment">
        <td></td>
        <td :colspan="columns.length - 1">
          <Block class="comment" without-padding rounded>
            <h4>Comment</h4>
            <p>{{ row.comment }}</p>
          </Block>
        </td>
      </tr>
    </template>
  </Table>
</template>
<script>
import Block from '@/components/ui/Block'
import Table from '@/components/ui/Table'

import PendingIcon from '@/assets/icons/information.svg'
import ApprovedIcon from '@/assets/icons/approve.svg'

export default {
  name: 'TableLayout',
  components: { Block, Table },
  props: {
    dataset: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    columns: [
      { title: 'Token', dataSourceKey: 'token', key: 'token' },
      { title: 'Datetime', dataSourceKey: 'datetime', key: 'datetime' },
      { title: 'Quantity', dataSourceKey: 'quantity', key: 'quantity' },
      { title: 'BTC', dataSourceKey: 'btc', key: 'btc' },
      { title: 'Dollar ($)', dataSourceKey: 'dollar', key: 'dollar' }
    ],
    currentOpenId: -1
  }),
  methods: {
    getIconByStatus(status) {
      return {
        pending: PendingIcon,
        approved: ApprovedIcon
      }[status]
    },
    getTooltipTextByStatus(status) {
      return {
        pending: 'Transaction is pending',
        approved: 'Transaction approved'
      }[status]
    }
  }
}
</script>
<style scoped lang="scss">
@import '~/assets/styles/entry.scss';

.row.secondary {
  background-color: #f8f7fc;
}

tr {
  &:nth-of-type(2n) {
    background-color: transparent;
  }
}

.cell {
  &.status {
    width: 40px;
    img {
      width: 20px;
      height: 20px;
    }
  }
}

.tooltip-container {
  position: relative;

  &:hover {
    & > .tooltip {
      opacity: 1;
    }
  }
}

.tooltip {
  z-index: 1;
  width: 200px;
  height: 52px;
  position: absolute;
  padding: 20px;

  left: -97px;
  top: -62px;
  opacity: 0;
  border-radius: 5px;
  box-shadow: 0 7px 11px 0 rgba(0, 0, 0, 0.16);
  background-color: rgba(0, 0, 0, 0.7);

  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

.arrow {
  position: absolute;
  bottom: -7px;
  left: 50%;
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 7px solid rgba(0, 0, 0, 0.7);

  transform: rotate(180deg);
}

.comment {
  background-color: #fbf6ed;
  min-height: 100px;
  padding: 12px 20px;

  h4 {
    font-family: Roboto;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.17;
    color: #c2b398;
  }

  p {
    font-family: Roboto;
    font-size: 13px;
    font-weight: 300;
    line-height: 1.54;
    color: #656565;
  }
}
</style>
