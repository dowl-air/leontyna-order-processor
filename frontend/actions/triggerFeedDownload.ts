export const triggerFeedDownload = async () => {
    const response = await fetch("/api/feed", {
        method: "POST",
    });
    if (!response.ok) {
        throw new Error("Failed to trigger feed download");
    }
};
