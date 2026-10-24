# Single General CV Button Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Revert CV download UI to a single button for the general CV ("CV Umum"), removing secondary Full-Stack & Network links and dummy CV PDFs so that specialized CVs remain private.

**Architecture:** Update `src/app/[locale]/page.tsx`, `src/app/globals.css`, `src/messages/id.json`, `src/messages/en.json`, `scripts/check-placeholders.mjs`, and `scripts/gen-assets.mjs`. Replace `CV-Andrew-Chivas-Umum.pdf` with the real CV file and remove private/dummy CV files.

**Tech Stack:** Next.js 15, TypeScript, CSS, Node.js scripts.

**Spec:** User request dated 2026-10-24: "1 tombol saja untuk cv umum, karena untuk cv full stack dan cv network itu aku simpan pribadi untuk dipakai dan diapply secara mandiri".

## Global Constraints
- Preserve single primary CV button in both Hero and Contact recruiter sections.
- Remove all references to `CV-Andrew-Chivas-FullStack.pdf` and `CV-Andrew-Chivas-Network.pdf` from the public site and build scripts.
- Ensure `CV-Andrew-Chivas-Umum.pdf` contains the real 528 KB CV content.
- Ensure `npm run typecheck` and `npm run build` pass cleanly with zero errors.

## Review Focus
- Hero section recruiter CTA renders exactly one button linking to `site.cv` with `download="CV-Andrew-Chivas-Umum.pdf"`.
- Contact section recruiter CTA renders exactly one button linking to `site.cv` with `download="CV-Andrew-Chivas-Umum.pdf"`.
- Dictionary keys `cvFullstack` and `cvNetwork` removed without breaking TypeScript dictionaries.
- `scripts/check-placeholders.mjs` validates only `CV-Andrew-Chivas-Umum.pdf` and passes.
- All styles related to secondary CV links removed from `src/app/globals.css`.

---

### Task 1: Update Real PDF Asset and Clean Up Private CVs

**Files:**
- Modify/Copy: `public/cv/CV-Andrew-Chivas-Umum.pdf` (from `CV-Andrew-Chivas-Arsenal-Rico.pdf`)
- Delete: `public/cv/CV-Andrew-Chivas-FullStack.pdf`
- Delete: `public/cv/CV-Andrew-Chivas-Network.pdf`
- Delete: `public/cv/CV-Andrew-Chivas-Arsenal-Rico.pdf` (now copied as `CV-Andrew-Chivas-Umum.pdf`)

- [ ] **Step 1: Copy real CV content to `CV-Andrew-Chivas-Umum.pdf` and remove extraneous files**
- [ ] **Step 2: Verify `CV-Andrew-Chivas-Umum.pdf` is ~528 KB and valid PDF**

---

### Task 2: Simplify Page Component and Styles

**Files:**
- Modify: `src/app/[locale]/page.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Simplify Hero CTA and Contact CTA in `src/app/[locale]/page.tsx`**
  - Remove `cvGeneral`, `cvFullstack`, `cvNetwork` constants.
  - Render a clean single `<a className="btn btn--solid" href={site.cv} download="CV-Andrew-Chivas-Umum.pdf">`.
- [ ] **Step 2: Clean up `.cv-button-group` and `.cv-secondary-links` in `src/app/globals.css`**

---

### Task 3: Clean Up Messages and Scripts

**Files:**
- Modify: `src/messages/id.json`
- Modify: `src/messages/en.json`
- Modify: `scripts/check-placeholders.mjs`
- Modify: `scripts/gen-assets.mjs`

- [ ] **Step 1: Remove `cvFullstack` and `cvNetwork` from `src/messages/id.json` and `src/messages/en.json`**
- [ ] **Step 2: Update `scripts/check-placeholders.mjs` to only check `CV-Andrew-Chivas-Umum.pdf`**
- [ ] **Step 3: Update `scripts/gen-assets.mjs` to only reference `CV-Andrew-Chivas-Umum.pdf`**

---

### Task 4: Verification

- [ ] **Step 1: Run `node scripts/check-placeholders.mjs`**
- [ ] **Step 2: Run `npm run typecheck`**
- [ ] **Step 3: Run `npm run build`**
