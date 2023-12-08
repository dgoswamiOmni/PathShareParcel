import {
	useState,
	useCallback,
	useEffect,
	ChangeEvent,
	KeyboardEvent,
	MouseEvent,
} from "react";
import axios from "axios";
import moment from "moment";
// mui
import {
	Box,
	Drawer,
	Stack,
	Typography,
	Select,
	MenuItem,
	Slider,
	SelectChangeEvent,
	Button,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
// components
import { SearchFilter } from "../../components";
// sections
import { AvailableTrips } from "../../sections/dashboard/receiver";
// types
import { ITripData } from "../../types/TripData.types";

export default function ReceiverPage() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [receiverTrips, setReceiverTrips] = useState<ITripData[]>([]);
	const [filteredTrips, setFilteredTrips] = useState<ITripData[]>([]);
	const [searchValue, setSearchValue] = useState("");
	const [dateFilter, setDateFilter] = useState<moment.Moment | null>(null);
	const [weightFilter, setWeightFilter] = useState("");
	const [priceFilter, setPriceFilter] = useState(0);

	// Record the value of the search input
	const handleSearchChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setSearchValue(event.target.value);
		},
		[],
	);

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

	// Register value from the date picker filter
	const handleDateFilterChange = useCallback((value: any, context: any) => {
		setDateFilter(value);
	}, []);

	// Register value from the weight select filter
	const handleWeightFilterChange = useCallback((event: SelectChangeEvent) => {
		setWeightFilter(event.target.value);
	}, []);

	// Register value from the max price slider
	const handlePriceFilterChange = useCallback(
		(event: Event, newValue: number | number[]) => {
			setPriceFilter(newValue as number); // Cast newValue to a number if it's not already
		},
		[],
	);

	// Apply all filters
	const handleApplyFilter = useCallback(() => {
		let filtered = receiverTrips;

		// Filter by search value (assuming you want to filter by shipper's name)
		if (searchValue) {
			filtered = filtered.filter((trip) =>
				trip.shipper_data.name
					.toLowerCase()
					.includes(searchValue.toLowerCase()),
			);
		}

		// Filter by weight
		if (weightFilter.length) {
			filtered = filtered.filter(
				(trip) =>
					parseFloat(trip.shipper_data.max_permissible_weight) <
					parseFloat(weightFilter),
			);
		}

		// Filter by date
		if (dateFilter) {
			const formattedDateFilter = dateFilter.format("YYYY-MM-DD");
			filtered = filtered.filter(
				(trip) => trip.shipper_data.arrival_date === formattedDateFilter,
			);
		}

		// Filter by price
		if (priceFilter) {
			filtered = filtered.filter(
				(trip) => parseFloat(trip.shipper_data.price_per_kg) <= priceFilter,
			);
		}

		setFilteredTrips(filtered);
		setDrawerOpen(false);
	}, [receiverTrips, searchValue, weightFilter, dateFilter, priceFilter]);

	const getReceiverTrips = async () => {
		try {
			await axios
				.get("https://pathshare-g2jarsb23q-nw.a.run.app/ReceiverGetTrips")
				.then((res) => {
					if (res.status === 200) {
						setReceiverTrips(res.data.trips);
					}
				});
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getReceiverTrips();
	}, []);

	const priceMax = Math.max(
		...receiverTrips.map((trip) => parseFloat(trip.shipper_data.price_per_kg)),
	);

	return (
		<Box sx={{ px: 3 }}>
			<SearchFilter
				searchValue={searchValue}
				onSearchChange={handleSearchChange}
				toggleFilterDrawer={toggleDrawer}
			/>
			{receiverTrips && (
				<AvailableTrips
					receiverTripsData={
						filteredTrips.length ? filteredTrips : receiverTrips
					}
				/>
			)}
			<Drawer anchor='bottom' open={drawerOpen} onClose={toggleDrawer(false)}>
				<Stack rowGap={5} sx={{ pb: 12, pt: 2, px: 2 }}>
					<Stack direction='row' alignItems='center' columnGap={2}>
						<Typography variant='body1' fontSize={16}>
							Weight
						</Typography>
						<Select
							value={weightFilter}
							fullWidth
							onChange={handleWeightFilterChange}>
							<MenuItem value={""}></MenuItem>
							<MenuItem value='5'>
								{"< "}
								{5} kg.
							</MenuItem>
							<MenuItem value='10'>
								{"< "}
								{10} kg.
							</MenuItem>
							<MenuItem value='20'>
								{"< "}
								{20} kg.
							</MenuItem>
							<MenuItem value='40'>
								{"< "}
								{40} kg.
							</MenuItem>
							<MenuItem value='60'>
								{"< "}
								{60} kg.
							</MenuItem>
						</Select>
					</Stack>

					<Stack direction='row' alignItems='center' columnGap={2}>
						<Typography variant='body1' fontSize={16}>
							Date
						</Typography>
						<MobileDatePicker
							disableHighlightToday
							value={dateFilter}
							onChange={handleDateFilterChange}
							slotProps={{
								textField: {
									fullWidth: true,
									sx: {
										borderRadius: "5px",
									},
								},
							}}
						/>
					</Stack>

					<Stack direction='column' justifyContent='center' columnGap={2}>
						<Typography variant='body1' fontSize={16}>
							Max. Price Per Kg
						</Typography>
						<Slider
							value={priceFilter}
							onChange={handlePriceFilterChange}
							valueLabelDisplay='auto'
							step={2}
							max={priceMax}
						/>
					</Stack>

					<Box>
						<Button
							fullWidth
							variant='contained'
							size='large'
							onClick={handleApplyFilter}>
							Apply Filter
						</Button>
					</Box>
				</Stack>
			</Drawer>
		</Box>
	);
}
