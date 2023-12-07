from fastapi import FastAPI, HTTPException
from google.cloud import firestore

app = FastAPI()

# Replace with your own Firestore credentials file path
# You can download it from your Google Cloud Console
# https://cloud.google.com/firestore/docs/quickstart
cred_path = "credentials.json"
db = firestore.Client.from_service_account_json(cred_path)



# shipper section

@app.post("/ShipperPostTrip")
async def post_trip(trip_data: dict):
    try:
        # Validate that the required keys are present in the received JSON
        required_keys = ["_id", "delivery_id", "user_id", "delivery_address", "location",
                         "max_weight", "size", "weight", "price", "pickup_point"]
        for key in required_keys:
            if key not in trip_data:
                raise HTTPException(status_code=400, detail=f"Missing required key: {key}")

        # Store the data in Firestore
        trips_ref = db.collection("trips")
        trips_ref.add(trip_data)

        return {"message": "Trip data successfully stored in Firestore"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/ShipperGetTrips")
async def shipper_past_trips(user_id: str):
    try:
        trips_ref = db.collection("trips")

        # Retrieve all trips for the specified user_id
        query = trips_ref.where("user_id", "==", user_id)
        trips = query.stream()

        # Convert Firestore documents to a list of dictionaries
        trip_list = [trip.to_dict() for trip in trips]

        return {"past_trips": trip_list}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



# receiver section

@app.get("/ReceiverGetTrips")
async def get_locations(prices: str = None, weight: str = None, location: str = None):
    try:
        trips_ref = db.collection("trips")

        # Apply filters based on the provided parameters
        if prices:
            trips_ref = trips_ref.where("price", "==", prices)
        if weight:
            trips_ref = trips_ref.where("weight", "==", weight)
        if location:
            trips_ref = trips_ref.where("location", "==", location)

        # Retrieve the filtered trips
        trips = trips_ref.stream()

        # Convert Firestore documents to a list of dictionaries
        trip_list = [trip.to_dict() for trip in trips]

        return {"trips": trip_list}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@app.get("/ReceiverSelectTrip")
async def get_trips(delivery_id: str = None):
    try:
        trips_ref = db.collection("trips")

        if delivery_id:
            # Retrieve the trip with the specified delivery_id
            query = trips_ref.where("delivery_id", "==", delivery_id)
            trips = query.stream()
        else:
            # Retrieve all trips if no delivery_id is provided
            trips = trips_ref.stream()

        # Convert Firestore documents to a list of dictionaries
        trip_list = [trip.to_dict() for trip in trips]

        return {"trips": trip_list}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#receiver page


if __name__ == "__main__":
    import uvicorn

    # Run the FastAPI application using uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
