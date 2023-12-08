import moment from "moment";
// mui
import { Stack, Box } from "@mui/material";
// components
import { ShipperTripCard } from "../../../components";
// types
import { IShipperData } from "../../../types/TripData.types";

interface ICurrentTrips {
	shipperCurrentTripsData: { shipper_data: IShipperData }[];
}

export default function ArchivedTrips({
	shipperCurrentTripsData,
}: ICurrentTrips) {
	return (
		<Box sx={{ maxHeight: "600px", overflowY: "auto" }}>
			<Stack rowGap={2}>
				{shipperCurrentTripsData.map((trip) => (
					<ShipperTripCard
						arrivalDate={moment(trip.shipper_data.arrival_date, "YYYY-MM-DD")
							.format("MMM DD")
							.toString()}
						destinationCity={trip.shipper_data.shipper_to_location.name}
						maxWeight={trip.shipper_data.max_permissible_weight}
						pricePerKg={trip.shipper_data.price_per_kg}
						shipperName={trip.shipper_data.name}
						archived={true}
						key={trip.shipper_data.name}
					/>
				))}
			</Stack>
		</Box>
	);
}
