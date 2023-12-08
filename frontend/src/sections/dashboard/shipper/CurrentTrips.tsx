import {
	useState,
	useCallback,
	KeyboardEvent,
	MouseEvent,
	ElementType,
} from "react";
import moment from "moment";
// mui
import {
	Box,
	Button,
	Stack,
	Typography,
	Drawer,
	TextFieldProps,
	Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
// components
import { ShipperTripCard } from "../../../components";
import FormProvider, { RHFTextField } from "../../../components/hook-form";
// form
import { useForm, Controller } from "react-hook-form";
// types
import { IShipperData } from "../../../types/TripData.types";

interface ICurrentTrips {
	shipperCurrentTripsData: { shipper_data: IShipperData }[];
}

type FormValuesProps = {
	tripDate: moment.Moment | null;
	pricePerKg: string;
	aboutTrip: string;
	maxWeight: string;
	from: string;
	to: string;
	afterSubmit?: string;
};

export default function CurrentTrips({
	shipperCurrentTripsData,
}: ICurrentTrips) {
	const [drawerOpen, setDrawerOpen] = useState(false);

	// Toggle filter drawer
	const toggleDrawer = useCallback(
		(open: boolean) => (event: KeyboardEvent | MouseEvent) => {
			if (
				event.type === "keydown" &&
				((event as KeyboardEvent).key === "Tab" ||
					(event as KeyboardEvent).key === "Shift")
			) {
				return;
			}

			setDrawerOpen(open);
		},
		[],
	);

	const defaultValues = {
		tripDate: null,
		pricePerKg: "",
		aboutTrip: "",
		maxWeight: "",
		from: "",
		to: "",
	};

	const methods = useForm<FormValuesProps>({
		defaultValues,
	});

	const {
		reset,
		setError,
		handleSubmit,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = methods;

	const onSubmitTrip = async (data: FormValuesProps) => {
		console.log(data);
		// TODO: implement data post
	};

	return (
		<Box sx={{ maxHeight: "600px", overflowY: "auto" }}>
			<Stack rowGap={2}>
				<Stack
					sx={{ mt: 2 }}
					direction='row'
					justifyContent='space-between'
					alignItems='center'>
					<Typography variant='h3' fontSize={16}>
						Add a new trip here...
					</Typography>
					<Button
						variant='contained'
						size='small'
						startIcon={<AddIcon />}
						onClick={toggleDrawer(true)}>
						New Trip
					</Button>
				</Stack>
				{shipperCurrentTripsData.map((trip) => (
					<ShipperTripCard
						arrivalDate={moment(trip.shipper_data.arrival_date, "YYYY-MM-DD")
							.format("MMM DD")
							.toString()}
						destinationCity={trip.shipper_data.shipper_to_location.name}
						maxWeight={trip.shipper_data.max_permissible_weight}
						pricePerKg={trip.shipper_data.price_per_kg}
						shipperName={trip.shipper_data.name}
						key={trip.shipper_data.name}
					/>
				))}
			</Stack>

			<Drawer anchor='bottom' open={drawerOpen} onClose={toggleDrawer(false)}>
				<Stack sx={{ pb: 12, pt: 2, px: 2 }}>
					<FormProvider methods={methods} onSubmit={handleSubmit(onSubmitTrip)}>
						<Stack rowGap={3}>
							{!!errors.afterSubmit && (
								<Alert severity='error'>{errors.afterSubmit.message}</Alert>
							)}
							<Stack direction='row' alignItems='center' columnGap={2}>
								<Typography variant='body1' fontSize={16}>
									Trip Date
								</Typography>
								<Controller
									name='tripDate'
									control={methods.control}
									rules={{ required: true }}
									render={({ field }) => (
										<MobileDatePicker
											{...field}
											label='Trip Date'
											slotProps={{
												textField: {
													fullWidth: true,
												},
											}}
										/>
									)}
								/>
							</Stack>

							<Stack rowGap={1}>
								<Typography variant='body1' fontSize={16}>
									Select Price
								</Typography>
								<RHFTextField name='pricePerKg' label='Price per kg' />
							</Stack>

							<Stack rowGap={1}>
								<Typography variant='body1' fontSize={16}>
									About Trip
								</Typography>
								<RHFTextField name='aboutTrip' label='About Trip' />
							</Stack>

							<Stack
								rowGap={1}
								direction='row'
								alignItems='center'
								columnGap={1}>
								<Typography variant='body1' fontSize={16}>
									Weight
								</Typography>
								<RHFTextField name='maxWeight' label='Max Weight' />
							</Stack>

							<Stack rowGap={1}>
								<Typography variant='body1' fontSize={16}>
									Journey
								</Typography>
								<RHFTextField name='from' label='Traveling From' />
								<RHFTextField name='to' label='Traveling To' />
							</Stack>

							<Box>
								<LoadingButton
									type='submit'
									fullWidth
									variant='contained'
									size='large'
									loading={isSubmitSuccessful || isSubmitting}>
									Confirm Trip
								</LoadingButton>
							</Box>
						</Stack>
					</FormProvider>
				</Stack>
			</Drawer>
		</Box>
	);
}
