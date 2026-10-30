// ========================================
// TBY Development — Website JavaScript
// ========================================

const config = {
    discordInvite: "https://discord.gg/kYXvCTU2us",
    quoteForm: "https://forms.gle/KL1U3KE7HnwPCMeA6"
};

document.addEventListener("DOMContentLoaded", () => {

    // Discord navigation and support buttons
    const discordButtons = [
        document.getElementById("discord-link"),
        document.getElementById("general-support"),
        document.getElementById("purchase-support")
    ];

    discordButtons.forEach(button => {
        if (!button) return;

        button.href = config.discordInvite;
        button.target = "_blank";
        button.rel = "noopener noreferrer";
    });

});
