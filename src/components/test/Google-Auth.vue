<!--
###############################
本代码测试现已支持登录 Google 账号

只能获取用户基础信息，没有获取登录秘钥，不能满足安全性要求，需要配置后端服务进行辅助验证
###############################
相关文档：
    1. Google Sign-In for Websites: https://developers.google.com/identity/gsi/web
    2. Google Identity Services: https://developers.google.com/identity
    3. Google Identity Services API Reference: https://developers.google.com/identity/gsi/web/reference/js-reference
    4. Google Identity Services API Reference (中文): https://developers.google.com/identity/gsi/web/reference/js-reference?hl=zh-cn

    5. Java 后端文档: https://developers.google.com/api-client-library/java?hl=zh-cn
    6. RuoYi 后台扩展 (RuoYi-Vue_Oauth2.0): https://pan.baidu.com/s/1OVgEAe9mwBc6kkKHxX8ZCA（提取码: c475）
       https://doc.ruoyi.vip/ruoyi-vue/document/xmkz.html#%E5%90%8E%E5%8F%B0%E6%89%A9%E5%B1%95
###############################
可以获取用户的：
    1. OpenID
    2. 名称 (包含姓+名+自定义的名称/称呼)
    3. 姓+名 (即First Name + Last Name，分别对应 Google 的 given_name 和 family_name)
    3. 邮箱
    4. 头像链接

参考:
    1. 姓 = family_name = Last Name
    2. 名 = given_name = First Name
    3. 姓名 = name = First Name + Last Name
    示例：'张三' 按照国际化处理最终应当为：'三 张' = 'San Zhang' (国际化里名字的【名】在前，【姓】在后)

注意：
    1. 处理用户姓名时请将 'family_name' 和 'given_name' 两个值作为两个独立的字段处理并录入数据库，后期在前端展示时再拼接合并为 'name' 字段 ('First Name' + 'Last Name' 形式)
###############################
-->

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="p-8 bg-white shadow-md rounded-lg">
      <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Google 登录</h1>
      <div id="googleLoginButton" class="flex justify-center"></div>
      <div v-if="user" class="mt-4 text-center">
        <img :src="user.picture" alt="User avatar" class="w-16 h-16 rounded-full mx-auto mb-2" />
        <p class="text-gray-700">欢迎，{{ user.name }}！</p>
        <p class="text-sm text-gray-500">姓: {{ user.familyName }}</p>
        <p class="text-sm text-gray-500">名: {{ user.givenName }}</p>
        <p class="text-sm text-gray-500">{{ user.email }}</p>
        <p class="text-sm text-blue-600">OpenID: {{ user.openid }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const user = ref(null);

    const handleCredentialResponse = (response) => {
      try {
        const credential = response.credential;
        if (!credential) {
          throw new Error('No credential received');
        }
        const parts = credential.split('.');
        if (parts.length !== 3) {
          throw new Error('Invalid credential format');
        }
        const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = atob(base64);
        const decodedToken = JSON.parse(jsonPayload);

        // 解码用户信息
        const decodedName = decodeURIComponent(escape(decodedToken.name));
        const decodedGivenName = decodeURIComponent(escape(decodedToken.given_name));
        const decodedFamilyName = decodeURIComponent(escape(decodedToken.family_name));
        // const decodedPicture = decodedToken.picture;
        let decodedPicture = decodedToken.picture;
        const decodedEmail = decodedToken.email;
        const decodedOpenID = decodedToken.sub; // OpenID 在 ID Token 中通常是 'sub' 字段

        // 去掉头像链接中的大小值
        decodedPicture = decodedPicture.replace(/=s\d+-c$/, '');
        user.value = {
          name: decodedName,
          email: decodedEmail,
          openid: decodedOpenID,
          picture: decodedPicture,
          givenName: decodedGivenName,
          familyName: decodedFamilyName
        };
      } catch (error) {
        console.error('Error handling credential response:', error);
      }
    };

    onMounted(() => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      script.onload = () => {
        window.google.accounts.id.initialize({
          client_id: '594085841244-1n6qbd9oi10vqv0gb9r4iq7m7eqg50q6.apps.googleusercontent.com', // 客户端 ID
          callback: handleCredentialResponse,
          scope: 'openid profile email' // 添加 Google Web Console 已允许的权限 scopes
        });
        window.google.accounts.id.renderButton(
          document.getElementById('googleLoginButton'),
          { theme: 'outline', size: 'large' }
        );
      };
    });

    return {
      user
    };
  }
};
</script>