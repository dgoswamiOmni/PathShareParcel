import { useState, useCallback, KeyboardEvent, MouseEvent } from "react";
import moment from "moment";
// mui
import {
	Stack,
	Box,
	Drawer,
	Card,
	Typography,
	SvgIcon,
	TextField,
	Divider,
	Button,
} from "@mui/material";
import axios from "axios";
// components
import { ReceiverTripCard, IconWeight, IconPoint } from "../../../components";
// assets
import mapRoute from "../../../assets/map_route.png";
// types
import { ITripData } from "../../../types/TripData.types";

export default function AvailableTrips({
	receiverTripsData,
}: {
	receiverTripsData: ITripData[];
}) {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [selectedTrip, setSelectedTrip] = useState<ITripData | null>(null);

	// Toggle filter drawer
	const toggleDrawer = useCallback(
		(open: boolean) => (event: KeyboardEvent | MouseEvent) => {
			if (
				event.type === "keydown" &&
				((event as React.KeyboardEvent).key === "Tab" ||
					(event as React.KeyboardEvent).key === "Shift")
			) {
				return;
			}

			setDrawerOpen(open);
		},
		[],
	);

	// Handle Clicking 'Book This Trip' button
	const handleTripSelect = useCallback((tripData: ITripData) => {
		setSelectedTrip(tripData);
		setDrawerOpen(true); // Call toggleDrawer to open the drawer
	}, []);

	// Handle clicking 'Confirm Booking' button
	const handleConfirmBooking = useCallback(async () => {
		try {
			// MOck data
			const postData = {
				receiver_data: {
					delivery_id: selectedTrip?.shipper_data.delivery_id,
					item_information: ["item1", "item2", "item3"],
					receiver_delivery_point: {
						name: selectedTrip?.shipper_data.shipper_to_location.name,
						lat: "",
						long: "",
					},
					receiver_name: "John Doe",
					receiver_pickup_point: {
						name: selectedTrip?.shipper_data.shipper_to_location.name,
						lat: "",
						long: "",
					},
					user_id: "1242741",
				},
			};

			await axios
				.post(
					`https://pathshare-g2jarsb23q-nw.a.run.app/ReceiverSelectTrip/${selectedTrip?.shipper_data.delivery_id}`,
					postData,
				)
				.then((res) => {
					if (res.status === 200) {
						window.location.reload();
					}
				});
		} catch (error) {
			console.error(error);
		}
	}, []);

	return (
		<Box sx={{ maxHeight: "600px", overflowY: "auto" }}>
			<Stack sx={{ mt: 2 }} rowGap={2}>
				{receiverTripsData.map((data) => (
					<ReceiverTripCard
						key={data.shipper_data.name}
						arrivalDate={moment(data.shipper_data.arrival_date, "YYYY-MM-DD")
							.format("MMM DD")
							.toString()}
						destinationCity={data.shipper_data.shipper_to_location.name}
						maxWeight={data.shipper_data.max_permissible_weight}
						pricePerKg={data.shipper_data.price_per_kg}
						shipperName={data.shipper_data.name}
						onSelect={() => handleTripSelect(data)}
					/>
				))}
			</Stack>
			<Drawer anchor='bottom' open={drawerOpen} onClose={toggleDrawer(false)}>
				<Box sx={{ pb: 12 }}>
					<img src={mapRoute} style={{ width: "100%", height: "143px" }} />
					<Stack sx={{ px: 2 }} rowGap={2}>
						<Card sx={{ p: 2, mt: "-30px" }}>
							<Stack
								direction='row'
								justifyContent='space-between'
								alignItems='center'>
								<Typography variant='body1' fontSize={15} fontWeight={600}>
									{selectedTrip?.shipper_data.shipper_to_location.name}
								</Typography>
								<Typography variant='body1' fontSize={15} fontWeight={600}>
									{moment(selectedTrip?.shipper_data.arrival_date, "YYYY-MM-DD")
										.format("MMM DD")
										.toString()}
								</Typography>
							</Stack>

							<Box sx={{ mt: 1 }}>
								<Typography variant='body2' fontSize={12}>
									{selectedTrip?.shipper_data.name}
								</Typography>
							</Box>

							<Stack
								direction='row'
								justifyContent='space-between'
								alignItems='center'>
								<Stack
									sx={{ mt: 1 }}
									columnGap={0.75}
									direction='row'
									justifyContent='start'
									alignItems='end'>
									<SvgIcon sx={{ width: 22, height: 22 }}>
										<IconWeight />
									</SvgIcon>
									<Typography variant='body2' fontSize={12} color='grey.600'>
										{selectedTrip?.shipper_data.max_permissible_weight} kg.
									</Typography>
								</Stack>

								<Box>
									<Typography
										variant='body1'
										fontSize={15}
										fontWeight={600}
										color='grey.500'>
										£{selectedTrip?.shipper_data.price_per_kg}/kg.
									</Typography>
								</Box>
							</Stack>
						</Card>

						<Box>
							<Typography variant='h6' fontSize={17} fontWeight={700}>
								About
							</Typography>
							<Typography
								variant='body2'
								fontSize={14}
								fontWeight={600}
								color='grey.500'>
								Dimensions allowed:{" "}
								{selectedTrip?.shipper_data.max_permissible_size.breadth} x{" "}
								{selectedTrip?.shipper_data.max_permissible_size.length} x{" "}
								{selectedTrip?.shipper_data.max_permissible_size.breadth} (hwd)
							</Typography>
						</Box>

						<Stack rowGap={1}>
							<Typography variant='h6' fontSize={17} fontWeight={700}>
								Journey
							</Typography>
							<Stack
								direction='row'
								alignItems='flex-start'
								justifyContent='center'
								columnGap={1}>
								<SvgIcon
									sx={{ width: "15px", heigh: "15px" }}
									viewBox='0 0 15 15'>
									<IconPoint />
								</SvgIcon>
								<Typography variant='body1' fontSize={17} fontWeight={700}>
									{selectedTrip?.shipper_data.shipper_from_location.name}
								</Typography>
							</Stack>
							<Divider variant='middle'>TO</Divider>
							<Stack
								direction='row'
								alignItems='flex-start'
								justifyContent='center'
								columnGap={1}>
								<SvgIcon
									sx={{ width: "15px", heigh: "15px" }}
									viewBox='0 0 15 15'>
									<IconPoint />
								</SvgIcon>
								<Typography variant='body1' fontSize={17} fontWeight={700}>
									{selectedTrip?.shipper_data.shipper_to_location.name}
								</Typography>
							</Stack>
						</Stack>

						<Box>
							<TextField fullWidth label='About Parcel' />
						</Box>

						<Box>
							<Button
								fullWidth
								variant='contained'
								size='large'
								onClick={handleConfirmBooking}>
								Confirm Booking
							</Button>
						</Box>
					</Stack>
				</Box>
			</Drawer>
		</Box>
	);
}
