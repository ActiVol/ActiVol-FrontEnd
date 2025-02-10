<template>
  <div class="agreement-container">
    <div class="header">
      <router-link class="" :to="'/register'">
        <el-icon class="icon">
          <back />
        </el-icon>
      </router-link>
    </div>
    <div class="container">
      <div class="content">
        <h2 class="content-title">隐私政策</h2>
        <p class="desc">
          Volunteer 非常重视对用户隐私权的保护，承诺不会在未获得用户许可的情况下擅自将用户的个人资料信息出租或出售给任何第三方，但以下情况除外:
        </p>
        <ul type="circle">
          <li>
            <span class="li-item">您同意让第三方共享资料；</span>
          </li>
          <li>
            <span class="li-item">您同意公开你的个人资料，享受为您提供的产品和服务；</span>
          </li>
          <li>
            <span class="li-item">本站需要听从法庭传票、法律命令或遵循法律程序；</span>
          </li>
          <li>
            <span class="li-item">本站发现您违反了本站服务条款或本站其它使用规定。</span>
          </li>
        </ul>
      </div>
      <div class="msg">如果您对此条款有任何疑问或建议，欢迎通过邮件联系我们：1213832965@qq.com</div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
.agreement-container {
  background-color: #ffffff;
  width: 90%;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  padding: 24px 40px;
  padding-bottom: 400px;
  .header{
    padding: 20px 5px;
  }
  .container{
    padding: 0;
    .content{
      text-align: center;
      font-size: 20px;
      h2{
        display: block;
        font-size: 1.5em;
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
      }
      .desc{
        text-indent: 2em;
        text-align: left;
        font-size: 16px;
      }
      ul{
        display: block;
        list-style-type: disc;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 40px;
        li{
          line-height: 24px;
          text-align: left;
          padding: 5px;
          .li-item{
            font-size: 16px;
          }
        }
        li::marker{
          unicode-bidi: isolate;
          font-variant-numeric: tabular-nums;
          text-transform: none;
          text-indent: 0px !important;
          text-align: start !important;
          text-align-last: start !important;
        }
      }
    }
  }
}

.msg{
    background-color: #fcf8e3;
    border-color: #faebcc;
    color: #8a6d3b;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
}
@media screen and (max-width: 760px) {
  .container{
      padding: 0;
    }
    .main{
      padding: 24px;
      box-sizing: border-box;
      margin: 0;
      width: 100%;
    }
    .orderly-list-item{
      margin-left: 1.2em;
    }
}
</style>
