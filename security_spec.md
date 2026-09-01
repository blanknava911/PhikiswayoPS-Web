# Security Specification: Phikiswayo Primary School

## 1. Data Invariants
1. **Public Read Access**: Unauthenticated and public users can only read documents in `/notices` and `/events` where `published == true`.
2. **Draft Isolation**: Any notice or event where `published == false` (or draft state) is strictly restricted to authenticated and verified school administrators (`blanknava205@gmail.com` or `phikiswayop@gmail.com`).
3. **Write Integrity & Admin Authorization**: All write operations (`create`, `update`, `delete`) on `/notices` and `/events` require an authenticated user with a verified email matching an authorized school administrator (`blanknava205@gmail.com` or `phikiswayop@gmail.com`).
4. **Boundary & Schema Validation**: Incoming payloads for notices and events must strictly pass validation:
   - Strings must be bounded in length (e.g., titles <= 200 chars, summaries <= 2000 chars).
   - Date formats must match standard ISO YYYY-MM-DD pattern.
   - Categories must strictly adhere to the allowed enum sets.
5. **No Orphaned or Rogue Documents**: Catch-all default deny `match /{document=**} { allow read, write: if false; }` prevents unauthorized collections.

---

## 2. The "Dirty Dozen" Payloads

1. **Payload 1 (Ghost Field Injection on Notice Create)**:
   `{ "title": "New Term Notice", "published_at": "2025-01-15", "category": "general", "summary": "Term starts soon", "audience": "Parents", "pinned": false, "published": true, "isAdminOverride": true }`
   - *Expected Outcome*: Rejected (Disallowed ghost field `isAdminOverride`).

2. **Payload 2 (Unverified Email Spoofing Write)**:
   - Auth: `{ email: "blanknava205@gmail.com", email_verified: false }`
   - *Expected Outcome*: Rejected (Must have `email_verified == true`).

3. **Payload 3 (Non-Admin User Creation Attempt)**:
   - Auth: `{ email: "attacker@gmail.com", email_verified: true }`
   - Action: `create` on `/notices/test-notice`
   - *Expected Outcome*: Rejected (Email is not an approved school administrator).

4. **Payload 4 (Unauthenticated Write Attempt)**:
   - Auth: `null`
   - Action: `delete` on `/events/test-event`
   - *Expected Outcome*: Rejected (PERMISSION_DENIED).

5. **Payload 5 (Oversized Notice Summary Denial-of-Wallet Payload)**:
   `{ "title": "Huge Summary", "published_at": "2025-01-15", "category": "general", "summary": "A".repeat(50000), "audience": "Parents", "pinned": false, "published": true }`
   - *Expected Outcome*: Rejected (Summary exceeds 2000 chars limit).

6. **Payload 6 (Invalid Notice Category Injection)**:
   `{ "title": "Invalid Cat", "published_at": "2025-01-15", "category": "malicious_eval", "summary": "Valid summary text", "audience": "Parents", "pinned": false, "published": true }`
   - *Expected Outcome*: Rejected (Category not in `['general', 'admissions', 'academic', 'events']`).

7. **Payload 7 (Invalid Date Format Injection)**:
   `{ "title": "Invalid Date", "published_at": "not-a-date", "category": "general", "summary": "Valid summary text", "audience": "Parents", "pinned": false, "published": true }`
   - *Expected Outcome*: Rejected (Date pattern does not match `YYYY-MM-DD`).

8. **Payload 8 (Public Access to Draft Notice via Direct Get)**:
   - Target: `/notices/draft-notice-1` (where `published == false`)
   - Auth: `null`
   - *Expected Outcome*: Rejected (Unauthenticated read of draft notice is blocked).

9. **Payload 9 (Public Access to Draft Event via Direct Get)**:
   - Target: `/events/draft-event-1` (where `published == false`)
   - Auth: `null`
   - *Expected Outcome*: Rejected (Unauthenticated read of draft event is blocked).

10. **Payload 10 (Document ID Poisoning Attack)**:
    - Path: `/notices/../system/config` or `/notices/$$invalid%%chars`
    - *Expected Outcome*: Rejected (ID must match `^[a-zA-Z0-9_\\-]+$` and size <= 128).

11. **Payload 11 (Oversized Event Description Payload)**:
    `{ "title": "Huge Event", "category": "sports", "category_label": "Sports", "event_date": "2025-02-10", "event_time": "09:00", "location": "Field", "description": "B".repeat(50000), "published": true }`
    - *Expected Outcome*: Rejected (Description exceeds 3000 chars limit).

12. **Payload 12 (Invalid Event Category Injection)**:
    `{ "title": "Invalid Event Cat", "category": "secret_party", "category_label": "Secret", "event_date": "2025-02-10", "event_time": "09:00", "location": "Field", "description": "Event description", "published": true }`
    - *Expected Outcome*: Rejected (Category not in `['academic', 'sports', 'meetings']`).
