// Renders the homepage post grid and category filter from assets/posts.json.
(async function () {
  const grid = document.getElementById('postGrid');
  const categoryNav = document.getElementById('categories');
  let posts = [];

  try {
    const res = await fetch('assets/posts.json', { cache: 'no-store' });
    posts = await res.json();
  } catch (err) {
    grid.innerHTML = '<p class="empty-state">Beiträge konnten nicht geladen werden.</p>';
    return;
  }

  function render(filter) {
    const filtered = filter === 'alle' ? posts : posts.filter(p => p.category === filter);

    if (!filtered.length) {
      grid.innerHTML = '<p class="empty-state">Bald gibt es hier neue Beiträge. Schau bald wieder vorbei! ♡</p>';
      return;
    }

    // newest first
    const sorted = [...filtered].sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    grid.innerHTML = sorted.map(p => `
      <a class="post-card" href="posts/${p.slug}.html">
        <img class="post-card__img" src="${p.image}" alt="${p.title}">
        <div class="post-card__body">
          <span class="post-card__tag">${p.categoryLabel || ''}</span>
          <h3 class="post-card__title">${p.title}</h3>
          <p class="post-card__hook">${p.hook || ''}</p>
          <span class="post-card__link">Weiterlesen →</span>
        </div>
      </a>
    `).join('');
  }

  render('alle');

  categoryNav.addEventListener('click', (e) => {
    const btn = e.target.closest('.category-pill');
    if (!btn) return;
    categoryNav.querySelectorAll('.category-pill').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    render(btn.dataset.category);
  });
})();
