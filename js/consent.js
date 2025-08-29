document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const banner = document.getElementById('consent-banner');
    const settingsModalOverlay = document.getElementById('settings-modal-overlay');
    const revokeIcon = document.getElementById('revoke-consent-icon');
    
    // Buttons
    const manageSettingsBtn = document.getElementById('manage-settings-btn');
    const acceptAllBtn = document.getElementById('accept-all-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const saveSettingsBtn = document.getElementById('save-settings-btn');
    
    // Toggles
    const analyticsToggle = document.getElementById('consent-analytics');

    const defaultConsents = { necessary: true, analytics: false };

    // --- Core Functions ---
    function getConsent() {
        const consent = localStorage.getItem('consent_preferences');
        return consent ? JSON.parse(consent) : null;
    }

    function setConsent(preferences) {
        localStorage.setItem('consent_preferences', JSON.stringify(preferences));
    }

    function applyConsent(preferences) {
        if (preferences && preferences.analytics) {
            console.log("Analytics consent GRANTED. You can initialize your analytics script here.");
        } else {
            console.log("Analytics consent DENIED.");
        }
    }

    // --- UI Functions ---
    function showSettingsModal() {
        const currentConsent = getConsent() || defaultConsents;
        if (analyticsToggle) analyticsToggle.checked = currentConsent.analytics;
        if (settingsModalOverlay) settingsModalOverlay.style.display = 'flex';
    }

    function hideAllUI() {
        if (banner) banner.style.display = 'none';
        if (settingsModalOverlay) settingsModalOverlay.style.display = 'none';
    }

    function showRevokeIcon() {
        if (revokeIcon) revokeIcon.style.display = 'flex';
    }

    // --- Event Handlers ---
    function handleAcceptAll() {
        const allConsents = { necessary: true, analytics: true };
        setConsent(allConsents);
        applyConsent(allConsents);
        hideAllUI();
        showRevokeIcon(); // Show the icon to manage settings later
    }

    function handleSaveSettings() {
        const savedPreferences = {
            necessary: true,
            analytics: analyticsToggle ? analyticsToggle.checked : false
        };
        setConsent(savedPreferences);
        applyConsent(savedPreferences);
        hideAllUI();
        showRevokeIcon(); // Show the icon to manage settings later
    }
    
    // --- Initial Load Logic ---
    const userConsent = getConsent();
    if (!userConsent) {
        // First time visitor, show the main banner.
        if (banner) banner.style.display = 'block';
    } else {
        // Returning visitor, apply their settings and show the revoke icon.
        applyConsent(userConsent);
        showRevokeIcon();
    }

    // --- Attach Event Listeners ---
    if (manageSettingsBtn) manageSettingsBtn.addEventListener('click', showSettingsModal);
    if (acceptAllBtn) acceptAllBtn.addEventListener('click', handleAcceptAll);
    if (closeModalBtn) closeModalBtn.addEventListener('click', hideAllUI);
    if (saveSettingsBtn) saveSettingsBtn.addEventListener('click', handleSaveSettings);
    if (revokeIcon) revokeIcon.addEventListener('click', showSettingsModal); // Allow re-opening the modal
});
