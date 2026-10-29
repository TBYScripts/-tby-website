// TBY DEVELOPMENT — WEBSITE CONFIGURATION

const config = {
    discordInvite: "https://discord.gg/kYXvCTU2us",
    quoteEmail: ""
};

// DISCORD NAVIGATION

const discordLink = document.getElementById("discord-link");

if (discordLink) {
    discordLink.addEventListener("click", function(event) {
        event.preventDefault();

        window.open(
            config.discordInvite,
            "_blank",
            "noopener,noreferrer"
        );
    });
}

// SUPPORT BUTTONS

const generalSupport = document.getElementById("general-support");
const purchaseSupport = document.getElementById("purchase-support");

function openSupport(event) {
    event.preventDefault();

    window.open(
        config.discordInvite,
        "_blank",
        "noopener,noreferrer"
    );
}

if (generalSupport) {
    generalSupport.addEventListener("click", openSupport);
}

if (purchaseSupport) {
    purchaseSupport.addEventListener("click", openSupport);
}

// CUSTOM DEVELOPMENT QUOTE FORM

const quoteForm = document.getElementById("quote-form");

if (quoteForm) {
    quoteForm.addEventListener("submit", function(event) {
        event.preventDefault();

        if (!config.quoteEmail) {
            alert("Custom quote submissions are not available yet.");
            return;
        }

        const discord = document.getElementById("discord").value;
        const email = document.getElementById("email").value;
        const project = document.getElementById("project").value;
        const budget = document.getElementById("budget").value;
        const description = document.getElementById("description").value;
        const references = document.getElementById("references").value;

        const subject = "TBY Development - Custom Quote Request";

        const body = `
Discord Username: ${discord}
Email: ${email}
Project Type: ${project}
Budget: ${budget}

Project Description:
${description}

Reference Links:
${references}
        `;

        const mailto = `mailto:${config.quoteEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailto;
    });
}
