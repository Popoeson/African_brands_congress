/* ABC: form behaviour for every page.
   Finds each <form data-form="..."> and posts it as JSON to the form's action (/api/...). */

const MESSAGES = {
  register: { busy: "Registering…", ok: "Thank you. Your registration has been received." },
  exhibit: { busy: "Sending…", ok: "Thank you. Your enquiry has been received and the team will come back to you." },
  awards: { busy: "Sending…", ok: "Thank you. Your enquiry has been received and the team will come back to you." },
  contact: { busy: "Sending…", ok: "Thank you. Your message has been received." },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s().-]{7,20}$/;

function controlsByName(form) {
  const groups = new Map();
  Array.from(form.elements).forEach((el) => {
    if (!el.name || el.name === "website" || el.disabled) return;
    if (el.type === "submit" || el.type === "button") return;
    if (!groups.has(el.name)) groups.set(el.name, []);
    groups.get(el.name).push(el);
  });
  return groups;
}

function labelFor(form, els) {
  const first = els[0];
  const node = first.type === "radio" ? first.closest("fieldset")?.querySelector("legend") : form.querySelector(`label[for="${first.id}"]`);
  return (node ? node.textContent : first.name).replace(/\*|\(optional\)/g, "").replace(/\s+/g, " ").trim();
}

function valueOf(els) {
  if (els[0].type === "radio") return els.find((e) => e.checked)?.value || "";
  return els[0].value.trim();
}

function errorHost(els) {
  return els[0].type === "radio" ? els[0].closest("fieldset") || els[0].parentElement : els[0].parentElement;
}

function setError(form, name, els, message) {
  const host = errorHost(els);
  let p = host.querySelector(`.form-error[data-for="${name}"]`);
  if (!p) {
    p = document.createElement("p");
    p.className = "form-error";
    p.id = `${form.dataset.form}-${name}-error`;
    p.dataset.for = name;
    host.append(p);
  }
  p.textContent = message;
  els.forEach((el) => {
    el.setAttribute("aria-invalid", "true");
    const ids = new Set((el.getAttribute("aria-describedby") || "").split(" ").filter(Boolean));
    ids.add(p.id);
    el.setAttribute("aria-describedby", [...ids].join(" "));
  });
}

function clearError(form, name, els) {
  const host = errorHost(els);
  const p = host.querySelector(`.form-error[data-for="${name}"]`);
  if (!p) return;
  els.forEach((el) => {
    el.removeAttribute("aria-invalid");
    const ids = (el.getAttribute("aria-describedby") || "").split(" ").filter((id) => id && id !== p.id);
    if (ids.length) el.setAttribute("aria-describedby", ids.join(" "));
    else el.removeAttribute("aria-describedby");
  });
  p.remove();
}

function setStatus(form, state, text) {
  const box = form.querySelector("[data-form-status]");
  if (!box) return;
  box.textContent = text || "";
  if (text) box.dataset.state = state;
  else delete box.dataset.state;
}

function checkField(form, name, els) {
  const required = els.some((e) => e.required);
  const value = valueOf(els);
  const type = els[0].type;

  if (!value) {
    if (!required) return "";
    return type === "radio" || els[0].tagName === "SELECT"
      ? "Please choose an option."
      : `${labelFor(form, els)} is required.`;
  }
  if (type === "email" && !EMAIL_RE.test(value)) return "Enter a valid email address.";
  if (type === "tel" && !PHONE_RE.test(value)) return "Enter a valid phone number, including your country code.";
  return "";
}

function initForm(form) {
  const key = form.dataset.form;
  const text = MESSAGES[key] || MESSAGES.contact;
  const button = form.querySelector('button[type="submit"]');
  let busy = false;

  // Clear a field's error as soon as the visitor changes it
  const groups = () => controlsByName(form);
  form.addEventListener("input", (e) => {
    const name = e.target.name;
    const els = groups().get(name);
    if (els) clearError(form, name, els);
  });
  form.addEventListener("change", (e) => {
    const name = e.target.name;
    const els = groups().get(name);
    if (els) clearError(form, name, els);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (busy) return;

    setStatus(form, "", "");
    const all = groups();
    let firstInvalid = null;

    all.forEach((els, name) => {
      const message = checkField(form, name, els);
      if (message) {
        setError(form, name, els, message);
        firstInvalid = firstInvalid || els[0];
      } else {
        clearError(form, name, els);
      }
    });

    if (firstInvalid) {
      setStatus(form, "error", "Please check the highlighted fields.");
      firstInvalid.focus();
      return;
    }

    busy = true;
    const idleLabel = button ? button.textContent : "";
    if (button) {
      button.disabled = true;
      button.textContent = text.busy;
    }
    setStatus(form, "", "");

    try {
      const res = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      let data = {};
      try {
        data = await res.json();
      } catch {
        /* not JSON */
      }

      if (res.ok && data.ok) {
        form.reset();
        setStatus(form, "success", text.ok);
        form.querySelector("[data-form-status]")?.scrollIntoView({ block: "nearest" });
        return;
      }

      if (data.errors) {
        let first = null;
        Object.entries(data.errors).forEach(([name, message]) => {
          const els = all.get(name);
          if (els) {
            setError(form, name, els, message);
            first = first || els[0];
          }
        });
        if (first) first.focus();
      }
      setStatus(form, "error", data.message || "Something went wrong. Please try again, or contact the team.");
    } catch {
      setStatus(form, "error", "We could not send this. Check your connection and try again. Your details are still here.");
    } finally {
      busy = false;
      if (button) {
        button.disabled = false;
        button.textContent = idleLabel;
      }
    }
  });
}

document.querySelectorAll("form[data-form]").forEach(initForm);