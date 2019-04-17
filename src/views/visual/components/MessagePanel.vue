<template>
  <div class="pannel">
      {{title}}
    <div class="data">
      <span>
        {{data}}
      </span>
    </div>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss">
  .pannel {
    width: 100%;
    height: 100%;
    font-size: 20px;
    font-weight: 900;
    text-align: center;

    .data {
      width: 100%;
      line-height: 60px;
      font-size: 24px;
      font-weight: 400;

      span {
         background: url('../../../assets/border.png') center no-repeat;
         padding: 10px 40px;
         color: #FFBD8B;
         background-size: 100% 100%;
      }
    }
  }
</style>

<script>
  export default {
    name: 'Panel',
    props: {
      title: { type: String },
      data: { type: String }
    }
  }
</script>