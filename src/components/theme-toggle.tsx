import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";

import { Switch } from "@/components/ui/switch";

export default function ThemeToggle() {
	const [isDark, setIsDark] = useState(false);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const initialDark = document.documentElement.classList.contains("dark");
		setIsDark(initialDark);
		setIsReady(true);
	}, []);

	const handleCheckedChange = (checked: boolean) => {
		setIsDark(checked);
		document.documentElement.classList.toggle("dark", checked);
		localStorage.setItem("theme", checked ? "dark" : "light");
	};

	return (
		<div className="inline-flex items-center gap-2 text-muted-foreground">
			<SunIcon className={`size-4 transition-opacity ${isDark ? "opacity-40" : "opacity-100"}`} aria-hidden="true" />
			<Switch
				checked={isDark}
				onCheckedChange={handleCheckedChange}
				disabled={!isReady}
				aria-label="Toggle theme"
			/>
			<MoonIcon className={`size-4 transition-opacity ${isDark ? "opacity-100" : "opacity-40"}`} aria-hidden="true" />
		</div>
	);
}
