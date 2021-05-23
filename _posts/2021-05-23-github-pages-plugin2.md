---
title: Github Pages (github 블로그)를 운영할때 추천하는 vscode 플러그인 2
excerpt: 'Markdown All in One, markdownlint 라는 vscode 플러그인에 대해 간단한 사용법'
categories:
  - Blog
tags:
  - Blog
  - Markdown All in One
  - markdownlint
  - mmistakes/minimal-mistakes
date: 2021-05-23T06:48:08.791Z
last_modified_at: 2021-05-23T06:51:25.429Z
---

github pages를 운영할때 유용한 vscode 플러그인 추천 두번째 포스팅이다.  
이번에는 markdownlint, Markdown All in One를 추천하려한다.  

## markdownlint

![markdownlint](/assets/image/2021-05-23-github-pages-plugin2/20210523_155435.png)

마크다운 사용시 린트 기능을 제공한다.  
저장했을 때 자동저장 기능도 제공한다.  

프로젝트 root에 .markdownlint.json을 만들어 두면 플러그인의 설정을 바꿀 수 있다.  

<details>
<summary>내가 막아놓은 경고이다.</summary>
<div markdown="1">

![markdownlint](/assets/image/2021-05-23-github-pages-plugin2/20210523_155849.png)

| 옵션         |                                  설명 |
| :----------- | ------------------------------------: |
| MD013: false |                   Line 길이 제한 해제 |
| MD033: false | 마크다운 파일내에 html 태그 사용 가능 |

</div>
</details>

<br>
추가로 린트에 따라 파일을 자동으로 고치고 싶다면  
vscode 설정에 아래 옵션을 추가하길 바란다.  

![markdownlint](/assets/image/2021-05-23-github-pages-plugin2/20210523_161044.png)

<br>

## Markdown All in One

![Markdown All in One](/assets/image/2021-05-23-github-pages-plugin2/20210523_161203.png)

마크다운 파일의 단축키 기능을 제공한다.  
이외에 자동 완성(인텔리센스), 포멧팅 기능을 제공한다.  

자세한 내용은 해당 플러그인의 소개 페이지에 더 자세히 나와있다.  
[Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)

여기서는 몇가지 유용한 기능만 알아 보겠다.

### 1. 단축키 기능

| 단축키               |                      설명 |
| :------------------- | ------------------------: |
| Ctrl/Cmd + B         |          텍스트 볼드 토글 |
| Ctrl/Cmd + I         |        텍스트 이테릭 토글 |
| Ctrl/Cmd + Shift + ] |   현재 해딩의 번호를 올림 |
| Ctrl/Cmd + Shift + [ |   현재 해딩의 번호를 내림 |
| Ctrl/Cmd + M         |            수학 수식 토글 |
| Alt + C              |     체크 박스 아이템 토글 |
| Ctrl/Cmd + Shift + V | 현재 창에 프리뷰를 보여줌 |
| Ctrl/Cmd + K V       | 옆의 창에 프리뷰를 보여줌 |

### 2. 테이블 자동 정리

md 파일의 테이블 형식으로 작성하고 문서 서식 (alt + shift + f)를 입력하면
보기 테이블이 보기 좋게 바뀐다.

![Markdown All in One](/assets/image/2021-05-23-github-pages-plugin2/20210523_162510.png)

문서 서식 (alt + shift + f) 입력

![Markdown All in One](/assets/image/2021-05-23-github-pages-plugin2/20210523_162559.png)

### 3. 자동 완성 (인텔리센스)

매우 유용한 기능이다.
특정 위치의 파일의 이름을 알려주거나 현재 링크 변수를 알려준다.  
이외에도 복사해둔 링크를 빠르게 md파일의 링크로 만들어준다.  

하나씩 알아보자  

#### 3-1. 이미지 폴더의 파일 이름 자동완성

이미지를 assets에 저장해두고 사용할 때 어떤 이미지를 가지고 와야하는 지 햇갈릴 떄가 많은 데 이럴때 유용하다.  

![Markdown All in One](/assets/image/2021-05-23-github-pages-plugin2/20210523_163434.png)

> 아래 예시처럼 링크 변수의 이미지파일 이름은 아쉽게도 자동완성이 되지 않는다.  
> [이미지 링크 변수]: /assets/image/2021-05-23-github-pages-plugin2/

#### 3-2. 링크 변수 자동완성

![Markdown All in One](/assets/image/2021-05-23-github-pages-plugin2/20210523_163629.png)

#### 3-3. 링크 자동 붙여넣기

링크를 복사한 후 붙여넣기를 했을 떄 자동으로 md형식으로 바꿔주는 기능이다.  

우선 링크를 복사한 후  
![Markdown All in One](/assets/image/2021-05-23-github-pages-plugin2/20210523_164237.png)

링크의 이름을 md 파일에 적고 나서 section을 만든다.

![Markdown All in One](/assets/image/2021-05-23-github-pages-plugin2/20210523_164509.png)

그리고 ctrl + v 를 입력하면 링크를 자동으로 입력해준다.  

![Markdown All in One](/assets/image/2021-05-23-github-pages-plugin2/20210523_164620.png)

[내 블로그](https://etch-cure.github.io/)

끝으로 다들 github pages를 운영하는데 도움이 되었으면 좋겠다.  

---

[이전 포스트: 추천 플러그인 1](../github-pages-plugin/)

마지막으로 이상하거나 이해안되는 것이 있으면 피드백 부탁드립니다.
