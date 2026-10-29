// ========================================
// TBY Development — Website JavaScript
// ========================================

const config = {
    discordInvite: "https://discord.gg/kYXvCTU2us",
    quoteAPI: "https://tby-quote-api.20kait-xs.workers.dev"
};

// ========================================
// Discord Links
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const discordLink = document.getElementById("discord-link");
    const generalSupport = document.getElementById("general-support");
    const purchaseSupport = document.getElementById("purchase-support");

    const discordButtons = [
        discordLink,
        generalSupport,
        purchaseSupport
    ];

    discordButtons.forEach(button => {
        if (!button) return;

        button.href = config.discordInvite;
        button.target = "_blank";
        button.rel = "noopener noreferrer";
    });

    // ========================================
    // Custom Quote Form
    // ========================================

    const quoteForm = document.getElementById("quote-form");

    if (!quoteForm) return;

    const submitButton = quoteForm.querySelector('button[type="submit"]');

    // Create a message area below the submit button
    const statusMessage = document.createElement("p");

    statusMessage.id = "quote-status";
    statusMessage.setAttribute("role", "status");
    statusMessage.setAttribute("aria-live", "polite");
    statusMessage.style.marginTop = "15px";
    statusMessage.style.fontSize = "14px";

    quoteForm.appendChild(statusMessage);

    let submitting = false;

    quoteForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (submitting) return;

        const discord = document.getElementById("discord")?.value.trim() || "";
        const email = document.getElementById("email")?.value.trim() || "";
        const project = document.getElementById("project")?.value || "";
        const budget = document.getElementById("budget")?.value || "";
        const description = document.getElementById("description")?.value.trim() || "";
        const references = document.getElementById("references")?.value.trim() || "";

        // Validate required fields
        if (!discord || !project || !budget || !description) {
            statusMessage.textContent = "Please complete all required fields.";
            statusMessage.style.color = "#FF7777";
            return;
        }

        submitting = true;

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";
        }

        statusMessage.textContent = "Sending your request...";
        statusMessage.style.color = "#91A4B3";

        try {
            const response = await fetch(config.quoteAPI, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    discord,
                    email,
                    project,
                    budget,
                    description,
                    references
                })
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || "Unable to submit your request."
                );
            }

            // Success
            statusMessage.textContent =
                "Your request has been submitted! Our team will contact you on Discord.";

            statusMessage.style.color = "#55DCE8";

            quoteForm.reset();

        } catch (error) {
            console.error("Quote submission failed:", error);

            statusMessage.textContent =
                "Your request could not be submitted. Please try again later.";

            statusMessage.style.color = "#FF7777";

        } finally {
            submitting = false;

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Submit Request";
            }
        }
    });
});
