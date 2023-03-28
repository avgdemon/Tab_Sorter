// This listener is added to the browser action, which is the extension's icon that appears on the toolbar.
chrome.action.onClicked.addListener(function(tab) {

  // This queries all the tabs in the current window.
  chrome.tabs.query({}, function(tabs) {

    // This function sorts the tabs based on the title and domain.
    const sortedTabs = tabs.sort(function(a, b) {
      // Convert the title of the tabs to lowercase for case-insensitive sorting.
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      // Compare the titles of the two tabs.
      if (aTitle < bTitle) {
        return -1;
      } else if (aTitle > bTitle) {
        return 1;
      } else {
        // If the titles are the same, compare the domain names of the two tabs.
        const aUrl = new URL(a.url);
        const bUrl = new URL(b.url);
        // Get the last two sections of the domain name (ignoring subdomains).
        const aDomain = aUrl.hostname.split('.').slice(-2).join('.');
        const bDomain = bUrl.hostname.split('.').slice(-2).join('.');
        // Compare the domain names of the two tabs.
        if (aDomain < bDomain) {
          return -1;
        } else if (aDomain > bDomain) {
          return 1;
        } else {
          // If the domain names are the same, keep the tabs in their current order.
          return 0;
        }
      }
    });

    // This creates an array of the sorted tab IDs.
    const tabIds = sortedTabs.map(function(tab) {
      return tab.id;
    });

    // This moves the sorted tabs to the end of the window.
    chrome.tabs.move(tabIds, { index: -1 });
  });
});
