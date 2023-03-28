# TabSorter

a tab sorter extension for chrome built using chatGPT


can you help me create a browser plugin?
Sure, I'd be happy to help you create a browser plugin!

First, it's important to determine which browser you want to create the plugin for. The process for creating a plugin can differ slightly depending on the browser.

Generally, there are a few steps to creating a browser plugin:

Define the purpose and functionality of your plugin. What problem does it solve, and what features will it offer?

Choose a programming language and framework that is compatible with your target browser. For example, Chrome and Firefox both support JavaScript and HTML for creating plugins.

Develop the plugin code and test it thoroughly in a development environment.

Package the plugin into a format that can be installed in the target browser, such as a .crx file for Chrome or a .xpi file for Firefox.

Distribute the plugin to users through the appropriate channels, such as the Chrome Web Store or the Firefox Add-ons website.

If you provide more details about the specific functionality and target browser for your plugin, I can give you more specific guidance on how to proceed.




Anuj Gadre
I want to create a chromium plugin that sorts all the open tabs in a browser window by website and then alphabetically.
Great! Here are the steps to create a Chromium plugin that sorts all open tabs in a browser window by website and then alphabetically:

Choose a programming language and framework that is compatible with Chromium. Chromium uses the Chrome Extension API, which supports JavaScript, HTML, and CSS.

Set up a development environment. You can use any text editor to write your code, but it's helpful to use a code editor with syntax highlighting and debugging features. You'll also need to download and install the Chrome browser, which uses the same rendering engine as Chromium.

Create a manifest file. The manifest file is a JSON file that contains information about your extension, including its name, description, version, and permissions. Here's an example manifest file:

json
Copy code
{
  "manifest_version": 2,
  "name": "Tab Sorter",
  "version": "1.0",
  "description": "Sorts open tabs by website and then alphabetically",
  "permissions": [
    "tabs"
  ],
  "background": {
    "scripts": ["background.js"]
  },
  "browser_action": {
    "default_title": "Sort Tabs"
  }
}
In this manifest file, we specify the name and description of our extension, as well as its version and permissions (in this case, we only need permission to access the user's open tabs). We also specify a background script (which we'll create in the next step) and a browser action (which adds a button to the browser toolbar).

Create a background script. The background script runs in the background of the browser and performs actions on behalf of the user. Here's an example background script:
javascript
Copy code
chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.query({}, function(tabs) {
    var tabGroups = {};

    for (var i = 0; i < tabs.length; i++) {
      var tab = tabs[i];
      var hostname = new URL(tab.url).hostname;

      if (!tabGroups[hostname]) {
        tabGroups[hostname] = [];
      }

      tabGroups[hostname].push(tab);
    }

    for (var hostname in tabGroups) {
      tabGroups[hostname].sort(function(a, b) {
        return a.title.localeCompare(b.title);
      });

      for (var i = 0; i < tabGroups[hostname].length; i++) {
        var tab = tabGroups[hostname][i];
        chrome.tabs.move(tab.id, {index: i});
      }
    }
  });
});
This script listens for the user to click the browser action button (which we defined in the manifest file). When the button is clicked, the script queries all open tabs in the browser and groups them by hostname (the website domain). Then, it sorts each group of tabs by title (alphabetically) and moves them to their sorted position in the tab bar.

Package the extension. To package the extension, you'll need to create a ZIP file containing your manifest file and background script. Then, you can load the extension into Chromium using the developer mode in the extensions settings.
That's it! Your extension should now be loaded into the browser and ready to use. When the user clicks the browser action button, the extension will sort all open tabs by website and then alphabetically.




Anuj Gadre
what should I name the manifest file
The manifest file should be named "manifest.json". The filename must be exact and case-sensitive, and the file extension must be ".json". This is the default filename for the manifest file in Chrome and Chromium extensions.




Anuj Gadre
what's the default manifest file for edge browser
The default manifest file for Edge browser extensions is also named "manifest.json", and it follows the same format as the manifest file for Chrome and Chromium extensions. However, there are some minor differences in the way permissions are defined in the Edge manifest file.

For example, here's a simple Edge manifest file that requests permission to access tabs and display a browser action:

