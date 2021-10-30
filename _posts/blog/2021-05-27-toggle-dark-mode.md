---
title: minimal-mistakes 테마 다크 모드 토글 적용 - Github Pages 운영
excerpt: Github Pages의 minimal-mistakes 테마에 다크 모드 적용기
categories:
    - Blog
tags:
    - Blog
    - Dark Mode
    - Github Page
    - Jekyll
    - minimal-mistakes
date: 2021-05-26T15:16:52.635Z
last_modified_at: '2021-10-30T09:08:03.919Z'
---

초기에 Gitgub Pages를 구축할 때 특별히 테마를 생각하지 않고 stars가 가장 많은 테마로 골랐다.  
그게 minimal-mistakes 테마였다.  
찾아보니 조금 더 이쁘장하고 다크모드도 지원하는 테마 [Beautiful Jekyll](https://beautifuljekyll.com/) 이라는 테마가 있었지만, 난 이미 블로그 테마를 다시 바꾸기에 귀찮아져 버렸다.  

그래서 공부도 하고 내 블로그도 꾸미려고 다크모드 토글을 내가 직접 구현했다.  

좀 더 현명한 사람들은 [여기](https://jekyllthemes.io/free)에서 맘에 드는 테마로 확인하길 바란다.  

## 적용기

### 1. _config에 옵션 추가

_config.yml에 다크 모드 토글 버튼에 대한 옵션을 추가한다.

```yml
dark_theme_toggle        : true
```

### 2. 토글 버튼 만들기

우선 오른쪽 위에 토글 버튼을 만들어 본다.  
아래 사이트에서 토글 버튼의 코드를 주었다.  
[Css 토글 버튼](https://codepen.io/mallendeo/pen/eLIiG)
*현재는 코드를 수정하여 적용하였음*

그리고 아래 파일을 만들어서 넣어 주었다.  
[_sass/custom/toggle.scss](#--togglescss)

이후에 컴파일에 포함되어야 하기 때문에 customOverride.scss에서 import main.scss에 포함되게 하였다.  
[_sass/custom/customOverride.scss](#--customoverridescss)

### 3. 헤더 커스텀

토글 버튼을 헤더에 넣기 위해 헤더를 커스텀 했다.  
[_includes/masthead.html](#--mastheadhtml)

결과 잘 적용 됬다.  
![togglebutton](/assets/image/2021-05-27-toggle-dark-mode/20210529_124250.png)

### 4. 다크 모드 css 만들기

minimal-mistakes의 테마적용 방식을 우선 살펴 보있다.  
sass의 변수를 통한 방법으로 적용되어있다.  
[_sass/minimal-mistakes/skins/_dark.scss](https://github.com/etch-cure/etch-cure.github.io/blob/a11415e8d8b0b55ef363aa21343aabaeb2b186cf/_sass/minimal-mistakes/skins/_dark.scss)

*skin에 있는 변수를 css 변수로 바꾸어 css를 만들어 보려 했지만...*
<details>
<summary>매우 어렵다는 결론을 냈다.</summary>
<div markdown="1">
스킨파일의 색깔 변수를 @mixin을 통해 scss변수를 override해서 css 변수로 바꾸어보았지만  
목표:
```scss
// _dark.scss
$background-color: #252a34 !default;

// @mixin을 통한 결과
[data-theme="dark"] {
    --mh-background-color: #123456;
}
$background-color: var(--mh-background-color) !global;

// _variable.scss의 !default 변수 무시
$background-color: #fff !default;

```

minimal-mistakes내부에서 색깔 함수(ex. mix, red...)를 사용하고 있다.  
*이거 해보려고 삽질했다... 덕분에 scss를 공부하긴 했다.*
</div>
</details>
<br>

그렇다면 테마에 따른 [css 변수](https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_custom_properties)를 쓴것도 아니고 [css 선택자](https://developer.mozilla.org/ko/docs/Web/CSS/:root)를 사용한 것도 아니어서
추가로 메인 css 파일을 만들 수 밖에 없다고 생각했다.  
(*css 커스텀 한 분들은 [이분 블로그](https://github.com/habijung/habijung.github.io)참고하세요*)  

그래서 main.scss파일에서 테마만 바꾼 main_dark.scss 파일을 만들었다.  
[assets/css/main_dark.scss](#--main_darkscss)

"jekyll build"를 통해서 빌드를 해서 확인 해보니 정상적으로 두개의 css 파일이 생성된 것을 확인할 수 있다.  

![togglebutton](/assets/image/2021-05-27-toggle-dark-mode/20210529_131709.png)

### 5. main_dark.css 파일 가지고 오기

head.html에서 main.css를 가지고 오고 난후 main_dark.css를 가지고 오도록 한다.  
[_includes/head.html](#--headhtml)

### 6. 다크 모드 토글 스크립트 작성

우선 작성한 코드이다.  
[assets/js/custom/dark-theme.js](#--dark-themejs)

코드 내용을 간략히 설명하면 임포트한 css를 찾고 로컬 스토리지와 미디어쿼리를 확인해서
main.css 혹은 main_dark.css를 disabled 시켜준다.  
이후 토글 버튼을 찾아서 테마와 상태를 일치시켜주고 클릭 이벤트를 등록 하였다.  

### 7. dark-theme.js 스크립트 가지고 오기

마지막으로 _config.yml파일에 아래 내용을 추가하여 footer에 커스텀 스크립트를 등록한다.

```yml
after_footer_scripts:
  - /assets/js/custom/dark-theme.js
```

### 8. 토글 버튼에 이미지 로드하기

구글 웹폰트중 [아이콘](https://fonts.google.com/icons)을 import한다.  
[_sass/custom/customImport.scss](#--customimportscss)

아이콘을 적용할 태그에 "material-icons-sharp" css 클래스를 적용하고  
[_includes/masthead.html](#--mastheadhtml)  
css에 content에 테마에 따른 선택자에 "brightness_7"(라이트) 또는 "brightness_4"(다크)를 넣어주면 된다.  
[_sass/custom/toggle.scss](#--togglescss)

![토글이미지 적용](/assets/image/2021-05-27-toggle-dark-mode/20211030_171655.png)

## 결론

### 1. 메인 소스

#### - _config.yml

다크 모드 토글 옵션 추가, footer에 스크립트 삽입  

<details>
<summary>코드 내용</summary>
<div markdown="1">

```yml
# _config.yml
dark_theme_toggle        : true # 다크 모드 토글 기능 추가
after_footer_scripts:
  - /assets/js/custom/dark-theme.js
```

</div>
</details>

#### - dark-theme.js

다크 모드 스크립트 작성  

<details>
<summary>코드 내용</summary>
<div markdown="1">

```js
/* assets/js/custom/dark-theme.js */
const defaultTheme = [...document.styleSheets].find(style => /(main.css)$/.test(style.href));
const darkTheme = [...document.styleSheets].find(style => /(main_dark.css)$/.test(style.href));

let setDarkMode = (isDark) => {
    darkTheme.disabled = isDark !== true;
    defaultTheme.disabled = isDark === true;
    localStorage.setItem('theme', isDark ? 'dark' : 'default');
}

if (darkTheme) {
    let currentTheme = localStorage.getItem('theme');
    let isDarkMode = false;
    if (currentTheme) {
        isDarkMode = currentTheme === 'dark';
    } else {
        isDarkMode = matchMedia('(prefers-color-scheme: dark)').matches;
    }

    setDarkMode(isDarkMode);

    let toggleThemeBtn = document.getElementById("toggle_dark_theme")
    if (toggleThemeBtn) {
        toggleThemeBtn.checked = isDarkMode
    }

    let changeTheme = (e) => {
        setDarkMode(e.target.checked);
    }

    toggleThemeBtn.addEventListener('click', changeTheme)
}

```

</div>
</details>

#### - head.html

다크 모드 토글 옵션이 켜진 경우 css를 가지고옴  

<details>
<summary>코드 내용</summary>
<div markdown="1">

```md
<!-- For all browsers -->
<link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">
<!-- darkmode css -->
{% raw %}{% if site.dark_theme_toggle == true %}{% endraw %}
<link rel="stylesheet" href="{{ '/assets/css/main_dark.css' }}">
{% raw %}{% endif %}{% endraw %}

<!-- ... -->
```

</div>
</details>

#### - main_dark.scss

main_dark.scss를 추가한다. customImport.scss에서 구글 웹폰트를 로드하고 customOverride.scss에서 토글 버튼의 스타일을 추가한다.  파일 위치는 assets/css/main_dark.scss  

<details>
<summary>코드 내용</summary>
<div markdown="1">

```scss
---
# Only the main Sass file needs front matter (the dashes are enough)
---

@charset "utf-8";

@import "custom/customImport.scss";

@import "minimal-mistakes/skins/{{ 'dark' }}";
@import "minimal-mistakes"; // main partials

@import "custom/customOverride.scss";

```

</div>
</details>

### 2. 토글 버튼 추가

해당 토글 버튼의 UI가 싫다면 다른 버튼을 만들고나서 클릭 이벤트를 붙일 곳에 "toggle_dark_theme" 아이디를 붙여주면 된다.  

#### - toggle.scss

토글 버튼 css 추가한다. 파일 위치는 _sass/custom/toggle.scss  

<details>
<summary>코드 내용</summary>
<div markdown="1">

```scss
.mh_toogle {
    display: none;
    + .mh_toggle_btn {
        box-sizing: border-box;
        outline: 0;
        display: block;
        width: 3em;
        height: 1.5em;
        position: relative;
        cursor: pointer;
        user-select: none;
        border-radius: 1.5em;
        padding: 2px;
        transition: all 0.4s ease;
        font-size: 1em;

        &:after {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50%;
            height: 100%;
            border-radius: 50%;
            transition: all 0.4s ease;
            color: gray;
            background: white;
        }

        background: lightgray;
        &:after {
            left: 0;
            content: "brightness_7";
        }
    }

    &:checked + .mh_toggle_btn {
        background: gray;
        &:after {
            left: 50%;
            content: "brightness_4";
        }
    }
}

```

</div>
</details>

#### - customImport.scss

customImport.scss에서 구글 웹폰트중에서 아이콘을 로드  
이후 해당 파일을 main.scss 와 main_dark.scss에서 import 하면 된다.  
<details>
<summary>코드 내용</summary>
<div markdown="1">

```scss
/* font */
@import url('https://fonts.googleapis.com/css?family=Nanum+Gothic');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Sharp');

```

</div>
</details>

#### - customOverride.scss

customOverride.scss에서 toggle.scss 삽입  
이후 해당 파일을 main.scss 와 main_dark.scss에서 import 하면 된다.  
<details>
<summary>코드 내용</summary>
<div markdown="1">

```scss
@import "./toggle.scss";
@import "./summary.scss";
/* ... */
```

</div>
</details>

#### - masthead.html

상단 메뉴에 토글 버튼 추가

<details>
<summary>코드 내용</summary>
<div markdown="1">

```md

<!-- ... -->

{% raw %}{% if site.search == true %}{% endraw %}
<button class="search__toggle" type="button">
    <span class="visually-hidden">{% raw %}{{ site.data.ui-text[site.locale].search_label | default: "Toggle search" }}{% endraw %}</span>
    <svg class="icon" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.99 16">
    <path d="M15.5,13.12L13.19,10.8a1.69,1.69,0,0,0-1.28-.55l-0.06-.06A6.5,6.5,0,0,0,5.77,0,6.5,6.5,0,0,0,2.46,11.59a6.47,6.47,0,0,0,7.74.26l0.05,0.05a1.65,1.65,0,0,0,.5,1.24l2.38,2.38A1.68,1.68,0,0,0,15.5,13.12ZM6.4,2A4.41,4.41,0,1,1,2,6.4,4.43,4.43,0,0,1,6.4,2Z" transform="translate(-.01)"></path>
    </svg>
</button>
{% raw %}{% endif %}{% endraw %}
<!-- 다크 모드 토글 버튼 -->
{% raw %}{% if site.dark_theme_toggle == true %}{% endraw %}
<input id="toggle_dark_theme" class="mh_toogle" type="checkbox">
<label for="toggle_dark_theme" class="material-icons-sharp mh_toggle_btn"></label>
{% raw %}{% endif %}{% endraw %}
<button class="greedy-nav__toggle hidden" type="button">
    <span class="visually-hidden">{% raw %}{{ site.data.ui-text[site.locale].menu_label | default: "Toggle menu" }}{% endraw %}</span>
    <div class="navicon"></div>
</button>

<!-- ... -->
```

</div>
</details>

---

마지막으로 이상하거나 이해안되는 것이 있으면 피드백 부탁드립니다.
