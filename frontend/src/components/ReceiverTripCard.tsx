// mui
import { Card, Typography, Stack, Button, Box, SvgIcon } from "@mui/material";
// component
import { IconWeight } from ".";
// types
import { ITripCard } from "../types/TripCard.types";

export default function ReceiverTripCard({
	destinationCity,
	arrivalDate,
	shipperName,
	maxWeight,
	pricePerKg,
	onSelect,
}: ITripCard & {
	onSelect: () => void;
}) {
	return (
		<>
			<Card sx={{ p: 2 }}>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'>
					<Typography variant='body1' fontSize={15} fontWeight={600}>
						{destinationCity}
					</Typography>
					<Typography variant='body1' fontSize={15} fontWeight={600}>
						{arrivalDate}
					</Typography>
				</Stack>

				<Box sx={{ mt: 1 }}>
					<Typography variant='body2' fontSize={12}>
						{shipperName}
					</Typography>
				</Box>

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
						{maxWeight} kg.
					</Typography>
				</Stack>

				<Stack
					sx={{ mt: 3 }}
					direction='row'
					alignItems='center'
					justifyContent='space-between'>
					<Button size='small' variant='outlined' onClick={onSelect}>
						Book This Trip
					</Button>
					<Typography
						variant='body1'
						fontSize={15}
						fontWeight={600}
						color='grey.500'>
						£{pricePerKg}/kg.
					</Typography>
				</Stack>
			</Card>
		</>
	);
}