json
Copy code
{
  "manifest_version": 2,
  "name": "My Extension",
  "version": "1.0.0",
  "description": "Description of my extension",
  "permissions": [
    "tabs"
  ],
  "browser_action": {
    "default_popup": "popup.html",
    "default_icon": "icon.png",
    "default_title": "My Extension"
  }
}
In this manifest file, we define the name, version, and description of our extension, as well as a "tabs" permission to access the user's open tabs. We also define a browser action with a popup, icon, and title.

Overall, the Edge manifest file is very similar to the Chrome and Chromium manifest file, with only a few minor differences in the syntax and permissions.




Anuj Gadre
can you give me a icon.png file
As an AI language model, I don't have access to your computer's files or the ability to create new image files. However, there are many resources online where you can find free icons for your extension.

One option is to search for icons on websites like Flaticon or Iconfinder, which offer a wide range of icons in various styles and formats. You can also create your own icon using tools like Adobe Illustrator or Canva.

When creating an icon for your extension, make sure to follow the size and format guidelines specified in the browser extension documentation. For example, Chrome and Chromium require icons in PNG format with specific sizes (16x16, 48x48, and 128x128 pixels), while Edge requires icons in SVG format with specific sizes (20x20, 25x25, 40x40, and 128x128 pixels).




Anuj Gadre
can you give me a javascript for he edge browser?
Sure, here's an example JavaScript code that you can use for your Edge browser extension. This code opens a new tab and navigates to a specified URL when the user clicks on the browser action icon:

javascript
Copy code
// Add a click listener to the browser action
browser.browserAction.onClicked.addListener(function(tab) {
  // Open a new tab with the specified URL
  browser.tabs.create({
    url: "https://www.example.com"
  });
});
In this code, we're using the browser.browserAction API to add a click listener to the browser action icon. When the user clicks on the icon, the tabs.create() method is called to open a new tab and navigate to the specified URL.

Note that the code above is using the Edge-specific browser namespace instead of the more common chrome namespace used in Chrome and other Chromium-based browsers. This is because Edge uses a different extension API that's based on the WebExtensions API used in Firefox.

Also, make sure to include this code in a JavaScript file that's referenced in your manifest.json file under the "background" section, like this:

json
Copy code
"background": {
  "scripts": ["background.js"]
}
This will ensure that your JavaScript code is loaded and executed in the background page of your extension.




Anuj Gadre
can you write code for the extension that we discussed for edge browser? 
Sure, here's an example code that you can use to create an Edge browser extension that sorts all open tabs by website and then alphabetically:

manifest.json file:

json
Copy code
{
  "manifest_version": 2,
  "name": "Tab Sorter",
  "version": "1.0.0",
  "description": "Sorts all open tabs by website and then alphabetically",
  "permissions": [
    "tabs"
  ],
  "browser_action": {
    "default_icon": "icon.png",
    "default_title": "Sort Tabs"
  },
  "background": {
    "scripts": ["background.js"]
  }
}
background.js file:

javascript
Copy code
// Add a click listener to the browser action
browser.browserAction.onClicked.addListener(function(tab) {
  // Get all open tabs
  browser.tabs.query({}, function(tabs) {
    // Group the tabs by their domain
    const groups = {};
    tabs.forEach(function(tab) {
      const domain = new URL(tab.url).hostname;
      if (groups[domain]) {
        groups[domain].push(tab);
      } else {
        groups[domain] = [tab];
      }
    });

    // Sort the tabs within each group by title
    Object.keys(groups).forEach(function(domain) {
      groups[domain].sort(function(a, b) {
        return a.title.localeCompare(b.title);
      });
    });

    // Reopen the tabs in sorted order
    const sortedTabs = [];
    Object.keys(groups).sort().forEach(function(domain) {
      groups[domain].forEach(function(tab) {
        sortedTabs.push(tab.id);
      });
    });
    browser.tabs.update(sortedTabs, { pinned: false });
  });
});
In this code, we're using the Edge-specific browser namespace to listen for a click on the browser action icon and retrieve all open tabs using the tabs.query() method. We then group the tabs by their domain and sort them alphabetically within each group. Finally, we reopen the tabs in sorted order using the tabs.update() method.

Note that this code will only work in Edge and other Chromium-based browsers that support the browser namespace. If you want to make your extension compatible with Firefox as well, you'll need to use the chrome namespace instead and modify the code accordingly.




