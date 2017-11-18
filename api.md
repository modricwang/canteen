FORMAT: 1A
HOST: http://dap.apiblueprint.org/

# DatabaseAdminProject

I don't know how you want to name it.....we can decide it later.

## Group Canteens

## Canteens [/canteens/{cid}/{from}/{to}]

### List All Canteens [GET]

+ Parameters
    + from(number,required) - start from 0
    + to(number,required) - the last item id you want, which won't exceed MAX_CANTEENS and from+20

+ Response 200 (application/json)

        [
            {
                "name": "学二食堂",
                "position": "体育馆附近，靠近校内五公寓",
                "cid":123123,
                "imgurl":"http://xxx.com/1.jpg"
            },
            {
                "name": "合一楼",
                "position": "校内三公寓附近",
                "cid":6666666,
                "imgurl":"http://xxx.com/1.jpg"
            },
            
        ]

### Get Canteen By ID [PUT]

+ Parameters
    + cid (number,required) - The ID of the canteens.
        
+ Response 200 (application/json)

        {
            "name": "合一楼",
            "position": "校内三公寓附近",
            "cid":6666666,
                "imgurl":"http://xxx.com/1.jpg"
        }
        
## Group Windows

## Windows [/windows/{cid}/{wid}/{from}/{to}]

### List All Windows [GET]

+ Parameters 
    + cid (number,required) - The ID of the canteens.
    + from(number,required) - start from 0
    + to(number,required) - the last item id you want, which won't exceed MAX_WINDOWS and from+20

+ Response 200 (application/json)

        [
            {
                "name": "意式风味",
                "position":“合一三楼门口”,
                "type":"西餐",
                "wid":1,
                "imgurl":"http://xxx.com/1.jpg"
            },
            {
                "name": "麻辣香锅",
                "position":“合一三楼南侧”,
                "type":"香锅",
                "wid":2,
                "imgurl":"http://xxx.com/1.jpg"
            }
        ]
        
### Get Window By ID [PUT]

+ Parameters
    + cid (number,required) - The ID of the canteens.
    + wid (number,required) - The ID of the windows.

+ Response 200 (application/json)

        
        {
            "name": "意式风味",
            "position":“合一三楼门口”,
            "type":"西餐",
            "wid":1,
            "imgurl":"http://xxx.com/1.jpg"
        }
        
        
## Group Dishes

## Dishes [/dishes/{uid}/{cid}/{wid}/{did}/{from}/{to}]

### List All Dishes [GET]

+ Parameters 
    + cid (number,required) - The ID of the canteen
    + wid (number,required) - The ID of the window
    + from(number,required) - start from 0
    + to(number,required) - the last item id you want, which won't exceed MAX_DISHES and from+20
    
+ Response 200 (application/json)

        [
            {
                "name":"北京烤鸭",
                "did":1,
                "price":12.00,
                "score":6.66,
                "label":"北京菜;",
                "imgurl":"http://xxx.com/1.jpg"
            },
            {
                "name":"意式水果披萨",
                "did":2,
                "price":27.00,
                "score":6.66,
                "label":"意式;水果;披萨;",
                "imgurl":"http://xxx.com/2.jpg"
            },
        ]

### Get All Recommended Dishes [COPY]

在某个食堂某个窗口推荐菜品，有时间再做。

+ Parameters 
    + uid (number,required) - the uid of the user.
    + from(number,required) - start from 0
    + to(number,required) - the last item id you want, which won't exceed MAX_DISHES and from+20
+ Response 200 (application/json)

        {
             {
                "name":"北京烤鸭",
                “wid”:1,
                "cid":1,
                "did":1,
                "price":12.00,
                "recommend_score":6.66,
                "label":"北京菜;",
                "imgurl":"http://xxx.com/1.jpg"
            },
            {
                "name":"意式水果披萨",
                “wid”:1,
                "cid":1,
                "did":2,
                "price":27.00,
                "recommend_score":6.66,
                "label":"意式;水果;披萨;",
                "imgurl":"http://xxx.com/1.jpg"
            },
        }
### Get All Dishes By ID [PUT]
+ Parameters 
    + cid (number,required) - The ID of the canteen
    + wid (number,required) - The ID of the window
    + did (number,required) - The ID of the dishes
+ Response 200 (application/json)

            {
                "name":"北京烤鸭",
                "did":1,
                "price":12.00,
                "score":6.66,
                "label":"北京菜;",
                "imgurl":"http://xxx.com/1.jpg"
            }
            
## Group Remarks

## Remarks [/remarks/{cid}/{wid}/{did}/{from}/{to}/{rid}]

### List All Remarks [GET]

+ Parameters 
    + cid (number,required) - The ID of the canteen
    + wid (number,required) - The ID of the window
    + did (number,required) - The ID of the dishes
    + from(number,required) - start from 0
    + to(number,required) - the last item id you want, which won't exceed MAX_DISHES and from+20
+ Response 200 (application/json)

        [
            {
                "rid":1,
                "remarker":110,
                "score":6.66,
                "content":
                {
                    "text":"我觉得OK”,
                    "imgurl":"http://xxx.com/1.jpg"
                }
            },
            {
                "rid":2,
                "remarker":111,
                "score":6.66,
                "content":
                {
                    "text":"我觉得OK”,
                    "imgurl":"http://xxx.com/1.jpg"
                }
            }
        ]
        
### Create Comment [POST]
    owner填uid，登录了就有uid
+ Request (application/json)

        {
            "cid":6666666,
            "wid":1,
            "did":1,
            “owner”:110,
            "score":6.66,
            "content":
            {
                "text":"我觉得OK”,
                "imgurl":"http://xxx.com/1.jpg"
            }
            
        }

+ Response 200 

### List Remark By ID [PUT]

+ Parameters 
    + cid (number,required) - The ID of the canteen
    + wid (number,required) - The ID of the window
    + did (number,required) - The ID of the dishes
    + rid (number,required) - The ID of the remark
+ Response 200 (application/json)


            {
                "rid":1,
                "remarker":110,
                "score":6.66,
                "content":
                {
                    "text":"我觉得OK”,
                    "imgurl":"http://xxx.com/1.jpg"
                }
            }

## Group Users

## Users [/users]

### Create Account [POST]

注册的另外一种说法
  
+ Request (application/json)
    + Attributes
        + username (string,required) -- the name of the user
        + password (string,required) -- the password of the user
        + email (string,required) -- the email of the user

+ Response 200 


## Authenticator [/users/auth]

你萌要的登录，注销都在这里......

### Password Authenticator [POST]

密码验证器，可以用来登录
  
+ Request (application/json)
    + Attributes
        + username (string,required) -- the name of the user
        + password (string,required) -- the password of the user


+ Response 200 (application/json)
        
        {
            “uid”:"110"
        }

### Logout [DELETE]

注销

+ Response 200

## forgotten user [/users/forgot/{token}]

重置密码系统，有时间就做...顺便以下取材自yr dalao，十分感谢

### send reset mail [POST]

+ Request (application/json)
    + Attributes
        + mail (string)

+ Response 200

### reset login [GET]

我们的重置密码系统的实现的基本思路是从邮箱的链接直接登陆获得当前用户的权限。

+ Parameters
    + token (string, required)

+ Response 200

## Group Image

## Image [/images]

### Create new image [POST]

传图片用这个API

+ Request (multipart/form-data)

        + Key-Value Pairs
                + img (file,required)
                + owner (number,required) -- 这里填uid，登录时拿到的那个


+ Response 200 (application/json)
    + Body
            
            {
                "url":"http://xxx.com/1.jpg",
                "owner":121449137
            }

