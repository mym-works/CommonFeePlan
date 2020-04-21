# API 一覧

## ハウスメンバー取得

```
curl -X GET https://api.borderless.mym.works/member/oimachi --header 'x-api-key:API_KEY'
```

## 支払ったメンバーを取得

```
curl -X GET https://api.borderless.mym.works/paidthismonth/oimachi --header 'x-api-key:API_KEY'
```

## 購入した内容を記載

```
curl -X POST https://api.borderless.mym.works/purchase/oimachi --header 'x-api-key:API_KEY'
```

## 支払った内容を記載

```
curl -X POST https://api.borderless.mym.works/pay/oimachi --header 'x-api-key:API_KEY'
```
