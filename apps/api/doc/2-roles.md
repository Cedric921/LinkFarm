# Roles and permissions

## get roles

route

```bash
[GET] /api/v1/roles
```

data

```json
//  response
{
  "status": true,
  "data": {
    "meta": {
      "total": 2,
      "per_page": 100,
      "current_page": 1,
      "last_page": 1,
      "first_page": 1,
      "first_page_url": "/?page=1",
      "last_page_url": "/?page=1",
      "next_page_url": null,
      "previous_page_url": null
    },
    "data": [
      {
        "id": "e011a812-6906-458e-857d-ca0586db3fbd",
        "designation": "Utilisateur",
        "description": "Utilisateur de l'entreprsie",
        "createdAt": "2023-12-27T11:44:06.518+02:00",
        "updatedAt": "2023-12-27T11:44:06.518+02:00",
        "permissions": [
          {
            "module": "achat",
            "permissions": [
              {
                "id": "372071f0-dbf2-4328-b3a9-313d2e0be9b1",
                "module": "achat",
                "designation": "DELETE_achat",
                "description": null
              },
              {
                "id": "15ff6fd1-9602-4571-91c0-6543e7e33788",
                "module": "achat",
                "designation": "PUT_achat",
                "description": null
              },
              {
                "id": "f96b2fcf-9469-4fdc-b083-ba52bf538d9f",
                "module": "achat",
                "designation": "POST_achat",
                "description": null
              },
              {
                "id": "47f32c24-ae82-4033-bf00-621aab908db7",
                "module": "achat",
                "designation": "GET_achat",
                "description": null
              }
            ]
          }
        ]
      },
      {
        "id": "b50d289a-5164-46a0-b805-5d82166cbda2",
        "designation": "Super Admin",
        "description": "Super utilisateur de la plateforme",
        "createdAt": "2023-12-27T11:35:56.393+02:00",
        "updatedAt": "2023-12-27T11:35:56.393+02:00",
        "permissions": []
      }
    ]
  }
}
```

## create role

route

```bash
[POST] /api/v1/roles
```

data

```json
// req body
{
 "designation":"Utilisateur",
 "description":"Utilisateur normale de l'entreprise"
}

//  response
{
 "status": true,
 "data": {
  "designation": "Utilisateur",
  "description": "Utilisateur normale de l'entreprsie",
  "id": "e011a812-6906-458e-857d-ca0586db3fbd",
  "createdAt": "2023-12-27T11:44:06.518+02:00",
  "updatedAt": "2023-12-27T11:44:06.518+02:00"
 }
}
```

## update role

route

```bash
[PUT] /api/v1/roles/:id
```

data

```json
//  request body
{
  "status": true, //not requires
  "designation": "nom role" // not required
}

// response
{
 "status": true,
 "data": {
  "id": "b50d289a-5164-46a0-b805-5d82166cbda2",
  "designation": "Super User",
  "description": "Super utilisateur de la plateforme",
  "created_at": "2023-12-27T09:35:56.393Z",
  "updated_at": "2023-12-27T09:35:56.393Z"
 }
}
```

## delete role

route

```bash
[DELETE] /api/v1/roles/
```

data

```json
//  response
{
  "status": true,
  "message": "role supprimé"
}
```
