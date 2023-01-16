

# Prerequisites

For Windows

* Node-gyp (`npm install --global node-gyp`)
* Express-Validator (`npm install --save express-validator`)

# Usage

* Run `npm install` to installl dependencies
* Run `npm run start` to start the local server
* Load `http://localhost:8080` to test the endpoint. It will display a json result `{"message":"University of Moratuwa"}`

# API Endpoints

## GET /api/customer

Get a list of customer

```json
{ 
  "message": "success",
    "data": [
        {
            "customerId": 1,
            "name": "Kaviya",
            "address": "No 324/A Ra De Mel Road, Colombo",
            "email": "Iakith@gmail.com",
            "dateOfBirth": "2004.12.25",
            "gender": "male",
            "age": 18,
            "cardHolderName": "Kaviya",
            "cardNumber": "102445217895",
            "expireDate": "12/2023",
            "cvv": 578,
            "timestamp": "2023-01-16 02:39:49"
        }
    ]
}

```

## GET /api/customer/{id}

Get customer information by product id

```json
{ 
  "message": "success",
    "data": [
        {
            "customerId": 1,
            "name": "Kaviya",
            "address": "No 324/A Ra De Mel Road, Colombo",
            "email": "Iakith@gmail.com",
            "dateOfBirth": "2004.12.25",
            "gender": "male",
            "age": 18,
            "cardHolderName": "Kaviya",
            "cardNumber": "102445217895",
            "expireDate": "12/2023",
            "cvv": 578,
            "timestamp": "2023-01-16 02:39:49"
        }
    ]
}
```

## POST /api/customer/

To create a new product based on POST data (x-www-form-url-encoded)
```json
{
    "name": "Kaviya ",
    "address": "No 324/A Ra De Mel Road, Colombo",
    "email":"kks2004@gmail.com",
    "dateOfBirth": "2004.02.25",
    "gender": "male",
    "age": "18",
    "cardHolderName": "Kaviya",
    "cardNumber": "123456789102",
    "expireDate": "12/2023",
    "cvv": "578",
    "timeStamp": ""
}
````


## PATCH /api/customer/{id}

To update customer data by id, based on POST data (x-www-form-url-encoded)



```json
{
    "name": "Kaviya ",
    "address": "No 324/A Ra De Mel Road, Colombo",
    "email":"kks2004@gmail.com",
    "dateOfBirth": "2004.02.25",
    "gender": "male",
    "age": "18",
    "cardHolderName": "Kaviya",
    "cardNumber": "123456789102",
    "expireDate": "12/2023",
    "cvv": "578",
    "timeStamp": ""
}
```

## DELETE /api/customer/{id}

To remove a customer from the database by customer id. 

This example is using the `curl` command line


```bash
curl -X "DELETE" http://localhost:8080/api/customer/1
```

The result is:

`{"message":"deleted","rows":1}`











