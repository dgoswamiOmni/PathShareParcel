// mui
import { Stack, Box } from "@mui/material";
// types
import { IReceiverData } from "../../../types/TripData.types";
import { ShipperTripCard } from "../../../components";

interface ICurrentTripRequests {
	shipperCurrentTripsRequests: { receiver_data: IReceiverData }[];
}

export default function Requests({
	shipperCurrentTripsRequests,
}: ICurrentTripRequests) {
	return (
		<Box sx={{ maxHeight: "600px", overflowY: "auto" }}>
			<Stack rowGap={2}>
				{/* {shipperCurrentTripsRequests.map(req => (
          <ShipperTripCard 
            arrivalDate={req.receiver_data.receiver_name}
            destinationCity={req.receiver_data.receiver_pickup_point.name}
          maxWeight={}
          />
        ))} */}
			</Stack>
		</Box>
	);
}
