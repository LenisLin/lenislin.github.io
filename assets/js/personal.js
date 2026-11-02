// Progressive enhancements: explicit theme control, publication filters and print.
// Language follows the requested URL: / is English and /zh/ is Chinese.
(() => {
  const themeButton = document.querySelector('.theme-toggle');
  themeButton.hidden = false;
  themeButton.addEventListener('click', () => {
    const dark = document.documentElement.classList.toggle('dark');
    themeButton.setAttribute('aria-pressed', String(dark));
  });

  const printButton = document.querySelector('[data-print]');
  if (printButton) {
    printButton.hidden = false;
    printButton.addEventListener('click', () => window.print());
  }

  const filters = document.querySelector('[data-filters]');
  if (!filters) return;
  filters.hidden = false;
  const search = filters.querySelector('[data-search]');
  const year = filters.querySelector('[data-year-filter]');
  const type = filters.querySelector('[data-type-filter]');
  const count = document.querySelector('[data-result-count]');
  const empty = document.querySelector('[data-empty-results]');
  const publications = Array.from(document.querySelectorAll('[data-publication]'));
  // Cache visible publication text so filtering does not repeatedly read layout.
  const entries = publications.map(element => ({
    element,
    text: element.querySelector('.publication-copy').textContent.toLowerCase(),
  }));
  const update = () => {
    const query = search.value.trim().toLowerCase();
    let matches = 0;
    for (const entry of entries) {
      const visible = entry.text.includes(query)
        && (!year.value || entry.element.dataset.year === year.value)
        && (!type.value || entry.element.dataset.type === type.value);
      entry.element.hidden = !visible;
      if (visible) matches += 1;
    }
    count.hidden = false;
    count.textContent = `${matches} / ${entries.length} ${count.dataset.label}`;
    empty.hidden = matches > 0;
  };
  search.addEventListener('input', update);
  year.addEventListener('change', update);
  type.addEventListener('change', update);
  update();
})();
