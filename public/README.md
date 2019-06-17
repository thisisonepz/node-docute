# md格式

```$xslt
 md格式：
 标题 ##  （）
 md 内容
 示列：
  ##  标题
  
  1. xxx 
  2. xxx
  3. xxx
```
# md文件位置 /public/doc
- after_handle 检验后处理
- pre_handle  检验处理
- pre_processing 检验前处理
- public-md 公共

## 导航栏

```js
new Docute({
  title: 'Docute',
  nav: [
    {
      title: 'Home',
      link: '/'
    },
    {
      title: 'GitHub',
      link: 'https://github.com/egoist/docute'
    },
    // A dropdown menu
    {
      title: 'Community',
      children: [
        {
          title: 'Spectrum',
          link: 'https://spectrum.chat/your-community'
        },
        {
          title: 'Discord',
          link: 'https://discord.app/your-discord-server'
        }
      ]
    }
  ]
})
```

`title` 选项的默认值是 `<title>` 标签的内容，因此这个选项不是必需的。


## 侧边栏

侧边栏一般用于跨页面的导航

```js
new Docute({
  sidebar: [
    {
      title: 'Guide', // 可选的
      collapsable: true, // 可选的
      children: [
        {
          title: 'Getting Started',
          link: '/guide/getting-started'
        },
        {
          title: 'Installation',
          link: '/guide/installation'
        },
      ]
    }
  ]
})
```



