import { ChangeEvent, KeyboardEvent, MouseEvent } from "react";
// mui
import { Stack, Card, TextField, SvgIcon, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
// component
import { IconFilter } from ".";

interface ISearchFilter {
	searchValue: string;
	onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
	toggleFilterDrawer: (
		open: boolean,
	) => (event: KeyboardEvent | MouseEvent) => void;
}

export default function SearchFilter({
	searchValue,
	onSearchChange,
	toggleFilterDrawer,
}: ISearchFilter) {
	return (
		<Stack direction='row' columnGap={2}>
			<TextField
				value={searchValue}
				onChange={onSearchChange}
				variant='filled'
				placeholder='Search for destinations...'
				fullWidth
				InputProps={{
					startAdornment: <Search />,
					sx: {
						bgcolor: "grey.0",
						boxShadow: "0px 15px 30px 0px #E9EDF280",
						"& input": {
							p: 1.75,
							borderRadius: "14px",
						},
					},
				}}
			/>
			<Card
				sx={{
					height: 51,
					width: 65,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<IconButton onClick={toggleFilterDrawer(true)}>
					<SvgIcon sx={{ width: 25, height: 25 }}>
						<IconFilter />
					</SvgIcon>
				</IconButton>
			</Card>
		</Stack>
	);
}
