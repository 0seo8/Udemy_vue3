
# 그룹과제 api

## 1. [인증](https://github.com/KDT1-FE/KDT2-JS-Team#%EC%9D%B8%EC%A6%9D)

- 로그인을 하고 나면 `acessToken`이 나오게 됩니다. 이 `acessToken`는 24시간 유효합니다.
(회원가입만 해도 `acessToken`은 나옵니다)

### 1-1 [인증확인](https://github.com/KDT1-FE/KDT2-JS-Team#%EC%9D%B8%EC%A6%9D-%ED%99%95%EC%9D%B8)

- `acessToken`을 로컬스토로지에 저장을 해놓았다가, 로컬스토로지에 저장된 이 `acessToken`를 인증 확인하는 용도로 다시 서버에 요청할 수 있습니다.
- 사용자가 로그인이 된 상황이 맞다면 로그인 한 사용자가 맞다는 응답이 다시 올 것입니다. 그 응답에는 사용자 정보가 들어있습니다.

-------

### ⭐1-1 예제: 로그인을 한 상황과 아닌 상황을 구분하는 로직짜기

로그인에서 많이 사용하는 방법은 로컬스토로지입니다. 

![](https://velog.velcdn.com/images/0seo8/post/bcc3caca-fa29-4ea6-979a-3ec9081c1d03/image.png)

로컬스토로지에 임의로 currentUser값을 설정해줍니다. 로컬스토로지에의 정보는 json정보(문자데이터)이기 때문에 자바스크립트에서 사용하기 위해서 `JSON.pars`를 해줘야합니다.

#### 1) 우리가 만든 currentUser를 한번 조회해보겠습니다.

**guards.js**
```js
import router from './index.js'

router.beforeEach((to) => {
  console.log(to.meta.auth)
  console.log(JSON.parse(localStorage.getItem('currentUser')))

  return true
})
```
![](https://velog.velcdn.com/images/0seo8/post/1effc6fe-7fed-4067-939f-673fdafb4c66/image.png)

이렇게 받아온 정보의 name이 있으면 로그인을 한 정보가 맞구나~ 하고 판단을 할 수 있습니다.


#### 2) 조건설정
**guards.js**
router의 beforeEach는 모든페이지에 접근하기 직전입니다. 이 모든 페이지에 접근할 때 `to.meta.auth`가 true인 경우를 조건으로 설정하도록 하겠습니다.

```js
import router from './index.js'

router.beforeEach((to) => {
  if(to.meta.auth) { //true인 경우
    
    //currentUser에 name이 있으면 로그인 한 사람입니다, 
    //{}의 경우 null을 대비합니다.(json.parse떄문에 '{}'로합니다.)
    const {name} = JSON.parse(localStorage.getItem('currentUser') || '{}')
    if(name) {
      // name이 있으면 통과~!
      return true
    } else {
      //name이 없으면 메인페이지로 가라
      //(login페이지로 보내야하는데 없으니 메인페이지 보통은 '/login'으로 보냅니다.)
      return '/'
    }
  }

  return true
})
```

현재 로컬스토로지에 로그인 정보가 있기 때문에 about페이지가 잘뜨는 것을 확인할 수 있습니다.
반면, 로컬스토로지에 로그인 정보를 지우면, 메인페이지로 튕겨나오는 것을 확인할 수 있습니다.

![](https://velog.velcdn.com/images/0seo8/post/162a792a-f44e-4293-8f1c-b660d7bf4c75/image.png)

>**+Plus**
- 로그인을 정상적으로 해 얻게 된 accessToken을 로컬스토로지에 저장을 해 두었다가 유효한지 확인을 하게 됩니다. 
- 주의: accessToken가 있다고 무조건 유효한게 아닙니다. 24시간이 지나면 유효하지 않습니다(로컬스토로지에는 저장되어 있더라도 서버에서는 유효하지 않음)
- 인증확인을 위한 api를 통해 header에 'Authorization: Bearer `accessToken`을 보내 유효한지 확인합니다.
- 서버에서 확인을 해 유효하면 사용자정보를 반환해줍니다. 즉, 사용자정보가 반환이 되었다는 것은 accessToken이 유효하다는 것입니다. 이제 이 accessToken를 페이지를 이동할 때마다 매번 사용하게 됩니다.
  (물론, 공용페이지에서는 사용하지 않을 수 있습니다.)
- 만약 유효하지 않다면 프론트엔드 측에서 login페이지로 이동시키거나, login을 해지시킵니다.  
- 주의 'Bearer ' => 문자 데이터 Bearer 띄어쓰기 한칸까지 잘 포함해서 전송합니다.

-------

#### ⭐1-2 예제 accessToken가 유효한지 체크(API포함)

>**로컬스토로지에 accessToken를 저장한 후 실습가능**
ex) accessToken : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9

**guards.js**
```js
import router from './index.js'

async function me(accessToken) {
  const { data: user } = await axios({
    url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login',
    method: 'POST',
    headers: {
      //default infos...
      Authorization: 'Bearer ' + accessToken
    }
  })
  return !!user.email  //user정보가 undefined인 경우 !를 붙이면 true, 하나더 붙이면 false가 반환 됩니다.
}


router.beforeEach((to) => {
    if(to.meta.auth) {
      const accessToken = JSON.parse(localStorage.getItem('accessToken') || '')
      return me(accessToken)
		? true
      	: '/login'
    }

  return true
})
```


## 그룹과제 설명

api로는 다양한 것을 만들 수 있습니다.
> 예, 쇼핑몰, 호텔방 예약(이API로 완벽하게 구현하기는 힘듭니다), 옷판매,  등

## 1. 인증

#### 1-1 회원가입
- 회원가입을 만들어서 세션을 받아 어떻게 관리를 하는지

#### 1-2 로그인
- 회원가입을 한사람 입장에서는 로그인을 할 수 있습니다

#### 1-3 인증확인
- 로그인을 한사람을 페이지가 넘어갔을 때 인증확인 할 수 있습니다(로그인이 유효한지 확인)

#### 1-4 로그아웃

#### 1-5 사용자정보수정
- 사용자 이름을 바꾸거나 비밀번호를 바꾸거나 프로필이미지를 수정하는 등 자신의 정보를 수정하는 경우 갱신 가능
  - 내가 프로젝트를 만들 때 꼭 사용자가 정보를 수정해야할까?에 대해 의문을 가져보는 것이 좋다(즉, 회원정보를 수정할 수 있게 할거냐 아니냐가 선택사항)
  
## 2 [계좌](https://github.com/KDT1-FE/KDT2-JS-Team#%EA%B3%84%EC%A2%8C)
- 현재 과정에 핵심주제가 핀테크이기 때문에 계좌를 추가했습니다.
- 은행목록이 정해져있기에 은행코드에 맞게 설계를 해 사용하면 됩니다.
- 사용자의 정보입니다.

#### 2-1 선택 가능한 은행 목록 조회

- degits: 은행 계좌 숫자 ex) 312-0147-0339-66 \[3,4,4,2]
- disabled: 사용자가 선택된 은행정보는 다시 선택되지 않도록 disabled속성이 true로 변경됩니다.

#### 2-2 계좌 목록 및 잔액 조회

- 계좌 잔액등을 확인할 때 사용합니다.
- totalBalance:총금액
- accounts에 계좌정보가 있습니다.
- 💡활용 예시
  - 제품을 사용자가 구매할 때 은행계좌 돈을 통해 차감하게 됩니다.
(제품가격보다 balance가 적으면 살 수 없습니다.**즉 3만원이 남아있는 신한은행을 선택해 결제를 하려고 한다면 어떠한 메세지를 보여주면 됩니다.**)

#### 2-3 계좌 연결
- 사용자가 계좌를 선택해 등록할 때 사용할 수 있습니다. 
- 사용자들은 계좌당 기본 300만원을 쓸 수 있습니다.
- 2-1의 선택가능한 은행목록 조회에서 하나씩 선택을 합니다. 하나를 선택하면 사용자에게 추가가 됩니다(그리고 disabled:true가 됩니다)
- 필수 값 중 서명은 true, false값으로 지정될 수 있게 되어 있습니다. 서명값에 true값이 들어와야 계좌가 정상적으로 연결된 것입니다.
- 예) 사인란은 만들어 사인이 입력된 정보가 있으면 true값 없으면 fasle값

