from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google.cloud import firestore

app = FastAPI()

# Add CORS middleware to allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend's actual origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Replace with your own Firestore credentials file path
cred_path = "credentials.json"
db = firestore.Client.from_service_account_json(cred_path)

# Shipper section

@app.post("/ShipperPostTrip")
async def shipper_post_trip(shipper_data: dict):
    try:
        # Validate that the required keys are present in the received JSON
        required_keys = ["name", "user_id", "delivery_id", "shipper_from_location", "shipper_to_location",
                         "max_permissible_weight", "max_permissible_size", "price_per_kg", "arrival_date"]
        for key in required_keys:
            if key not in shipper_data["shipper_data"]:
                raise HTTPException(status_code=400, detail=f"Missing required key: {key}")

        # Store only shipper_data in Firestore
        trips_ref = db.collection("trips")
        trips_ref.add({"shipper_data": shipper_data["shipper_data"]})

        return {"message": "Shipper trip data successfully stored in Firestore"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/ShipperGetTrips")
async def shipper_get_trips(user_id: str):
    try:
        trips_ref = db.collection("trips")

        # Retrieve all shipper_data for the specified user_id
        query = trips_ref.where("shipper_data.user_id", "==", user_id)
        trips = query.stream()

        # Convert Firestore documents to a list of dictionaries
        trip_list = [{"shipper_data": trip.to_dict()["shipper_data"]} for trip in trips]

        return {"past_trips": trip_list}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Receiver section

@app.get("/ReceiverGetTrips")
async def receiver_get_trips(
    price_per_kg: str = None,
    shipper_from_location: str = None,
    shipper_to_location: str = None
):
    try:
        trips_ref = db.collection("trips")

        # Apply filters based on the provided parameters
        if price_per_kg:
            trips_ref = trips_ref.where("shipper_data.price_per_kg", "==", price_per_kg)
        if shipper_from_location:
            trips_ref = trips_ref.where("shipper_data.shipper_from_location.name", "==", shipper_from_location)
        if shipper_to_location:
            trips_ref = trips_ref.where("shipper_data.shipper_to_location.name", "==", shipper_to_location)

        # Retrieve the filtered trips
        trips = trips_ref.stream()

        # Convert Firestore documents to a list of dictionaries
        trip_list = [{"shipper_data": trip.to_dict()["shipper_data"]} for trip in trips]

        return {"trips": trip_list}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ReceiverSelectTrip/{delivery_id}")
async def receiver_select_trip(delivery_id: str, receiver_data: dict):
    try:
        # Check if the specified trip exists
        trips_ref = db.collection("trips")
        selected_trip_ref = trips_ref.where("shipper_data.delivery_id", "==", delivery_id).limit(1).stream()

        selected_trip = next(selected_trip_ref, None)
        if not selected_trip:
            raise HTTPException(status_code=404, detail=f"Trip with delivery_id {delivery_id} not found")

        # Add receiver_data to the selected trip
        selected_trip_ref = db.collection("selected_trip")
        selected_trip_ref.add({"delivery_id": delivery_id, "receiver_data": receiver_data})

        return {"message": f"Receiver data successfully added for trip with delivery_id {delivery_id}"}

    except HTTPException as e:
        raise e

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8080)