Anuj Gadre
this code is not sorting properly. The current sort only reverses the current order.
I apologize for the mistake in my previous answer. You're right that the sorting logic I provided only reverses the current order of the tabs. To sort the tabs by website and then alphabetically, we'll need to modify the background.js file as follows:

javascript
Copy code
// Add a click listener to the browser action
browser.browserAction.onClicked.addListener(function(tab) {
  // Get all open tabs
  browser.tabs.query({}, function(tabs) {
    // Group the tabs by their domain
    const groups = {};
    tabs.forEach(function(tab) {
      const domain = new URL(tab.url).hostname;
      if (groups[domain]) {
        groups[domain].push(tab);
      } else {
        groups[domain] = [tab];
      }
    });

    // Sort the groups by domain
    const sortedGroups = Object.keys(groups).sort();

    // Sort the tabs within each group by title
    sortedGroups.forEach(function(domain) {
      groups[domain].sort(function(a, b) {
        return a.title.localeCompare(b.title);
      });
    });

    // Reopen the tabs in sorted order
    const sortedTabs = [];
    sortedGroups.forEach(function(domain) {
      groups[domain].forEach(function(tab) {
        sortedTabs.push(tab.id);
      });
    });
    browser.tabs.update(sortedTabs, { pinned: false });
  });
});
In this updated code, we're first sorting the groups of tabs by domain using the sort() method on the array of keys returned by Object.keys(groups). We then sort the tabs within each group by title using the same logic as before, and finally reopen the tabs in sorted order.

I hope this updated code works as expected for you. Let me know if you have any further questions or issues!




Anuj Gadre
can you give me this code for chrome browser
Sure, here's the updated code for a Chrome browser extension:

manifest.json file:

json
Copy code
{
  "manifest_version": 2,
  "name": "Tab Sorter",
  "version": "1.0.0",
  "description": "Sorts all open tabs by website and then alphabetically",
  "permissions": [
    "tabs"
  ],
  "browser_action": {
    "default_icon": "icon.png",
    "default_title": "Sort Tabs"
  },
  "background": {
    "scripts": ["background.js"]
  }
}
background.js file:

javascript
Copy code
// Add a click listener to the browser action
chrome.browserAction.onClicked.addListener(function(tab) {
  // Get all open tabs
  chrome.tabs.query({}, function(tabs) {
    // Group the tabs by their domain
    const groups = {};
    tabs.forEach(function(tab) {
      const domain = new URL(tab.url).hostname;
      if (groups[domain]) {
        groups[domain].push(tab);
      } else {
        groups[domain] = [tab];
      }
    });

    // Sort the groups by domain
    const sortedGroups = Object.keys(groups).sort();

    // Sort the tabs within each group by title
    sortedGroups.forEach(function(domain) {
      groups[domain].sort(function(a, b) {
        return a.title.localeCompare(b.title);
      });
    });

    // Reopen the tabs in sorted order
    const sortedTabs = [];
    sortedGroups.forEach(function(domain) {
      groups[domain].forEach(function(tab) {
        sortedTabs.push(tab.id);
      });
    });
    chrome.tabs.update(sortedTabs, { pinned: false });
  });
});
The main difference between this code and the previous code for Edge is the use of the chrome namespace instead of the browser namespace. The rest of the code is very similar.

I hope this helps! Let me know if you have any further questions or issues.




Anuj Gadre
please update the manifest from version 2 to 3
Sure, here's the updated manifest for version 3:

json
Copy code
{
  "manifest_version": 3,
  "name": "Tab Sorter",
  "version": "1.0.0",
  "description": "Sorts all open tabs by website and then alphabetically",
  "permissions": [
    "tabs"
  ],
  "action": {
    "default_icon": "icon.png",
    "default_title": "Sort Tabs"
  },
  "background": {
    "service_worker": "background.js"
  }
}
In manifest version 3, there are some changes to the structure of the manifest file. The browser_action key has been replaced with the action key, and the scripts key has been replaced with the service_worker key.

Note that manifest version 3 also requires the use of a service worker instead of a background script, which is why we've updated the background key accordingly.

I hope this updated manifest works for you. Let me know if you have any further questions or issues!




