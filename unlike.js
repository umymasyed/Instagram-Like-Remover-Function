async function simulateManualSelectionAndUnlike() { const delay = (ms) => new Promise(res => setTimeout(res, ms)); let selectedPosts = new Set();

async function autoScrollAndSelect() { let lastScrollHeight = 0; let retryCount = 0;

while (selectedPosts.size < 200) {
  window.scrollBy(0, 1000);
  await delay(2000);
  
  let checkboxes = document.querySelectorAll('div[aria-label="Toggle checkbox"]');
  
  for (let checkbox of checkboxes) {
    if (!selectedPosts.has(checkbox) && checkbox.offsetParent !== null) {
      checkbox.click();
      selectedPosts.add(checkbox);
      console.log(Selected ${selectedPosts.size} posts.);
      await delay(150);
    }
    if (selectedPosts.size >= 200) break;
  }

  let newScrollHeight = document.body.scrollHeight;
  if (newScrollHeight === lastScrollHeight) {
    retryCount++;
    if (retryCount > 3) break;
  } else {
    retryCount = 0;
  }
  lastScrollHeight = newScrollHeight;
}
console.log(Total selected posts: ${selectedPosts.size});

}

async function unlikeSelected() { await delay(1000); let unlikeCount = 0;

for (let checkbox of selectedPosts) {
  let parent = checkbox.closest('article');
  let unlikeButton = parent?.querySelector(
    'div[aria-label="Unlike"], button._a9--, div._ap3a, span[data-bloks-name="bk.components.TextSpan"]'
  );

  if (unlikeButton && unlikeCount < 200) {
    unlikeButton.click();
    unlikeCount++;
    console.log(Unliked ${unlikeCount} posts.);
    await delay(200);
  }
}
console.log("Finished unliking posts.");

}

await autoScrollAndSelect(); await unlikeSelected(); }

simulateManualSelectionAndUnlike();
