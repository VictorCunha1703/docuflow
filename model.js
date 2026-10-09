function normalizeCurrency(value) {
  const number = Number(String(value).replace(/[^0-9,.-]/g, "").replace(".", "").replace(",", "."));
  return Number.isFinite(number) ? number : 0;
}

function validateDocument(document) {
  const errors = [];
  if (!document.name || document.name.trim().length < 3) errors.push("nome");
  if (!document.supplier || document.supplier.trim().length < 2) errors.push("fornecedor");
  if (normalizeCurrency(document.amount) <= 0) errors.push("valor");
  if (!document.dueDate) errors.push("vencimento");
  return { valid: errors.length === 0, errors };
}

function nextStatus(action) {
  if (action === "approve") return "approved";
  if (action === "reject") return "rejected";
  return "pending";
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { normalizeCurrency, validateDocument, nextStatus };
} else {
  window.DocuFlowModel = { normalizeCurrency, validateDocument, nextStatus };
}
