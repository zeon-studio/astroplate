import React from 'react';

const LanguageSwitcher = ({ lang, languages, pathname }: { lang: string; languages: string[]; pathname: string }) => {
	return (
		<div className="mr-5">
			<select
				className="border border-dark py-1 rounded-sm"
				onChange={(e) => {
					const selectedLang = e.target.value;
					const newPath = selectedLang === "en"
						? pathname.replace(`/${lang}`, "")
						: `/${selectedLang}${pathname.replace(`/${lang}`, "")}`;
					window.location.href = newPath;
				}}
				value={languages.includes(lang) ? lang : 'en'}
			>
				{languages.map((child: string) => (
					<option
						key={child}
						value={child}
					>
						{child}
					</option>
				))}
			</select>
		</div>

	)
}

export default LanguageSwitcher