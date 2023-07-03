# Stock Quantity Calculation Application

A Node.js application to calculate stock quantity.

## Installation
```bash
$  npm  install
```
## Running the App
```bash
# Development mode
$  npm  run  start:dev

# Production mode
$  npm  run  start:prod
```
## Steps

 1. Install all dependencies using the installation command.
 2. Start the server using any one of the above script from Running the app.
 3. Hit the localhost:3000 server in browser to load the UI.
 4. Enter the stock name, it'll return current stock quantity.

## Testing

```bash
# Unit tests
$  npm  run  test

# Test coverage
$  npm  run  test:cov
```

## API Endpoint

The application exposes the following API endpoint:

### GET /api/v1/stock

This endpoint retrieves the current stock level for a given SKU. It expects the SKU to be provided as a query parameter.

Example Request:

```bash
GET  /api/v1/stock?sku=LTV719449/39/39
```

Example Response (200 OK):

```bash
{ "sku":  "LTV719449/39/39",  "qty":  8525  }
```

If the SKU is not found or the SKU parameter is missing, an appropriate error response will be returned.

  

## License

This project is licensed under the MIT License. See the [LICENSE] file for details.