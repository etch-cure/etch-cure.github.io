---
title: Github Pages (github 블로그)를 운영할때 추천하는 vscode 플러그인 1
excerpt: 'Jekyll Run, Front Matter 라는 vscode 플러그인에 대해 간단한 사용법'
categories:
  - Blog
tags:
  - Blog
  - Front Matter
  - Jekyll Run
  - mmistakes/minimal-mistakes
date: 2021-05-22T15:41:24.817Z
last_modified_at: 2021-05-22T15:41:24.817Z
---

github pages를 운영하기 시작하면서 포스팅 하나 쓰려고 하는데 기억해야 될 내용들이 많아서 귀찮았다.
이런 부분을 그냥 툴이 알아서 해줬으면 하는 바람에 vscode의 확장도구들을 찾아보고 추천한다.  

아래 4가지를 추천할 생각이다.  
Jekyll Run, Front Matter, markdownlint, Markdown All in One

우선 이번에 Jekyll Run, Front Matter에 대해 포스팅한다.

## Jekyll Run

![Jekyll Run](/assets/image/2021-05-22-github-pages-plugin/jekyll%20run.png)

로컬 환경에서 Jekyll을 돌려주는 플러그인이다.  
설치하고 단축기로 Jekyll을 동작시킬수 있다.  
콘솔에 Jekyll Run을 치는 수고를 줄일 수 있다.

|      동작      |    단축키 | 설명                                                                          |
| :------------: | --------: | :---------------------------------------------------------------------------- |
|   Jekyll Run   | (ctrl+F5) | Builds Project, Starts Jekyll Server & Opens the local hosted site in Browser |
|  Jekyll Stop   | (ctrl+F6) | Stops Jekyll Server                                                           |
| Jekyll Restart | (ctrl+F7) | Restarts Jekyll Server                                                        |
|  Jekyll Build  | (ctrl+F8) | Builds Project                                                                |

<br>

## Front Matter

![Front Matter](/assets/image/2021-05-22-github-pages-plugin/front%20matter.png)

front matter의 내용을 수정해 주는 플러그인이다.  
특히 template로 정해둔 내용으로 파일을 만들어주기도 한다.  

우선 설치를 하면 왼쪽에 front matter 탭이 생긴다.  

![Front Matter](/assets/image/2021-05-22-github-pages-plugin/20210523_002626.png)

현재 문서에서 front matter를 분석하면 다음과 같은 화면이 나온다.  

![Front Matter](/assets/image/2021-05-22-github-pages-plugin/20210523_002828.png)

### 1. 날짜 생성/변경 기능

여기서 Set Modified date 버튼을 누르거나  
명령 팔레트(ctrl + shift + p)에 **> Front Matter: Set lastmod date**를 입력하면 현재 시간으로 수정날짜가 생성/변경된다.  
이외에도 Set publish date로 date를 생성/변경할 수도 있다.

![Front Matter](/assets/image/2021-05-22-github-pages-plugin/20210523_013416.png)

<details>
<summary>설정 변경</summary>
<div markdown="1">

나는 mmistakes/minimal-mistakes라는 테마를 사용하고 있으므로 몇가지 세팅을 바꾸었다.  
vs code 확장의 설정에 들어가는 방법은 다른 포스팅을 참고하길 바란다. (필요하면 따로 포스팅하겠다. 댓글로 요청바란다.)  

![Front Matter](/assets/image/2021-05-22-github-pages-plugin/20210523_003714.png)

1. frontMatter.taxonomy.modifiedField
   - set modifed date 버튼을 눌렀을 때 변경값을 lastmod -> last_modified_at 로 변경
2. frontMatter.taxonomy.categories
   - 카테고리의 구분자를 - 로 바꾼다.
3. frontMatter.taxonomy.tags
   - 태그의 구분자를 - 로 바꾼다.

</div>
</details>

### 2. 기본 문서 생성 기능 (포스팅 생성 기능)

아래 그림처럼 _post 폴더에 미리 설정해둔 front matter로 파일을 생성하는 기능이다.  
이 기능은 포스팅을 생성할 때 매우 유용한 것 같다.

![Front Matter](/assets/image/2021-05-22-github-pages-plugin/20210523_011145.png)

이것을 만드려면 프로젝트 root에 .template폴더 기본 포스팅할 형식을 만들어 두고 사용하면 된다.  
이때 확장자가 똑같이 생성되므로 .md를 확장자로 해두면 된다.  

![Front Matter](/assets/image/2021-05-22-github-pages-plugin/20210523_011712.png)

<details>
<summary>내 기본 post의 front matter</summary>
<div markdown="1">

내 테마에서 date는 필요없지만 넣어두었고 last_modified_at은 마지막 수정날짜가 있어야 좋을 것 같아서 넣어두었다 나머지 설정값은 다 _config.yml의 default에 있다.

![Front Matter](/assets/image/2021-05-22-github-pages-plugin/20210523_012350.png)
![Front Matter](/assets/image/2021-05-22-github-pages-plugin/20210523_012441.png)
</div>
</details>

---

[다음 포스트: 추천 플러그인 2](../github-pages-plugin2/)

마지막으로 이상하거나 이해안되는 것이 있으면 피드백 부탁드립니다.
