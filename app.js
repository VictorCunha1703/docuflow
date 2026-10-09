const documents = [
  { id: "NF-2026-019", name: "NF-2026-019", supplier: "Nuvem Tecnologia Ltda.", amount: "R$ 12.450,90", due: "20 out. 2026", type: "invoice", typeLabel: "Nota fiscal", priority: "Alta", status: "pending", badge: "NF" },
  { id: "CT-AC-442", name: "CT-AC-442", supplier: "Alto Consultoria", amount: "R$ 8.900,00", due: "25 out. 2026", type: "contract", typeLabel: "Contrato", priority: "Alta", status: "pending", badge: "CT" },
  { id: "NF-2026-018", name: "NF-2026-018", supplier: "Ponto Norte Serviços", amount: "R$ 3.280,50", due: "18 out. 2026", type: "invoice", typeLabel: "Nota fiscal", priority: "Normal", status: "approved", badge: "NF" },
  { id: "NF-2026-017", name: "NF-2026-017", supplier: "Matriz Suprimentos", amount: "R$ 1.875,00", due: "30 out. 2026", type: "invoice", typeLabel: "Nota fiscal", priority: "Normal", status: "pending", badge: "NF" },
  { id: "CT-RH-128", name: "CT-RH-128", supplier: "People & Co.", amount: "R$ 6.400,00", due: "02 nov. 2026", type: "contract", typeLabel: "Contrato", priority: "Normal", status: "pending", badge: "CT" },
];
let selectedId = documents[0].id;
const list = document.querySelector("#document-list");
const search = document.querySelector("#search");
const statusFilter = document.querySelector("#status-filter");
const toast = document.querySelector("#toast");
const modal = document.querySelector("#upload-modal");

function showToast(message) { toast.textContent = message; toast.classList.add("visible"); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove("visible"), 2600); }

function visibleDocuments() {
  const query = search.value.trim().toLowerCase();
  return documents.filter((document) => (!query || `${document.name} ${document.supplier}`.toLowerCase().includes(query)) && (statusFilter.value === "all" || document.type === statusFilter.value));
}

function statusLabel(status) { return status === "approved" ? "Aprovado" : status === "rejected" ? "Rejeitado" : "Pendente"; }

function renderDocuments() {
  list.innerHTML = visibleDocuments().map((document) => `
    <div class="doc-row ${document.id === selectedId ? "selected" : ""}" data-id="${document.id}">
      <div class="doc-main"><span class="doc-icon ${document.type === "contract" ? "contract" : ""}">${document.badge}</span><span><b>${document.name}</b><small>${document.supplier}</small></span></div>
      <div class="doc-cell">${document.amount}</div>
      <div><span class="doc-state ${document.status === "approved" ? "approved" : ""}"><i></i>${statusLabel(document.status)}</span></div>
      <div><span class="doc-priority ${document.priority === "Normal" ? "normal" : ""}">${document.priority}</span></div>
      <button class="doc-menu" aria-label="Opções de ${document.name}">···</button>
    </div>`).join("");
}

function renderDetail() {
  const item = documents.find((entry) => entry.id === selectedId) || documents[0];
  document.querySelector("#detail-badge").textContent = item.badge;
  document.querySelector("#detail-name").textContent = item.name;
  document.querySelector("#detail-supplier").textContent = item.supplier;
  document.querySelector("#detail-amount").textContent = item.amount;
  document.querySelector("#detail-due").textContent = item.due;
  document.querySelector("#detail-status").textContent = statusLabel(item.status);
  document.querySelector("#detail-priority").textContent = `Prioridade ${item.priority.toLowerCase()}`;
  const isDone = item.status !== "pending";
  document.querySelector("#approve").disabled = isDone;
  document.querySelector("#reject").disabled = isDone;
  document.querySelector("#approve").textContent = isDone ? "Documento processado" : "Aprovar documento  →";
}

function selectDocument(id) { selectedId = id; renderDocuments(); renderDetail(); }
function decide(action) {
  const document = documents.find((item) => item.id === selectedId);
  if (!document || document.status !== "pending") { showToast("Este documento já foi processado"); return; }
  document.status = window.DocuFlowModel.nextStatus(action);
  renderDocuments(); renderDetail();
  showToast(action === "approve" ? "Documento aprovado e registrado na auditoria" : "Documento rejeitado e devolvido para correção");
}

search.addEventListener("input", renderDocuments);
statusFilter.addEventListener("change", renderDocuments);
list.addEventListener("click", (event) => { const row = event.target.closest("[data-id]"); if (row) selectDocument(row.dataset.id); });
document.querySelector("#approve").addEventListener("click", () => decide("approve"));
document.querySelector("#reject").addEventListener("click", () => decide("reject"));
document.querySelector("#upload").addEventListener("click", () => { modal.hidden = false; document.querySelector("#file-name").focus(); });
document.querySelector("#close-modal").addEventListener("click", () => { modal.hidden = true; });
modal.addEventListener("click", (event) => { if (event.target === modal) modal.hidden = true; });
document.querySelector("#add-document").addEventListener("click", () => {
  const name = document.querySelector("#file-name").value.trim();
  if (!name) { showToast("Informe o nome do documento"); return; }
  const type = document.querySelector("#file-type").value;
  const newDocument = { id: name.replace(/\W/g, "").slice(0, 14), name, supplier: "Processamento pendente", amount: "R$ 0,00", due: "A definir", type, typeLabel: type === "invoice" ? "Nota fiscal" : "Contrato", priority: "Normal", status: "pending", badge: type === "invoice" ? "NF" : "CT" };
  documents.unshift(newDocument);
  selectedId = newDocument.id;
  modal.hidden = true;
  document.querySelector("#file-name").value = "";
  renderDocuments(); renderDetail();
  showToast("Documento adicionado à caixa de entrada");
});
renderDocuments(); renderDetail();
