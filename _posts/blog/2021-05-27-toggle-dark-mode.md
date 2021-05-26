---
title: minimal-mistakes 테마 다크 모드 토글 적용 - Github Pages 운영
excerpt: Github Pages의 minimal-mistakes 테마에 다크 모드 적용기
categories:
  - Blog
tags:
  - Blog
  - Dark Mode
  - Jekyll
  - minimal-mistakes
date: 2021-05-26T15:16:52.635Z
last_modified_at: 2021-05-26T15:17:59.540Z
---

초기에 Gitgub Pages를 구축할 때 특별히 테마를 생각하지 않고 stars가 가장 많은 테마로 골랐다.  
그게 minimal-mistakes 테마였다.  
찾아보니 조금 더 이쁘장하고 다크모드도 지원하는 테마 [Beautiful Jekyll](https://beautifuljekyll.com/) 이라는 테마가 있었지만, 난 이미 블로그 테마를 다시 바꾸기에 귀찮아져 버렸다.  

그래서 공부도 하고 내 블로그도 꾸미려고 다크모드 토글을 내가 직접 구현했다.  

좀 더 현명한 사람들은 [여기](https://jekyllthemes.io/free)에서 맘에 드는 테마로 확인하길 바란다.  

## 적용기

## 결론

### 1. Git Commit

급한 사람은 아래 두 커밋을 확인하길 바란다. ( ❗ 정리가 안되있어서 복잡하다..)  

- [커밋1](https://github.com/etch-cure/etch-cure.github.io/commit/16b40bbfbd786d410c71232f1e7e0a16b9cd1a30)
- [커밋2](https://github.com/etch-cure/etch-cure.github.io/commit/2893e613d2d471a4c4631d69421ab6b1dffa0dee)

### 2. 메인 소스

#### - _config.yml

다크 모드 토글 옵션 추가, header에 스크립트 삽입  

<details>
<summary>코드 내용</summary>
<div markdown="1">

```yml
# _config.yml
dark_theme_toggle        : true # 다크 모드 토글 기능 추가
head_scripts:
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

var defaultTheme = [...document.styleSheets].find(style => /(main.css)$/.test(style.href))
var darkTheme = [...document.styleSheets].find(style => /(main_dark.css)$/.test(style.href))
var changeTheme

if (darkTheme) {
    const darkModeCookie = document.cookie
        .split('; ')
        .find(co => co.startsWith('MDARK='))
    if (darkModeCookie !== undefined) {
        const dmodeValue = darkModeCookie.split('=')[1]
        darkTheme.disabled = dmodeValue !== 'Y'
        defaultTheme.disabled = dmodeValue === 'Y'
    } else {
        if (matchMedia('(prefers-color-scheme: dark)').matches) {
            let toggleThemeBtn = document.getElementById("toggle_dark_theme")
            if (toggleThemeBtn) {
                toggleThemeBtn.checked = true
            }
            darkTheme.disabled = false
            defaultTheme.disabled = true
        } else {
            darkTheme.disabled = true
            defaultTheme.disabled = false
        }
        document.cookie = `MDARK=${darkTheme.disabled ? 'N' : 'Y'}; path=/;`
    }
    changeTheme = () => {
        darkTheme.disabled = !darkTheme.disabled
        defaultTheme.disabled = !darkTheme.disabled
        document.cookie = `MDARK=${darkTheme.disabled ? 'N' : 'Y'}; path=/;`
    }
}
```

</div>
</details>

#### - head.html

다크 모드 토글 옵션이 켜진 경우 css를 가지고옴  
( ~~*liqid 문법이 적용되서 코드를 올리기 힘들다. 주석처리가 안되네ㅠㅠ*~~ )  

<details>
<summary>코드 내용</summary>
<div markdown="1">
![togglebutton](/assets/image/2021-05-27-toggle-dark-mode/20210527_014302.png)
</div>
</details>

#### - main_dark.scss

main_dark.scss를 추가한다. 파일 위치는 assets/css/main_dark.scss  

<details>
<summary>코드 내용</summary>
<div markdown="1">

```scss
---
# Only the main Sass file needs front matter (the dashes are enough)
---

@charset "utf-8";

@import "minimal-mistakes/skins/{{ 'dark' }}";
@import "minimal-mistakes"; // main partials

```

</div>
</details>

### 3. 토글 버튼 추가

#### - toggle.scss

토글 버튼 css 추가한다. 파일 위치는 _sass/custom/toggle.scss  

<details>
<summary>코드 내용</summary>
<div markdown="1">

```scss
.tgl {
    display: none;

    // add default box-sizing for this scope
    &,
    &:after,
    &:before,
    & *,
    & *:after,
    & *:before,
    & + .tgl-btn {
        box-sizing: border-box;
        &::selection {
            background: none;
        }
    }

    + .tgl-btn {
        outline: 0;
        display: block;
        width: 3em;
        height: 1.5em;
        position: relative;
        cursor: pointer;
        user-select: none;
        &:after,
        &:before {
            position: relative;
            display: block;
            content: "";
            width: 50%;
            height: 100%;
        }

        &:after {
            left: 0;
        }

        &:before {
            display: none;
        }
    }

    &:checked + .tgl-btn:after {
        left: 50%;
    }
}

.tgl-light {
    + .tgl-btn {
        background: lightgray;
        border-radius: 1.5em;
        padding: 2px;
        transition: all 0.4s ease;
        &:after {
            border-radius: 50%;
            background: white;
            transition: all 0.2s ease;
        }
    }

    &:checked + .tgl-btn {
        background: gray;
    }
}

```

</div>
</details>

#### - minimal-mistakes.scss

minimal-mistakes.scss에 토글 scss 삽입  

<details>
<summary>코드 내용</summary>
<div markdown="1">
![togglebutton](/assets/image/2021-05-27-toggle-dark-mode/20210527_013851.png)
</div>
</details>

#### - masthead.html

상단 메뉴에 토글 버튼 추가

<details>
<summary>코드 내용</summary>
<div markdown="1">
![togglebutton](/assets/image/2021-05-27-toggle-dark-mode/20210527_013539.png/)
</div>
</details>

---

마지막으로 이상하거나 이해안되는 것이 있으면 피드백 부탁드립니다.
