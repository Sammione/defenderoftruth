function fmtDate(iso){
  try{ return new Date(iso).toLocaleDateString(undefined,{year:"numeric",month:"short",day:"2-digit"}); }
  catch{ return iso; }
}
function tagPill(t){
  return `<span class="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">${t}</span>`;
}
function renderAudio(list, targetId){
  const el = document.getElementById(targetId);
  if(!el) return;
  if(!list || !list.length){
    el.innerHTML = `<div class="rounded-2xl border p-6 text-gray-600">No audio available yet.</div>`;
    return;
  }
  el.innerHTML = list.map(a => `
    <article class="rounded-2xl border bg-white/85 backdrop-blur p-6 shadow-soft hover:border-indigo-200 transition">
      <div class="flex items-start justify-between gap-4">
        <div class="min-w-0">
          <h3 class="font-semibold text-lg truncate">${a.title}</h3>
          <div class="text-sm text-gray-600 mt-1">${a.speaker || ""}</div>
          <div class="text-xs text-gray-500 mt-3">${fmtDate(a.date)} • ${a.duration || ""}</div>
        </div>
        <div class="flex flex-wrap gap-2 justify-end">
          ${(a.tags||[]).map(tagPill).join("")}
        </div>
      </div>
      <div class="mt-4">
        <audio class="w-full" controls preload="none">
          <source src="${a.file}">
        </audio>
      </div>
      <div class="mt-4 flex gap-3">
        <a href="${a.file}" class="px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-black text-sm" download>Download</a>
        <a href="#" class="px-4 py-2 rounded-xl border hover:bg-gray-50 text-sm">Share</a>
      </div>
    </article>
  `).join("");
}
function renderBooks(list, targetId){
  const el = document.getElementById(targetId);
  if(!el) return;
  if(!list || !list.length){
    el.innerHTML = `<div class="rounded-2xl border p-6 text-gray-600">No books available yet.</div>`;
    return;
  }
  el.innerHTML = list.map(b => `
    <article class="rounded-2xl border bg-white/85 backdrop-blur p-5 shadow-soft hover:border-indigo-200 transition">
      <div class="flex gap-4">
        <div class="h-24 w-20 rounded-xl border bg-gray-50 overflow-hidden shrink-0 flex items-center justify-center">
          ${b.cover ? `<img src="${b.cover}" class="h-full w-full object-cover" alt="">` : `<span class="text-xs text-gray-500">No cover</span>`}
        </div>
        <div class="min-w-0">
          <h3 class="font-semibold truncate">${b.title}</h3>
          <div class="text-sm text-gray-600 mt-1">${b.author || ""}</div>
          <div class="text-xs text-gray-500 mt-2">${fmtDate(b.date)} • ${b.format || ""}${b.pages?` • ${b.pages} pages`:""}</div>
        </div>
      </div>
      <div class="mt-4 flex gap-3">
        <a href="${b.file}" class="px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-black text-sm" download>Download</a>
        <a href="${b.file}" class="px-4 py-2 rounded-xl border hover:bg-gray-50 text-sm" target="_blank" rel="noopener">Open</a>
      </div>
    </article>
  `).join("");
}
function renderMagazines(list, targetId){
  const el = document.getElementById(targetId);
  if(!el) return;
  if(!list || !list.length){
    el.innerHTML = `<div class="rounded-2xl border p-6 text-gray-600">No magazines available yet.</div>`;
    return;
  }
  el.innerHTML = list.map(m => `
    <article class="rounded-2xl border bg-white/85 backdrop-blur p-6 shadow-soft hover:border-indigo-200 transition">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h3 class="font-semibold text-lg">${m.title}</h3>
          <div class="text-sm text-gray-600 mt-1">${fmtDate(m.date)}</div>
        </div>
        <span class="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">${m.format || "PDF"}</span>
      </div>
      <div class="mt-5 flex gap-3">
        <a href="${m.file}" class="px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-black text-sm">Read</a>
        <a href="${m.file}" class="px-4 py-2 rounded-xl border hover:bg-gray-50 text-sm" download>Download</a>
      </div>
    </article>
  `).join("");
}
function initSearch(inputId, list, mountFn){
  const input = document.getElementById(inputId);
  if(!input) return;
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    const filtered = !q ? list : list.filter(x => JSON.stringify(x).toLowerCase().includes(q));
    mountFn(filtered);
  });
}
