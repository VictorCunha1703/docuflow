const assert = require("node:assert/strict");
const { normalizeCurrency, validateDocument, nextStatus } = require("./model.js");

assert.equal(normalizeCurrency("R$ 12.450,90"), 12450.9);
assert.equal(normalizeCurrency("R$ 0,00"), 0);

const valid = validateDocument({ name: "NF-2026-019", supplier: "Nuvem Ltda.", amount: "R$ 1.250,00", dueDate: "2026-10-20" });
assert.equal(valid.valid, true);

const invalid = validateDocument({ name: "", supplier: "", amount: "R$ 0,00", dueDate: "" });
assert.equal(invalid.valid, false);
assert.deepEqual(invalid.errors, ["nome", "fornecedor", "valor", "vencimento"]);

assert.equal(nextStatus("approve"), "approved");
assert.equal(nextStatus("reject"), "rejected");

console.log("✓ DocuFlow: regras de validação passaram nos testes");
