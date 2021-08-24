<template>
  <div>
    <h2>基本使用</h2>
    <div class="row">
      <GourdButton>默认按钮</GourdButton>
      <GourdButton type="primary">主要按钮</GourdButton>
      <GourdButton type="success">成功按钮</GourdButton>
    </div>
    <div class="row">
      <GourdButton type="danger">危险按钮</GourdButton>
      <GourdButton type="warning">警告按钮</GourdButton>
      <GourdButton type="info">信息按钮</GourdButton>

    </div>

    <h2>补素按钮</h2>
    <div class="row">
      <GourdButton plain>默认按钮</GourdButton>
      <GourdButton type="primary" plain>主要按钮</GourdButton>
      <GourdButton type="success" plain>成功按钮</GourdButton>
    </div>
    <div class="row">
      <GourdButton type="danger" plain>危险按钮</GourdButton>
      <GourdButton type="warning" plain>警告按钮</GourdButton>
      <GourdButton type="info" plain>信息按钮</GourdButton>

    </div>

    <h2>禁用</h2>
    <div class="row">
      <GourdButton type="primary" disabled>主要按钮</GourdButton>
      <GourdButton type="success" plain disabled>成功按钮</GourdButton>
    </div>

    <h2>图标按钮</h2>
    <div class="row">
      <GourdButton type="warning" icon="el-icon-warning">警告按钮</GourdButton>
      <GourdButton type="success" icon="el-icon-success" plain>成功按钮</GourdButton>
    </div>

    <div class="row">
      <GourdButton type="primary" icon="el-icon-warning"></GourdButton>
      <GourdButton type="success" icon="el-icon-message-solid">通知</GourdButton>
      <GourdButton type="success" icon="el-icon-message-solid" size="small" circle></GourdButton>
    </div>

    <h2>不同尺寸按钮</h2>
    <div class="row">
      <GourdButton type="success" icon="el-icon-success" plain>默认按钮</GourdButton>
      <GourdButton type="warning" icon="el-icon-warning" size="medium">中等按钮</GourdButton>
    </div>
    <div class="row">
      <GourdButton type="info" icon="el-icon-warning" size="small" plain>小型按钮</GourdButton>
      <GourdButton type="primary" icon="el-icon-warning" size="mini" plain>超小按钮</GourdButton>
    </div>

    <h2>样式</h2>
    <div class="row">
      <GourdButton type="primary" square>方形按钮</GourdButton>
      <GourdButton type="warning" plain round>圆角按钮</GourdButton>
      <GourdButton type="info" plain circle icon="el-icon-search"></GourdButton>
    </div>

    <h2>块级</h2>
    <div class="row">
      <GourdButton type="success" size="medium" round block>登录</GourdButton>
    </div>
  </div>

</template>

<script>
export default {};
</script>

<style  scoped>
.row {
	margin-bottom: 14px;
	padding: 0 6px;
}
</style>