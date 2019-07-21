<template>
  <Table :data-source="dataset" :columns="columns">
    <!-- Override header template -->
    <template slot="header-row" slot-scope="{ columns }">
      <tr>
        <th v-for="column in columns" :key="column.key" @click="changeSortSettings(column.dataSourceKey)">
          {{ column.title }}
          <SortIcon
            class="sort"
            :class="{ selected: column.dataSourceKey.includes(sortSettings.field) }"
            :type="column.dataSourceKey === sortSettings.field ? sortSettings.order : ''"
          />
        </th>
      </tr>
    </template>
    <!-- Override body template -->
    <template slot="body-row" slot-scope="{ row, rowIndex }">
      <tr :key="row.key" class="row" :class="{ secondary: rowIndex % 2 === 1 }">
        <td class="network-cell">
          <img class="network-icon" :src="row.icon" :alt="`${row.name} icon`" />{{ row.name }}
        </td>
        <td class="cell">{{ row.balance }} ({{ currencySymbol }} {{ row.balanceCurrency }})</td>
        <td class="cell">{{ row.reward }} ({{ currencySymbol }} {{ row.rewardCurrency }})</td>
      </tr>
      <tr v-if="rowIndex === dataset.length - 1">
        <td class="total">Total:</td>
        <td>
          <div class="label">{{ currencySymbol }} {{ total.balance }}</div>
        </td>
        <td>
          <div class="label">{{ currencySymbol }} {{ total.reward }}</div>
        </td>
      </tr>
    </template>
  </Table>
</template>

<script>
import Table from '@/components/ui/Table'
import SortIcon from '@/components/ui/table/SortIcon'
export default {
  name: 'RewardTable',
  components: { SortIcon, Table },
  props: {
    dataset: {
      type: Array,
      required: true
    },
    total: {
      type: Object,
      required: true
    },
    currencySymbol: {
      type: String,
      required: true
    },
    sortSettings: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    columns: [
      { title: 'Network', dataSourceKey: 'name', key: 'name' },
      { title: 'Balance', dataSourceKey: 'balance', key: 'balance' },
      { title: 'Total Reward', dataSourceKey: 'reward', key: 'reward' }
    ]
  }),
  methods: {
    changeSortSettings(selectedField) {
      const isSameField = selectedField === this.sortSettings.field
      this.$emit('change-sort-settings', { field: selectedField, order: isSameField ? 'DESC' : 'ASC' })
    }
  }
}
</script>

<style lang="scss" scoped>
.row.secondary {
  background-color: #f8f7fc;
}

tr {
  &:nth-of-type(2n) {
    background-color: transparent;
  }

  th {
    cursor: pointer;
  }
}

.total {
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  color: #524493;
}

.label {
  height: 30px;
  border-radius: 3px;
  background-color: rgba(#5d4f9c, 0.13);
  display: table-cell;
  padding: 0 15px;
  vertical-align: middle;

  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  color: #524493;
}

.network-cell {
  vertical-align: middle;
}

.network-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.sort {
  margin-left: 5px;
  opacity: 0.3;
  transition: none;
  &.selected {
    opacity: 1;
  }
}
</style>
