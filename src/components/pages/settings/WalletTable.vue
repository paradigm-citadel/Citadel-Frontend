<template>
  <Table :columns="columns" :data-source="tableData" class="table-settings">
    <template slot="body-row" slot-scope="{ row, columns }">
      <tr :key="row.key" class="row">
        <td
          v-for="column in columns"
          :key="column.key"
          class="cell"
          :class="{ [column.key]: true }"
          @click="() => clickOnCell(row.id, column.key)"
        >
          {{ row[column.dataSourceKey] }}
        </td>
      </tr>
    </template>
  </Table>
</template>

<script>
import Table from '@/components/ui/Table'
import { UI, WALLET } from '@/store/types'

export default {
  name: 'WalletTable',
  components: { Table },
  data: () => ({
    columns: [
      { title: 'Address', dataSourceKey: 'address', key: 'address' },
      { title: 'Currency', dataSourceKey: 'currency', key: 'currency' },
      { title: ' ', dataSourceKey: 'action', key: 'action' }
    ]
  }),
  computed: {
    tableData() {
      return this.$store.getters[WALLET.GETTER.TABLE_FOR_SETTINGS]
    }
  },
  methods: {
    clickOnCell(id, column) {
      if (column === 'action') {
        this.$store.commit(
          UI.MUTATION.SET_CONFIRM_MESSAGE,
          'This action will delete this wallet and ALL transactions for it'
        )
        this.$store.commit(UI.MUTATION.SET_CONFIRM_FUNCTION, async () => {
          await this.$store.dispatch(WALLET.ACTION.REMOVE_WALLET, id)
        })
        this.$store.commit(UI.MUTATION.SET_CONFIRM_IS_OPEN, true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cell {
  &.action {
    font-size: 13px;
    line-height: 1.08;
    color: #40356c;
    text-decoration: underline;
    font-weight: normal;
    cursor: pointer;
    text-align: right;
  }
}
</style>
