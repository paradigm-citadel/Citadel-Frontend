<template>
  <div class="controller">
    <paginate
      :value="currentPage"
      :page-count="pagesCount"
      :page-range="6"
      :click-handler="onPageChanged"
      prev-text="<"
      next-text=">"
      container-class="pagination"
      page-class="page-item"
      active-class="active"
      prev-class="page-item arrow"
      next-class="page-item arrow"
    />
    <ShowByPicker :show-by="showBy" @changed="$emit('show-by-changed', $event)" />
  </div>
</template>

<script>
import ShowByPicker from '@/components/common/show-by-picker/ShowByPicker'

export default {
  name: 'TransactionController',
  components: { ShowByPicker },
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    pagesCount: {
      type: Number,
      required: true
    },
    showBy: {
      type: Number,
      required: true
    }
  },
  methods: {
    onPageChanged(page) {
      this.$emit('page-changed', page)
    }
  }
}
</script>
<style scoped lang="scss">
.controller {
  margin: 30px 0 10px;
  display: flex;
  justify-content: space-between;
}

.pagination {
  list-style: none;
  display: flex;
  padding: 0;

  & /deep/ .page-item {
    &.arrow a {
      font-weight: 500;
      font-size: 18px;
    }

    &.active a {
      background-color: #5d4f9c;
      color: #fff;
    }

    a {
      width: 28px;
      height: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 3px;
      border: solid 1px #eaeaea;
      background-color: #ffffff;
      margin-left: 10px;
      cursor: pointer;
      outline: 0;
      font-family: Roboto;
      font-size: 14px;
    }
  }
}
</style>
