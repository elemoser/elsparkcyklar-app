
# Dokumentation - API

Den här sidan innehåller dokumentation om API:et som används för systemet "Svenska Elsparkcyklar
AB". Funktionaliteten är samlad under olika underrubriker beroende på vilken del den tillhör.

### Innehåll

- [Users](#users)
- [City](#city)
- [Bikes](#bikes)
- [Booking](#booking)

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
status(400) ''bounds' is not formatted correctly'
```

### Uppdatera en stad
```
PUT /v1/city/id/[city_id]
```

Please note that "id" can't be updated.
Optional parameters:
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
status(400) ''bounds' is not formatted correctly'
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
id,
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

### Skapa en cykel

```
POST /v1/bikes
```
Required parameters:
```
id
battery
city_id
position
```

Optional parameters:
```
speed
state
```
Result:
```
status(200) - 'Bike created successfully'
```
Possible errors (if 'id' already exists):
```
status(500) 'Validation error'
```
...or
```
status(400) 'position' is not formatted correctly'
status(400) 'state' must be one of: "occupied", "available", "disabled"'
```

### Uppdatera en cykel

```
PUT /v1/bikes/id/[bike_id]
```

Please note that "id" can't be updated.

Optional parameters:
```
battery
city_id
position
speed
state
```
Result:
```
status(200) - 'Bike updated successfully'
```
Possible errors (if 'id' already exists):
```
status(500) 'Validation error'
```
...or
```
status(400) 'position' is not formatted correctly'
status(400) 'state' must be one of: "occupied", "available", "disabled"'
```

### Hämta EN cykel via id

```
GET /v1/bikes/id/[bike_id]
```

Result for "4":
```
{
    "bike": {
        "id": 4,
        "battery": 70,
        "city_id": 4,
        "speed": 20,
        "position": "59.8586, 17.6389",
        "state": "occupied"
    }
}
```

### Hämta alla *tillgängliga* cyklar i en specifik stad via stadens id

```
GET /v1/bikes/available/[city_id]
```

Result for "5":
```
{
    "bikes": [
        {
            "id": 5,
            "battery": 75,
            "city_id": 5,
            "speed": 0,
            "position": "58.4108, 15.6214",
            "state": "available"
        }
    ]
}
```

### Hämta alla cyklar i en stad via sökning på stadens namn

```
GET /v1/bikes/search/[name]
```

Result for "s":
```
{
    "bikes": [
        {
            "id": 1,
            "battery": 80,
            "city_id": 1,
            "speed": 25,
            "position": "59.3293, 18.0686",
            "state": "occupied",
            "city": "Stockholm"
        },
        {
            "id": 2,
            "battery": 60,
            "city_id": 1,
            "speed": 0,
            "position": "59.3099, 18.0752",
            "state": "disabled",
            "city": "Stockholm"
        },
        {
            "id": 4,
            "battery": 70,
            "city_id": 4,
            "speed": 20,
            "position": "59.8586, 17.6389",
            "state": "occupied",
            "city": "Uppsala"
        }
    ]
}
```

### Radera en cykel

```
DELETE /v1/bikes/id/[bike_id]
```

Required parameters:
```
id
```
Result:
```
status(200) 'Bike successfully deleted'
```
Possible errors (besides from db-errors):
```
status(404) 'Bike doesn't exist'
```

## BOOKING

En bokning har följande attribut:
```
id
bike_id
user_id
start_time
start_location
stop_time
stop_location
price FLOAT
```

### Hämta alla aktiva bokningar

```
GET /v1/booking
```

Result:
```
{
    "booking": [
        {
            "id": 1,
            "bike_id": 1,
            "user_id": 2101010001,
            "start_time": "2023-11-20 08:00:00",
            "start_location": "59.3293, 18.0686",
            "stop_time": "2023-11-20 09:30:00",
            "stop_location": "59.3293, 18.0686",
            "price": 10
        },
        {
            "id": 2,
            "bike_id": 3,
            "user_id": 2101030003,
            "start_time": "2023-11-20 10:45:00",
            "start_location": "55.6044, 13.0038",
            "stop_time": "2023-11-20 12:15:00",
            "stop_location": "55.6044, 13.0038",
            "price": 15.5
        },
    ...
    ]
}
```

### Skapa en bokning

```
POST /v1/booking
```
Required parameters:
```
id,
bike_id,
user_id,
```

Result:
```
status(200) - 'Booking created successfully'
```
Possible errors (if 'id' already exists):
```
status(500) 'Validation error'
```
...or
```
User-related:
    status(400) 'User doesn't exist'
    status(400) 'Balance is too low'
    status(400) 'User already has an active booking'

Bike-related:
    status(400) 'Bike doesn't exist'
    status(400) 'Bike is not available'
```