# permissions

## create permissions for module

route

```bash
[POST] /api/v1/module-permissions
```

data

```json
// request
{
  "module": "vente"
}

//  response
{
 "status": true,
 "data": [
  {
   "module": "achat",
   "designation": "GET_achat",
   "id": "47f32c24-ae82-4033-bf00-621aab908db7",
   "created_at": "2023-12-27T12:16:10.282+02:00",
   "updated_at": "2023-12-27T12:16:10.282+02:00"
  },
  {
   "module": "achat",
   "designation": "POST_achat",
   "id": "f96b2fcf-9469-4fdc-b083-ba52bf538d9f",
   "created_at": "2023-12-27T12:16:10.287+02:00",
   "updated_at": "2023-12-27T12:16:10.287+02:00"
  },
  {
   "module": "achat",
   "designation": "PUT_achat",
   "id": "15ff6fd1-9602-4571-91c0-6543e7e33788",
   "created_at": "2023-12-27T12:16:10.290+02:00",
   "updated_at": "2023-12-27T12:16:10.290+02:00"
  },
  {
   "module": "achat",
   "designation": "DELETE_achat",
   "id": "372071f0-dbf2-4328-b3a9-313d2e0be9b1",
   "created_at": "2023-12-27T12:16:10.291+02:00",
   "updated_at": "2023-12-27T12:16:10.291+02:00"
  }
 ]
}
```

## get permissions

route

```bash
[GET] /api/v1/permissions
```

data

```json
//  response
{
  "status": true,
  "data": [
    {
      "module": "achat",
      "permissions": [
        {
          "id": "372071f0-dbf2-4328-b3a9-313d2e0be9b1",
          "module": "achat",
          "designation": "DELETE_achat",
          "description": null,
          "created_at": "2023-12-27T12:16:10.291+02:00",
          "updated_at": "2023-12-27T12:16:10.291+02:00"
        },
        {
          "id": "15ff6fd1-9602-4571-91c0-6543e7e33788",
          "module": "achat",
          "designation": "PUT_achat",
          "description": null,
          "created_at": "2023-12-27T12:16:10.290+02:00",
          "updated_at": "2023-12-27T12:16:10.290+02:00"
        },
        {
          "id": "f96b2fcf-9469-4fdc-b083-ba52bf538d9f",
          "module": "achat",
          "designation": "POST_achat",
          "description": null,
          "created_at": "2023-12-27T12:16:10.287+02:00",
          "updated_at": "2023-12-27T12:16:10.287+02:00"
        },
        {
          "id": "47f32c24-ae82-4033-bf00-621aab908db7",
          "module": "achat",
          "designation": "GET_achat",
          "description": null,
          "created_at": "2023-12-27T12:16:10.282+02:00",
          "updated_at": "2023-12-27T12:16:10.282+02:00"
        }
      ]
    },
    {
      "module": "role",
      "permissions": [
        {
          "id": "57884c68-a978-40f0-81e1-eac2c1f1aad0",
          "module": "role",
          "designation": "DELETE_role",
          "description": "supprimer les roles des utilisateurs",
          "created_at": "2023-12-27T12:09:25.608+02:00",
          "updated_at": "2023-12-27T12:09:25.608+02:00"
        },
        {
          "id": "853a8194-f7a4-434b-9eee-3ed4cb39295e",
          "module": "role",
          "designation": "GET_role",
          "description": "voir des roles des utilisateurs",
          "created_at": "2023-12-27T12:07:53.915+02:00",
          "updated_at": "2023-12-27T12:07:53.915+02:00"
        },
        {
          "id": "c441563d-04a7-4f89-8f52-c7f6dacd481c",
          "module": "role",
          "designation": "PUT_role",
          "description": "EDIT des roles des utilisateurs",
          "created_at": "2023-12-27T12:07:31.220+02:00",
          "updated_at": "2023-12-27T12:07:31.220+02:00"
        },
        {
          "id": "fed26a86-9ca1-44ce-9ac0-3969a41ecc1f",
          "module": "role",
          "designation": "POST_role",
          "description": "gestion des roles des utilisateurs",
          "created_at": "2023-12-27T12:07:05.571+02:00",
          "updated_at": "2023-12-27T12:07:05.572+02:00"
        }
      ]
    }
  ]
}
```

## assign permissions to role

route

```bash
[POST] /api/v1/role-permissions/:id
```

data

```json
//  request
{
 "permissions": [
  {
   "permissionId": "372071f0-dbf2-4328-b3a9-313d2e0be9b1"
  },
  {
   "permissionId": "15ff6fd1-9602-4571-91c0-6543e7e33788"
  },
  {
   "permissionId": "f96b2fcf-9469-4fdc-b083-ba52bf538d9f"
  },
  {
   "permissionId": "47f32c24-ae82-4033-bf00-621aab908db7"
  }
 ]
}

// response
{
 "status": true,
 "filterPermissions": [
  {
   "permissionId": "372071f0-dbf2-4328-b3a9-313d2e0be9b1",
   "roleId": "e011a812-6906-458e-857d-ca0586db3fbd"
  },
  {
   "permissionId": "15ff6fd1-9602-4571-91c0-6543e7e33788",
   "roleId": "e011a812-6906-458e-857d-ca0586db3fbd"
  },
  {
   "permissionId": "f96b2fcf-9469-4fdc-b083-ba52bf538d9f",
   "roleId": "e011a812-6906-458e-857d-ca0586db3fbd"
  },
  {
   "permissionId": "47f32c24-ae82-4033-bf00-621aab908db7",
   "roleId": "e011a812-6906-458e-857d-ca0586db3fbd"
  }
 ],
 "data": "Permission assigné au role."
}
``
```
