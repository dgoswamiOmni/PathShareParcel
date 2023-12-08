interface IIconArrowUp {
	selected: boolean;
}

export default function IconArrowUp({ selected }: IIconArrowUp) {
	return (
		<svg
			width='51'
			height='51'
			viewBox='0 0 51 51'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M16.5827 24.5696L16.5826 24.5696C14.0599 23.7291 12.2428 23.1214 11.0479 22.5401C9.78967 21.928 9.59425 21.5194 9.59425 21.25C9.59425 20.9797 9.79013 20.571 11.0482 19.9594C12.2431 19.3786 14.0597 18.7721 16.5804 17.9326L16.5807 17.9325L34.6747 11.8976C34.6748 11.8976 34.6749 11.8975 34.675 11.8975C36.4575 11.304 37.7137 10.8877 38.6421 10.7227C39.5759 10.5568 39.9192 10.6944 40.1124 10.8876C40.3055 11.0807 40.4432 11.424 40.277 12.3581C40.1118 13.2866 39.6949 14.5435 39.1004 16.3272C39.1004 16.3272 39.1004 16.3272 39.1004 16.3272L33.0696 34.4152L33.0696 34.4154C32.229 36.9391 31.6214 38.7562 31.0402 39.9507C30.4282 41.2084 30.0196 41.4036 29.75 41.4036C29.4793 41.4036 29.0707 41.2081 28.4591 39.9508C27.8781 38.7563 27.271 36.9392 26.4305 34.4154L26.4304 34.4152L25.4316 31.419C25.4127 31.362 25.3939 31.3057 25.3754 31.2501C24.7732 29.4419 24.3888 28.2879 23.5505 27.4495C22.71 26.6091 21.5547 26.2251 19.7346 25.6201C19.6831 25.603 19.6311 25.5857 19.5785 25.5682L16.5827 24.5696Z'
				fill={selected ? "#00AB55" : undefined}
				stroke='black'
				strokeWidth='1.5'
			/>
			<path
				d='M15.6239 28.6659L15.6238 28.6659C15.4254 28.5998 15.2145 28.5797 15.0073 28.6074C14.8 28.635 14.6018 28.7095 14.4277 28.8253C14.4277 28.8253 14.4276 28.8253 14.4276 28.8254L12.1118 30.3678C12.1118 30.3678 12.1118 30.3678 12.1118 30.3678C11.9586 30.4699 11.8383 30.6143 11.7657 30.7835C11.693 30.9526 11.6711 31.1393 11.7025 31.3207C11.734 31.5021 11.8175 31.6704 11.9428 31.8053C12.0682 31.9401 12.2301 32.0356 12.4087 32.0802L12.4089 32.0802L16.5633 33.1172L16.5633 33.1172C16.8822 33.1968 17.1735 33.3617 17.4059 33.5941C17.6383 33.8265 17.8032 34.1178 17.8828 34.4367L17.8828 34.4367L18.9198 38.5911L18.9198 38.5913C18.9644 38.7699 19.0599 38.9318 19.1947 39.0572C19.3296 39.1825 19.4979 39.266 19.6793 39.2975C19.8607 39.3289 20.0474 39.307 20.2165 39.2343C20.3857 39.1617 20.5301 39.0414 20.6322 38.8882C20.6322 38.8882 20.6322 38.8882 20.6322 38.8882L22.1746 36.5724C22.2904 36.3983 22.365 36.2 22.3926 35.9927C22.4203 35.7855 22.4002 35.5746 22.3341 35.3762L22.3341 35.3761L20.8743 30.9947L15.6239 28.6659ZM15.6239 28.6659L20.0053 30.1257M15.6239 28.6659L20.0053 30.1257M20.0053 30.1257C20.0054 30.1257 20.0055 30.1257 20.0055 30.1258C20.0056 30.1258 20.0056 30.1258 20.0057 30.1258C20.2079 30.1933 20.3916 30.307 20.5423 30.4577C20.693 30.6084 20.8067 30.7921 20.8742 30.9943L20.0053 30.1257Z'
				fill={selected ? "#00AB55" : undefined}
				stroke='black'
				strokeWidth='1.5'
			/>
		</svg>
	);
}
