import { useState, SyntheticEvent, useEffect } from "react";
import axios from "axios";
import moment from "moment";
// mui
import { Box, Tabs, Tab, Stack } from "@mui/material";
// sections
import { CurrentTrips, ArchivedTrips, Requests } from "../../sections/dashboard/shipper";
// auth
import { useAuthContext } from "../../auth/useAuthContext";
// types
import { IReceiverData, IShipperData } from "../../types/TripData.types";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && <Box>{children}</Box>}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export default function ShipperPage() {
	const { user } = useAuthContext();

	// @ts-ignore
	const { uid } = user;

	const [value, setValue] = useState(0);
	const [currentShipperTrips, setShipperCurrentTrips] = useState<
		{ shipper_data: IShipperData }[]
	>([]);
	const [pastShipperTrips, setPastShipperTrips] = useState<
		{ shipper_data: IShipperData }[]
	>([]);
	const [currentShipperRequests, setCurrentShipperRequests] = useState<
		{ receiver_data: IReceiverData }[]
	>([]);

	const handleTabChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const getShipperTrips = async (userId: string) => {
		try {
			await axios
				.get(
					`https://pathshare-g2jarsb23q-nw.a.run.app/ShipperGetTrips?user_id=${userId}`,
				)
				.then((res) => {
					if (res.status === 200) {
						// @ts-ignore
						const currentTrips = res.data.past_trips.filter((trip) =>
							moment(trip.shipper_data.arrival_date, "YYYY-MM-DD").isAfter(
								moment(),
							),
						);
						// @ts-ignore
						const pastTrips = res.data.past_trips.filter((trip) =>
							moment(trip.shipper_data.arrival_date, "YYYY-MM-DD").isBefore(
								moment(),
							),
						);
						const currentRequest = res.data.past_trips.filter(
							// @ts-ignore
							(trip) => trip.receiver_data,
						);

						setShipperCurrentTrips(currentTrips);
						setPastShipperTrips(pastTrips);
						setCurrentShipperRequests(currentRequest);
					}
				});
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getShipperTrips("112233445");
	}, []);

	return (
		<Box sx={{ px: 3 }}>
			<Box>
				<Tabs value={value} onChange={handleTabChange}>
					<Tab label='Current' {...a11yProps(0)} />
					<Tab label='Requests' {...a11yProps(0)} />
					<Tab label='Archive' {...a11yProps(1)} />
				</Tabs>
			</Box>

			<CustomTabPanel index={0} value={value}>
				<CurrentTrips shipperCurrentTripsData={currentShipperTrips} />
			</CustomTabPanel>

			<CustomTabPanel index={1} value={value}>
				<ArchivedTrips shipperCurrentTripsData={pastShipperTrips} />
			</CustomTabPanel>

			<CustomTabPanel index={1} value={value}>
				<Requests shipperCurrentTripsRequests={currentShipperRequests} />
			</CustomTabPanel>
		</Box>
	);
}
