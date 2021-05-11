---
title:  "마크 다운 연습장"
excerpt: "마크 다운 연습"

categories:
  - Blog
tags:
  - Blog
  - markdown
---

# 마크 다운 연습장

## 1. 줄바꿈

- 일반 문단인 경우
  - 라인끝에 띄어쓰기 두번  
- 여러 라인을 넣고 싶으면
  - `<br/>`

<br/>

## 2. 강조

```md
*강조 1*  
_강조 2_  
**강조 3**  
__강조 4__  
~~취소선~~  
```

*강조 1*  
_강조 2_  
**강조 3**  
__강조 4__  
~~취소선~~  
<br/>

## 3. 헤더

```md
# H1 태그
## H2 태그
### H3 태그
#### H4 태그
##### H5 태그
###### H6 태그
```

<br/>

## 4. 인용

```md
> 인용
>> 인용2
>>> 인용3
```

> 인용
>> 인용2
>>> 인용3

<br/>

## 5. 목록

### - 순서 있는 목록

```md
1. 첫번째
1. 두번쨰
1. 세번째
```

1. 첫번째
1. 두번쨰
1. 세번째

<br/>

### - 순서 없는 목록

```md
- a
  + b
    * c
```

- a
  - b
    - c
  
<br/>

## 6. 코드 블록

```md
    ```js
    function test () {
        console.log('Hello, markdown testing.')
    }
    ```
```

```js
function test () {
    console.log('Hello, markdown testing.')
}
```

<br/>

## 7. 수평선

```md
---
<hr/>
```

---
<hr/>

<br/>

## 8. 링크

```md
[구글 링크](https://google.com, "마우스 툴팁 이건 옵션")
<https://google.com>
```

[구글 링크](https://google.com, "마우스 툴팁 이건 옵션")  
<https://google.com>  

## 9. 이미지

```md
![이미지](/assets/image/TestImage.png "테스트 이미지")
<img src="/assets/image/TestImage.png" width="300px"/>
```

![이미지](/assets/image/TestImage.png "테스트 이미지")
<img src="/assets/image/TestImage.png" width="300px"/>

## 10. 표 만들기

```md
| 가운데 정렬 | 오른쪽 정렬 | 왼쪽 정렬 |
| :---------: | ----------: | :-------- |
|   음료수    |      1000원 | 100개     |
|    과자     |      1500원 | 20개      |
```

| 가운데 정렬 | 오른쪽 정렬 | 왼쪽 정렬 |
| :---------: | ----------: | :-------- |
|   음료수    |      1000원 | 100개     |
|    과자     |      1500원 | 20개      |