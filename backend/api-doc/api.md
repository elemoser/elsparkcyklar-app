
# Dokumentation - API

Den här sidan innehåller dokumentation om API:et som används för systemet "Svenska Elsparkcyklar
AB". Funktionaliteten är samlad under olika underrubriker beroende på vilken del den tillhör.

### Innehåll

- Users
- City

## USERS

En användare har följande attribut:
```
id
role
first_name
last_name
phone
mail
balance
subscriber
```

### Hämta alla kunder

```
GET /v1/users
```

Result:
```
{
    "users": [
        {
            "id": 202311230001,
            "role": "customer",
            "first_name": "John",
            "last_name": "Doe",
            "phone": "555-1234",
            "mail": "john.doe@example.com",
            "balance": 100.5,
            "subscriber": 1
        },
        {
            "id": 202311230002,
            "role": "customer",
            "first_name": "Jane",
            "last_name": "Smith",
            "phone": "555-5678",
            "mail": "jane.smith@example.com",
            "balance": 50.25,
            "subscriber": 0
        },
    ...
    ]
}
```

### Hämta EN kund via födelsedatum (id)

```
GET /v1/users/id/[user_id]
```

Result for "202311230001":
```
{
    "users": [
        {
            "id": 202311230001,
            "role": "customer",
            "first_name": "John",
            "last_name": "Doe",
            "phone": "555-1234",
            "mail": "john.doe@example.com",
            "balance": 100.5,
            "subscriber": 1
        }
    ]
}
```

### Hämta alla kunder med matchande för- eller efternamn

```
GET /v1/users/name/[name]
```

Result for "John":
```
{
    "user": [
        {
            "id": 202311230001,
            "role": "customer",
            "first_name": "John",
            "last_name": "Doe",
            "phone": "555-1234",
            "mail": "john.doe@example.com",
            "balance": 100.5,
            "subscriber": 1
        },
        {
            "id": 202311240003,
            "role": "customer",
            "first_name": "alice",
            "last_name": "Johnson",
            "phone": "666-9876",
            "mail": "alice.johnson@example.com",
            "balance": 75.75,
            "subscriber": 1
        }
    ]
}
```
### Skapa en användare

```
POST /v1/users
```
Required parameters:
```
id
first_name
last_name
phone
mail
```

Optional parameters:
```
role
balance
subscriber
```

### Uppdatera en användare
```
PUT /v1/users/id/[user_id]
```
Required parameters:
```
id
```
Optional parameters:
```
role
first_name
last_name
phone
mail
balance
subscriber
```
Result:
```
status(200) - 'User updated successfully'
```
Possible errors (besides from db-errors):
```
status(404) 'User doesn't exist'
```

### Ta bort en användare
```
DELETE /v1/users/id/[user_id]
```
Required parameters:
```
id
```
Result:
```
status(200) 'User successfully deleted'
```
Possible errors (besides from db-errors):
```
status(404) 'User doesn't exist'
```