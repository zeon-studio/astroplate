import languages from "@/config/language.json";
import React from 'react';

const LanguageSwitcher = ({ lang, pathname }: { lang: string; pathname: string }) => {

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
				value={lang}
			>
				{languages.map((language) => (
					<option
						key={language.languageCode}
						value={language.languageCode}
					>
						{language.languageName}
					</option>
				))}
			</select>
		</div>
	)
}

export default LanguageSwitcher;
