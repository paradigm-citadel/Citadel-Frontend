<template>
  <table>
    <thead>
      <slot :columns="columns" name="header-row">
        <!-- slot for override header row render -->
        <tr class="row header-row">
          <slot v-for="item in columns" :cell="item" :name="item.override ? `header-cell-${item.key}` : 'header-cell'">
            <!-- slot for override header cell render -->
            <th :key="item.key" class="cell header-cell">{{ item.title }}</th>
          </slot>
        </tr>
      </slot>
    </thead>
    <tbody>
      <!-- slot for override body row render -->
      <slot v-for="(row, rowIndex) in dataSource" :rowIndex="rowIndex" :row="row" :columns="columns" name="body-row">
        <tr :key="row.key" class="row">
          <td v-for="column in columns" :key="column.key" class="cell">
            {{ row[column.dataSourceKey] }}
          </td>
        </tr>
      </slot>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Table',
  props: {
    columns: {
      validator: columns => {
        return (
          columns.filter(column => {
            return !column.title || !column.dataSourceKey || !column.key
          }).length === 0
        )
      },
      default: [
        /**
         * Структура:
         * {title: "Название столбца", dataSourceKey: "Какое свойство объекта выводить", key: "уникальное значение столбца для key prop"}
         * Пример: [
         *   {title: "Id", dataSourceKey: "id", key: "id"},
         *   {title: "Name", dataSourceKey: "name", key: "name"},
         *   {title: "Score", dataSourceKey: "playerScore", key: "score"}
         * ]
         */
      ]
    },
    dataSource: {
      validator: dataSource => {
        return (
          dataSource.filter(data => {
            return !data.key
          }).length === 0
        )
      },
      default: [
        /**
         * Структура:
         * {key: "уникальное значение для key prop", ...<dataSourceKey указанный в columns>: "Значение"}
         * Пример: [
         *    {id: 1, name: "Ivan", playerScore: 1, key: 1},
         *    {id: 2, name: "John", playerScore: 100, key: 2},
         *    {id: 3, name: "Ananas", playerScore: 49, key: 3}
         * ]
         */
      ]
    }
  }
}
</script>

<style scoped lang="scss">
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  font-family: inherit;
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  color: #40356c;
  padding: 15px;
}

td {
  font-weight: 300;
  line-height: 1;
  color: #656565;
}

thead {
  border-bottom: 2px solid #f8f7fc;
}

tr {
  &:nth-child(2n) {
    background-color: #f8f7fc;
  }
}
</style>
