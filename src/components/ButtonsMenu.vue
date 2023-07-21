<template>
  <gourd-overlay  v-model="show" @click="cancel" >
      <div class="button-group" v-if="this.show">
        <template v-for="(button,index) in filteredButtons">
          <gourd-button
            :key="index"
            class="button-item"
            @click.stop="button.handler"
            block
            medium
          >
            {{ button.text }}
          </gourd-button>
          <!-- <gourd-divider :key="index + 'divider'" v-if="index < filteredButtons.length - 1"></gourd-divider> -->
        </template>
        <gourd-divider ></gourd-divider>  
        <gourd-button class="button-item button-item-cancel" @click="cancel"> 取消</gourd-button>
      
      </div>
      
  </gourd-overlay> 
</template>

<script>
export default {
  name: 'ButtonsMenu',
  data() {
    return {
      showdialog: true,
      buttons: [
        { id: 1, text: '复制全文', class: 'button-1', condition: this.type != 1, handler: this.button1Handler },
        { id: 1, text: '回复', class: 'button-1', condition: this.commentItem.commentID <= 0, handler: this.button1Handler },
        { id: 2, text: '回赠/赠送', class: 'button-2', condition: true, handler: this.button2Handler },
        { id: 3, text: '查看话题', class: 'button-2', condition: true, handler: this.button2Handler },
        { id: 4, text: 'Button 2', class: 'button-2', condition: true, handler: this.button2Handler },
        // ... more buttons
      ],
    };
  },
  props: {
    commentItem: {
      type: Object,
      required: true,// 必填属性
    },
    show: {
      type: Boolean,
      default: false
    },
    from: { // 类型，标记从哪里来；1-我的消息、2-我的回复、3-帖子回复、4-帖子详情
      type: Number,
      default: 1
    }
  },
  computed: {
    filteredButtons() {
      // 还可以通过 condition 设置是否显示
      //return this.buttons.filter(button => button.condition);
      if(this.from == 1){
        this.buttons = [
        { id: 1, text: '回复', class: 'button-1', condition: true, handler: this.toSendMessage },
        { id: 2, text: '回赠/赠送', class: 'button-2', condition: true, handler: this.button2Handler },
        { id: 3, text: '查看话题', class: 'button-2', condition: true, handler: this.selectPost },
      ]
      }
      return this.buttons;
    },
  },
  methods: {
    button1Handler() {
      // Handle button 1 click event
    },
    button2Handler() {
      // Handle button 2 click event
    },
    cancel(event) {
      this.$emit('cancelClick', event);
    },
    // 查看话题
    selectPost(){
      this.$router.push({
				name: 'article',
				params: {
					postID: this.commentItem.post.postID
				}
			});
    },
    // 到回复页
    toSendMessage(){
      // 组装参数
      // var params = {
      //   post_id: this.commentItem.post.postID,
      //   comment_id: this.commentItem.commentID,
      //   text: "回复测试中。"
      // };
      //const result = this.$api.sendMessage(params);
      // 请求完成 关闭菜单
      this.$router.push({
				name: 'sendMessage',
				params: {
					commentItem: this.commentItem
				}
			});
    }
  },
};
</script>

<style scoped>

.button-group {
  margin-top: auto; /* 将元素推到底部 */
}

.gourd-button {
  line-height: normal;
}

.gourd-button + .gourd-button {
  margin-left: 0;
}

.button-item {
  margin-left: 0;
  width: 100%;
  border: none; 
  color: #11cc61;
}

.gourd-divider {
  margin: 0 0;
  border-color: #b3adad;
}

.gourd-overlay {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 设置容器的最小高度为视口的高度，确保容器铺满整个屏幕 */
}

.gourd-overlay--wrap {
    height: 80px;
    line-height: 80px;
    width: 100%;
    margin-top: auto;
}

.button-item-cancel {
  color: #707070;
}

</style>