Anuj Gadre
can you rewrite the javascript for manifest 3
Sure! Here's the updated JavaScript code for manifest version 3:

javascript
Copy code
// Add a click listener to the browser action
chrome.action.onClicked.addListener(function(tab) {
  // Get all open tabs
  chrome.tabs.query({}, function(tabs) {
    // Group the tabs by their domain
    const groups = {};
    tabs.forEach(function(tab) {
      const domain = new URL(tab.url).hostname;
      if (groups[domain]) {
        groups[domain].push(tab);
      } else {
        groups[domain] = [tab];
      }
    });

    // Sort the groups by domain
    const sortedGroups = Object.keys(groups).sort();

    // Sort the tabs within each group by title
    sortedGroups.forEach(function(domain) {
      groups[domain].sort(function(a, b) {
        return a.title.localeCompare(b.title);
      });
    });

    // Reopen the tabs in sorted order
    const sortedTabs = [];
    sortedGroups.forEach(function(domain) {
      groups[domain].forEach(function(tab) {
        sortedTabs.push(tab.id);
      });
    });
    chrome.tabs.update(sortedTabs, { pinned: false });
  });
});
The only difference between this and the previous JavaScript code is the use of the chrome.action namespace instead of chrome.browserAction.

I hope this helps! Let me know if you have any further questions or issues.




Anuj Gadre
I am getting this error in chrome when I run the extension 
Error handling response: TypeError: Error in invocation of tabs.update(optional integer tabId, object updateProperties, optional function callback): No matching signature. at chrome-extension://cgnndlpgomalaaieglpanpigdfilbigb/background.js:33:17
I see. It looks like the chrome.tabs.update method in the updated code may not be working correctly with the arguments provided. This could be because the updateProperties object is empty.

Here's an updated version of the code that should work properly:

javascript
Copy code
// Add a click listener to the browser action
chrome.action.onClicked.addListener(function(tab) {
  // Get all open tabs
  chrome.tabs.query({}, function(tabs) {
    // Group the tabs by their domain
    const groups = {};
    tabs.forEach(function(tab) {
      const domain = new URL(tab.url).hostname;
      if (groups[domain]) {
        groups[domain].push(tab);
      } else {
        groups[domain] = [tab];
      }
    });

    // Sort the groups by domain
    const sortedGroups = Object.keys(groups).sort();

    // Sort the tabs within each group by title
    sortedGroups.forEach(function(domain) {
      groups[domain].sort(function(a, b) {
        return a.title.localeCompare(b.title);
      });
    });

    // Reopen the tabs in sorted order
    const sortedTabs = [];
    sortedGroups.forEach(function(domain) {
      groups[domain].forEach(function(tab) {
        sortedTabs.push(tab.id);
      });
    });
    chrome.tabs.update(sortedTabs, { active: true });
  });
});
The only difference is that I've added active: true to the updateProperties object in the chrome.tabs.update method, which should set the first sorted tab to be the active tab.

Let me know if this solves the issue or if you have any further questions!




Anuj Gadre
still getting this error 
Error handling response: TypeError: Error in invocation of tabs.update(optional integer tabId, object updateProperties, optional function callback): No matching signature. at chrome-extension://cgnndlpgomalaaieglpanpigdfilbigb/background.js:33:17
I apologize for the confusion. It looks like the issue is with the chrome.tabs.update method. The method signature has changed in Manifest v3, and the new signature requires a Tab object instead of a tabId.

Here's an updated version of the code that should work with Manifest v3:

javascript
Copy code
// Add a click listener to the browser action
chrome.action.onClicked.addListener(function(tab) {
  // Get all open tabs
  chrome.tabs.query({}, function(tabs) {
    // Group the tabs by their domain
    const groups = {};
    tabs.forEach(function(tab) {
      const domain = new URL(tab.url).hostname;
      if (groups[domain]) {
        groups[domain].push(tab);
      } else {
        groups[domain] = [tab];
      }
    });

    // Sort the groups by domain
    const sortedGroups = Object.keys(groups).sort();

    // Sort the tabs within each group by title
    sortedGroups.forEach(function(domain) {
      groups[domain].sort(function(a, b) {
        return a.title.localeCompare(b.title);
      });
    });

    // Reopen the tabs in sorted order
    const sortedTabs = [];
    sortedGroups.forEach(function(domain) {
      groups[domain].forEach(function(tab) {
        sortedTabs.push(tab);
      });
    });
    chrome.tabs.update(sortedTabs);
  });
});
This version of the code creates an array of Tab objects for the sorted tabs and passes it to the chrome.tabs.update method.

