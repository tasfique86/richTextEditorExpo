export const EDITOR_STYLES = `
  /* Mention extension styles */
  .mention {
    border: 1px solid #000;
    border-radius: 0.4rem;
    padding: 0.1rem 0.3rem;
    box-decoration-break: clone;
    background-color: var(--accent-color);
    color: var(--text-color);
  }

  .dropdown-menu {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 0.7rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    overflow: hidden;
    padding: 0.4rem;
    position: relative;
  }

  .menu-item {
    align-items: center;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 0.4rem;
    color: var(--text-color);
    display: flex;
    gap: 0.5rem;
    margin: 0;
    padding: 0.5rem 0.75rem;
    text-align: left;
    width: 100%;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;
  }

  .menu-item.is-selected {
    background-color: var(--accent-light);
    border-color: var(--accent-color);
    color: var(--accent-color);
  }

  .menu-item:hover {
    background-color: var(--bg-main);
  }

  /* Toolbar stability styles */
  .btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    filter: grayscale(1);
  }

  .table-controls-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    padding: 0.4rem;
    background: var(--bg-toolbar);
    border-radius: 0.5rem;
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
  }

  .table-controls-group.active-context {
    border-color: var(--accent-color);
    background-color: var(--accent-light);
    box-shadow: 0 0 10px rgba(var(--accent-rgb), 0.1);
  }

  /* Table styles */
  .tiptap table {
    border-collapse: collapse;
    margin: 0;
    overflow: hidden;
    table-layout: fixed;
    width: 100%;
  }

  .tiptap table td,
  .tiptap table th {
    border: 1px solid var(--border-color);
    box-sizing: border-box;
    min-width: 1em;
    padding: 6px 10px;
    position: relative;
    vertical-align: top;
  }

  .tiptap table th {
    background-color: var(--bg-toolbar);
    font-weight: bold;
    text-align: left;
  }

  .tiptap table .selectedCell:after {
    background: var(--accent-light);
    content: "";
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
    position: absolute;
    z-index: 2;
  }

  .tiptap table .column-resize-handle {
    background-color: var(--accent-color);
    bottom: -2px;
    pointer-events: none;
    position: absolute;
    right: -2px;
    top: 0;
    width: 4px;
  }

  .tiptap .tableWrapper {
    margin: 1.5rem 0;
    overflow-x: auto;
  }

  .tiptap.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }
:root {
  --bg-body:#f3f4f6; --bg-card:#ffffff; --bg-toolbar:#f9fafb; --border:#e5e7eb;
  --text:#111827; --muted:#6b7280; --accent:#4f46e5; --purple:#4f46e5;
  --pill-bg:#eef2ff; --pill-border:rgba(129,140,248,.7);
  --task-done:#9ca3af; --task-border:#d1d5db;
  --code-bg:#f3f4f6; --code-text:#111827;
  --code-inline-bg:#f3f4f6; --code-border:rgba(15,23,42,.06);
}
:root[data-theme=dark]{
  --bg-body:#020617; --bg-card:#020617; --bg-toolbar:#020617; --border:#1f2937;
  --text:#f9fafb; --muted:#9ca3af; --accent:#a5b4fc; --purple:#a5b4fc;
  --pill-bg:rgba(165,180,252,.15); --pill-border:rgba(129,140,248,.7);
  --task-done:#6b7280; --task-border:#4b5563;
  --code-bg:#111827; --code-text:#e5e7eb;
  --code-inline-bg:#111827; --code-border:rgba(255,255,255,.1);
}

/* CONTAINER: This is the root element for the editor instance. */
:root, body { background: var(--bg-body); color: var(--text); transition: background .15s ease, color .15s ease; margin: 0; }

.tiptap-ui-container { 
    width: 100%; height: 100%; 
    position: relative; /* Crucial for local fullscreen */
    font-family: system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; 
    background: transparent; 
    overflow: hidden; /* Prevent parent scrollbars */
}
.tiptap-ui-container * { box-sizing: border-box; }

.tiptap-ui-container .editor-card {
  width: 100%; height: 100%;
  max-width: none; margin: 0; 
  background: var(--bg-card);
  border: 1px solid var(--border);
  display: flex; flex-direction: column;
}

/* FULLSCREEN: Stays within the bounds of the .tiptap-ui-container */
.tiptap-ui-container .editor-card.fullscreen { 
  position: absolute; 
  inset: 0; 
  margin: 0; 
  max-width: none; 
  z-index: 50; 
  border-radius: 0;
}
.tiptap-ui-container.no-scroll { overflow: hidden; }

/* Keyboard accessory toolbar: hidden by default, JS shows it when keyboard is open */
.tiptap-ui-container .toolbar{ display:none; background:var(--bg-toolbar); border-top:1px solid var(--border); border-bottom:none; position:fixed; bottom:0; left:0; right:0; z-index:1000; padding-bottom:env(safe-area-inset-bottom,0px); box-shadow:0 -2px 12px rgba(0,0,0,0.08); transition: bottom 0.15s ease; }
.tiptap-ui-container .toolbar-inner{ padding:6px 10px; display:flex; align-items:flex-start; gap:10px; flex-wrap:wrap; overflow-x:auto; }
.tiptap-ui-container .toolbar-left{display:flex;flex-direction:column;gap:6px;flex:1 1 auto;min-width:0;}
.tiptap-ui-container .toolbar-top-row{display:flex;align-items:center;justify-content:space-between;gap:10px;}
.tiptap-ui-container .toolbar-title{font-size:13px;font-weight:600;color:var(--text);}
.tiptap-ui-container .toolbar-controls{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
.tiptap-ui-container .toolbar-right{margin-left:auto;display:flex;align-items:center;gap:6px;flex-shrink:0;}
.tiptap-ui-container .toolbar-right-main{display:flex;align-items:center;gap:4px;}

.tiptap-ui-container .group{display:inline-flex;align-items:center;gap:2px;padding-right:6px;margin-right:6px;border-right:1px solid rgba(148,163,184,.3);}
.tiptap-ui-container .group:last-child{border-right:none;margin-right:0;padding-right:0;}

.tiptap-ui-container .btn{ border-radius:7px;border:1px solid transparent;background:transparent;padding:4px 7px;font-size:12px;line-height:1;color:var(--muted);display:inline-flex;align-items:center;justify-content:center;gap:4px;cursor:pointer;transition:.12s;min-width:26px;height:26px; }
.tiptap-ui-container .btn-label{font-size:11px;} .tiptap-ui-container .btn-icon{font-size:12px;font-weight:500;}
.tiptap-ui-container .btn svg{width:14px;height:14px;display:block;fill:currentColor;stroke:currentColor;}
.tiptap-ui-container .btn svg *{fill:currentColor;stroke:currentColor;}
.tiptap-ui-container .btn:hover{background:rgba(129,140,248,.08);border-color:var(--pill-border);color:var(--accent);}
.tiptap-ui-container .btn.is-active{background:var(--pill-bg);border-color:var(--pill-border);color:var(--accent);box-shadow:0 0 0 1px rgba(129,140,248,.5);}
.tiptap-ui-container .btn.icon-only{padding:0;width:26px;height:26px;}

.tiptap-ui-container .file-btn{border-radius:9999px;border:1px solid var(--border);background:transparent;padding:4px 10px;font-size:11px;color:var(--muted);display:inline-flex;gap:6px;align-items:center;cursor:pointer;transition:.12s;}
.tiptap-ui-container .file-btn-icon{font-size:12px;}
.tiptap-ui-container .file-btn:hover{border-color:var(--pill-border);color:var(--accent);background:rgba(129,140,248,.06);}
.tiptap-ui-container .mode-btn{padding-inline:10px;font-size:11px;}

.tiptap-ui-container .heading-wrap{position:relative;}
.tiptap-ui-container .heading-pill{border-radius:9999px;border:1px solid var(--pill-border);background:var(--pill-bg);padding:4px 10px;font-size:12px;display:flex;align-items:center;gap:6px;cursor:pointer;color:var(--text);}
.tiptap-ui-container .heading-pill-level{font-weight:600;letter-spacing:.03em;} .tiptap-ui-container .heading-pill-chevron{font-size:9px;opacity:.6;}
.tiptap-ui-container .heading-menu{position:absolute;top:100%;left:0;margin-top:4px;padding:4px;min-width:140px;background:var(--bg-toolbar);border-radius:8px;border:1px solid var(--border);box-shadow:0 12px 30px rgba(15,23,42,.18);display:none;z-index:10;}
.tiptap-ui-container .heading-menu button{all:unset;box-sizing:border-box;display:flex;gap:8px;align-items:center;width:100%;padding:6px 10px;border-radius:6px;font-size:12px;color:var(--text);cursor:pointer;}
.tiptap-ui-container .heading-menu button span.level{font-weight:600;font-size:11px;color:var(--muted);text-transform:uppercase;width:26px;}
.tiptap-ui-container .heading-menu button:hover{background:rgba(129,140,248,.08);color:var(--accent);}

.tiptap-ui-container .theme-toggle{border-radius:9999px;border:1px solid var(--border);width:26px;height:26px;background:transparent;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:14px;color:var(--muted);transition:.12s;}
.tiptap-ui-container .theme-toggle:hover{background:rgba(129,140,248,.08);border-color:var(--pill-border);color:var(--accent);}
.tiptap-ui-container .toolbar-hint{font-size:11px;color:var(--muted);white-space:nowrap;}
@media (max-width:720px){.tiptap-ui-container .toolbar-hint{display:none;}}

/* Add bottom padding so content is not hidden behind the fixed toolbar */
.tiptap-ui-container .editor-main { padding: 20px 0 80px 0; overflow-y: auto; flex-grow: 1; position: relative; border-radius: 0 0 16px 16px; }
.tiptap-ui-container .tiptap { min-height: 100%; outline: none; padding: 0 24px 20px 54px; }
.tiptap-ui-container .editor-card.view-mode .tiptap{cursor:default;}

.tiptap-ui-container .tiptap h1,.tiptap-ui-container .tiptap h2,.tiptap-ui-container .tiptap h3{line-height:1.2;margin-top:0em;margin-bottom:0em;}
.tiptap-ui-container .tiptap h1{font-size:1.8rem;font-weight:700;} .tiptap-ui-container .tiptap h2{font-size:1.5rem;font-weight:600;} .tiptap-ui-container .tiptap h3{font-size:1.25rem;font-weight:600;}
.tiptap-ui-container .tiptap p{margin:.4em 0; line-height: 1.6; font-size:16px}
.tiptap-ui-container .tiptap a{color:#2563eb;text-decoration:underline;text-underline-offset:2px;}
.tiptap-ui-container .tiptap code { font-family: ui-monospace,Menlo,Consolas,monospace; background: var(--code-inline-bg); color: var(--code-text); padding: 2px 5px; border-radius: 4px; font-size: .85em; border: 1px solid var(--code-border); }
.tiptap-ui-container .tiptap pre { background: var(--code-bg); color: var(--code-text); padding: 10px 12px; border-radius: 10px; font-family: ui-monospace,Menlo,Consolas,monospace; font-size: .95em; overflow: auto; border: 1px solid var(--code-border); }
.tiptap-ui-container .tiptap pre code{background:none;padding:0;color:inherit;border:none;}
.tiptap-ui-container .tiptap blockquote{border-left:3px solid var(--text);padding-left:10px;margin:1em 0;color:var(--muted);font-style:italic;}
.tiptap-ui-container .tiptap hr{border:none;border-top:1px solid var(--border);margin:1.4em 0;}
.tiptap-ui-container .tiptap ul { list-style-type: disc; }
.tiptap-ui-container .tiptap ol { list-style-type: decimal; }
.tiptap-ui-container .tiptap ul,.tiptap-ui-container .tiptap ol { padding-left:1.3rem; margin:.5em 0 .5em .2em; }
.tiptap-ui-container .tiptap ul li p, .tiptap-ui-container .tiptap ol li p { margin:.15em 0; }

.tiptap-ui-container .tiptap ul[data-type=taskList]{list-style:none;padding-left:0;margin:.5em 0;}
.tiptap-ui-container .tiptap ul[data-type=taskList]>li{display:flex !important;align-items:center;gap:.55rem;padding:.15rem 0;}
.tiptap-ui-container .tiptap ul[data-type=taskList]>li>label{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;}
.tiptap-ui-container .tiptap ul[data-type=taskList]>li>label input{appearance:none;width:1.05rem;height:1.05rem;border-radius:4px;border:1.5px solid var(--task-border);background:#fff;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:.15s;}
.tiptap-ui-container .tiptap ul[data-type=taskList]>li>label input:checked{background:var(--accent);border-color:var(--accent);color:#fff;}
.tiptap-ui-container .tiptap ul[data-type=taskList]>li>label input:checked::after{content:"✔";font-size:.75rem;color:#fff;}
.tiptap-ui-container .tiptap ul[data-type=taskList]>li>div{flex:1 1 auto;}
.tiptap-ui-container .tiptap ul[data-type=taskList]>li>div p{margin:0;}
.tiptap-ui-container .tiptap ul[data-type=taskList]>li[data-checked=true]>div p{color:var(--task-done);text-decoration:line-through;}
:root[data-theme="dark"] .tiptap-ui-container .tiptap ul[data-type=taskList] > li > label input{ background: transparent; }

.tiptap-ui-container .tiptap table{border-collapse:collapse;width:100%;margin:1em 0;table-layout:fixed;}
.tiptap-ui-container .tiptap table th{background:rgba(148,163,253,0.08);font-weight:600;text-align:left;border:1px solid #c7c7c7;padding:6px 8px;vertical-align:top;overflow:hidden;text-overflow:ellipsis;position:relative;}
:root[data-theme="dark"] .tiptap-ui-container .tiptap table th{background:rgba(148,163,253,0.08);font-weight:600;text-align:left;border:1px solid #4b5563;padding:6px 8px;vertical-align:top;overflow:hidden;text-overflow:ellipsis;position:relative;}
.tiptap-ui-container .tiptap table td{border:1px solid #c7c7c7;padding:6px 8px;vertical-align:top;overflow:hidden;text-overflow:ellipsis;position:relative;}
:root[data-theme="dark"] .tiptap-ui-container .tiptap table td{border:1px solid #4b5563;padding:6px 8px;vertical-align:top;overflow:hidden;text-overflow:ellipsis;position:relative;}
.tiptap-ui-container .tiptap table .selectedCell *{background:rgba(79,70,229,0.07);}
.tiptap-ui-container .tiptap img{max-width:100%;height:auto;display:inline-block;margin:.75em 0;border-radius:8px;}
.tiptap-ui-container .tiptap span.mention{background:rgba(129,140,248,.12);color:var(--accent);padding:0 3px;border-radius:4px;font-weight:500;}
.tiptap-ui-container .resize-cursor,.tiptap-ui-container .resize-cursor *{cursor:col-resize!important;}
.tiptap-ui-container .tiptap .column-resize-handle{position:absolute;top:0;right:-2px;width:4px;height:100%;pointer-events:none;background:rgba(79,70,229,0.35);border-radius:9999px;}
.tiptap-ui-container .tiptap table td:hover .column-resize-handle,.tiptap-ui-container .tiptap table th:hover .column-resize-handle{background:rgba(79,70,229,0.55);}

.tiptap-ui-container .editor-card.view-mode .toolbar { display: none; }

:root[data-theme="dark"] .tiptap-ui-container .tiptap .column-resize-handle{background:rgba(165,180,252,0.35);}
:root[data-theme="dark"] .tiptap-ui-container .tiptap table td:hover .column-resize-handle,:root[data-theme="dark"] .tiptap-ui-container .tiptap table th:hover .column-resize-handle{background:rgba(165,180,252,0.55);}

.tiptap-ui-container .drag-handle { position: absolute; width: 24px; height: 24px; border-radius: 4px; background: transparent; display: flex; align-items: center; justify-content: center; font-size: 16px; cursor: grab; color: var(--muted); left: 12px !important; transform: translateY(0) !important; z-index: 50; opacity: 1; transition: opacity 0.2s, background 0.1s; }
.tiptap-ui-container .drag-handle::before { content: "⋮⋮"; letter-spacing: -1px; }
.tiptap-ui-container .editor-card.edit-mode .drag-handle { pointer-events: auto; }
.tiptap-ui-container .drag-handle:hover { background: rgba(129,140,248,0.1); color: var(--accent); }

.table-hover-pill{ position:fixed; z-index:999999; display:none; padding:3px; border-radius:9999px; background:var(--bg-card); border:1px solid var(--border); box-shadow:0 12px 30px rgba(15,23,42,.20); transition:box-shadow .15s ease, transform .10s ease; }
.table-hover-pill:hover{ box-shadow:0 18px 45px rgba(15,23,42,.28); transform:translateY(-1px); }
.row-pill{ flex-direction:column; align-items:center; justify-content:center; }
.col-pill{ flex-direction:row; align-items:center; justify-content:center; }
.table-hover-pill button{ all:unset; cursor:pointer; width:22px; height:22px; border-radius:9999px; display:flex; align-items:center; justify-content:center; font-size:13px; margin:2px; border:1px solid transparent; box-sizing:border-box; transition:background .12s, box-shadow .12s, transform .05s, border-color .12s, color .12s; color:var(--text); }

.pill-btn-add{color:#16a34a;background:#f0fdf4;border-color:#bbf7d0;}
.pill-btn-add:hover{background:#bbf7d0;color:#166534;box-shadow:0 0 0 1px rgba(22,163,74,.35);transform:translateY(-0.5px);}
.pill-btn-delete{color:#dc2626;background:#fef2f2;border-color:#fecaca;}
.pill-btn-delete:hover{background:#fecaca;color:#b91c1c;box-shadow:0 0 0 1px rgba(239,68,68,.4);transform:translateY(-0.5px);}

:root[data-theme="dark"] .table-hover-pill{ background:#0b1220; border-color:#1f2937; box-shadow:0 18px 45px rgba(0,0,0,.55); }
:root[data-theme="dark"] .pill-btn-add{ background: rgba(34,197,94,.12); border-color: rgba(34,197,94,.35); color: #86efac; }
:root[data-theme="dark"] .pill-btn-add:hover{ background: rgba(34,197,94,.20); border-color: rgba(34,197,94,.50); color: #bbf7d0; box-shadow: 0 0 0 1px rgba(34,197,94,.25); }
:root[data-theme="dark"] .pill-btn-delete{ background: rgba(239,68,68,.12); border-color: rgba(239,68,68,.35); color: #fca5a5; }
:root[data-theme="dark"] .pill-btn-delete:hover{ background: rgba(239,68,68,.20); border-color: rgba(239,68,68,.50); color: #fecaca; box-shadow: 0 0 0 1px rgba(239,68,68,.25); }

.table-context-menu{ position:fixed; z-index:999999; display:none; background:var(--bg-card); border-radius:10px; border:1px solid var(--border); box-shadow:0 18px 45px rgba(15,23,42,.25); padding:4px 0; min-width:190px; font-size:13px; }
.table-context-menu button{ all:unset; box-sizing:border-box; width:100%; padding:6px 10px; display:flex; align-items:center; justify-content:space-between; cursor:pointer; color:var(--text); font-size:13px; }
.table-context-menu button span.hint{ font-size:11px; color:var(--muted); }
.table-context-menu button:hover{ background:#eff6ff; color:#1d4ed8; }
.table-context-menu hr{ border:none; border-top:1px solid var(--border); margin:4px 0; }

:root[data-theme="dark"] .table-context-menu{ background:#0b1220; border-color:#1f2937; box-shadow:0 24px 60px rgba(0,0,0,.65); }
:root[data-theme="dark"] .table-context-menu button:hover{ background: rgba(129,140,248,.12); color: var(--accent); }

.slash-menu,.mention-menu{position:absolute;background:var(--bg-card);border:1px solid var(--border);box-shadow:0 10px 30px rgba(15,23,42,.25);border-radius:8px;width:240px;display:none;z-index:999999;padding:4px;max-height:280px;overflow-y:auto;}
.menu-item,.mention-item{padding:6px 10px;font-size:13px;color:var(--text);cursor:pointer;border-radius:6px;display:flex;justify-content:space-between;align-items:center;}
.menu-item:hover,.mention-item:hover{background:#f4f4ff40;}
.menu-item.is-selected,.mention-item.is-selected{background:#e0e7ff;color:#4338ca;}
.menu-hint{color:var(--muted);font-size:11px;margin-left:8px;}
.mention-main{display:flex;align-items:center;gap:8px;}
.mention-avatar{width:20px;height:20px;border-radius:9999px;font-size:11px;display:flex;align-items:center;justify-content:center;background:rgba(129,140,248,.15);color:var(--accent);flex-shrink:0;}
.mention-label{font-size:13px;} .mention-username{font-size:11px;color:var(--muted);}

:root[data-theme="dark"] .slash-menu, :root[data-theme="dark"] .mention-menu{ background:#0b1220; border-color:#1f2937; box-shadow:0 18px 45px rgba(0,0,0,.55); }
`;