#### 2-4 계좌 해지
- 사용자가 더이상 사용하지 않을 계좌를 해지할 수 있습니다.


## 3. [제품](https://github.com/KDT1-FE/KDT2-JS-Team#%EC%A0%9C%ED%92%88)

- 프로젝트를 만들 때 어떤 api를 쓸 수 있고 제품을 등록하고 사용자가 구매하지 못하고 제품을 내리고 하는 등의 관리자 페이지를 만들 수 있습니다.
- 사용자가 페이지와 서비스 관리자가 보는 페이지를 구분해서 만들 수도 있습니다.

----
#### 💡강사님 프로젝트 예제

![](https://velog.velcdn.com/images/0seo8/post/30fa06f8-e71b-4374-8853-36c8c0bd7fd6/image.png)

- 폴더구조
![](https://velog.velcdn.com/images/0seo8/post/af2ad633-47db-4a96-8fa7-3c64dd5d90fa/image.png)
- 모든제품 조회


![](https://velog.velcdn.com/images/0seo8/post/fff13db9-d9f4-460b-b1ca-5ad63276994e/image.png)
![](https://velog.velcdn.com/images/0seo8/post/4950d5fe-9bcc-47b3-a7f4-5298cd303aaa/image.png)

회원가입의 경우 날것의 사용자가 들어오기 때문에 요청데이터 예시에서 볼 수 있듯이 accesToken과 같은 정보는 필요하지 않습니다

하지만 인증확인을 할 때의 경우 Authorization: Bearer\<accessToken>이 필요합니다.

![](https://velog.velcdn.com/images/0seo8/post/a75abd33-2c6a-4260-93f3-d1bbf4e2f585/image.png)

Bearer뒤에 띄어쓰기가 있어야합니다.

![](https://velog.velcdn.com/images/0seo8/post/b9b2a0bc-0e7a-4b14-95bb-ef8b2fd29f00/image.png)

- 모든 제품 조회
  - 제품은 상세하게 볼 수 있는 페이지가 따로 있으며, 이는 모든 제품을 보는 API입니다. 따라서 제품 설명은 100자까지만 가능합니다.
  - 100자 이상을 보려면 상세보기를 하면 됩니다.
  - 제품의 사진도 여러개 올릴 수 있지만 대표사진은 1장만 나옵니다.
  - 헤더정보에 `msaterKey: true`를 넣어줘야합니다.
  
  ![](https://velog.velcdn.com/images/0seo8/post/6685eae4-b02e-40f3-afe6-91d374a328a4/image.png)

만약 제품을 더 팔고싶지 않은 경우 2가지 방법이 있습니다.
  - 관리자 페이지에서 지워버리는 것
  - 매진 안내
    - `isSoldOut:true`


전체판매내역
- 판매제품에 대한 내역이 나옵니다.
- detailID는 거래아이디입니다.(거래된 아이디)
- reservation : 예약이 가능한 시스템
- done:false 거래중

판매내역관리
- 사용자와의 나와의 거래 정보: deatilId
- 기간이 지정된 것이 아니라 관리자가 처리여부를 처리할 수 있습니다.


- 예약취소도 가능합니다

제품추가
- 두개를 올릴수 있습니다(제품의 썸네일, 제품의 상세사진)


base64확인해보기

제품수정
- 사용자의 구매 내역 확인을 위해 제품을 실제로 삭제하지 않고 매진처리를 해야합니다.
- 매진은 다시 해제할수 있습니다

단일 제품상세조회


재퓸검색


tages에 제품정보를 넣어놓고 제품이름과 태그를 통해 제품을 검색할 수 있습니다. 제품은 ANd조건으로 결과를 반환합니다

  
주의: 제품구매신청

- 제품은 구매버튼만 누르는 것이 아니라 사용자가 확정버튼도 눌러줘야합니다.

시간은 국제표준시로 넣어야합니다.

----------

