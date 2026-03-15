import { useRef } from 'react';
import clsx from 'clsx';

import { OptionType } from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

type FormState = {
	fontFamilyOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
	fontSizeOption: OptionType;
};

type ArticleParamsFormProps = {
	isOpen: boolean;
	formState: FormState;
	fontFamilyOptions: OptionType[];
	fontColors: OptionType[];
	backgroundColors: OptionType[];
	contentWidthArr: OptionType[];
	fontSizeOptions: OptionType[];
	onChange: (params: Partial<FormState>) => void;
	onApply: () => void;
	onReset: () => void;
	onToggle: () => void;
	onClose: () => void;
};

export const ArticleParamsForm = ({
	isOpen,
	formState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	onChange,
	onApply,
	onReset,
	onToggle,
	onClose,
}: ArticleParamsFormProps) => {
	const asideRef = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen,
		rootRef: asideRef,
		onClose,
		onChange: () => {
			// хук вызовется при клике вне, реальное закрытие делает onClose
		},
	});

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		onApply();
	};

	return (
		<>
			<div className={styles.arrowButtonWrapper}>
				<ArrowButton isOpen={isOpen} onClick={onToggle} />
			</div>

			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<div className={styles.header}>
					<Text as='h2' size={25} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
				</div>

				<form className={styles.form} onSubmit={handleSubmit}>
					{/* ШРИФТ */}
					<div className={styles.field}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={(option) => onChange({ fontFamilyOption: option })}
						/>
					</div>

					{/* РАЗМЕР ШРИФТА */}
					<div className={styles.field}>
						<RadioGroup
							name='fontSize'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={(option) => onChange({ fontSizeOption: option })}
						/>
					</div>

					{/* ЦВЕТ ШРИФТА */}
					<div className={styles.field}>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={formState.fontColor}
							onChange={(option) => onChange({ fontColor: option })}
						/>
					</div>

					{/* СЕПАРАТОР ПЕРЕД ЦВЕТОМ ФОНА */}
					<div className={styles.separatorWrapper}>
						<Separator />
					</div>

					{/* ЦВЕТ ФОНА */}
					<div className={`${styles.field} ${styles.fieldColorBackground}`}>
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={(option) => onChange({ backgroundColor: option })}
						/>
					</div>

					{/* ШИРИНА КОНТЕНТА */}
					<div className={styles.field}>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={(option) => onChange({ contentWidth: option })}
						/>
					</div>

					<div className={styles.buttons}>
						<Button
							title='Сбросить'
							type='clear'
							htmlType='button'
							onClick={onReset}
						/>
						<Button title='Применить' type='apply' htmlType='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
