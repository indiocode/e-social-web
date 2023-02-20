import XMLParser from '@kazukinagata/react-xml-parser';
import type { JSZipObject } from 'jszip';
import JSZip from 'jszip';
import { CloudArrowUp, PaperPlaneTilt } from 'phosphor-react';
import type { ChangeEvent, ReactElement } from 'react';
import { useCallback, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';
import { FilesService } from './api';
import {
	AppContainer,
	FilesContainer,
	ImportButton,
	SendButton,
} from './styles';
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/themes/default';

interface Exam {
	date: Date;
	description: string;
	proceeding: number;
}

interface Doctor {
	name: string;
	crm: number;
	uf: string;
	cpf: string;
}

export interface XMLItem {
	id?: string;
	name: string;
	status: string;
	employment: {
		cpf: string;
		enrollment: string;
	};
	exams: Exam[];
	doctor: Doctor;
}

export function App(): ReactElement {
	const [xmlFiles, setXmlFiles] = useState<XMLItem[]>([]);

	const handleImport = async (
		e: ChangeEvent<HTMLInputElement>,
	): Promise<void> => {
		const zipFile = e.target.files![0];

		const zip = await JSZip.loadAsync(zipFile);

		const files: XMLItem[] = await Promise.all(
			Object.values(zip.files).map(async (file: JSZipObject) => {
				const xmlFile = await file.async('string');

				const xmlData = new XMLParser().parseFromString(xmlFile);

				const item: XMLItem = {
					id: uuidv4(),
					status: 'Na fila',
					name: file.name,
					employment: {
						cpf: xmlData?.children[0].children[2].children[0].value as string,
						enrollment: xmlData?.children[0].children[2].children[1]
							.value as string,
					},
					exams: xmlData?.children[0].children[3].children[1].children
						.filter((child) => child.name === 'exame')
						.map((child) => {
							const exam: Exam = {
								date: new Date(child.children[0].value as string),
								proceeding: Number(child.children[1].value),
								description: child.children[2].value as string,
							};

							return exam;
						}) as Exam[],
					doctor: {
						cpf: xmlData?.children[0].children[3].children[2].children[0]
							.value as string,
						name: xmlData?.children[0].children[3].children[2].children[1]
							.value as string,
						crm: Number(
							xmlData?.children[0].children[3].children[2].children[2].value,
						),
						uf: xmlData?.children[0].children[3].children[2].children[3]
							.value as string,
					},
				};

				return item;
			}),
		);

		const xmlFiles = files.filter((file) => file.name.endsWith('.xml'));

		setXmlFiles(xmlFiles);
	};

	const uploadFiles = useCallback(async () => {
		try {
			await Promise.all(
				xmlFiles.map(async (item) => {
					setXmlFiles((state) =>
						state.map((xmlFile) => {
							if (xmlFile.id === item.id) {
								return {
									...xmlFile,
									status: 'Enviando',
								};
							}

							return xmlFile;
						}),
					);
					return await FilesService.create(item);
				}),
			);

			setXmlFiles((state) =>
				state.map((item) => {
					return {
						...item,
						status: 'Enviado',
					};
				}),
			);

			toast.success(`${xmlFiles.length} data of xml files successfully saved`);

			setTimeout(() => {
				setXmlFiles([]);
			}, 5000);
		} catch (error) {
			toast.error(`error when trying to save data: ${error}`);
		}
	}, [xmlFiles]);

	return (
		<ThemeProvider theme={defaultTheme}>
			<AppContainer>
				{xmlFiles.length > 0 ? (
					<SendButton onClick={uploadFiles}>
						<PaperPlaneTilt size={24} /> Enviar
					</SendButton>
				) : (
					<ImportButton>
						<input
							type="file"
							onChange={handleImport}
						/>
						<CloudArrowUp size={24} /> Importar
					</ImportButton>
				)}

				<FilesContainer>
					{xmlFiles.length > 0 && (
						<table>
							<thead>
								<tr>
									<th>#</th>
									<th>Arquivo</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								{xmlFiles.map((file, index) => (
									<tr key={file.id}>
										<td>{`#${index + 1}`}</td>
										<td>{file.name}</td>
										<td>{file.status}</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</FilesContainer>
			</AppContainer>
			<ToastContainer theme="colored" />
			<GlobalStyle />
		</ThemeProvider>
	);
}
