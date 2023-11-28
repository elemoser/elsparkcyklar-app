
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
            "id": 2101010001,
            "role": "customer",
            "first_name": "John",
            "last_name": "Doe",
            "phone": "123456789",
            "mail": "john.doe@example.com",
            "balance": 50,
            "subscriber": 1
        },
        {
            "id": 2101020002,
            "role": "customer",
            "first_name": "Jane",
            "last_name": "Smith",
            "phone": "987654321",
            "mail": "jane.smith@example.com",
            "balance": 30,
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
    "user": {
        "id": 2101010001,
        "role": "customer",
        "first_name": "John",
        "last_name": "Doe",
        "phone": "123456789",
        "mail": "john.doe@example.com",
        "balance": 50,
        "subscriber": 1
    }
}
```

### Hämta alla kunder med matchande för- eller efternamn

```
GET /v1/users/name/[name]
```

Result for "john":
```
{
    "users": [
        {
            "id": 2101010001,
            "role": "customer",
            "first_name": "John",
            "last_name": "Doe",
            "phone": "123456789",
            "mail": "john.doe@example.com",
            "balance": 50,
            "subscriber": 1
        },
        {
            "id": 2101030003,
            "role": "customer",
            "first_name": "Alice",
            "last_name": "Johnson",
            "phone": "555111222",
            "mail": "alice.johnson@example.com",
            "balance": 20,
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
Result:
```
status(200) - 'User created successfully'
```
Possible errors (if 'id' already exists):
```
status(500) 'Validation error' 
```

### Uppdatera en användare
```
PUT /v1/users/id/[user_id]
```

Please note that "id" can't be updated.
Required parameters:
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

## CITY

En stad har följande attribut:
```
id
name
bounds
radius
```

### Hämta alla städer

```
GET /v1/city
```

Result:
```
{
    "city": [
        {
            "id": 1,
            "name": "Stockholm",
            "bounds": "59.3293, 18.0686",
            "radius": 5000
        },
        {
            "id": 2,
            "name": "Gothenburg",
            "bounds": "57.7089, 11.9746",
            "radius": 5000
        },
        {
            "id": 3,
            "name": "Malmö",
            "bounds": "55.6044, 13.0038",
            "radius": 5000
        },
    ...
    ]
}
```

### Hämta EN stad via id

```
GET /v1/city/id/[city_id]
```

Result for "2":
```
{
    "city": {
        "id": 2,
        "name": "Gothenburg",
        "bounds": "57.7089, 11.9746",
        "radius": 5000
    }
}
```

### Skapa en stad

```
POST /v1/city
```
Required parameters:
```
id
name
bounds
```

Optional parameters:
```
radius
```

Result:
```
status(200) - 'City created successfully'
```
Possible errors (if 'id' already exists):
```
status(500) 'Validation error'
```

### Uppdatera en stad
```
PUT /v1/city/id/[city_id]
```

Please note that "id" can't be updated.
Required parameters:
```
name
bounds
radius
```
Result:
```
status(200) - 'City updated successfully'
```
Possible errors (besides from db-errors):
```
status(404) 'City doesn't exist'
```

### Ta bort en stad
```
DELETE /v1/city/id/[city_id]
```
Required parameters:
```
id
```
Result:
```
status(200) 'City successfully deleted'
```
Possible errors (besides from db-errors):
```
status(404) 'City doesn't exist'
```

## BIKES

En cykel har följande attribut:
```
id INTEGER NOT NULL PRIMARY KEY,
battery
city_id
speed
position
state
disabled
```

### Hämta alla cyklar

```
GET /v1/bikes
```

Result:
```
{
    "bike": [
        {
            "id": 1,
            "battery": 80,
            "city_id": 1,
            "speed": 25,
            "position": "59.3293, 18.0686",
            "state": "active",
            "disabled": 0
        },
        {
            "id": 2,
            "battery": 60,
            "city_id": 2,
            "speed": 22.5,
            "position": "59.3099, 18.0752",
            "state": "inactive",
            "disabled": 1
        },
    ...
    ]
}
```