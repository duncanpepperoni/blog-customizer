import { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// то, что уже применено к статье (структура как в defaultArticleState)
	const [articleState, setArticleState] = useState(defaultArticleState);

	// черновик настроек в форме
	const [formState, setFormState] = useState({
		fontFamilyOption: defaultArticleState.fontFamilyOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
		fontSizeOption: defaultArticleState.fontSizeOption,
	});

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const handleToggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	const handleCloseSidebar = () => {
		setIsSidebarOpen(false);
	};

	const handleChangeForm = (params: Partial<typeof formState>) => {
		setFormState((prev) => ({
			...prev,
			...params,
		}));
	};

	const handleApply = () => {
		setArticleState({
			fontFamilyOption: formState.fontFamilyOption,
			fontColor: formState.fontColor,
			backgroundColor: formState.backgroundColor,
			contentWidth: formState.contentWidth,
			fontSizeOption: formState.fontSizeOption,
		});
		//setIsSidebarOpen(false);
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
		setFormState({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
			fontSizeOption: defaultArticleState.fontSizeOption,
		});
		setIsSidebarOpen(false);
	};

	// CSS‑переменные считаем из реальных Option-объектов
	const articleStyles = useMemo(() => {
		const fontFamily = articleState.fontFamilyOption.value;
		const fontSize = articleState.fontSizeOption.value;
		const fontColor = articleState.fontColor.value;
		const backgroundColor = articleState.backgroundColor.value;
		const contentWidth = articleState.contentWidth.value;

		return {
			'--font-family': fontFamily,
			'--font-size': fontSize,
			'--font-color': fontColor,
			'--bg-color': backgroundColor,
			'--container-width': contentWidth,
		} as React.CSSProperties;
	}, [articleState]);

	return (
		<div className={clsx(styles.app)} style={articleStyles}>
			<Article />
			<ArticleParamsForm
				isOpen={isSidebarOpen}
				formState={formState}
				fontFamilyOptions={fontFamilyOptions}
				fontColors={fontColors}
				backgroundColors={backgroundColors}
				contentWidthArr={contentWidthArr}
				fontSizeOptions={fontSizeOptions}
				onChange={handleChangeForm}
				onApply={handleApply}
				onReset={handleReset}
				onToggle={handleToggleSidebar}
				onClose={handleCloseSidebar}
			/>
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
