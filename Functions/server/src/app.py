from fastapi import FastAPI, HTTPException
from google.cloud import firestore

app = FastAPI()

# Replace with your own Firestore credentials file path
# You can download it from your Google Cloud Console
# https://cloud.google.com/firestore/docs/quickstart
cred_path = "credentials.json"
db = firestore.Client.from_service_account_json(cred_path)

@app.post("/postTrip")
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

if __name__ == "__main__":
    import uvicorn

    # Run the FastAPI application using uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
