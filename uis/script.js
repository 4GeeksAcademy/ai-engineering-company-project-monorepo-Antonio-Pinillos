const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const header = document.getElementById("site-header");
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const yearTarget = document.getElementById("current-year");

if (yearTarget) {
	yearTarget.textContent = String(new Date().getFullYear());
}

if (mobileMenuButton && mobileMenu) {
	mobileMenu.classList.add("hidden");

	const setMenuState = (isOpen) => {
		mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
		mobileMenuButton.setAttribute("aria-label", isOpen ? "Cerrar menu principal" : "Abrir menu principal");
		mobileMenu.classList.toggle("hidden", !isOpen);
	};

	setMenuState(false);

	mobileMenuButton.addEventListener("click", () => {
		const isOpen = mobileMenuButton.getAttribute("aria-expanded") === "true";
		setMenuState(!isOpen);
	});

	mobileMenu.querySelectorAll("a[href^='#']").forEach((link) => {
		link.addEventListener("click", () => setMenuState(false));
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			setMenuState(false);
		}
	});
}

if (header) {
	const updateHeaderStyle = () => {
		header.classList.toggle("header-scrolled", window.scrollY > 10);
	};
	updateHeaderStyle();
	window.addEventListener("scroll", updateHeaderStyle, { passive: true });
}

document.querySelectorAll("a[href^='#']").forEach((anchor) => {
	anchor.addEventListener("click", (event) => {
		const targetId = anchor.getAttribute("href");
		if (!targetId || targetId === "#") {
			return;
		}

		const targetElement = document.querySelector(targetId);
		if (!targetElement) {
			return;
		}

		event.preventDefault();
		targetElement.scrollIntoView({
			behavior: prefersReducedMotion ? "auto" : "smooth",
			block: "start",
		});
	});
});

if (contactForm && formStatus) {
	contactForm.addEventListener("submit", (event) => {
		event.preventDefault();

		if (!contactForm.checkValidity()) {
			contactForm.reportValidity();
			formStatus.textContent = "Revisa los campos obligatorios antes de enviar la solicitud.";
			formStatus.classList.remove("text-brand-cyan-light");
			formStatus.classList.add("text-red-300");
			return;
		}

		formStatus.textContent = "Gracias. Hemos recibido tu solicitud y te contactaremos en breve.";
		formStatus.classList.remove("text-red-300");
		formStatus.classList.add("text-brand-cyan-light");
		contactForm.reset();
	});
}