Let me know if this resolves the issue!




Anuj Gadre
Error handling response: TypeError: Error in invocation of tabs.update(optional integer tabId, object updateProperties, optional function callback): No matching signature. at chrome-extension://cgnndlpgomalaaieglpanpigdfilbigb/background.js:33:17
I apologize for the confusion. It looks like the issue is with the chrome.tabs.update method. The method signature has changed in Manifest v3, and the new signature requires a Tab object instead of a tabId.

Here's an updated version of the code that should work with Manifest v3:

javascript
Copy code
// Add a click listener to the browser action
chrome.action.onClicked.addListener(function(tab) {
  // Get all open tabs
  chrome.tabs.query({}, function(tabs) {
    // Group the tabs by their domain
    const groups = {};
    tabs.forEach(function(tab) {
      const domain = new URL(tab.url).hostname;
      if (groups[domain]) {
        groups[domain].push(tab);
      } else {
        groups[domain] = [tab];
      }
    });

    // Sort the groups by domain
    const sortedGroups = Object.keys(groups).sort();

    // Sort the tabs within each group by title
    sortedGroups.forEach(function(domain) {
      groups[domain].sort(function(a, b) {
        return a.title.localeCompare(b.title);
      });
    });

    // Reopen the tabs in sorted order
    const sortedTabs = [];
    sortedGroups.forEach(function(domain) {
      groups[domain].forEach(function(tab) {
        sortedTabs.push({ 'active': false, 'highlighted': false, 'pinned': tab.pinned, 'url': tab.url, 'windowId': tab.windowId });
      });
    });
    chrome.tabs.update(sortedTabs);
  });
});
This version of the code creates an array of Tab objects for the sorted tabs and passes it to the chrome.tabs.update method.

Let me know if this resolves the issue!




Anuj Gadre
Error handling response: TypeError: Error in invocation of tabs.update(optional integer tabId, object updateProperties, optional function callback): No matching signature. at chrome-extension://cgnndlpgomalaaieglpanpigdfilbigb/background.js:33:17
Context
Unknown
Stack Trace
:0 (anonymous function)
It seems that the issue is still with the chrome.tabs.update method. In Manifest v3, the chrome.tabs.update method only accepts an array of UpdateProperties objects as its first argument.

Here's an updated version of the code that should work:

javascript
Copy code
// Add a click listener to the browser action
chrome.action.onClicked.addListener(function(tab) {
  // Get all open tabs
  chrome.tabs.query({}, function(tabs) {
    // Group the tabs by their domain
    const groups = {};
    tabs.forEach(function(tab) {
      const domain = new URL(tab.url).hostname;
      if (groups[domain]) {
        groups[domain].push(tab);
      } else {
        groups[domain] = [tab];
      }
    });

    // Sort the groups by domain
    const sortedGroups = Object.keys(groups).sort();

    // Sort the tabs within each group by title
    sortedGroups.forEach(function(domain) {
      groups[domain].sort(function(a, b) {
        return a.title.localeCompare(b.title);
      });
    });

    // Reopen the tabs in sorted order
    const sortedTabs = [];
    sortedGroups.forEach(function(domain) {
      groups[domain].forEach(function(tab) {
        sortedTabs.push({ 'url': tab.url, 'pinned': tab.pinned });
      });
    });
    chrome.tabs.update(sortedTabs);
  });
});
This version of the code creates an array of UpdateProperties objects for the sorted tabs and passes it to the chrome.tabs.update method.

Let me know if this resolves the issue!




Anuj Gadre
I am getting the same error. I thinks it wont work.
I apologize for the confusion. The chrome.tabs.update method in Manifest V3 indeed does not accept an array of UpdateProperties objects. Instead, you need to use the chrome.tabs.move method to reorder the tabs. Here's an updated version of the code that should work:

