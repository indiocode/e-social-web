/* eslint-disable @typescript-eslint/explicit-function-return-type */
import styled from 'styled-components';

export const UploadButton = styled.label`
	width: 10rem;
	height: 2.8125rem;
	padding: 0 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	border-radius: 5px;
	cursor: pointer;
	background: ${({ theme }) => theme['gray-600']};
	border: 1px solid ${({ theme }) => theme['gray-300']};

	input[type='file'] {
		display: none;
	}
`;

export const AppContainer = styled.section`
	flex: 1;
	max-width: 50rem;
	padding: 4rem 0;
	width: 100%;

	display: flex;
	justify-content: center;
	flex-direction: column;
	margin: 0 auto;
`;

export const FilesContainer = styled.main`
	flex: 1;
	margin-top: 2rem;
	overflow-y: auto;
	max-height: 25rem;
	height: 100%;

	table {
		width: 100%;
		border-collapse: collapse;
		border-spacing: 0;

		th {
			position: sticky;
			top: 0;
			background: ${({ theme }) => theme['gray-600']};
			padding: 1rem;
			text-align: left;
			color: ${({ theme }) => theme['gray-100']};
			font-size: 0.875rem;
			line-height: 1.6;

			&:first-child {
				/* border-top-left-radius: 8px; */
				padding-left: 1.5rem;
			}

			&:last-child {
				/* border-top-right-radius: 8px; */
				padding-right: 1.5rem;
			}
		}

		td {
			background: ${({ theme }) => theme['gray-700']};
			border-top: 4px solid ${({ theme }) => theme['gray-800']};
			padding: 1rem;
			font-size: 0.875rem;
			line-height: 1.6;

			&:first-child {
				padding-left: 1.5rem;
			}

			&:last-child {
				padding-right: 1.5rem;
			}
		}
	}
`;
