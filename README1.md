# Luxembourg Population Service - REST API

This REST API returns Luxembourg population data for a specified year. It distinguishes between the total population, Luxembourgish and foreign males, and Luxembourgish and foreign females.

## Part 1: Service Overview

### How to Use the Service

1. Open a terminal in the root directory of this project (where the index.js is located).
2. Run the following command to start the service:

   ```bash
   node index.js
    ```
    This command startes the server.

To retrieve population data, use the endpoint `/population/{year}`, replacing `{year}` with the desired year. The service will respond with population data in JSON format for Luxembourg if available.

If exact data for the requested year is not available, it will return data for the closest years before and after the requested year.

### Example Access URLs

- **Exact Data Available**: `http://localhost:3000/population/2020`
- **Closest Data** (if 2018 is not available): `http://localhost:3000/population/2018`

### Example JSON Response

#### Exact Year Available
```json
{
  "totalPopulation": 634730,
  "males": {
    "luxembourgish": 165056,
    "foreign": 154400
  },
  "females": {
    "luxembourgish": 170248,
    "foreign": 145026
  }
}
```

#### Closest Available Years (if the year is missing)
```json
{
  "message": "Exact data for year 2018 not found. Showing closest available years.",
  "closestBefore": {null},
  "closestAfter": {
    "totalPopulation": 634730,
    "males": {
      "luxembourgish": 165056,
      "foreign": 154400
    },
    "females": {
      "luxembourgish": 170248,
      "foreign": 145026
    }
  }
}
```

### Input Error Handling
If an invalid year format is provided, the service will respond with an error message:
```json
{
  "error": "Invalid year format. Please enter a four-digit year."
}
```