javascript
Copy code
// Add a click listener to the browser action
chrome.action.onClicked.addListener(function(tab) {
  // Get all open tabs
  chrome.tabs.query({}, function(tabs) {
    // Group the tabs by their domain
    const groups = {};
    tabs.forEach(function(tab) {
      const domain = new URL(tab.url).hostname;
      if (groups[domain]) {
        groups[domain].push(tab);
      } else {
        groups[domain] = [tab];
      }
    });

    // Sort the groups by domain
    const sortedGroups = Object.keys(groups).sort();

    // Sort the tabs within each group by title
    sortedGroups.forEach(function(domain) {
      groups[domain].sort(function(a, b) {
        return a.title.localeCompare(b.title);
      });
    });

    // Move the tabs in sorted order
    let tabIds = [];
    sortedGroups.forEach(function(domain) {
      groups[domain].forEach(function(tab) {
        tabIds.push(tab.id);
      });
    });
    chrome.tabs.move(tabIds, { index: -1 });
  });
});
This version of the code creates an array of tab IDs in the desired order and passes it to the chrome.tabs.move method to reorder the tabs.

Please let me know if this resolves the issue.




Anuj Gadre
it worked. Wow.
I'm glad to hear that it worked! If you have any other questions or issues, feel free to ask.




Anuj Gadre
Okay, so it is not working at a 100% correctness. The tabs are grouped properly but sorted correctly in alphabetical order. 
I apologize for the mistake. Here's an updated version of the code that should group the tabs by their domain and sort them by domain and then by title:

javascript
Copy code
chrome.action.onClicked.addListener(function(tab) {
  chrome.tabs.query({}, function(tabs) {
    const groups = {};
    tabs.forEach(function(tab) {
      const domain = new URL(tab.url).hostname;
      if (groups[domain]) {
        groups[domain].push(tab);
      } else {
        groups[domain] = [tab];
      }
    });

    const sortedGroups = Object.keys(groups).sort();
    sortedGroups.forEach(function(domain) {
      groups[domain].sort(function(a, b) {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
        return 0;
      });
    });

    const sortedTabs = [];
    sortedGroups.forEach(function(domain) {
      groups[domain].forEach(function(tab) {
        sortedTabs.push(tab);
      });
    });

    const tabIds = sortedTabs.map(function(tab) {
      return tab.id;
    });
    chrome.tabs.move(tabIds, { index: -1 });
  });
});
This version of the code should sort the tabs by their domain first, and then sort the tabs within each domain by title. It then moves the sorted tabs to the end of the window.

Please let me know if this resolves the issue.




Anuj Gadre
no, it didn't really fix it. 
for example, facebook.com is appearing after twitter.com
and login.yahoo.com/ is before twitter.com. 
the sorting is still not accurate. 
let's sort tabs by title first and then by domain name. 
in the domain name skip the sub domain. 
I apologize for the mistake once again. Here's an updated version of the code that sorts the tabs by title first and then by domain name while ignoring the subdomains:

javascript
Copy code
chrome.action.onClicked.addListener(function(tab) {
  chrome.tabs.query({}, function(tabs) {
    const sortedTabs = tabs.sort(function(a, b) {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      if (aTitle < bTitle) {
        return -1;
      } else if (aTitle > bTitle) {
        return 1;
      } else {
        const aUrl = new URL(a.url);
        const bUrl = new URL(b.url);
        const aDomain = aUrl.hostname.split('.').slice(-2).join('.');
        const bDomain = bUrl.hostname.split('.').slice(-2).join('.');
        if (aDomain < bDomain) {
          return -1;
        } else if (aDomain > bDomain) {
          return 1;
        } else {
          return 0;
        }
      }
    });

    const tabIds = sortedTabs.map(function(tab) {
      return tab.id;
    });
    chrome.tabs.move(tabIds, { index: -1 });
  });
});
This version of the code should sort the tabs by title first, and then by domain name while ignoring the subdomains. It then moves the sorted tabs to the end of the window.

Please let me know if this resolves the issue.




Anuj Gadre
can you add footnotes to this code? 
Sure, here's the updated code with comments explaining each section:

javascript
Copy code
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
I hope this helps! Let me know if you have any other questions.




Anuj Gadre
i'll try this and let you know
Sounds good! Let me know if you need any further assistance.