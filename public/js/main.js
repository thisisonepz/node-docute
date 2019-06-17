const chars = {
  "&": "&amp;",
  ">": "&gt;",
  "<": "&lt;",
  '"': "&quot;",
  "'": "&#39;",
  "`": "&#96;"
};
L2Dwidget.init({
  display: {
    position: 'right',
    width: 200,
    height: 400
  },
  dialog: {
    // 开启对话框
    enable: true,
    script: {
       // 每空闲 10 秒钟，显示一条一言
      'every idle 20s': '你好呀~~',
       // 当触摸到角色身体
      'tap body': '哎呀！别碰我！',
       // 当触摸到角色头部
      'tap face': '人家已经不是小孩子了！'
    }
  }
});
// Dynamically create a RegExp from the `chars` object
const re = new RegExp(Object.keys(chars).join("|"), "g");

// Return the escaped string
const htmlEscape = (str = "") => String(str).replace(re, match => chars[match]);
const html = (literals, ...substs) => {
  return literals.raw.reduce((acc, lit, i) => {
    let subst = substs[i - 1];
    if (Array.isArray(subst)) {
      subst = subst.join("");
    } else if (acc.endsWith('$')) {
      // If the interpolation is preceded by a dollar sign,
      // substitution is considered safe and will not be escaped
      acc = acc.slice(0, -1);
    } else {
      subst = htmlEscape(subst);
    }

    return acc + subst + lit;
  });
};
const PatreonIcon = {
  template: html`
    <svg
      width="569px"
      height="546px"
      viewBox="0 0 569 546"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Patreon logo</title>
      <g>
        <circle
          fill="rgb(249, 104, 84)"
          id="Oval"
          cx="362.589996"
          cy="204.589996"
          r="204.589996"
        ></circle>
        <rect
          fill="rgb(5, 45, 73)"
          id="Rectangle"
          x="0"
          y="0"
          width="100"
          height="545.799988"
        ></rect>
      </g>
    </svg>
  `
}
const ColorBox = {
  props: ['color'],
  template: `<span class="color-box" :style="{background:color}"></span>`
};
axios.get('http://localhost:8888/users').then(res => {
  new Docute({
    target: '#docute',
    layout: 'narrow',
    title: '文档',
    darkThemeToggler: true,
    componentMixins: [{
      data() {
        return {
          builtinLanguages: [
            "markup",
            "xml",
            "html",
            "mathml",
            "svg",
            "css",
            "clike",
            "javascript",
            "js"
          ],
        }
      },
      methods: {
        insertCustomFontsCSS() {
          const ID = 'custom-fonts-css';
          const existing = document.getElementById(ID);
          if (existing) {
            existing.parentNode.removeChild(existing)
          } else {
            const style = document.createElement('style');
            style.id = ID;
            style.textContent = `
            /* Import desired font from Google fonts */
            @import url('https://fonts.googleapis.com/css?family=Lato');

            /* Apply the font to body (to override the default one) */
            body {
              font-family: Lato, sans-serif;
            }
            `;
            document.head.appendChild(style)
          }
        }
      },
      components: {
        ColorBox
      }
    }],
    highlight: ['typescript', 'bash', 'json', 'markdown'],
    detectSystemDarkTheme: true,
    sidebar: res.data,
    components: {
      PatreonIcon
    }
  });
});

