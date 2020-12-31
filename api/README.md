# API 一覧

## /member/{houseId}

- ハウスメンバー取得
- GET

### Parameter
|Name|Description|
|:---:|:---:|
|houseId| ハウス名より入居しているハウスメンバーを取得（ex. oimachi）|

### Response

|Code|Description|
|:---:|:---:|
|200|正常にハウスに入居しているハウスメンバーを取得|

```
[
  {
    "House": "XXXXX",
    "Room": "1A",
    "Name": "xxxxx"
  },
  {
    "House": "XXXXX",
    "Room": "1B",
    "Name": "xxxxx"
  },
  {
    "House": "XXXXX",
    "Room": "1C",
    "Name": "xxxxx"
  }
]
```

該当しないハウス名を指定した場合は、空のオブジェクトを返す ( `[]` )

### Example

```
curl -X GET https://api.borderless.mym.works/member/{houseId} --header 'x-api-key:API_KEY'
```

## /paidthismonth/{houseId}

- 支払ったメンバーを取得
- GET

### Parameter
|Name|Description|
|:---:|:---:|
|houseId| ハウス名より入居しているハウスメンバーを取得（ex. oimachi）|

### Response

|Code|Description|
|:---:|:---:|
|200|当月支払ったハウスメンバーを取得|

```
[
  {
    "House": "XXXXX",
    "Price": 400,
    "Timestamp": "2020/12/02 16:47:54",
    "Tenant": "<house member name>",
    "Type": "Pay"
  },
  {
    "House": "XXXXX",
    "Price": 400,
    "Timestamp": "2020/12/02 16:49:13",
    "Tenant": "<house member name>",
    "Type": "Pay"
  },
  {
    "House": "XXXXX",
    "Price": 400,
    "Timestamp": "2020/12/03 11:41:49",
    "Tenant": "<house member name>",
    "Type": "Pay"
  }
]
```

該当しないハウス名を指定した場合は、空のオブジェクトを返す ( `[]` )

### Example

```
curl -X GET https://api.borderless.mym.works/paidthismonth/{houseId} --header 'x-api-key:API_KEY'
```

## /pay/{houseId}

- 支払った内容を記載
- POST

```
curl -X POST https://api.borderless.mym.works/pay/{houseId} --header 'x-api-key:API_KEY'
```

### Parameter

|Name|Description|
|:---:|:---|
|body| ユーザが共益費としてハウスへ支払った料金を入力 |


- Example Value Model
```
{
  "Timestamp": "String",
  "Tenant": "String",
  "Price": int
} 
```

- How to use
```
{
  "Timestamp": "2020/10/19 20:04:36",
  "Tenant": "<house member name>",
  "Price": 400
}
```

## /purchase/{houseId}

- 買い物で購入した内容を記載
- POST

### Parameter

|Name|Description|
|:---:|:---|
|body| 買い物をした商品名と価格はユーザが入力|


- Example Value Model
```
{
  "Timestamp": "String",
  "Tenant": "String",
  "Item": "String",
  "Price": int
} 
```

- How to use
```
{
  "Timestamp": "2020/10/19 20:04:36",
  "Tenant": "<house member name>",
  "Item": "Plastic bag",
  "Price": 1500
}
```

### Response

|Code|Description|
|:---:|:---:|
|200|メタデータのみ返却される|

### Example

```
curl -X POST https://api.borderless.mym.works/purchase/{houseId} --header 'x-api-key:API_KEY'
```
