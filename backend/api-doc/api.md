
# Dokumentation - API

Den här sidan innehåller dokumentation om API:et som används för systemet "Svenska Elsparkcyklar
AB". Funktionaliteten är samlad under olika underrubriker beroende på vilken del den tillhör.

### Innehåll

- [Important](#important)
- [Users](#users)
- [City](#city)
- [Bikes](#bikes)
- [Booking](#booking)
- [Invoice](#invoice)
- [Price](#price)
- [Parking](#parking)

## Important

Notera att du MÅSTE vara autentiserad med ett GitHub-konto för att få ta del av API:t.
Alla requests som görs utan en autentisering kommer annars att returnera svaret
'status(500) "You don't have permission to be here"'

## USERS

En användare har följande attribut:
```
id
username
role
balance
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
            "username": "horselover1337",
            "role": "customer",
            "balance": 0
        },
        {
            "id": 2101020002,
            "username": "gurkOlle",
            "role": "customer",
            "balance": 100
        },
    ...
    ]
}
```

### Hämta EN kund via id

```
GET /v1/users/id/[user_id]
```

Result for "2101010001":
```
{
    "user": {
            "id": 2101010001,
            "username": "horselover1337",
            "role": "customer",
            "balance": 0
        }
}
```

### Hämta en kunds bokningshistorik

```
GET /v1/users/history/[user_id]
```

Result for "2101010001":
```
{
    "user": {
        "id": 1,
        "bike_id": 1,
        "user_id": 2101010001,
        "start_time": "2023-11-20 08:00:00",
        "start_location": "59.3293, 18.0686",
        "stop_time": "2023-11-20 09:30:00",
        "stop_location": "59.3293, 18.0686",
        "price": 10
    }
}
```

### Hämta ALLA fakturor för en specifik kund

```
GET /v1/users/invoice/[user_id]
```

Result for "2101010001":
```
{
    "user": {
        "id": 1,
        "log_id": 1,
        "user_id": 2101010001,
        "total_price": 10,
        "status": "pending"
    }
}
```

### Hämta EN specifik faktura för en specifik kund

```
GET /v1/users/invoice/[user_id]/[invoice_id]
```

Result for "2101010001/1":
```
{
    "user": {
        "id": 1,
        "log_id": 1,
        "user_id": 2101010001,
        "total_price": 10,
        "status": "pending"
    }
}
```

### Hämta alla kunder med matchande för- eller efternamn

```
GET /v1/users/name/[name]
```

Result for "h":
```
{
    "users": [
        {
            "id": 2101010001,
            "username": "horselover1337",
            "role": "customer",
            "balance": 0
        },
        {
            "id": 2101030003,
            "username": "githubForever",
            "role": "customer",
            "balance": 200
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
username
```

Optional parameters:
```
role
balance
```
Result:
```
status(200) - 'User created successfully'
```
Possible errors (if 'id' already exists):
```
status(500) 'Validation error'
status(400) "'Balance' must be a number!"
status(404) "Role must be either 'customer' or 'admin'"
```

### Uppdatera en användare
```
PUT /v1/users/id/[user_id]
```

Please note that "id" can't be updated.

Optional parameters:
```
role
balance
```
Result:
```
status(200) - 'User updated successfully'
```
Possible errors (besides from db-errors):
```
status(404) 'User doesn't exist'
status(404) "'Balance' must be a number!"
status(404) "Role must be either 'customer' or 'admin'"
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
            "bounds": "[[17.7606917,59.3917673],[17.762308,59.3887845],[17.7750968,59.3835394]...]
        }
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
        "name": "Göteborg",
        "bounds": "[[11.231564,57.6546144],[11.2405782,57.6483777],[11.2595653,57.6352304]...]
    }
}
```

### Skapa en stad

```
POST /v1/city
```
Required parameters:
```
name
bounds
```

Result:
```
status(200) - 'City created successfully'
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
id,
battery
city_id
speed
position
state
low_battery
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
            "state": "occupied",
            "low_battery": false
        },
        {
            "id": 2,
            "battery": 60,
            "city_id": 1,
            "speed": 0,
            "position": "59.3099, 18.0752",
            "state": "disabled",
            "low_battery": false
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
Possible errors:
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
        "state": "occupied",
        "low_battery": false
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
            "state": "available",
            "low_battery": false
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
price
```

### Hämta alla bokningar

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

### Hämta alla pågående resor
```
GET /v1/booking/ongoing
```

Result:
```
{
    "booking": [
        {
            "id": 3,
            "bike_id": 5,
            "user_id": 2101050005,
            "start_time": "2023-11-20 14:30:00",
            "start_location": "58.4108, 15.6214",
            "stop_time": "",
            "stop_location": "",
            "price": 20
        }
    ]
}
```

### Skapa en bokning

```
POST /v1/booking
```
Required parameters:
```
bike_id,
user_id,
```

Result:
```
status(200) - 'Booking created successfully'
```
Possible errors:
```
User-related:
    status(400) 'User doesn't exist'
    status(400) 'User already has an active booking'

Bike-related:
    status(400) 'Bike doesn't exist'
    status(400) 'Bike is not available'
```

### Uppdatera bokning - (markera resa som avslutad)

```
PUT /v1/booking/id[booking_id]
```

Please be aware that this method can only
mark a trip as finished. All bookings will be saved
to keep track of all trips and rent-outs. To edit a
booking, please turn to "Invoice" instead.

No parameters are required.

Result:
```
status(200) - "Booking successfully updated. Trip is now stopped"
```
Possible errors:
```
status(404) "Booking doesn't exist"
status(400) "Trip is already stopped"
```

## INVOICE

En faktura har följande attribut:
```
id,
log_id,
user_id,
total_price,
status,
```

...och skapas automatiskt varje gång
en ny bokning görs.

### Hämta alla fakturor

```
GET /v1/invoice
```

Result:
```
{
    "invoice": [
        {
            "id": 1,
            "log_id": 1,
            "user_id": 2101010001,
            "total_price": 10,
            "status": "pending"
        },
        {
            "id": 2,
            "log_id": 2,
            "user_id": 2101030003,
            "total_price": 15.5,
            "status": "payed"
        },
    ...
    ]
}
```

### Hämta en specifik faktura (faktura-id)

```
GET v1/invoice/id/[invoice_id]
```

Result for "1":
```
{
    "invoice": {
        "id": 1,
        "log_id": 1,
        "user_id": 2101010001,
        "total_price": 10,
        "status": "pending"
    }
}
```

### Uppdatera en faktura

```
PUT v1/invoice/id/[invoice_id]
```

Optional parameters:
```
total_price
status
```

Please note that you can only set the 'status'
to either 'pending' or 'payed'.

Result:
```
status(200) - "Invoice updated successfully"
```
Possible errors:
```
status(404) "Invoice doesn't exist"
status(400) "'status' must be one of: payed, pending"
```

### Radera en faktura

```
DELETE /v1/invoice/id/[invoice_id]
```

Required parameters:
```
id
```
Result:
```
status(200) 'Invoice successfully deleted'
```
Possible errors (besides from db-errors):
```
status(404) 'Invoice doesn't exist'
```

## PRICE

En prisgrupp har följande attribut:
```
id,
start_fee,
cost_per_minute,
free_parking_fee,
start_free_park_discount
```

### Hämta priser

```
GET /v1/price
```

Result:
```
{
    "price": [
        {
            "id": 1,
            "start_fee": 20,
            "cost_per_minute": 3,
            "free_parking_fee": 20,
            "start_free_park_discount": 0.5
        }
    ]
}
```

### Uppdatera priser

```
PUT v1/price/
```

Optional parameters:
```
start_fee,
cost_per_minute,
free_parking_fee,
start_free_park_discount
```

Result:
```
status(200) "Price updated successfully"
```
Possible errors (besides from db-errors):
```
status(404) "PriceType doesn't exist"
status(400) "Values must be floats"
```


## PARKING

En parkering har följande attribut:
```
id,
city_id
name,
bounds,
number_of_chargers
```

### Hämta alla parkeringar

```
GET /v1/parking
```

Result:
```
{
    "parking": [
        {
            "id": 2,
            "city_id": 1,
            "name": "Område 2",
            "bounds": "59.332, 17.937, 59.312, 17.957",
            "number_of_chargers": 8
        },
        {
            "id": 3,
            "city_id": 1,
            "name": "Område 3",
            "bounds": "59.398, 17.902, 59.378, 17.922",
            "number_of_chargers": 12
        },
    ...
    ]
}
```

### Hämta specifik parkering (id)

```
GET /v1/parking/id/[parking_id]
```

Result for "2":
```
{
    "parking": {
        "id": 2,
        "city_id": 1,
        "name": "Område 2",
        "bounds": "59.332, 17.937, 59.312, 17.957",
        "number_of_chargers": 8
    }
}
```

### Skapa en ny parkering

```
POST v1/parking
```

Required parameters:
```
city_id,
name,
bounds,
number_of_chargers
```

Result:
```
status(200) "Parking created successfully"
```
Possible errors (besides from db-errors):
```
status(400) "City_id and number_of_chargers must be numbers"
status(400) "Invalid coordinates format"
status(400) "City doesn't exist!"
```

### Uppdatera en parkering

```
PUT v1/parking/id/[parking_id]
```

Optional parameters:
```
name,
bounds,
number_of_chargers,
```

Result:
```
status(200) "Parking updated successfully"
```
Possible errors (besides from db-errors):
```
status(400) "Parking doesn't exist!"
status(400) "'number_of_chargers' must be a number"
status(400) "Invalid coordinates format"
```

### Radera en parkering

```
DELETE /v1/parking/id/[parking_id]
```

Required parameters:
```
id
```
Result:
```
status(200) 'Parking successfully deleted'
```
Possible errors (besides from db-errors):
```
status(404) 'Parking doesn't exist'
```

## CHARGER

En laddare har följande attribut:
```
id,
parking_id,
bike_id,
status
```

### Hämta alla laddare

```
GET /v1/charger
```

Result:
```
{
    "chargers": [
        {
            "id": 1,
            "parking_id": 1,
            "bike_id": 0,
            "status": "available"
        },
        {
            "id": 2,
            "parking_id": 2,
            "bike_id": 2,
            "status": "occupied"
        },
    ...
    ]
}
```

### Hämta specifik laddare (id)

```
GET /v1/charger/id/[charger_id]
```

Result for "1":
```
{
    "charger": {
        "id": 1,
        "parking_id": 1,
        "bike_id": 0,
        "status": "available"
    }
}
```

### Skapa en ny laddare

```
POST v1/charger
```

Required parameters:
```
parking_id
```

Result:
```
status(200) "Charger created successfully"
```
Possible errors (besides from db-errors):
```
status(400) "Parking_id must be numbers"
status(400) "Parking_id must be one of: *available ids*"
```

### Uppdatera en laddare

```
PUT v1/charger/id/[charger_id]
```

Optional parameters:
```
parking_id,
bike_id,
status,
```

Result:
```
status(200) "Charger updated successfully"
```
Possible errors (besides from db-errors):
```
status(404) "Charger doesn't exist"
status(404) "Bike doesn't exist"
status(400) "'status' must be one of: available, occupied"
status(400) "If no bike is using the charger, status should be 'available'"
status(400) "Parking_id must be one of: *available ids*"
```

### Radera en laddare

```
DELETE /v1/charger/id/[charger_id]
```

Required parameters:
```
id
```
Result:
```
status(200) 'Charger successfully deleted'
```
Possible errors (besides from db-errors):
```
status(404) 'Charger doesn't exist'
```