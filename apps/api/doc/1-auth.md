# Auth

## register

route

```bash
[POST] /api/v1/auth/register
```

data

```json
// req body
{
 "countryCode": "243",
 "password": "123456",
 "name": "cedric",
 "type": "USER",
 "email": "cedric@gmail.com",
 "number": "970000001",
 "lastName": "admin"
}

//  response
{
 "status": true,
 "message": "compte utilisateur enregistré",
 "data":  {
    "id": "f176a4f7-a8fc-4d3b-8237-58c7f70f2373",
    "name": "cedric",
    "lastName": null,
    "email": "cedric@gmail.com",
    "countryCode": "243",
    "number": "970000001",
    "status": true,
    "profile": null,
    "type": "USER",
    "rememberMeToken": null,
    "createdAt": "2023-12-27T09:33:29.785+02:00",
    "updatedAt": "2023-12-27T09:33:29.785+02:00"
   }
}
```

## login

route

```bash
[POST] /api/v1/auth/login
```

data

```json
// req body
{
 "email": "sudo@etic.com",
 "password":"admin123"
}

//  response
{
 "status": true,
 "message": "connected",
 "data": {
  "user":  {
    "id": "f176a4f7-a8fc-4d3b-8237-58c7f70f2373",
    "name": "cedric",
    "lastName": null,
    "email": "cedric@gmail.com",
    "countryCode": "243",
    "number": "970000001",
    "status": true,
    "profile": null,
    "type": "USER",
    "rememberMeToken": null,
    "createdAt": "2023-12-27T09:33:29.785+02:00",
    "updatedAt": "2023-12-27T09:33:29.785+02:00"
   },
  "token": {
   "type": "bearer",
   "token": "MQ.02p43MOn29CcVjb7E0pIXjemD_Uw4Ur9O1xrd_l78dflsilMLetHdvfjh6z_"
  }
 }
}
```

## get otp

route

```bash
[POST] /api/v1/auth/get-otp
```

data

```json
// req body
{
 "email": "email@gmail.com",
}

//  response
{
 "status": true,
 "message": "otp envoye"
}
```

## check otp (get token)

route

```bash
[POST] /api/v1/auth/check-otp
```

data

```json
// req body
{
 "email": "email@gmail.com",

}

//  response
{
 "status": true,
  "data": {
    "token" {
      "type": "bearer",
      "token": "MQ.02p43MOn29CcVjb7E0pIXjemD_Uw4Ur9O1xrd_l78dflsilMLetHdvfjh6z_"
      }
  },
}
```

## reset password

route

```bash
[POST] /api/v1/auth/reset-pwd
```

data

```json
// req body
{
 "password": "0000000",
}
// req header
{
  "Authorization": " Bearer MQ.02p43MOn29CcVjb7E0pIXjemD_Uw4Ur9O1xrd_l78dflsilMLetHdvfjh6z_"
}

//  response
{
 "status": true,
  "data": {
    "token" {
      "type": "bearer",
      "token": "MQ.02p43MOn29CcVjb7E0pIXjemD_Uw4Ur9O1xrd_l78dflsilMLetHdvfjh6z_"
      }
  },
}
```
